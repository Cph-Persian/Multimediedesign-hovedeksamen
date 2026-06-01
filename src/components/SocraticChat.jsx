import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  Compass,
  Copy,
  Download,
  HelpCircle,
  Info,
  Lightbulb,
  ListChecks,
  RefreshCw,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCurriculum } from '../context/CurriculumContext.jsx'
import { getMentorReply } from '../lib/ai/aiClient.js'
import { clearChat, loadChat, saveChat } from '../lib/storage/chatHistory.js'
import { getSubjectsByProfile } from '../data/pensum.js'
import {
  downloadAsFile,
  exportChatAsMarkdown,
  formatRelativeTime,
  groupMessages,
  stripMarkdown,
} from '../lib/chat/chatUtils.js'
import MessageContent from './MessageContent.jsx'

/**
 * Dette er chat-komponenten — hjertet af UI'et. Den forbinder alle lag:
 */

// Lille fallback hvis CurriculumContext ikke har leveret data endnu
function getSubjectsForProfileFallback(profileId) {
  return getSubjectsByProfile(profileId)
}

const QUICK_INTENTS = [
  { id: 'hint',   label: 'Giv mig et hint',       icon: Lightbulb },
  { id: 'method', label: 'Forklar metoden',       icon: Compass },
  { id: 'steps',  label: 'Hvad er næste skridt?', icon: ListChecks },
  { id: 'check',  label: 'Tjek min forståelse',   icon: HelpCircle },
]

const SCROLL_BOTTOM_THRESHOLD = 80 // px fra bunden før knappen skjules

export default function SocraticChat() {
  const { profile, setProfile, profiles } = useTheme()
  const { user } = useAuth()
  const { data: curriculum } = useCurriculum()
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [toast, setToast] = useState(null) // { text, ts }

  // Tracker pr. (user, profile) om vi har lavet den initiale scroll-til-bund.
  // Nulstilles automatisk når brugeren skifter profil — så hver profils chat
  // åbner ved den nyeste besked uden manuel scroll.
  const initialScrollKeyRef = useRef('')

  // "Follow mode" — true betyder vi auto-scroller til bunden ved hver ny besked.
  // Slukkes KUN når brugeren selv scroller op (>200px fra bund). Tændes igen
  // når de scroller tilbage (<50px) eller eksplicit sender/regenererer.
  // Hysterese (200/50) forhindrer flickering ved små scroll-bevægelser.
  const followBottomRef = useRef(true)

  /* ---------------- Hydrér samtale + persistér ---------------- */
  useEffect(() => {
    if (!user?.id || !profile?.id) return
    const chat = loadChat(user.id, profile.id)
    setMessages(chat.messages.length === 0 ? [buildWelcomeMessage(profile, user)] : chat.messages)
    setHydrated(true)
  }, [user?.id, profile?.id])

  useEffect(() => {
    if (!hydrated || !user?.id || !profile?.id) return
    saveChat(user.id, profile.id, messages)
  }, [messages, hydrated, user?.id, profile?.id])

  /* ---------------- Auto-resize textarea ---------------- */
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    const max = 8 * 28 // ~8 linjer
    el.style.height = Math.min(el.scrollHeight, max) + 'px'
  }, [draft])

  /* ---------------- Scroll-tracking ---------------- */
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
    followBottomRef.current = true
    setShowScrollToBottom(false)
  }, [])

  // Scroll-listener: brugeren skifter follow-mode ved at scrolle væk fra bunden.
  // - distance > 200px → forlader follow mode (vi følger ikke nye beskeder)
  // - distance < 50px  → genoptager follow mode
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight
      if (distance > 200) {
        followBottomRef.current = false
        setShowScrollToBottom(true)
      } else if (distance < 50) {
        followBottomRef.current = true
        setShowScrollToBottom(false)
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  /* ---------------- Initial scroll-til-nyeste ----------------
     Når chatten mounter, eller når eleven skifter profil, hopper vi
     INSTANT til den nyeste besked (ingen smooth-animation, ingen flicker).
     useLayoutEffect kører før browserens første paint, så brugeren ALDRIG
     ser en kort glimt af toppen før det hopper ned.
     KaTeX/markdown kan ændre højder asynkront efter mount, så vi
     re-scroller efter 50/200/500ms for at fange formler der vokser. */
  useLayoutEffect(() => {
    if (!hydrated || !user?.id || !profile?.id) return
    const key = `${user.id}.${profile.id}`
    if (initialScrollKeyRef.current === key) return

    const el = scrollRef.current
    if (!el) return

    // 1. Øjeblikkeligt: ram bunden før paint
    el.scrollTop = el.scrollHeight
    initialScrollKeyRef.current = key
    followBottomRef.current = true
    setShowScrollToBottom(false)

    // 2. Async høde-justeringer (KaTeX render, billeder, font-loading)
    const timers = [50, 200, 500].map(d =>
      setTimeout(() => {
        // Kun re-scroll hvis brugeren ikke selv har scrollet væk i mellemtiden
        if (
          initialScrollKeyRef.current === key &&
          el.scrollHeight - el.scrollTop - el.clientHeight < 300
        ) {
          el.scrollTop = el.scrollHeight
        }
      }, d),
    )
    return () => timers.forEach(clearTimeout)
  }, [hydrated, user?.id, profile?.id])

  // Løbende auto-scroll: følg nye beskeder så længe vi er i follow mode.
  // useLayoutEffect så vi rammer bunden FØR paint — undgår at brugeren ser
  // et glimt af den nye besked uden den er scrolled-into-view.
  useLayoutEffect(() => {
    if (!hydrated) return
    if (!followBottomRef.current) return
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'auto' })
  }, [messages, thinking, hydrated])

  /* ---------------- Toast helper ---------------- */
  function showToast(text) {
    const ts = Date.now()
    setToast({ text, ts })
    setTimeout(() => setToast(t => (t?.ts === ts ? null : t)), 1800)
  }

  /* ---------------- Quick-intent paste-helper ----------------
     Klikker eleven på en quick-intent-knap (fx "Forklar metoden"), bliver
     teksten skrevet ind i input'et i stedet for at blive sendt direkte.
     Det lader eleven enten:
       (a) trykke ↵ for at sende uændret, eller
       (b) udvide/redigere teksten først (fx "Forklar metoden bag kildekritik")
     CRAP Repetition: samme handlingsmønster som forslag-kortene på forsiden,
     hvor klik også bare initialiserer chatten — ikke automatisk sender. */
  function pasteToInput(text) {
    setDraft(text)
    // Næste tick: fokusér og placér cursor bag teksten
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(text.length, text.length)
      // Sørg for at input'et er synligt hvis det var skjult bag tastatur
      el.scrollIntoView({ block: 'nearest' })
    })
  }

  /* ---------------- Send / regen ---------------- */
  async function send(intent = null, overrideText = null, options = {}) {
    if (!profile?.id) return
    const text = (overrideText ?? draft).trim()

    let userMsg
    if (text) {
      userMsg = { id: crypto.randomUUID(), role: 'student', text, ts: Date.now() }
    } else if (intent) {
      const qi = QUICK_INTENTS.find(q => q.id === intent)
      userMsg = {
        id: crypto.randomUUID(),
        role: 'student',
        text: qi?.label ?? 'Hjælp mig videre',
        ts: Date.now(),
      }
    } else {
      return
    }

    const baseMessages = options.skipUserMessage ? messages : [...messages, userMsg]
    if (!options.skipUserMessage) {
      setMessages(baseMessages)
      setDraft('')
    }
    // Eleven sendte en besked → de er aktivt engageret, genaktivér follow mode
    followBottomRef.current = true
    setShowScrollToBottom(false)
    setThinking(true)

    try {
      const reply = await getMentorReply({
        message: options.messageOverride ?? userMsg.text,
        intent,
        profileId: profile.id,
        profile,
        user,
        pinnedSubjectId: null,
        history: baseMessages,
        curriculum,
      })
      const aiMsg = {
        id: crypto.randomUUID(),
        role: 'ai',
        intent: reply.intent,
        text: reply.text,
        followUp: reply.followUp,
        crossProfile: reply.crossProfile ?? null,
        source: reply.source,
        ts: Date.now(),
      }
      setMessages(m => [...m, aiMsg])
    } catch (err) {
      console.error('Chat-fejl', err)
      setMessages(m => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'ai',
          intent: 'explain',
          text: 'Jeg kunne ikke generere et svar lige nu. Prøv igen.',
          followUp: null,
          ts: Date.now(),
        },
      ])
    } finally {
      setThinking(false)
    }
  }

  async function regenerateLast() {
    // Find sidste elev-besked
    const lastStudentIdx = [...messages].reverse().findIndex(m => m.role === 'student')
    if (lastStudentIdx === -1) return
    const realIdx = messages.length - 1 - lastStudentIdx
    const lastStudent = messages[realIdx]

    // Drop alle AI-beskeder efter den (typisk én)
    const trimmed = messages.slice(0, realIdx + 1)
    setMessages(trimmed)

    // Regenerate er eksplicit handling — følg ned til det nye svar
    followBottomRef.current = true
    setShowScrollToBottom(false)
    setThinking(true)
    try {
      const reply = await getMentorReply({
        message: `${lastStudent.text}\n\n(Prøv venligst at forklare det fra en lidt anden vinkel)`,
        profileId: profile.id,
        profile,
        user,
        history: trimmed,
        curriculum,
      })
      const aiMsg = {
        id: crypto.randomUUID(),
        role: 'ai',
        intent: reply.intent,
        text: reply.text,
        followUp: reply.followUp,
        crossProfile: reply.crossProfile ?? null,
        source: reply.source,
        ts: Date.now(),
      }
      setMessages(m => [...m, aiMsg])
      showToast('Nyt svar genereret')
    } catch {
      setMessages(messages) // restore
      showToast('Kunne ikke regenerere')
    } finally {
      setThinking(false)
    }
  }

  /* ---------------- Copy / reaction / export ---------------- */
  function copyMessage(message) {
    const clean = stripMarkdown(message.text)
    if (!navigator.clipboard) {
      showToast('Clipboard ikke tilgængelig')
      return
    }
    navigator.clipboard
      .writeText(clean)
      .then(() => showToast('Kopieret til udklipsholder'))
      .catch(() => showToast('Kunne ikke kopiere'))
  }

  function setReaction(messageId, reaction) {
    setMessages(ms =>
      ms.map(m =>
        m.id === messageId
          ? { ...m, reaction: m.reaction === reaction ? null : reaction }
          : m,
      ),
    )
    showToast(reaction === 'up' ? 'Tak for feedback' : 'Vi noterer det')
  }

  function exportChat() {
    if (!messages.length) return
    const md = exportChatAsMarkdown({ messages, user, profile })
    const stamp = new Date().toISOString().slice(0, 10)
    downloadAsFile(md, `chat-${profile.id}-${stamp}.md`, 'text/markdown')
    showToast('Chat eksporteret')
  }

  function reset() {
    if (!profile?.id || !user?.id) return
    if (!confirm('Slet hele din chat og start forfra?')) return
    clearChat(user.id, profile.id)
    setMessages([buildWelcomeMessage(profile, user)])
  }

  /* ---------------- Render ---------------- */
  const subjectsForProfile =
    curriculum?.subjects?.filter(s => s.profil === profile.id)
      ?? getSubjectsForProfileFallback(profile.id)

  // Find ID på sidste AI-besked — kun den må vise regenerér-knappen
  const lastAiId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'ai') return messages[i].id
    }
    return null
  })()

  // Gestalt Proximity + Similarity + Continuation: opdel beskeder i klumper
  // af samme afsender med tids-dividere mellem dage. Inde i en gruppe får
  // beskederne mindre afstand til hinanden, og kun den sidste besked viser
  // hover-actions (kopiér/tommel/regenerér).
  const groupedItems = groupMessages(messages)

  return (
    <section
      className="ai-region flex flex-col h-full min-h-0 overflow-hidden font-sans relative"
      aria-label="AI-samtale"
    >
      {/* Header */}
      <header className="shrink-0 px-5 py-3 border-b border-uvm-border flex items-center gap-3 bg-white">
        <span
          className="h-9 w-9 rounded-lg grid place-items-center text-white shrink-0"
          style={{ backgroundColor: profile.accent }}
          aria-hidden="true"
        >
          <Sparkles size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading font-semibold text-base leading-tight">
            Din AI-vejleder
          </h2>
          <p className="text-c1 text-uvm-muted truncate">
            Forklarer direkte og forankret — løser ikke konkrete opgaver for dig
          </p>
        </div>
        <HeaderButton
          icon={Download}
          label="Eksportér chat som Markdown"
          onClick={exportChat}
          disabled={messages.length <= 1}
        />
        <HeaderButton
          icon={RotateCcw}
          label="Nulstil samtale"
          onClick={reset}
          disabled={!messages.length}
        />
      </header>

      {/* Besked-liste — Gestalt Proximity (grupperede klumper) + Continuation (dividere) */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-6 scroll-smooth"
        aria-live="polite"
        aria-relevant="additions"
      >
        {groupedItems.map(item => {
          if (item.type === 'divider') {
            return <DateDivider key={`d-${item.key}`} label={item.label} />
          }
          // item.type === 'group' — render alle beskeder med tæt indre spacing
          return (
            <MessageGroup key={`g-${item.messages[0].id}`} role={item.role}>
              {item.messages.map((m, idx) => {
                const isLastInGroup = idx === item.messages.length - 1
                return (
                  <Message
                    key={m.id}
                    message={m}
                    isLastInGroup={isLastInGroup}
                    isLastAi={m.id === lastAiId && isLastInGroup}
                    canRegenerate={!thinking}
                    onSwitchProfile={target => {
                      if (target && profiles?.[target]) setProfile(target)
                    }}
                    onClarifyPick={(text) => send(null, text)}
                    onCopy={() => copyMessage(m)}
                    onReact={r => setReaction(m.id, r)}
                    onRegenerate={regenerateLast}
                    profileSubjects={subjectsForProfile}
                  />
                )
              })}
            </MessageGroup>
          )
        })}
        <AnimatePresence>{thinking && <ThinkingIndicator />}</AnimatePresence>
      </div>

      {/* Floating scroll-to-bottom */}
      <AnimatePresence>
        {showScrollToBottom && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => scrollToBottom()}
            className="absolute right-5 bottom-44 h-10 w-10 rounded-full bg-uvm-primary text-white
                       shadow-lift grid place-items-center hover:opacity-95 z-10"
            aria-label="Scroll til nyeste besked"
          >
            <ArrowDown size={18} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick intents — sætter teksten i input'et (sender IKKE).
          Eleven kan udvide/redigere før de selv trykker ↵. */}
      <div className="shrink-0 px-5 pt-3 pb-2 border-t border-uvm-border bg-uvm-neutral/60">
        <p className="text-c1 text-uvm-muted mb-2">
          Forslag — klik for at sætte i feltet, redigér evt., tryk ↵ for at sende
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_INTENTS.map(qi => {
            const Icon = qi.icon
            return (
              <button
                key={qi.id}
                type="button"
                onClick={() => pasteToInput(qi.label)}
                disabled={thinking}
                aria-label={`Indsæt forslag: ${qi.label}`}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-uvm-border
                           px-3 py-1.5 text-sm font-medium hover:accent-bg-soft transition-colors
                           disabled:opacity-50"
              >
                <Icon size={14} aria-hidden="true" />
                {qi.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Input — auto-resize */}
      <form
        className="shrink-0 px-5 py-4 border-t border-uvm-border bg-white"
        onSubmit={e => {
          e.preventDefault()
          send()
        }}
      >
        <label htmlFor="socratic-input" className="sr-only">
          Stil et spørgsmål
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id="socratic-input"
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            rows={2}
            placeholder="Spørg mig om metoden bag din opgave..."
            disabled={thinking}
            className="flex-1 resize-none rounded-lg border border-uvm-border bg-white px-3 py-2
                       text-sm leading-7 placeholder:text-uvm-muted overflow-y-auto
                       focus:outline-none focus:border-transparent focus:accent-ring
                       disabled:bg-uvm-neutral disabled:opacity-70"
            style={{ maxHeight: '224px' }}
          />
          <button
            type="submit"
            disabled={thinking || !draft.trim()}
            className="btn-accent h-10 w-10 !p-0 rounded-lg shrink-0"
            aria-label="Send besked"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-c1 text-uvm-muted">
          Tryk <kbd className="rounded bg-uvm-neutral px-1.5 py-0.5 text-[10px] font-mono">↵</kbd> for at sende,
          {' '}<kbd className="rounded bg-uvm-neutral px-1.5 py-0.5 text-[10px] font-mono">Shift+↵</kbd> for ny linje
        </p>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-44 z-20
                       bg-uvm-primary text-white rounded-full px-4 py-2 text-sm font-medium shadow-lift
                       inline-flex items-center gap-2 pointer-events-none"
            role="status"
          >
            <Check size={14} aria-hidden="true" />
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* -------------------------------------------------------------
   Underkomponenter
   ------------------------------------------------------------- */

/**
 * MessageGroup — visuelt indrammer en klump af på-hinanden-følgende
 * beskeder fra samme afsender. Tæt indre spacing (space-y-1) signalerer
 * "disse hører sammen" jf. Gestalt Proximity. Justeringen til venstre/højre
 * bibeholdes så afsenderen visuelt er entydig (Similarity).
 */
function MessageGroup({ role, children }) {
  const isAi = role === 'ai'
  return (
    <div
      className={`flex flex-col gap-1 ${isAi ? 'items-start' : 'items-end'}`}
      role="group"
      aria-label={isAi ? 'Svar fra vejleder' : 'Din besked'}
    >
      {children}
    </div>
  )
}

/**
 * DateDivider — tids-markør mellem klumper jf. Gestalt Continuation
 * og Closure. To horisontale linjer der "lukker sig om" labelen skaber
 * en visuelt komplet ramme uden at være en hård sektion.
 */
function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1" aria-label={label}>
      <span className="flex-1 h-px bg-uvm-border" aria-hidden="true" />
      <span className="text-c1 text-uvm-muted font-medium uppercase tracking-wide">
        {label}
      </span>
      <span className="flex-1 h-px bg-uvm-border" aria-hidden="true" />
    </div>
  )
}

function HeaderButton({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-uvm-muted hover:bg-uvm-neutral
                 disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  )
}

function Message({
  message,
  isLastInGroup,
  isLastAi,
  canRegenerate,
  onSwitchProfile,
  onClarifyPick,
  onCopy,
  onReact,
  onRegenerate,
  profileSubjects = [],
}) {
  const isAi = message.role === 'ai'

  if (isAi && message.intent === 'cross_profile') {
    return <CrossProfileMessage message={message} onSwitchProfile={onSwitchProfile} onCopy={onCopy} />
  }
  if (isAi && message.intent === 'clarify') {
    return (
      <ClarifyMessage
        message={message}
        profileSubjects={profileSubjects}
        onPick={onClarifyPick}
      />
    )
  }

  // CRAP Repetition + Gestalt Similarity:
  //   - Bobler i samme klump deler radius-mønster, men hjørnerne tilpasses
  //     så de visuelt "klæber" sammen (skarpere indre-hjørner).
  //   - Sidste boble i klumpen får alle hjørner runde + "hale"-form.
  // Det er det samme princip iMessage/WhatsApp bruger til at vise gruppering.
  const cornerStyle = isAi
    ? isLastInGroup ? 'rounded-2xl rounded-bl-md' : 'rounded-2xl rounded-bl-md rounded-tl-md'
    : isLastInGroup ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-br-md rounded-tr-md'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`group w-full flex ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[80%] flex flex-col gap-1.5 ${isAi ? 'items-start' : 'items-end'}`}>
        <div
          className={[
            cornerStyle,
            'px-4 py-3 text-[15px] leading-7 shadow-card font-sans',
            isAi ? 'bg-white border border-uvm-border text-uvm-ink' : 'accent-bg text-white',
          ].join(' ')}
        >
          {isAi ? (
            <MessageContent>{message.text}</MessageContent>
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
          {isAi && message.followUp && (
            <p className="mt-2 text-c1 text-uvm-muted italic">
              <span className="not-italic font-semibold text-uvm-ink/80">Refleksion: </span>
              {message.followUp}
            </p>
          )}
        </div>

        {/* Hover-actions — vises KUN på den sidste besked i klumpen
            (CRAP Proximity: handlinger hører til den nyeste besked, ikke alle) */}
        {message.id !== 'welcome' && isLastInGroup && (
          <div
            className={[
              'flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100',
              'transition-opacity text-uvm-muted',
              isAi ? '' : 'flex-row-reverse',
            ].join(' ')}
          >
            <MessageActionButton icon={Copy} label="Kopiér besked" onClick={onCopy} />
            {isAi && (
              <>
                <MessageActionButton
                  icon={ThumbsUp}
                  label="Hjælpsomt svar"
                  active={message.reaction === 'up'}
                  onClick={() => onReact('up')}
                />
                <MessageActionButton
                  icon={ThumbsDown}
                  label="Ikke hjælpsomt"
                  active={message.reaction === 'down'}
                  onClick={() => onReact('down')}
                />
                {isLastAi && (
                  <MessageActionButton
                    icon={RefreshCw}
                    label="Generér nyt svar"
                    onClick={onRegenerate}
                    disabled={!canRegenerate}
                  />
                )}
              </>
            )}
            <span
              className="text-c1 text-uvm-muted/80 ml-1"
              title={new Date(message.ts ?? Date.now()).toLocaleString('da-DK')}
            >
              {formatRelativeTime(message.ts)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function MessageActionButton({ icon: Icon, label, onClick, active = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={[
        'rounded-md p-1 hover:bg-uvm-neutral transition-colors',
        active ? 'accent-text' : '',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].join(' ')}
    >
      <Icon size={13} aria-hidden="true" />
    </button>
  )
}

function CrossProfileMessage({ message, onSwitchProfile, onCopy }) {
  const otherProfile = message.crossProfile
  const otherLabel = otherProfile ? otherProfile.toUpperCase() : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex justify-start"
    >
      <div className="max-w-[88%] w-full flex flex-col gap-1.5">
        <div
          className="rounded-2xl shadow-card border-2 overflow-hidden font-sans"
          style={{ borderColor: 'var(--uvm-cta, #E31B23)', backgroundColor: '#FFF7F7' }}
          role="alert"
        >
          <header className="flex items-center gap-2 px-4 py-2.5 bg-uvm-cta text-white">
            <AlertTriangle size={16} aria-hidden="true" />
            <span className="font-heading font-semibold text-sm">
              Profil-spærring — Undervisningsministeriet
            </span>
          </header>
          <div className="p-4 text-uvm-ink text-[15px] leading-7">
            <p>{message.text}</p>
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              {otherProfile && (
                <button
                  type="button"
                  onClick={() => onSwitchProfile(otherProfile)}
                  className="btn-primary"
                >
                  Skift til {otherLabel}-profil
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
              <span className="text-c1 text-uvm-muted">
                Eller brug profil-vælgeren øverst til højre ↗
              </span>
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageActionButton icon={Copy} label="Kopiér besked" onClick={onCopy} />
        </div>
      </div>
    </motion.div>
  )
}

function ClarifyMessage({ message, profileSubjects, onPick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start"
    >
      <div
        className="max-w-[88%] w-full rounded-2xl shadow-card border-2 overflow-hidden font-sans"
        style={{ borderColor: 'var(--profile-accent)', backgroundColor: 'var(--profile-accent-soft)' }}
      >
        <header className="flex items-center gap-2 px-4 py-2.5 accent-bg text-white">
          <Info size={16} aria-hidden="true" />
          <span className="font-heading font-semibold text-sm">
            Faglig validering — vælg fag og niveau
          </span>
        </header>
        <div className="p-4 text-uvm-ink text-[15px] leading-7 bg-white">
          <p>{message.text}</p>
          {profileSubjects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profileSubjects.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    onPick(`Jeg arbejder med ${s.titel} på ${s.niveau}-niveau`)
                  }
                  className="rounded-full border border-uvm-border bg-white hover:accent-bg-soft
                             px-2.5 py-1 text-c1 font-medium"
                >
                  {s.titel} ({s.niveau})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-center gap-3"
      aria-live="polite"
    >
      <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-uvm-border px-4 py-3">
        <Dot delay={0} />
        <Dot delay={0.15} />
        <Dot delay={0.3} />
        <span className="ml-2 text-c1 text-uvm-muted">Vejlederen tænker…</span>
      </div>
    </motion.div>
  )
}

function Dot({ delay }) {
  return (
    <motion.span
      className="block h-2 w-2 rounded-full"
      style={{ backgroundColor: 'var(--profile-accent)' }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.1, repeat: Infinity, delay }}
      aria-hidden="true"
    />
  )
}

function buildWelcomeMessage(profile, user) {
  const name = user?.name?.split(' ')?.[0] ?? 'der'
  return {
    id: 'welcome',
    role: 'ai',
    intent: 'explain',
    text:
      `Hej ${name}, velkommen. Jeg er din AI-vejleder, og jeg kan svare på spørgsmål inden for ` +
      `hele dit gymnasieforløb — fra **definitioner** og **formler** til **metoder** og **eksempler**.\n\n` +
      `Stil dit spørgsmål med dine egne ord, så griber jeg det og forklarer det forankret i den officielle læreplan.`,
    followUp: 'Hvad arbejder du med lige nu?',
    source: 'rules',
    ts: Date.now(),
  }
}
