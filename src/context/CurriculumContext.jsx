/**
 * CurriculumContext — henter og bærer pensum-data fra mock-API'et.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCurriculum } from '../lib/api/apiService.js'

const CurriculumContext = createContext(null)

export function CurriculumProvider({ children }) {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // async fetch-funktion. Defineret i provideren så retry() kan kalde
  // den igen ved fejl. Den vil ALDRIG kaste — alle fejl fanges og
  // gemmes i error-state'en så UI'et kan reagere.
  async function load() {
    setStatus('loading')
    setError(null)
    try {
      const curriculum = await fetchCurriculum()
      setData(curriculum)
      setStatus('ready')
    } catch (err) {
      console.warn('[CurriculumContext] fetch failed', err)
      setError(err)
      setStatus('error')
    }
  }

  // Initial fetch ved mount. Eslint-kommentaren skyldes at vi bevidst
  // ikke vil køre denne mere end én gang (load er stabil i denne case).
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({ status, data, error, retry: load }),
    [status, data, error],
  )

  return <CurriculumContext.Provider value={value}>{children}</CurriculumContext.Provider>
}

export function useCurriculum() {
  const ctx = useContext(CurriculumContext)
  if (!ctx) throw new Error('useCurriculum skal bruges inde i en <CurriculumProvider>')
  return ctx
}
