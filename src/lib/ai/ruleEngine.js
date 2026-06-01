/**
 * ruleEngine.js — Ministerial Guardrail (regelbaseret version).
 */

import {
  findRelevantKernestof,
  findRelevantFagligeMaal,
  getSubjectsByProfile,
  getSubjectById,
} from '../../data/pensum.js'
import {
  findConceptInProfile,
  findAnyConcept,
  hasAnyConceptSignal,
} from '../../data/concepts.js'
import { findRegistryMatch } from '../../data/subjectRegistry.js'
import { CROSS_PROFILE_REFUSAL } from './prompts.js'

/* -------------------------------------------------------------
   Faste tekster (fra Ministerial Guardrail-spec)
   ------------------------------------------------------------- */

const CLARIFICATION_TEXT =
  'Jeg vil gerne give dig det korrekte svar jf. 2026-læreplanen. ' +
  'Hvilket fag og niveau (A, B eller C) arbejder du med?'

/* -------------------------------------------------------------
   1. NO-detektion ("skriv for mig" → outline)
   ------------------------------------------------------------- */

const NO_PATTERNS = [
  /\bskriv(?:e)?\s+(?:.*?\s+)?(opgaven|essayet|essay|stilen|stil|afleveringen|aflevering|besvarelsen|rapport(?:en)?|analysen|analyse|noterne|teksten|udkast(?:et)?)\b/i,
  /\b(skriv|lav)\s+(en|et)\s+(stil|essay|opgave|analyse|afsnit|paragraf|notat)\b/i,
  /\bskriv\s+(det|min(e)?|vores)\b/i,
  /\b(write|do|complete|finish)\s+(my|the)\s+(essay|assignment|paper|homework)\b/i,
]

function isWriteForMeRequest(text) {
  return NO_PATTERNS.some(p => p.test(text))
}

function outlineReply(message) {
  const lower = message.toLowerCase()
  let item = 'opgaven'
  if (/essay|stil/.test(lower)) item = 'essayet'
  else if (/aflevering/.test(lower)) item = 'afleveringen'
  else if (/besvarelse/.test(lower)) item = 'besvarelsen'
  else if (/rapport/.test(lower)) item = 'rapporten'
  else if (/analys/.test(lower)) item = 'analysen'

  return {
    intent: 'outline',
    text:
      `Jeg kan ikke skrive ${item} for dig — det ville bryde med akademisk integritet — ` +
      `men jeg kan hjælpe dig på to måder:\n\n` +
      `**1. Disposition**: Jeg laver en struktureret overskrift-liste, så du kan ` +
      `udfylde hvert afsnit med dine egne ord og analyser.\n\n` +
      `**2. Metodeforklaring**: Jeg gennemgår metoden du skal bruge, så du selv kan anvende den.\n\n` +
      `Hvad foretrækker du?`,
    followUp: `Vil du have en disposition eller en metodeforklaring først?`,
  }
}

/* -------------------------------------------------------------
   2. Specifik-opgave-detektion → general_formula
   ------------------------------------------------------------- */

const SPECIFIC_EQ_PATTERNS = [/\d+\s*\*?\s*[a-zA-Z](\^|²|\*\*)?\s*\d?/]
const SOLVE_VERBS = /\b(l(ø|oe)s|udregn|find\s+x|find\s+y|find\s+r(ø|oe)dderne|hvad\s+er\s+x|beregn)\b/i

function looksLikeSpecificEquation(text) {
  const hasEq = /=/.test(text)
  const hasNumericCoef = SPECIFIC_EQ_PATTERNS.some(p => p.test(text))
  const wantsSolve = SOLVE_VERBS.test(text)
  return hasNumericCoef && (hasEq || wantsSolve)
}

function generalFormulaReply({ message }) {
  const lower = message.toLowerCase()
  const isQuadratic = /\^?2|x²|x\*\*2|andengrads/.test(lower)
  const isLinear = !isQuadratic && /=/.test(lower) && /[a-zA-Z]/.test(lower)

  if (isQuadratic) {
    return {
      intent: 'general_formula',
      text:
        `Jeg løser ikke din konkrete ligning for dig — men jeg forklarer gerne hvordan du selv gør det.\n\n` +
        `Den **generelle andengradsligning** har formen:\n\n` +
        `$$ax^2 + bx + c = 0$$\n\n` +
        `Du finder løsningerne med **andengradsformlen**:\n\n` +
        `$$x = \\frac{-b \\pm \\sqrt{d}}{2a}, \\qquad d = b^2 - 4ac$$\n\n` +
        `**Fremgangsmåde:**\n` +
        `1. Skriv ligningen på standardformen $ax^2 + bx + c = 0$.\n` +
        `2. Aflæs **koefficienterne** $a$, $b$ og $c$.\n` +
        `3. Beregn **diskriminanten** $d = b^2 - 4ac$.\n` +
        `4. Afgør antal løsninger ($d>0$: to, $d=0$: én, $d<0$: ingen reelle).\n` +
        `5. Indsæt i formlen.`,
      followUp: `Hvad får du for $a$, $b$ og $c$ i din ligning?`,
    }
  }
  if (isLinear) {
    return {
      intent: 'general_formula',
      text:
        `Jeg udregner ikke din konkrete ligning — men her er **den generelle metode** for $ax + b = c$:\n\n` +
        `1. Saml alle led med $x$ på den ene side, alle konstantled på den anden.\n` +
        `2. Træk fælles faktor af $x$ ud.\n` +
        `3. Divider med koefficienten foran $x$ for at isolere det.\n\n` +
        `Tjek altid dit svar ved at sætte det ind i den oprindelige ligning.`,
      followUp: `Hvilket trin er du usikker på?`,
    }
  }
  return {
    intent: 'general_formula',
    text:
      `Jeg udregner ikke konkrete tal for dig, men jeg gennemgår metoden gerne. ` +
      `Fortæl mig hvilken type opgave det er — fx "andengradsligning", "differentialregning", ` +
      `eller "vektorprojektion" — så viser jeg dig formlen og fremgangsmåden.`,
    followUp: `Hvilken type opgave er det?`,
  }
}

/* -------------------------------------------------------------
   3. Cross-profile-detektion → eksakt refusal-tekst
   ------------------------------------------------------------- */

function detectCrossProfile(message, profileId) {
  const profileSubjects = getSubjectsByProfile(profileId)
  const profileSubjectIds = new Set(profileSubjects.map(s => s.id))

  // Hvis et koncept matcher inden for elevens profil → IKKE cross-profile
  const inProfile = findConceptInProfile(message, profileSubjects.map(s => s.id))
  if (inProfile) return null

  // Forsøg koncept på tværs — hvis dets fag IKKE er i profilen, er det cross-profile
  const anyConcept = findAnyConcept(message)
  if (anyConcept) {
    const isOff = !anyConcept.subjectIds.some(id => profileSubjectIds.has(id))
    if (isOff) {
      return { otherProfile: guessProfileFromSubjectId(anyConcept.subjectIds[0]) }
    }
  }

  // Forsøg registry-match
  const reg = findRegistryMatch(message, profileId)
  if (reg && !reg.isInProfile) {
    return { otherProfile: reg.entry.profil }
  }
  return null
}

function guessProfileFromSubjectId(subjectId) {
  if (!subjectId) return null
  if (subjectId.endsWith('_stx')) return 'stx'
  if (subjectId.endsWith('_htx')) return 'htx'
  if (subjectId.endsWith('_hhx')) return 'hhx'
  return null
}

function crossProfileReply(otherProfile) {
  return {
    intent: 'cross_profile',
    text: CROSS_PROFILE_REFUSAL,
    followUp: null,
    crossProfile: otherProfile,
  }
}

/* -------------------------------------------------------------
   4. Koncept-lookup (in-profile)
   ------------------------------------------------------------- */

function conceptReply(concept) {
  const parts = [`## ${concept.titel}`, '', concept.definition]
  if (concept.formula) parts.push('', concept.formula)
  if (concept.forklaring) parts.push('', concept.forklaring)
  if (concept.eksempel) parts.push('', `**Eksempel:** ${concept.eksempel}`)
  return {
    intent: 'explain',
    text: parts.join('\n'),
    followUp: concept.ledendeSporgsmal,
  }
}

/* -------------------------------------------------------------
   5. Context check (FAGLIG VALIDERING — regel 3)
   ------------------------------------------------------------- */

function hasEnoughContext({ message, history, profileId, pinnedSubjectId }) {
  if (pinnedSubjectId) return true
  if (recentResolvedContext(history)) return true
  if (looksLikeSpecificEquation(message)) return true
  if (hasAnyConceptSignal(message)) return true
  const reg = findRegistryMatch(message, profileId)
  if (reg) return true
  if (isShortSocial(message)) return true
  return false
}

function recentResolvedContext(history) {
  if (!Array.isArray(history)) return false
  for (let i = history.length - 1; i >= Math.max(0, history.length - 6); i--) {
    if (history[i]?.role === 'ai' && history[i].intent && history[i].intent !== 'clarify') {
      return true
    }
  }
  return false
}

function isShortSocial(message) {
  if (!message) return false
  const t = message.trim().toLowerCase()
  if (t.length <= 6) return true
  return /^(hej|hejsa|hi|hello|tak|ok|okay|ja|nej|godt|fedt|sweet|cool|fint|sejt|forst(å|aa)et)\b/i.test(t)
}

function clarifyReply() {
  return {
    intent: 'clarify',
    text: CLARIFICATION_TEXT,
    followUp: null,
  }
}

/* -------------------------------------------------------------
   6. Intent-klassifikation (fallback)
   ------------------------------------------------------------- */

const HINT_KEYWORDS = ['\\bhint\\b', '\\btip\\b', 'hjælp\\s+mig\\s+videre', 'hvor\\s+skal\\s+jeg\\s+starte']
const METHOD_KEYWORDS = ['hvordan\\s+(g(å|aa)r|skal|kan)', 'fremgangsm(å|aa)de', 'hvordan\\s+analyser', 'hvordan\\s+fortolk']
const STEP_KEYWORDS = ['n(æ|ae)ste\\s+skridt', 'hvad\\s+skal\\s+jeg\\s+gøre\\s+nu', 'derefter']
const CHECK_KEYWORDS = ['er\\s+det\\s+rigtigt', 'er\\s+jeg\\s+p(å|aa)\\s+rette', 'tjek\\s+min\\s+forst', 'forstår\\s+jeg\\s+det\\s+rigtigt']
const EXPLAIN_KEYWORDS = ['^hvad\\s+er', '^hvad\\s+betyder', '\\bforklar\\b', '\\bdefiner\\b', 'hvorfor\\s+(er|virker|skal)', '\\bhvad\\s+menes\\s+med\\b']

function matchAny(text, patterns) {
  return patterns.some(p =>
    typeof p === 'string' ? new RegExp(p, 'i').test(text) : p.test(text),
  )
}

export function classifyIntent(text, providedIntent) {
  if (providedIntent && providedIntent !== 'auto') return providedIntent
  if (isWriteForMeRequest(text)) return 'outline'
  if (looksLikeSpecificEquation(text)) return 'general_formula'
  if (matchAny(text, EXPLAIN_KEYWORDS)) return 'explain'
  if (matchAny(text, METHOD_KEYWORDS)) return 'method'
  if (matchAny(text, STEP_KEYWORDS)) return 'steps'
  if (matchAny(text, CHECK_KEYWORDS)) return 'check'
  if (matchAny(text, HINT_KEYWORDS)) return 'hint'
  return 'explain'
}

function resolveSubjectInternally(message, profileId) {
  const profileSubjects = getSubjectsByProfile(profileId)
  const ids = profileSubjects.map(s => s.id)
  const concept = findConceptInProfile(message, ids)
  if (concept) {
    const sid = concept.subjectIds.find(id => ids.includes(id))
    if (sid) return getSubjectById(sid)
  }
  const reg = findRegistryMatch(message, profileId)
  if (reg?.entry?.deepId) return getSubjectById(reg.entry.deepId)
  return null
}

/* -------------------------------------------------------------
   PUBLIC reply-router
   ------------------------------------------------------------- */

export function ruleBasedReply({ message, intent, profileId, pinnedSubjectId, history = [] }) {
  // 1. Skriv-for-mig?
  if (isWriteForMeRequest(message)) return outlineReply(message)

  // 2. Konkret ligning med tal?
  if (looksLikeSpecificEquation(message)) return generalFormulaReply({ message })

  // 3. KONTEKST-SPÆRRING (regel 1)
  const cross = detectCrossProfile(message, profileId)
  if (cross) return crossProfileReply(cross.otherProfile)

  // 4. Koncept-match in-profile
  const profileSubjects = getSubjectsByProfile(profileId)
  const concept = findConceptInProfile(message, profileSubjects.map(s => s.id))
  if (concept) return conceptReply(concept)

  // 5. FAGLIG VALIDERING (regel 3)
  if (!hasEnoughContext({ message, history, profileId, pinnedSubjectId })) {
    return clarifyReply()
  }

  // 6. Fallback intent
  const subject = resolveSubjectInternally(message, profileId)
  const finalIntent = classifyIntent(message, intent)
  const kernestof = subject ? findRelevantKernestof(subject.id, message, 3) : []
  const fagligeMaal = subject ? findRelevantFagligeMaal(subject.id, message, 2) : []

  switch (finalIntent) {
    case 'outline':         return outlineReply(message)
    case 'general_formula': return generalFormulaReply({ message })
    case 'explain':         return explainReply({ subject, kernestof, fagligeMaal })
    case 'method':          return methodReply({ subject, kernestof })
    case 'hint':            return hintReply({ subject, kernestof })
    case 'steps':           return stepsReply()
    case 'check':           return checkReply()
    default:                return explainReply({ subject, kernestof, fagligeMaal })
  }
}

/* -------------------------------------------------------------
   Generiske skabeloner (HJÆLP, MEN LØS IKKE — regel 2)
   ------------------------------------------------------------- */

function explainReply({ subject, kernestof }) {
  if (!subject || kernestof.length === 0) {
    return {
      intent: 'explain',
      text:
        `Det er et godt fagligt spørgsmål. For at give dig det mest præcise svar vil jeg gerne forstå konteksten lidt bedre — kan du beskrive en konkret del af opgaven, eller hvad du allerede har tænkt?`,
      followUp: `Hvad er din egen første tanke om det?`,
    }
  }

  const top = kernestof[0]
  const second = kernestof[1]
  return {
    intent: 'explain',
    text:
      `Det her drejer sig om **${top.titel}** i ${subject.titel}.\n\n` +
      `Begrebet er centralt fordi det indgår direkte i de **faglige mål** og typisk dukker op i både skriftlig og mundtlig eksamen. Når du arbejder med det, er der tre ting at være opmærksom på: (a) den **faglige definition**, (b) hvordan begrebet anvendes **metodisk**, og (c) hvilke **styrker og begrænsninger** det har i en konkret case.` +
      (second ? `\n\nDet hænger sammen med **${second.titel}** — de to bygger ofte på hinanden.` : ''),
    followUp: `Hvad er den ene ting fra forklaringen du nu kan anvende på din egen opgave?`,
  }
}

function methodReply({ subject, kernestof }) {
  const top = kernestof[0]
  const topName = top ? top.titel : 'metoden'
  const subjectName = subject?.titel ?? 'faget'
  return {
    intent: 'method',
    text:
      `Metoden i ${subjectName} for **${topName}** følger typisk tre trin:\n\n` +
      `1. **Afklar begreberne** — find de centrale fagtermer og definér dem præcist.\n` +
      `2. **Anvend metoden** på den konkrete case — koble teori og data.\n` +
      `3. **Vurder** styrker og svagheder ved metoden i dit tilfælde.`,
    followUp: `Hvilket af de tre trin er du mest usikker på?`,
  }
}

function hintReply({ subject, kernestof }) {
  if (kernestof.length > 0 && subject) {
    const top = kernestof[0]
    return {
      intent: 'hint',
      text:
        `Et hint: dette drejer sig om **${top.titel}** i ${subject.titel}. ` +
        `Spot ÉT begreb du allerede ved hvad betyder — det er ofte nok til at låse resten op.`,
      followUp: `Hvilket begreb kan du allerede definere?`,
    }
  }
  return {
    intent: 'hint',
    text:
      `Bryd opgaven i tre dele: hvad **VED** du, hvad **SKAL** du finde, og hvilket begreb forbinder dem?`,
    followUp: `Hvad er den første del du selv vil prøve?`,
  }
}

function stepsReply() {
  return {
    intent: 'steps',
    text:
      `**Næste skridt:** Skriv din egen 3-linjers besvarelse uden hjælp først. ` +
      `Bagefter sammenligner vi den — det er der læringen sker.`,
    followUp: `Hvilken del er du nået længst med?`,
  }
}

function checkReply() {
  return {
    intent: 'check',
    text:
      `For at tjekke din forståelse: forklar begrebet med dine egne ord, som om du forklarede det til en klassekammerat — uden at kigge i pensum.`,
    followUp: `Hvilket begreb vil du forklare?`,
  }
}

/* -------------------------------------------------------------
   PUBLIC preflightCheck — AI Safety guardrails der køres FØR
   LLM-kaldet. Returnerer et svar hvis input matcher en hård regel,
   ellers null så LLM-kaldet kan fortsætte.
   ------------------------------------------------------------- */

export function preflightCheck({ message, profileId }) {
  // Regel 2.A: skriv-for-mig — håndhæves i kode, aldrig overladt til LLM
  if (isWriteForMeRequest(message)) {
    return { ...outlineReply(message), preflight: 'write_for_me' }
  }
  // Regel 2.B: konkret opgave med tal — generel metode i stedet
  if (looksLikeSpecificEquation(message)) {
    return { ...generalFormulaReply({ message }), preflight: 'specific_equation' }
  }
  // Regel 1: KONTEKST-SPÆRRING — eksakt refusal-tekst
  const cross = detectCrossProfile(message, profileId)
  if (cross) {
    return { ...crossProfileReply(cross.otherProfile), preflight: 'cross_profile' }
  }
  return null
}

