/**
 * chatUtils.js — rene hjælper-funktioner til chat-features.
 */

/**
 * stripMarkdown — fjerner markdown-syntaks så teksten er kopibar som
 * almindelig tekst. LaTeX-formler erstattes med deres rå indhold.
 *
 * Brugen: når eleven trykker "kopiér" på en AI-besked, får de en
 * pæn ren version i clipboarden i stedet for **fed** og $$x = ...$$.
 */
export function stripMarkdown(text) {
  if (!text) return ''
  return text
    // Display-LaTeX: behold indholdet (uden $$)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => inner.trim())
    // Inline-LaTeX: behold indholdet (uden $)
    .replace(/\$([^$\n]+?)\$/g, (_, inner) => inner.trim())
    // Headings → almindelig tekst
    .replace(/^#{1,6}\s+/gm, '')
    // Fed/kursiv
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Inline-kode
    .replace(/`([^`]+)`/g, '$1')
    // Links: behold link-tekst
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Lister: behold tekst-delen
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Citater
    .replace(/^\s*>\s+/gm, '')
    // Rens trailing whitespace
    .replace(/[ \t]+$/gm, '')
    .trim()
}

/**
 * exportChatAsMarkdown — bygger en markdown-streng af hele samtalen,
 * klar til at blive downloadet som .md-fil.
 */
export function exportChatAsMarkdown({ messages, user, profile }) {
  const now = new Date()
  const dateStr = now.toLocaleString('da-DK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const header = [
    `# Chat-eksport — Ministeriets AI-Platform`,
    ``,
    `**Bruger:** ${user?.name ?? 'Ukendt'}`,
    `**Profil:** ${profile?.label ?? '?'} (${profile?.name ?? '?'})`,
    `**Dato:** ${dateStr}`,
    `**Antal beskeder:** ${messages.length}`,
    ``,
    `---`,
    ``,
  ].join('\n')

  const body = messages
    .map(m => {
      const role = m.role === 'ai' ? '🤖 Vejlederen' : `👤 ${user?.name?.split(' ')?.[0] ?? 'Elev'}`
      const intent = m.role === 'ai' && m.intent ? ` _(${m.intent})_` : ''
      const followUp =
        m.role === 'ai' && m.followUp
          ? `\n\n> **Refleksion:** ${m.followUp}`
          : ''
      return `### ${role}${intent}\n\n${m.text}${followUp}`
    })
    .join('\n\n---\n\n')

  return header + body + '\n'
}

/**
 * downloadAsFile — trigger en browser-download af en streng.
 */
export function downloadAsFile(content, filename, mimeType = 'text/markdown') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Lille delay før vi frigør URL'en
  setTimeout(() => URL.revokeObjectURL(url), 500)
}

/**
 * groupMessages — opdeler beskeder i visuelle klumper baseret på:
 *   1. Samme afsender (Gestalt Similarity + Proximity)
 *   2. Tidsspring < 60 min siden forrige besked (Gestalt Continuation)
 *
 * Indsætter "divider"-elementer (typen 'divider' med tekst som "I dag",
 * "I går", eller dato) hvor der er gap > 1 time mellem beskeder.
 *
 * Returnerer et array af items: hver er enten en besked-gruppe
 * { type: 'group', role, messages: [], firstTs, lastTs } eller
 * { type: 'divider', label: 'I dag' | 'I går' | '14. maj' }
 */
export function groupMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return []
  const out = []
  let currentGroup = null
  let lastDividerKey = null

  const HOUR = 60 * 60 * 1000

  for (const m of messages) {
    const ts = m.ts ?? 0
    const dividerKey = dayBucketKey(ts)

    // Ny dag → indsæt divider
    if (dividerKey && dividerKey !== lastDividerKey) {
      out.push({ type: 'divider', label: formatDayLabel(ts), key: dividerKey })
      lastDividerKey = dividerKey
      currentGroup = null
    }

    // Skal vi starte en ny gruppe?
    const isNewGroup =
      !currentGroup ||
      currentGroup.role !== m.role ||
      ts - currentGroup.lastTs > HOUR

    if (isNewGroup) {
      currentGroup = {
        type: 'group',
        role: m.role,
        messages: [m],
        firstTs: ts,
        lastTs: ts,
      }
      out.push(currentGroup)
    } else {
      currentGroup.messages.push(m)
      currentGroup.lastTs = ts
    }
  }

  return out
}

function dayBucketKey(ts) {
  if (!ts) return null
  const d = new Date(ts)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function formatDayLabel(ts) {
  if (!ts) return ''
  const date = new Date(ts)
  const now = new Date()
  const today = dayBucketKey(now.getTime())
  const yest = new Date(now)
  yest.setDate(yest.getDate() - 1)
  const yesterday = dayBucketKey(yest.getTime())
  const key = dayBucketKey(ts)
  if (key === today) return 'I dag'
  if (key === yesterday) return 'I går'
  // Indenfor samme uge: ugedag — ellers fuld dato
  const diffDays = Math.floor((now - date) / (24 * 60 * 60 * 1000))
  if (diffDays < 7) {
    return date.toLocaleDateString('da-DK', { weekday: 'long' })
      .replace(/^./, c => c.toUpperCase())
  }
  return date.toLocaleDateString('da-DK', { day: 'numeric', month: 'long' })
}

/**
 * formatRelativeTime — "lige nu", "2 min siden", "3 t siden", "i går"
 */
export function formatRelativeTime(ts) {
  if (!ts) return ''
  const now = Date.now()
  const diff = now - ts
  const sec = Math.floor(diff / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)

  if (sec < 10) return 'lige nu'
  if (sec < 60) return `${sec} sek siden`
  if (min < 60) return `${min} min siden`
  if (hr < 24) return `${hr} t siden`
  if (day === 1) return 'i går'
  if (day < 7) return `${day} dage siden`
  return new Date(ts).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })
}
