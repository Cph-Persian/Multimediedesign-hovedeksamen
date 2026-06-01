import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  X,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ProfileSwitcher from './ProfileSwitcher.jsx'

/**
 * Layout — overordnet ramme for hele platformen efter login.
 */

const NAV_ITEMS = [
  { to: '/',              label: 'Forside',       icon: Home,           end: true },
  { to: '/chat',          label: 'Chat',          icon: MessageCircle,  end: false },
  { to: '/indstillinger', label: 'Indstillinger', icon: Settings,       end: false },
]

export default function Layout({ children }) {
  const { profile, setProfile } = useTheme()
  const { user } = useAuth()
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Synkronisér tema med brugerens profil ved login/første mount
  useEffect(() => {
    if (user?.profil && user.profil !== profile.id) {
      setProfile(user.profil)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  // Luk mobil-drawer ved route-skift
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-uvm-neutral">
      <a href="#main" className="skip-link">Spring til hovedindhold</a>

      {/* Header — shrink-0 så den ikke skubbes af content */}
      <header
        className="shrink-0 h-16 z-30 bg-uvm-primary text-white border-b border-black/10"
        role="banner"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 h-full flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-white/10"
            aria-label={mobileNavOpen ? 'Luk menu' : 'Åbn menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(v => !v)}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-3 min-w-0 hover:opacity-90">
            <div
              className="h-9 w-9 rounded-lg grid place-items-center bg-white/10"
              aria-hidden="true"
            >
              <GraduationCap size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold leading-tight truncate">
                Ministeriets AI-Platform
              </p>
              <p className="text-[11px] text-white/70 leading-tight truncate">
                Undervisningsministeriet · {profile.tagline}
              </p>
            </div>
          </Link>

          <div className="flex-1" />

          <ProfileSwitcher />
          <UserMenu />
        </div>
      </header>

      {/* Row — flex-1 + min-h-0 er kritisk for at overflow virker korrekt */}
      <div className="flex-1 min-h-0 mx-auto w-full max-w-[1400px] flex">
        {/* Sidebar — desktop */}
        <aside
          className="hidden lg:flex w-60 shrink-0 border-r border-uvm-border bg-white flex-col h-full"
          aria-label="Hovednavigation"
        >
          <nav className="p-3 flex flex-col gap-1 overflow-y-auto" role="navigation">
            {NAV_ITEMS.map(item => (
              <SidebarLink key={item.to} item={item} />
            ))}
          </nav>
          <div className="mt-auto p-3 shrink-0">
            <ProfileBadge />
          </div>
        </aside>

        {/* Sidebar — mobil drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.aside
              initial={{ x: -240, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -240, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed inset-y-16 left-0 z-20 w-64 bg-white border-r border-uvm-border lg:hidden flex flex-col shadow-lift"
              aria-label="Hovednavigation"
            >
              <nav className="p-3 flex flex-col gap-1 overflow-y-auto">
                {NAV_ITEMS.map(item => (
                  <SidebarLink key={item.to} item={item} />
                ))}
              </nav>
              <div className="mt-auto p-3 shrink-0">
                <ProfileBadge />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main — overflow-hidden, sider styrer selv evt. scroll */}
        <main
          id="main"
          className="flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

/**
 * ScrollContainer — wrapper til content-sider (Forside, Fag, Læringskort,
 * Indstillinger). Giver intern scroll uden at body eller main scroller.
 *
 * Brug:
 *   <Layout>
 *     <ScrollContainer>...sidens indhold...</ScrollContainer>
 *   </Layout>
 *
 * Chat-siden bruger den IKKE — den fylder hele <main> direkte og lader
 * besked-listen være den eneste scrollende region.
 */
export function ScrollContainer({ children, className = '' }) {
  return (
    <div className={`flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------
   Underkomponenter
   ------------------------------------------------------------- */

function SidebarLink({ item }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
          'transition-colors duration-150',
          isActive
            ? 'accent-bg-soft accent-text'
            : 'text-uvm-ink hover:bg-uvm-neutral',
        ].join(' ')
      }
    >
      <Icon size={18} aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  )
}

function ProfileBadge() {
  const { profile } = useTheme()
  const { user } = useAuth()
  return (
    <div className="rounded-lg border border-uvm-border p-3 bg-uvm-neutral">
      <p className="text-c1 text-uvm-muted">Aktiv profil</p>
      <div className="mt-1 flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: profile.accent }}
          aria-hidden="true"
        />
        <p className="font-heading font-semibold text-sm">
          {profile.label} · {profile.name}
        </p>
      </div>
      {user?.year && (
        <p className="text-c1 text-uvm-muted mt-1">{user.year}.g</p>
      )}
    </div>
  )
}

function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onPointer(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!user) return null
  const initials = user.name
    .split(/\s+/)
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Brugermenu for ${user.name}`}
        className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center
                   font-heading font-semibold text-sm text-white"
      >
        {initials || '?'}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.14 }}
          role="menu"
          className="absolute right-0 mt-2 w-64 bg-white text-uvm-ink rounded-xl
                     shadow-lift border border-uvm-border overflow-hidden z-40"
        >
          <div className="p-3 border-b border-uvm-border">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <p className="text-c1 text-uvm-muted truncate">{user.email}</p>
          </div>
          <Link
            to="/indstillinger"
            role="menuitem"
            className="block px-3 py-2 text-sm hover:bg-uvm-neutral"
            onClick={() => setOpen(false)}
          >
            Indstillinger
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm hover:bg-uvm-neutral text-uvm-cta inline-flex items-center gap-2"
          >
            <LogOut size={14} aria-hidden="true" />
            Log ud
          </button>
        </motion.div>
      )}
    </div>
  )
}
