import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Loader2, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { user, hydrated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!hydrated) return null
  if (user) {
    const next = location.state?.from ?? '/'
    return <Navigate to={next} replace />
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const res = await login(form)
    setLoading(false)
    if (!res.ok) {
      setErrors(res.errors)
      return
    }
    navigate(location.state?.from ?? '/', { replace: true })
  }

  return (
    <AuthShell title="Log ind" subtitle="Velkommen tilbage til Ministeriets AI-Platform">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="E-mail"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={v => setForm(f => ({ ...f, email: v }))}
          error={errors.email}
          required
        />
        <Field
          label="Adgangskode"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={v => setForm(f => ({ ...f, password: v }))}
          error={errors.password}
          required
        />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
          Log ind
        </button>
      </form>

      <p className="text-c1 text-uvm-muted mt-6 text-center">
        Har du ikke en konto?{' '}
        <Link to="/opret" className="font-semibold text-uvm-primary hover:underline">
          Opret bruger
        </Link>
      </p>
    </AuthShell>
  )
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-uvm-neutral">
      {/* Brand-side */}
      <div className="hidden lg:flex flex-col justify-between bg-uvm-primary text-white p-12">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/15 grid place-items-center">
            <GraduationCap size={22} />
          </div>
          <div>
            <p className="font-heading font-semibold text-base">Undervisningsministeriet</p>
            <p className="text-white/70 text-sm">AI-Platform for gymnasiet</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h1 className="font-heading text-h1 leading-tight">
            En AI der hjælper dig <em className="not-italic text-white/80">med</em> at lære —
            ikke <em className="not-italic text-white/80">i stedet for</em> dig.
          </h1>
          <p className="mt-5 text-white/80 leading-7">
            Sokratisk vejleder, forankret i dit fags officielle pensum.
            Friction by Design beskytter din læringsproces og din faglige integritet.
          </p>
        </motion.div>

        <p className="text-c1 text-white/60">© Undervisningsministeriet · Prototype 2026</p>
      </div>

      {/* Form-side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md ai-region p-8">
          <h2 className="font-heading font-semibold text-h2">{title}</h2>
          {subtitle && <p className="text-uvm-muted mt-1">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function Field({ label, type = 'text', value, onChange, error, required, autoComplete, children }) {
  const id = `f-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label} {required && <span className="text-uvm-cta" aria-hidden="true">*</span>}
      </label>
      {children ? (
        children
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={[
            'w-full rounded-lg border px-3 py-2 text-sm bg-white',
            'focus:outline-none focus:border-transparent focus:accent-ring',
            error ? 'border-uvm-cta' : 'border-uvm-border',
          ].join(' ')}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-c1 text-uvm-cta">
          {error}
        </p>
      )}
    </div>
  )
}
