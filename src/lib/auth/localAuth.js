/**
 * localAuth — localStorage-backed auth-system.
 */

const USERS_KEY = 'uvm.ai.users.v1'
const SESSION_KEY = 'uvm.ai.session.v1'

/* -------------------------------------------------------------
   Storage helpers
   ------------------------------------------------------------- */

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/* -------------------------------------------------------------
   Crypto helpers — SHA-256 + per-user salt
   ------------------------------------------------------------- */

async function sha256(input) {
  const enc = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateSalt() {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hashPassword(password, salt) {
  return sha256(`${salt}:${password}`)
}

/* -------------------------------------------------------------
   Validering
   ------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRegistration({ name, email, password, profil, year }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Indtast dit fulde navn'
  if (!email || !EMAIL_RE.test(email)) errors.email = 'Ugyldig e-mailadresse'
  if (!password || password.length < 8)
    errors.password = 'Adgangskoden skal være mindst 8 tegn'
  if (!['stx', 'htx', 'hhx'].includes(profil))
    errors.profil = 'Vælg din uddannelsesretning'
  if (!year || year < 1 || year > 3)
    errors.year = 'Vælg klassetrin (1.-3.g)'
  return errors
}

/* -------------------------------------------------------------
   Public API
   ------------------------------------------------------------- */

export async function register({ name, email, password, profil, year, school }) {
  const errors = validateRegistration({ name, email, password, profil, year })
  if (Object.keys(errors).length) {
    return { ok: false, errors }
  }

  const users = readUsers()
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, errors: { email: 'En bruger med denne e-mail findes allerede' } }
  }

  const salt = generateSalt()
  const passwordHash = await hashPassword(password, salt)
  const id = `usr_${crypto.randomUUID()}`

  const user = {
    id,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    profil,                  // 'stx' | 'htx' | 'hhx'
    year: Number(year),      // 1 | 2 | 3
    school: (school ?? '').trim() || null,
    createdAt: new Date().toISOString(),
    passwordHash,
    salt,
  }

  users.push(user)
  writeUsers(users)

  // Log ind med det samme
  setSession(user)
  return { ok: true, user: stripSecrets(user) }
}

export async function login({ email, password }) {
  const users = readUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim())
  if (!user) return { ok: false, errors: { email: 'Ingen bruger fundet med den e-mail' } }

  const hash = await hashPassword(password, user.salt)
  if (hash !== user.passwordHash) {
    return { ok: false, errors: { password: 'Forkert adgangskode' } }
  }

  setSession(user)
  return { ok: true, user: stripSecrets(user) }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    // Hydrér igen fra users-store så ændringer reflekteres
    const users = readUsers()
    const user = users.find(u => u.id === session.userId)
    return user ? stripSecrets(user) : null
  } catch {
    return null
  }
}

export function updateProfile(userId, patch) {
  const users = readUsers()
  const idx = users.findIndex(u => u.id === userId)
  if (idx === -1) return { ok: false }
  const allowed = ['name', 'profil', 'year', 'school']
  const next = { ...users[idx] }
  for (const key of allowed) {
    if (key in patch) next[key] = patch[key]
  }
  users[idx] = next
  writeUsers(users)
  return { ok: true, user: stripSecrets(next) }
}

/* -------------------------------------------------------------
   Internals
   ------------------------------------------------------------- */

function setSession(user) {
  const session = { userId: user.id, startedAt: new Date().toISOString() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

function stripSecrets(user) {
  const { passwordHash, salt, ...safe } = user
  return safe
}
