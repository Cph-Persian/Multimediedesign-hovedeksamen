/**
 * apiService.js — håndterer ALLE udadgående netværkskald.
 */

import { buildHelpfulMentorSystemPrompt, buildSubjectContext } from '../ai/prompts.js'

/**
 * Den FALDBACK-TEKST der vises hvis API'et fejler.
 * Holdes som en const så ALLE fejl-stier returnerer samme besked
 * (konsistens for brugeren).
 */
export const FALLBACK_TEXT =
  'Systemet kan ikke få fat i læreplanerne lige nu. Prøv igen senere.'

// Standard-værdier. Kan overrides via .env (VITE_GROQ_ENDPOINT, VITE_GROQ_MODEL).
const DEFAULT_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

/**
 * Custom Error-klasse. Det er en god vane at lave specifikke Error-typer
 * frem for at kaste generiske new Error() — så kan kald-stedet skelne
 * mellem "netværk fejlede" og "noget andet gik galt" via instanceof.
 */
export class ApiServiceError extends Error {
  constructor(message, { cause, status, code } = {}) {
    super(message)
    this.name = 'ApiServiceError'
    this.cause = cause       // Den underliggende fejl (fx fetch's TypeError)
    this.status = status     // HTTP-status hvis det er en response-fejl (401, 500)
    this.code = code         // Vores egen kategorisering (NO_KEY, AUTH, NETWORK...)
    this.fallbackText = FALLBACK_TEXT
  }
}

function getConfig() {
  // import.meta.env er Vite's måde at læse .env-filer på.
  // VITE_-prefixet betyder at variablen eksponeres i frontend-bundlet.
  return {
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    endpoint: import.meta.env.VITE_GROQ_ENDPOINT || DEFAULT_ENDPOINT,
    model: import.meta.env.VITE_GROQ_MODEL || DEFAULT_MODEL,
  }
}

/**
 * Tjek om vi har en nøgle. Bruges af aiClient til at vælge backend
 * uden at lave et faktisk API-kald.
 */
export function isApiServiceConfigured() {
  return Boolean(getConfig().apiKey)
}

/* -------------------------------------------------------------
   PARSER for LLM-svar
   ------------------------------------------------------------- */

/**
 * Lille helper der trækker indholdet ud af et XML-tag-par.
 * Brug ([\s\S]*?) frem for (.*?) så vi også fanger newlines inde i tag'et.
 */
function extractTag(content, tagName) {
  const re = new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, 'i')
  const m = content.match(re)
  return m ? m[1].trim() : null
}

/**
 * Tager LLM'ens råsvar og konverterer til det format aiClient forventer.
 * Hvis LLM'en glemte XML-tags, falder vi tilbage til at bruge hele
 * indholdet som tekst (graceful degradation).
 */
function parseMentorResponse(content) {
  if (!content || typeof content !== 'string') {
    return { intent: 'explain', text: '', followUp: null, crossProfile: null }
  }
  const intent = extractTag(content, 'intent') || 'explain'
  const text = extractTag(content, 'text') ?? repairLooseContent(content)
  const followUp = extractTag(content, 'followUp')
  const crossProfile = extractTag(content, 'crossProfile')
  return {
    intent: intent.toLowerCase().trim(),
    text: repairLatex(text),
    followUp: followUp || null,
    crossProfile: crossProfile || null,
  }
}

function repairLooseContent(content) {
  let out = content.trim()
  // Strip kode-fence hvis LLM'en wrappede output i ```xml ... ```
  out = out.replace(/^```(?:xml|json|markdown)?\s*/i, '').replace(/```\s*$/i, '')
  // Hvis det ligner JSON, hent text-feltet ud
  if (out.startsWith('{')) {
    try {
      const j = JSON.parse(out)
      if (typeof j?.text === 'string') return j.text
    } catch { /* ignore */ }
  }
  return out
}

/**
 * Kendte LaTeX-kommandoer vi vil genoprette backslash på hvis den mangler.
 * Sorteret efter længde i restoreCommands() så "leq" matches før "le".
 */
const LATEX_COMMANDS = [
  'frac', 'sqrt', 'binom', 'sum', 'prod', 'int', 'oint', 'lim',
  'pm', 'mp', 'cdot', 'cdots', 'ldots', 'times', 'div',
  'le', 'leq', 'ge', 'geq', 'ne', 'neq', 'approx', 'sim', 'equiv',
  'in', 'notin', 'subset', 'supset', 'cup', 'cap', 'emptyset',
  'forall', 'exists', 'infty', 'partial', 'nabla',
  'log', 'ln', 'exp', 'sin', 'cos', 'tan', 'cot', 'sec', 'csc',
  'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh',
  'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow', 'leftrightarrow', 'to',
  'alpha','beta','gamma','delta','epsilon','varepsilon','zeta','eta',
  'theta','vartheta','iota','kappa','lambda','mu','nu','xi','pi','varpi',
  'rho','varrho','sigma','varsigma','tau','upsilon','phi','varphi','chi','psi','omega',
  'Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta','Iota','Kappa',
  'Lambda','Mu','Nu','Xi','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega',
  'mathbb','mathrm','mathbf','mathcal','mathit','text','textbf','textit',
  'left','right','big','Big','bigg','Bigg',
  'vec','hat','tilde','bar','dot','ddot','overline','underline',
  'quad','qquad',
]

/**
 * repairLatex — sidste forsvarslinje hvis JSON-escape har manglet LaTeX-backslashes.
 *
 * Trin 1: konvertér tabte control-tegn tilbage til '\f', '\v', '\b'.
 * Trin 2: inden i $...$ og $$...$$, indsæt manglende backslash foran
 *         kendte LaTeX-kommandoer.
 */
function repairLatex(text) {
  if (typeof text !== 'string') return text

  // \f (form-feed), \v (vertical tab), \b (backspace) er kontrol-tegn
  // som ikke har visuel betydning — hvis vi ser dem, kommer de fra
  // en mangled JSON-escape. Konvertér tilbage til backslash-prefix.
  let s = text
    .replace(/\f/g, '\\f')   // form-feed → \f
    .replace(/\v/g, '\\v')   // vertical-tab → \v
    .replace(/\x08/g, '\\b') // backspace (0x08) → \b — bruger hex-escape så parseren ikke kvæles

  // Inden i math-blokke: re-tilføj manglende backslashes
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (_, inner) => `$$${restoreCommands(inner)}$$`)
  s = s.replace(/\$([^$\n]+?)\$/g, (_, inner) => `$${restoreCommands(inner)}$`)
  return s
}

function restoreCommands(mathInner) {
  let s = mathInner
  // Sorter længste først så "leq" ikke ødelægges af "le"-mønstret
  const sorted = [...LATEX_COMMANDS].sort((a, b) => b.length - a.length)
  for (const cmd of sorted) {
    // Match: kommando der IKKE allerede har backslash foran, OG som er
    // standalone (ikke del af et længere ord som 'fracture').
    const re = new RegExp(`(^|[^\\\\A-Za-z])${cmd}(?=[^A-Za-z]|$)`, 'g')
    s = s.replace(re, `$1\\${cmd}`)
  }
  return s
}

/* -------------------------------------------------------------
   HOVED-API: sendMentorMessage
   ------------------------------------------------------------- */

/**
 * sendMentorMessage — sender en chat-besked til Groq og parser svaret.
 */
export async function sendMentorMessage({
  message, profile, profileId, user, history = [], curriculum = null,
}) {
  const { apiKey, endpoint, model } = getConfig()

  if (!apiKey) {
    throw new ApiServiceError('VITE_GROQ_API_KEY mangler i .env', { code: 'NO_KEY' })
  }

  // System-prompten med Helpful Mentor-reglerne + profil-låsning
  const systemPrompt = buildHelpfulMentorSystemPrompt({
    profileId, profile, user, curriculum,
  })
  // Pensum-grounding som anden system-besked
  const subjectContext = buildSubjectContext(profileId, null, curriculum)

  // Byg messages-array. Vi tager kun de seneste 10 historie-beskeder
  // for at holde token-forbruget nede. AI-svar serialiseres som XML så
  // LLM'en ser sit eget format konsistent.
  const messages = [
    { role: 'system', content: systemPrompt },
    ...(subjectContext ? [{ role: 'system', content: subjectContext }] : []),
    ...history.slice(-10).map(m => ({
      role: m.role === 'student' ? 'user' : 'assistant',
      content: m.role === 'ai' && typeof m.text === 'string'
        ? buildAssistantXml(m)
        : m.text,
    })),
    { role: 'user', content: message },
  ]

  // POST request. Wrap'et i try/catch for at skelne netværks- fra HTTP-fejl.
  let res
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        // ▸ AI Safety: 0.2 = lav variation. Modellen følger reglerne strengere.
        temperature: 0.2,
        max_tokens: 1500,
        // BEMÆRK: ingen response_format=json_object — vi bruger XML-tags
        // for at undgå JSON-escape-bug på LaTeX-backslashes.
      }),
    })
  } catch (err) {
    // fetch() kaster kun ved netværksfejl (ingen forbindelse, CORS, m.m.)
    throw new ApiServiceError(`Netværksfejl mod ${endpoint}`, { cause: err, code: 'NETWORK' })
  }

  if (!res.ok) {
    // HTTP-status er ikke 2xx. 401 = ugyldig nøgle, 429 = rate limit, 500 = server.
    const body = await res.text().catch(() => '')
    throw new ApiServiceError(`API-fejl ${res.status}`, {
      status: res.status,
      code: res.status === 401 ? 'AUTH' : 'HTTP',
      cause: new Error(body.slice(0, 300)),
    })
  }

  let data
  try {
    data = await res.json()
  } catch (err) {
    throw new ApiServiceError('Kunne ikke parse API-svaret', { cause: err, code: 'PARSE' })
  }

  // OpenAI-kompatibelt format: data.choices[0].message.content
  const content = data?.choices?.[0]?.message?.content
  if (!content) {
    throw new ApiServiceError('API returnerede tomt indhold', { code: 'EMPTY' })
  }

  const parsed = parseMentorResponse(content)
  return { ...parsed, source: 'groq' }
}

function buildAssistantXml(m) {
  return [
    `<intent>${m.intent ?? 'explain'}</intent>`,
    `<text>${m.text ?? ''}</text>`,
    m.followUp ? `<followUp>${m.followUp}</followUp>` : '',
  ].filter(Boolean).join('\n')
}

/* -------------------------------------------------------------
   MOCK CURRICULUM FETCH
   ------------------------------------------------------------- */

const CURRICULUM_URL = '/data/curriculum-2026.json'

/**
 * fetchCurriculum — henter pensum-databasen ved app-start.
 *
 * Selvom det er en statisk fil, opfører den sig som et rigtigt API-kald:
 *   • Kan fejle ved netværksfejl
 *   • Returnerer JSON som vi validerer schema på
 *   • Wrapper alle fejl som ApiServiceError så CurriculumContext kan
 *     håndtere dem konsistent
 */
export async function fetchCurriculum() {
  let res
  try {
    res = await fetch(CURRICULUM_URL, {
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    })
  } catch (err) {
    throw new ApiServiceError(`Kunne ikke nå pensum-databasen (${CURRICULUM_URL})`, {
      cause: err, code: 'NETWORK',
    })
  }
  if (!res.ok) {
    throw new ApiServiceError(`Pensum-databasen svarede med ${res.status}`, {
      status: res.status, code: 'HTTP',
    })
  }
  try {
    const data = await res.json()
    // Schema-validering: vi forventer subjects + registry. Hvis ikke,
    // er filen korrupt og vi vil hellere fejle højlydt.
    if (!Array.isArray(data?.subjects) || !Array.isArray(data?.registry)) {
      throw new ApiServiceError('Pensum-data har ikke det forventede format', { code: 'SCHEMA' })
    }
    return data
  } catch (err) {
    if (err instanceof ApiServiceError) throw err
    throw new ApiServiceError('Kunne ikke parse pensum-databasen', { cause: err, code: 'PARSE' })
  }
}
