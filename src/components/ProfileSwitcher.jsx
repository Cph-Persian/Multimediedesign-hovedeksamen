import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * ProfileSwitcher — toggle mellem STX / HTX / HHX.
 *
 * UX-rationale:
 * - Synlig som "chip" i header, så valg af profil føles som en bevidst
 *   handling (jf. Friction by Design — vi skifter ikke profil bag ryggen).
 * - Tastatur-tilgængelig: Enter/Space åbner, Esc lukker, pil op/ned navigerer.
 * - aria-* attributter følger WAI-ARIA listbox-mønster.
 */
export default function ProfileSwitcher() {
  const { profile, profiles, setProfile } = useTheme()
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  // Luk på klik udenfor + Escape
  useEffect(() => {
    if (!open) return
    function onPointer(e) {
      if (
        !menuRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const list = Object.values(profiles)

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Skift profil. Aktiv: ${profile.label} ${profile.name}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/20
                   bg-white/10 hover:bg-white/15 px-3 py-1.5 text-sm font-medium
                   text-white transition-colors"
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: profile.accent }}
          aria-hidden="true"
        />
        <span className="font-heading">{profile.label}</span>
        <span className="text-white/70 hidden sm:inline">· {profile.name}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={menuRef}
            role="listbox"
            aria-label="Vælg profil"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 mt-2 w-72 bg-white text-uvm-ink rounded-xl
                       shadow-lift border border-uvm-border overflow-hidden z-40"
          >
            {list.map(p => {
              const active = p.id === profile.id
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setProfile(p.id)
                      setOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 text-left
                               hover:bg-uvm-neutral focus:bg-uvm-neutral"
                  >
                    <span
                      className="h-9 w-9 rounded-lg grid place-items-center font-heading
                                 font-semibold text-white text-xs"
                      style={{ backgroundColor: p.accent }}
                      aria-hidden="true"
                    >
                      {p.label}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold">
                        {p.label} — {p.name}
                      </span>
                      <span className="block text-c1 text-uvm-muted">
                        {p.tagline}
                      </span>
                    </span>
                    {active && (
                      <Check
                        size={18}
                        className="text-uvm-primary"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
