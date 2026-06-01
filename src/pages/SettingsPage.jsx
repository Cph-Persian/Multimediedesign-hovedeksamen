import { useState } from 'react'
import { Save, ShieldCheck, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { Field } from './LoginPage.jsx'
import { getAiBackend } from '../lib/ai/aiClient.js'
import { ScrollContainer } from '../components/Layout.jsx'

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth()
  const { setProfile } = useTheme()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    profil: user?.profil ?? 'stx',
    year: user?.year ?? 2,
    school: user?.school ?? '',
  })
  const [saved, setSaved] = useState(false)
  const aiBackend = getAiBackend()

  function onSave(e) {
    e.preventDefault()
    const res = updateProfile(form)
    if (res.ok) {
      setProfile(form.profil)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  function onDelete() {
    if (!confirm('Slet din konto og alle samtaler? Dette kan ikke fortrydes.')) return
    // Ryd alt user-relateret data (chat + migrationsflag)
    const prefixes = ['uvm.ai.chat.' + user.id, 'uvm.ai.chat.migrated.v2.' + user.id]
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && prefixes.some(p => k.startsWith(p))) keysToRemove.push(k)
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    // Fjern bruger fra users-store
    try {
      const raw = localStorage.getItem('uvm.ai.users.v1')
      if (raw) {
        const users = JSON.parse(raw)
        const next = users.filter(u => u.id !== user.id)
        localStorage.setItem('uvm.ai.users.v1', JSON.stringify(next))
      }
    } catch {}
    logout()
  }

  if (!user) return null

  return (
    <ScrollContainer>
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="font-heading text-h1">Indstillinger</h1>
        <p className="text-uvm-muted mt-1">
          Opdater din profil eller log ud. Alle data gemmes lokalt i din browser.
        </p>
      </header>

      <section className="ai-region p-6">
        <h2 className="font-heading font-semibold text-base mb-4">Min profil</h2>
        <form onSubmit={onSave} className="space-y-4">
          <Field
            label="Fulde navn"
            value={form.name}
            onChange={v => setForm(f => ({ ...f, name: v }))}
            required
          />
          <Field label="E-mail">
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-uvm-border px-3 py-2 text-sm
                         bg-uvm-neutral text-uvm-muted"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Uddannelsesretning">
              <select
                value={form.profil}
                onChange={e => setForm(f => ({ ...f, profil: e.target.value }))}
                className="w-full rounded-lg border border-uvm-border px-3 py-2 text-sm bg-white"
              >
                <option value="stx">STX — Almen</option>
                <option value="htx">HTX — Teknisk</option>
                <option value="hhx">HHX — Merkantil</option>
              </select>
            </Field>
            <Field label="Klassetrin">
              <select
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
                className="w-full rounded-lg border border-uvm-border px-3 py-2 text-sm bg-white"
              >
                <option value={1}>1.g</option>
                <option value={2}>2.g</option>
                <option value={3}>3.g</option>
              </select>
            </Field>
          </div>
          <Field
            label="Skole (valgfrit)"
            value={form.school ?? ''}
            onChange={v => setForm(f => ({ ...f, school: v }))}
          />

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary">
              <Save size={16} aria-hidden="true" />
              Gem ændringer
            </button>
            {saved && (
              <span className="text-c1 text-verify inline-flex items-center gap-1">
                <ShieldCheck size={14} aria-hidden="true" /> Gemt
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="ai-region p-6">
        <h2 className="font-heading font-semibold text-base mb-1">AI-motor</h2>
        <p className="text-c1 text-uvm-muted">
          Aktiv:{' '}
          <strong className="text-uvm-ink font-semibold">
            {aiBackend === 'rules' ? 'Regelbaseret (lokal)' : aiBackend}
          </strong>
        </p>
      </section>

      <section className="ai-region p-6 border-uvm-cta/30">
        <h2 className="font-heading font-semibold text-base mb-1 text-uvm-cta">
          Farezone
        </h2>
        <p className="text-c1 text-uvm-muted mb-4">
          Sletning fjerner din konto og alle samtaler permanent fra denne browser.
        </p>
        <button type="button" className="btn-cta" onClick={onDelete}>
          <Trash2 size={16} aria-hidden="true" />
          Slet konto og data
        </button>
      </section>
    </div>
    </ScrollContainer>
  )
}
