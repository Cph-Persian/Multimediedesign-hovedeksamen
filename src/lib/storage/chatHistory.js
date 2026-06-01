/**
 * chatHistory — persisterer chat-samtaler i localStorage.
 */

const PREFIX = 'uvm.ai.chat.'                  // ny: <prefix><userId>.<profileId>
const LEGACY_PREFIX = 'uvm.ai.chat.'           // samme prefix, men gammel suffix-form
const VALID_PROFILES = new Set(['stx', 'htx', 'hhx'])

function key(userId, profileId) {
  return `${PREFIX}${userId}.${profileId}`
}

/* -------------------------------------------------------------
   Migration — kør én gang pr. bruger
   ------------------------------------------------------------- */

const MIGRATED_FLAG = 'uvm.ai.chat.migrated.v2'

function migrateLegacyChats(userId) {
  if (!userId) return
  const flag = `${MIGRATED_FLAG}.${userId}`
  if (localStorage.getItem(flag) === '1') return

  // Saml alle gamle nøgler for denne user
  const legacy = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k || !k.startsWith(`${LEGACY_PREFIX}${userId}.`)) continue
    const suffix = k.slice(LEGACY_PREFIX.length + userId.length + 1)
    // Spring de nye profil-nøgler over
    if (VALID_PROFILES.has(suffix)) continue
    legacy.push({ key: k, subjectId: suffix })
  }

  if (legacy.length === 0) {
    localStorage.setItem(flag, '1')
    return
  }

  // Slå hver gammel chat sammen i sin profil. Vi udleder profil
  // fra subjectId-suffixet (de slutter på _stx/_htx/_hhx).
  const byProfile = { stx: [], htx: [], hhx: [] }
  for (const item of legacy) {
    const m = item.subjectId.match(/_(stx|htx|hhx)$/)
    if (!m) continue
    const profile = m[1]
    try {
      const raw = localStorage.getItem(item.key)
      if (raw) {
        const data = JSON.parse(raw)
        if (Array.isArray(data.messages)) {
          // Tag hver besked med hvilket fag den oprindeligt hørte til
          const tagged = data.messages.map(msg => ({
            ...msg,
            subjectId: msg.subjectId || item.subjectId,
          }))
          byProfile[profile].push(...tagged)
        }
      }
    } catch {
      // Ignorér korrupte indgange
    }
  }

  // Skriv samlet chat pr. profil (sorteret efter timestamp)
  for (const profile of Object.keys(byProfile)) {
    if (byProfile[profile].length === 0) continue
    const sorted = byProfile[profile].sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0))
    const existing = readChatRaw(userId, profile)
    const combined = [...sorted, ...(existing?.messages ?? [])]
    localStorage.setItem(
      key(userId, profile),
      JSON.stringify({ messages: combined, updatedAt: new Date().toISOString() }),
    )
  }

  // Slet de gamle nøgler (sikker, vi har migreret dem)
  for (const item of legacy) {
    localStorage.removeItem(item.key)
  }

  localStorage.setItem(flag, '1')
}

/* -------------------------------------------------------------
   Public API
   ------------------------------------------------------------- */

function readChatRaw(userId, profileId) {
  try {
    const raw = localStorage.getItem(key(userId, profileId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function loadChat(userId, profileId) {
  if (!userId || !profileId) return { messages: [], updatedAt: null }
  migrateLegacyChats(userId)
  const data = readChatRaw(userId, profileId)
  return data ?? { messages: [], updatedAt: null }
}

export function saveChat(userId, profileId, messages) {
  if (!userId || !profileId) return
  const payload = JSON.stringify({
    messages,
    updatedAt: new Date().toISOString(),
  })
  localStorage.setItem(key(userId, profileId), payload)
}

export function clearChat(userId, profileId) {
  if (!userId || !profileId) return
  localStorage.removeItem(key(userId, profileId))
}

