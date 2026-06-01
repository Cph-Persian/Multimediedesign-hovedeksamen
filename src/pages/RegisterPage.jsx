import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Loader2, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { AuthShell, Field } from './LoginPage.jsx'

const PROFILES = [
  { id: 'stx', label: 'STX', name: 'Almen' },
  { id: 'htx', label: 'HTX', name: 'Teknisk' },
  { id: 'hhx', label: 'HHX', name: 'Merkantil' },
]

export default function RegisterPage() {
  const { user, hydrated, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profil: 'stx',
    year: 2,
    school: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!hydrated) return null
  if (user) return <Navigate to="/" replace />

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const res = await register(form)
    setLoading(false)
    if (!res.ok) {
      setErrors(res.errors)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <AuthShell
      title="Opret bruger"
      subtitle="Du skal kun bruge en e-mail og en adgangskode for at komme i gang"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="Fulde navn"
          autoComplete="name"
          value={form.name}
          onChange={v => setField('name', v)}
          error={errors.name}
          required
        />
        <Field
          label="E-mail"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={v => setField('email', v)}
          error={errors.email}
          required
        />
        <Field
          label="Adgangskode"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={v => setField('password', v)}
          error={errors.password}
          required
        />

        <Field label="Uddannelsesretning" required error={errors.profil}>
          <div className="grid grid-cols-3 gap-2">
            {PROFILES.map(p => {
              const active = form.profil === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setField('profil', p.id)}
                  aria-pressed={active}
                  className={[
                    'rounded-lg border px-3 py-2 text-sm transition-colors',
                    active
                      ? 'accent-bg-soft accent-border accent-text font-semibold'
                      : 'bg-white border-uvm-border hover:bg-uvm-neutral',
                  ].join(' ')}
                >
                  <span className="block font-heading font-semibold">{p.label}</span>
                  <span className="block text-c1 text-uvm-muted">{p.name}</span>
                </button>
              )
            })}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Klassetrin" required error={errors.year}>
            <select
              value={form.year}
              onChange={e => setField('year', Number(e.target.value))}
              className="w-full rounded-lg border border-uvm-border px-3 py-2 text-sm bg-white
                         focus:outline-none focus:accent-ring"
            >
              <option value={1}>1.g</option>
              <option value={2}>2.g</option>
              <option value={3}>3.g</option>
            </select>
          </Field>
          <Field
            label="Skole (valgfrit)"
            value={form.school}
            onChange={v => setField('school', v)}
          />
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
          Opret bruger og log ind
        </button>
      </form>

      <p className="text-c1 text-uvm-muted mt-6 text-center">
        Har du allerede en konto?{' '}
        <Link to="/login" className="font-semibold text-uvm-primary hover:underline">
          Log ind
        </Link>
      </p>
    </AuthShell>
  )
}
