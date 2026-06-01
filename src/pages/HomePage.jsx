import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  FileText,
  FlaskConical,
  Lightbulb,
  MessageCircle,
  Sigma,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { getAiBackend } from '../lib/ai/aiClient.js'
import { loadChat } from '../lib/storage/chatHistory.js'
import { ScrollContainer } from '../components/Layout.jsx'

/**
 * HomePage — landings-siden efter login.
 */

export default function HomePage() {
  const { user } = useAuth()
  const { profile } = useTheme()
  const firstName = user?.name?.split(' ')[0] ?? 'elev'
  const aiBackend = getAiBackend()

  const chat = loadChat(user?.id, profile.id)
  const recentMessages = chat.messages.slice(-3).reverse()

  return (
    <ScrollContainer>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="ai-region overflow-hidden relative"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${profile.accent} 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-c1 text-uvm-muted">
                {greeting()}, {profile.label} {profile.name}
              </p>
              <h1 className="font-heading text-h1 mt-1 leading-tight">
                Velkommen, {firstName}.
              </h1>
              <p className="mt-3 text-uvm-muted max-w-xl leading-7">
                Stil dit spørgsmål med dine egne ord — uanset om det handler om
                en definition, en formel, en metode eller en analyse. Din
                vejleder forklarer direkte og forankret i den officielle læreplan.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 items-center">
                <Link to="/chat" className="btn-accent">
                  <MessageCircle size={16} aria-hidden="true" />
                  {recentMessages.length > 0 ? 'Fortsæt chatten' : 'Åbn chatten'}
                </Link>
                <span className="text-c1 text-uvm-muted ml-2">
                  AI-motor:{' '}
                  <strong className="text-uvm-ink font-semibold">
                    {aiBackend === 'rules' ? 'regelbaseret (lokal)' : aiBackend}
                  </strong>
                </span>
              </div>
            </div>
            <div className="shrink-0 hidden sm:block">
              <div
                className="h-24 w-24 rounded-2xl grid place-items-center"
                style={{ backgroundColor: profile.accentSoft, color: profile.accentInk }}
                aria-hidden="true"
              >
                <Sparkles size={36} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recent chat preview */}
        {recentMessages.length > 0 && (
          <section>
            <header className="flex items-end justify-between mb-3">
              <div>
                <h2 className="font-heading text-h2">Sidste i chatten</h2>
                <p className="text-c1 text-uvm-muted">
                  Fortsæt hvor du slap
                </p>
              </div>
              <Link
                to="/chat"
                className="text-c1 text-uvm-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Åbn chat <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </header>
            <div className="ai-region p-4 space-y-2">
              {recentMessages.map(m => (
                <div key={m.id} className="flex gap-3">
                  <span
                    className={[
                      'shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full text-c1 font-semibold',
                      m.role === 'ai'
                        ? 'accent-bg-soft accent-text'
                        : 'bg-uvm-primary text-white',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {m.role === 'ai' ? 'AI' : (user?.name?.[0] ?? 'U').toUpperCase()}
                  </span>
                  <p className="text-sm text-uvm-ink/85 line-clamp-2 flex-1 min-w-0">
                    {stripMarkdown(m.text).slice(0, 240)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suggested prompts — Gestalt Similarity (alle kort følger samme
            anatomi: ikon · kategori · prompt-tekst · CTA) +
            CRAP Alignment (grid med ens højde + venstre-kant alle kort deler) */}
        {recentMessages.length === 0 && (
          <section>
            <header className="mb-3">
              <h2 className="font-heading text-h2">Eksempler du kan spørge om</h2>
              <p className="text-c1 text-uvm-muted mt-0.5">
                Klik et eksempel for at åbne chatten — eller skriv dit eget
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
              {SUGGESTED_PROMPTS.map((prompt, i) => {
                const Icon = prompt.icon
                return (
                  <Link
                    key={i}
                    to="/chat"
                    className="ai-region p-4 hover:shadow-lift hover:-translate-y-0.5
                               transition-all duration-150 group block focus-visible:outline-none"
                  >
                    <div className="flex items-start gap-3 h-full">
                      <span
                        className="shrink-0 h-9 w-9 rounded-lg grid place-items-center
                                   accent-bg-soft accent-text"
                        aria-hidden="true"
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1 flex flex-col">
                        <p className="text-c1 text-uvm-muted uppercase tracking-wide font-medium">
                          {prompt.category}
                        </p>
                        <p className="text-sm text-uvm-ink leading-6 mt-0.5">
                          {prompt.text}
                        </p>
                        <p className="mt-auto pt-2 text-c1 accent-text inline-flex items-center gap-1
                                       opacity-60 group-hover:opacity-100 transition-opacity">
                          Spørg vejlederen
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-0.5 transition-transform"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </ScrollContainer>
  )
}

/**
 * SUGGESTED_PROMPTS — hver entry er en TRIO af ikon, kategori og tekst.
 * Gestalt Similarity: alle prompts deler samme anatomi → eleven scanner
 * dem hurtigt fordi øjet kender mønstret.
 * CRAP Contrast: kategori-tag (lille, caps, muted) vs. prompt-tekst
 * (større, ink) skaber tydeligt informationshierarki inde i hvert kort.
 */
const SUGGESTED_PROMPTS = [
  { icon: FileText,     category: 'Definition',   text: 'Forklar Toulmin-modellen' },
  { icon: Sigma,        category: 'Formel',       text: 'Hvad er en andengradsligning?' },
  { icon: Compass,      category: 'Metode',       text: 'Hvordan laver jeg en kildekritik?' },
  { icon: Lightbulb,    category: 'Eksempel',     text: 'Forklar SWOT-analysen med et eksempel' },
  { icon: FlaskConical, category: 'Begreb',       text: 'Hvad er forskellen på beretning og levn?' },
  { icon: Sigma,        category: 'Metode',       text: 'Hvordan finder jeg ekstrema med differentialregning?' },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'God nat'
  if (h < 10) return 'Godmorgen'
  if (h < 12) return 'God formiddag'
  if (h < 18) return 'God eftermiddag'
  return 'God aften'
}

function stripMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\$\$[^$]+\$\$/g, '[formel]')
    .replace(/\$[^$]+\$/g, '[formel]')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
}
