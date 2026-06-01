/**
 * ThemeContext — bærer den aktive profil (STX/HTX/HHX) på tværs af appen.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * PROFILES — vores tre uddannelsesretninger med tilhørende metadata.
 * Hver profil har: id, label, name (dansk navn), tagline, accent-farver
 * og Tailwind-klasse-aliasser. Bemærk at accent-farverne matcher styletilen.
 */
export const PROFILES = {
  stx: {
    id: 'stx', label: 'STX', name: 'Almen', tagline: 'Almen studentereksamen',
    accent: '#3B82F6', accentSoft: '#DBEAFE', accentInk: '#1E3A8A',
    bg: 'bg-stx', bgSoft: 'bg-stx-soft', text: 'text-stx',
    textInk: 'text-stx-ink', border: 'border-stx', ring: 'ring-stx',
  },
  htx: {
    id: 'htx', label: 'HTX', name: 'Teknisk', tagline: 'Teknisk studentereksamen',
    accent: '#14B8A6', accentSoft: '#CCFBF1', accentInk: '#115E59',
    bg: 'bg-htx', bgSoft: 'bg-htx-soft', text: 'text-htx',
    textInk: 'text-htx-ink', border: 'border-htx', ring: 'ring-htx',
  },
  hhx: {
    id: 'hhx', label: 'HHX', name: 'Merkantil', tagline: 'Højere handelseksamen',
    accent: '#1E40AF', accentSoft: '#DBEAFE', accentInk: '#1E3A8A',
    bg: 'bg-hhx', bgSoft: 'bg-hhx-soft', text: 'text-hhx',
    textInk: 'text-hhx-ink', border: 'border-hhx', ring: 'ring-hhx',
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children, defaultProfile = 'stx' }) {
  const [profileId, setProfileId] = useState(defaultProfile)

  // Slå profil-data op. '?? PROFILES.stx' er en defensive guard:
  // hvis nogen sender et ugyldigt id, falder vi tilbage til STX.
  const profile = PROFILES[profileId] ?? PROFILES.stx

  // ▸▸ DETTE ER KERNEN AF "TEMA-SKIFT UDEN REFRESH" ◂◂
  // Effekten kører hver gang 'profile' ændrer sig. Den skriver CSS-
  // variabler direkte på <html>-elementet, hvilket kaskader til ALT
  // hvad der bruger var(--profile-accent) i index.css. Brugeren ser
  // hele UI'et skifte farve i én flydende bevægelse.
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--profile-accent', profile.accent)
    root.style.setProperty('--profile-accent-soft', profile.accentSoft)
    root.style.setProperty('--profile-accent-ink', profile.accentInk)
    // data-attribut så vi i CSS kan ramme [data-profile="stx"] hvis nødvendigt
    root.setAttribute('data-profile', profile.id)
  }, [profile])

  // useMemo: cache value-objektet (samme princip som AuthContext)
  const value = useMemo(
    () => ({ profile, profileId, setProfile: setProfileId, profiles: PROFILES }),
    [profile, profileId],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme skal bruges inde i en <ThemeProvider>')
  return ctx
}
