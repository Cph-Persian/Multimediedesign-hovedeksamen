/**
 * AuthContext — bærer "hvem er logget ind?" på tværs af appen.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getSession,
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
  updateProfile as updateUserProfile,
} from '../lib/auth/localAuth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // 'hydrated' starter som false. Først efter vi har checket localStorage
  // i useEffect nedenfor sættes den til true. Det forhindrer flash-of-
  // login-screen for logged-in brugere ved refresh.
  const [hydrated, setHydrated] = useState(false)

  // Ved mount: hent sessionen fra localStorage og hydrér state'en.
  // Effekten kører kun ÉN gang (tomt dependency-array).
  useEffect(() => {
    setUser(getSession())
    setHydrated(true)
  }, [])

  // Hver af disse async-funktioner gør 2 ting:
  //   1. Kalder den underliggende localAuth-funktion (skriver localStorage)
  //   2. Opdaterer React-state'en så UI'et reagerer øjeblikkeligt
  async function register(payload) {
    const res = await registerUser(payload)
    if (res.ok) setUser(res.user)
    return res
  }

  async function login(payload) {
    const res = await loginUser(payload)
    if (res.ok) setUser(res.user)
    return res
  }

  function logout() {
    logoutUser()
    setUser(null)
  }

  function updateProfile(patch) {
    if (!user) return { ok: false }
    const res = updateUserProfile(user.id, patch)
    if (res.ok) setUser(res.user)
    return res
  }

  // useMemo: cache value-objektet. Uden det ville alle forbrugere
  // re-render hver gang AuthProvider rendrer (også uden user-skift).
  const value = useMemo(
    () => ({ user, hydrated, register, login, logout, updateProfile }),
    [user, hydrated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth — den hook ALLE komponenter bruger til at læse auth-state.
 *
 * "throw" hvis Provider mangler er en defensive guard — så fejler vi
 * tydeligt i development hvis vi glemmer at wrappe et komponent-træ.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth skal bruges inde i en <AuthProvider>')
  return ctx
}
