/**
 * main.jsx — appens INDGANGSPUNKT.
 */

import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CurriculumProvider, useCurriculum } from './context/CurriculumContext.jsx'
import SyncingOverlay from './components/SyncingOverlay.jsx'
import './index.css'

/**
 * AppShell — sidder mellem provider-træet og selve appen.
 *
 * Hvorfor en separat komponent? Fordi vi vil bruge useCurriculum()-hook'en
 * til at læse fetch-status, og hooks må KUN kaldes inde i en komponent.
 * Vi kunne ikke gøre det direkte i createRoot-kaldet.
 *
 * Mønstret er en klassisk "loading gate": vis splash mens data hentes,
 * vis indholdet når status === 'ready'.
 */
function AppShell() {
  const { status } = useCurriculum()
  // Brugeren kan vælge at fortsætte selv hvis pensum-fetchen fejler.
  // Vi gemmer det valg i lokal state — ikke i localStorage, fordi det
  // skal nulstilles ved næste session.
  const [forceContinue, setForceContinue] = useState(false)
  const showOverlay = !forceContinue && status !== 'ready'

  return (
    <>
      <App />
      <AnimatePresence>
        {showOverlay && (
          <SyncingOverlay onContinueWithStaleData={() => setForceContinue(true)} />
        )}
      </AnimatePresence>
    </>
  )
}

// Rækkefølgen af Providers er VIGTIG: en provider kan kun bruge hooks fra
// providers der ligger UDENFOR den. ThemeContext og AuthContext bruger fx
// curriculum-data hvis det er nødvendigt, så Curriculum skal ligge yderst.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CurriculumProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </ThemeProvider>
    </CurriculumProvider>
  </BrowserRouter>,
)
