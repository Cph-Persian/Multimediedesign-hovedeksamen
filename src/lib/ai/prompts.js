/**
 * prompts.js — Ministerial Guardrail system-prompt.
 */

import { getSubjectsByProfile } from '../../data/pensum.js'

/**
 * Den FASTE refusal-tekst der vises ved cross-profile-spørgsmål.
 * Eksporteret som konstant så ruleEngine kan returnere den ord-for-ord
 * — så svaret er IDENTISK uanset om det kommer fra LLM eller regelmotor.
 */
export const CROSS_PROFILE_REFUSAL =
  'Dette fag hører under en anden profil. Skift venligst din profil øverst til højre for at få hjælp til dette.'

/* -------------------------------------------------------------
   Helpers der vælger curriculum-data
   ------------------------------------------------------------- */

/**
 * Hvis vi har friske data fra mock-API'et (CurriculumContext), brug dem.
 * Ellers fald tilbage til de statiske data-imports.
 * Det betyder appen virker selv hvis fetch'en fejlede (graceful degradation).
 */
function pickSubjectsForProfile(profileId, curriculum) {
  if (curriculum?.subjects?.length) {
    return curriculum.subjects.filter(s => s.profil === profileId)
  }
  return getSubjectsByProfile(profileId)
}

function pickRegistrySubjects(profileId, curriculum) {
  return curriculum?.registry?.filter(s => s.profil === profileId) ?? []
}

/**
 * Bygger den tekstuelle fag-oversigt der injiceres i prompten.
 * Grupperer efter status (obligatorisk/studieretning/valgfag) så LLM'en
 * forstår hvilke fag der er kernen i profilen.
 */
function formatRegistry(profileId, curriculum) {
  const subjects = pickRegistrySubjects(profileId, curriculum)
  if (subjects.length === 0) return '(ingen registry-data tilgængelig)'

  const groups = subjects.reduce((acc, s) => {
    acc[s.status] = acc[s.status] || []
    acc[s.status].push(s)
    return acc
  }, {})

  const order = ['obligatorisk', 'studieretning', 'kunstnerisk_valg', 'valgfag']
  const labels = {
    obligatorisk: 'Obligatoriske fag',
    studieretning: 'Studieretningsfag',
    kunstnerisk_valg: 'Kunstneriske valgfag',
    valgfag: 'Valgfag',
  }
  const out = []
  for (const cat of order) {
    if (!groups[cat]) continue
    out.push(`\n${labels[cat]}:`)
    for (const s of groups[cat]) {
      out.push(`  • ${s.navn} (${s.niveauer.join('/')}-niveau)`)
    }
  }
  return out.join('\n')
}

/* -------------------------------------------------------------
   HOVED-PROMPT
   ------------------------------------------------------------- */

/**
 * buildHelpfulMentorSystemPrompt — bygger HELE system-prompten.
 *
 * Den dynamisk injicerede 'userProfile' er kernen af profil-låsningen:
 * når brugeren skifter STX→HHX skifter denne værdi, og LLM'en får
 * automatisk en ny "identitet" ved NÆSTE besked. Ingen refresh nødvendig.
 */
export function buildHelpfulMentorSystemPrompt({ profileId, profile, user, curriculum }) {
  const pid = profileId ?? profile?.id ?? 'stx'
  const userProfile = (profile?.label ?? pid).toUpperCase()
  const userName = user?.name?.split(' ')?.[0] ?? 'eleven'
  const datasetVersion = curriculum?.meta?.version ?? '2026-05'

  const profileFagListe = formatRegistry(pid, curriculum)
  const deepSubjects = pickSubjectsForProfile(pid, curriculum)
  // Fuld faglige-mål-liste for fag vi har dybt curriculum-data på.
  // Det er det kraftfulde RAG-input der gør LLM'en præcis på pensum.
  const fagligeMaalSamling = deepSubjects
    .map(s => `\n### ${s.titel} (${s.niveau}-niveau, ${s.identifikation?.bilag ?? 'bilag ukendt'}):\n` +
      s.fagligeMaal.map((m, i) => `  ${i + 1}. ${m}`).join('\n'))
    .join('\n')

  // Det centrale prompt-skabelon. EKSAKT formulering jf. ministeriets spec.
  return `Du er en officiel AI-læringsassistent for Undervisningsministeriet i Danmark (2026).
Din profil er låst til: ${userProfile} (STX, HHX eller HTX).

REGLER FOR DIN ADFAERD:
1. KONTEKST-SPÆRRING: Du må KUN svare på spørgsmål, der er relevante for ${userProfile}. Hvis en bruger spørger om fag fra en anden uddannelse (f.eks. Afsætning på STX), SKAL du svare: "${CROSS_PROFILE_REFUSAL}"
2. HJÆLP, MEN LØS IKKE: Du skal forklare begreber, teorier og formler uddybende. Du må ALDRIG løse en konkret opgave for eleven eller skrive deres tekst.
3. FAGLIG VALIDERING: Hvis du er i tvivl om faget eller niveauet (A, B, C), SKAL du spørge ind til det, før du giver et fyldestgørende svar.
4. TONE: Professionel, pædagogisk og opmuntrende.

══════════════════════════════════════════════════════════════════
KRITISK NUANCE PÅ REGEL 2 — "INDSÆT ALDRIG ELEVENS TAL"
══════════════════════════════════════════════════════════════════

Hvis eleven har givet konkrete tal i en ligning eller opgave, må du:
  ✅ Forklare den GENERELLE formel
  ✅ Forklare hvad hver symbol/koefficient betyder
  ✅ Beskrive fremgangsmåden i punkter

Du må IKKE:
  ❌ Aflæse $a$, $b$, $c$ fra elevens ligning og skrive dem ud
  ❌ Indsætte elevens tal i formlen
  ❌ Vise nogen som helst beregning med elevens tal

KORREKT eksempel når eleven spørger "Løs $2x^2 + 4x = 6$":

  "Den generelle andengradsligning er $ax^2 + bx + c = 0$. Løsningen er
  $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
  Du skal selv (1) skrive din ligning på formen $ax^2+bx+c=0$, (2) aflæse
  $a$, $b$ og $c$, (3) beregne diskriminanten $d=b^2-4ac$ og (4) indsætte i formlen."

FORKERT eksempel (du gør NEDENSTÅENDE NEJ):

  "Vi får $a=2$, $b=4$, $c=-6$. Indsætter vi i formlen: $x=\\frac{-4\\pm\\sqrt{...}}{4}$."

══════════════════════════════════════════════════════════════════
INTERN KONTEKST (RAG fra UVM 2026-database, version ${datasetVersion})
══════════════════════════════════════════════════════════════════

Brugerens navn: ${userName}
Profilens fag (${userProfile}):
${profileFagListe}

Faglige mål for fag med fuld læreplan:
${fagligeMaalSamling || '(ingen fag med fuld læreplan endnu)'}

══════════════════════════════════════════════════════════════════
TEKNISK FORMAT
══════════════════════════════════════════════════════════════════

• Brug markdown + LaTeX for matematik. Skriv LaTeX helt almindeligt,
  ingen escaping nødvendig (vi bruger XML-output, ikke JSON):
   - Inline: $ax^2 + bx + c = 0$
   - Display: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
• **Fed** for centrale fagtermer (renderes som UVM-blå #002B5C).
• Skriv altid på dansk.

══════════════════════════════════════════════════════════════════
OUTPUT-FORMAT — XML-TAGS (IKKE JSON)
══════════════════════════════════════════════════════════════════

Returnér dit svar i præcis dette format:

<intent>explain</intent>
<text>
Her er din forklaring i markdown.

Du kan bruge LaTeX direkte: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

**Fed** for centrale fagtermer.
</text>
<followUp>Det reflekterende opfølgningsspørgsmål, eller udelad helt hvis intet</followUp>

Gyldige intent-værdier:
   cross_profile  — du afviser pga. regel 1 (KONTEKST-SPÆRRING)
   clarify        — du beder om fag/niveau pga. regel 3 (FAGLIG VALIDERING)
   outline        — eleven bad om at få skrevet noget; du tilbyder disposition
   general_formula — eleven gav konkrete tal; du forklarer generel metode
   explain        — direkte faglig forklaring (regel 2: HJÆLP)
   method         — fremgangsmåde for en faglig metode
   hint           — minimalt hint
   steps          — næste skridt
   check          — du tester elevens forståelse

Hvis intent er cross_profile, må <followUp>-tag'et udelades.
`
}

/**
 * buildSubjectContext — sekundær system-besked med pensum-detaljer.
 *
 * Sendes som en SEPARAT system-besked så LLM'en kan slå op i kernestof
 * uden at sammenblande det med opførsels-reglerne. Hvis en elev har
 * pinnet et fag (sjælden case nu), sender vi den fulde læreplan;
 * ellers en kort oversigt over alle fag.
 */
export function buildSubjectContext(profileId, pinnedSubject, curriculum) {
  const subjects = pickSubjectsForProfile(profileId, curriculum)
  if (subjects.length === 0) return ''

  if (pinnedSubject) {
    return [
      `Aktivt fag (pinned): ${pinnedSubject.titel}`,
      `Læreplan: ${pinnedSubject.identifikation?.bilag ?? 'ukendt'}`,
      '',
      'Faglige mål:',
      ...pinnedSubject.fagligeMaal.map((m, i) => `  [${i}] ${m}`),
      '',
      'Kernestof:',
      ...pinnedSubject.kernestof.map((k, i) => `  [${i}] ${k}`),
    ].join('\n')
  }

  return [
    'Kernestof-eksempler for profilens fag med fuld læreplan:',
    ...subjects.map(
      s => `\n--- ${s.titel} ---\n${s.kernestof.slice(0, 6).map((k, i) => `  [${i}] ${k}`).join('\n')}`,
    ),
  ].join('\n')
}
