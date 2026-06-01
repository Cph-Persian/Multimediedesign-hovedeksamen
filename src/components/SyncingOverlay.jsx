import { motion } from 'framer-motion'
import { AlertTriangle, Database, GraduationCap, Loader2 } from 'lucide-react'
import { useCurriculum } from '../context/CurriculumContext.jsx'
import { FALLBACK_TEXT } from '../lib/api/apiService.js'

/**
 * SyncingOverlay — boot-splash mens vi henter pensum-data.
 */

export default function SyncingOverlay({ onContinueWithStaleData }) {
  const { status, error, retry } = useCurriculum()

  if (status === 'ready') return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-uvm-primary grid place-items-center p-6"
      role="status"
      aria-live="polite"
    >
      <div className="text-white text-center max-w-md">
        {/* Brand */}
        <div className="inline-flex items-center gap-3 mb-8 opacity-90">
          <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center" aria-hidden="true">
            <GraduationCap size={26} />
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold text-base leading-tight">
              Ministeriets AI-Platform
            </p>
            <p className="text-xs text-white/70">Undervisningsministeriet</p>
          </div>
        </div>

        {status === 'loading' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              className="inline-flex items-center justify-center mb-5"
              aria-hidden="true"
            >
              <Loader2 size={32} className="text-white/90" />
            </motion.div>
            <h2 className="font-heading text-xl font-semibold">
              Synkroniserer med UVM 2026-database
            </h2>
            <p className="mt-2 text-white/75 text-sm leading-6">
              Henter den seneste pensum-data fra Undervisningsministeriet,
              så vejlederen svarer baseret på den gældende læreplan.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-c1 text-white/60">
              <Database size={12} aria-hidden="true" />
              <span>curriculum-2026.json</span>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-uvm-cta/20 mb-4">
              <AlertTriangle size={24} className="text-uvm-cta" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              Forbindelsen fejlede
            </h2>
            <p className="mt-3 text-white/85 leading-7">{FALLBACK_TEXT}</p>
            {error?.message && (
              <p className="mt-2 text-c1 text-white/50">
                ({error.code ?? 'ERROR'}: {error.message.slice(0, 120)})
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button type="button" onClick={retry} className="btn-accent">
                Prøv igen
              </button>
              {onContinueWithStaleData && (
                <button
                  type="button"
                  onClick={onContinueWithStaleData}
                  className="rounded-lg px-4 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/20"
                >
                  Fortsæt uden frisk pensum
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
