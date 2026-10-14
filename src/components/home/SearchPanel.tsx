import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cities, types, type Mode } from '../../data/site'
import { useLang } from '../../i18n/LangContext'

const budgets: Record<Mode, { v: string; ar: string; en: string }[]> = {
  buy: [
    { v: '0-1000000', ar: 'حتى 1 مليون', en: 'Up to 1M' },
    { v: '1000000-2500000', ar: '1 – 2.5 مليون', en: '1M – 2.5M' },
    { v: '2500000-5000000', ar: '2.5 – 5 مليون', en: '2.5M – 5M' },
    { v: '5000000-99000000', ar: 'أكثر من 5 مليون', en: '5M+' },
  ],
  rent: [
    { v: '0-60000', ar: 'حتى 60 ألف', en: 'Up to 60K' },
    { v: '60000-120000', ar: '60 – 120 ألف', en: '60K – 120K' },
    { v: '120000-250000', ar: '120 – 250 ألف', en: '120K – 250K' },
    { v: '250000-9000000', ar: 'أكثر من 250 ألف', en: '250K+' },
  ],
}

function Field({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative block flex-1 rounded-xl px-4 py-2.5 transition hover:bg-snow-dark/40">
      <span className="block text-[12px] font-bold text-manatee-dark">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pe-6 text-[15px] font-bold text-revolver outline-none">{children}</select>
      <ChevronDown className="pointer-events-none absolute bottom-3.5 end-4 h-4 w-4 text-manatee" />
    </label>
  )
}

export default function SearchPanel() {
  const { t, L, lang } = useLang()
  const nav = useNavigate()
  const [mode, setMode] = useState<Mode>('buy')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const go = () => {
    const q = new URLSearchParams({ mode })
    if (city) q.set('city', city)
    if (type) q.set('type', type)
    if (budget) { const [a, b] = budget.split('-'); q.set('min', a); q.set('max', b) }
    nav(`/properties?${q}`)
  }
  return (
    <div className="w-full max-w-3xl">
      <div role="tablist" className="inline-flex rounded-t-xl bg-white/10 p-1 backdrop-blur">
        {(['buy', 'rent'] as Mode[]).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setBudget('') }} className={`relative rounded-lg px-6 py-2.5 text-[15px] font-bold transition-colors ${mode === m ? 'text-revolver' : 'text-white/80 hover:text-white'}`}>
            {mode === m && <motion.span layoutId="hero-mode" className="absolute inset-0 rounded-lg bg-white" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
            <span className="relative">{m === 'buy' ? t('s_buy') : t('s_rent')}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1 rounded-2xl rounded-ss-none bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] sm:flex-row sm:items-center">
        <Field label={t('s_city')} value={city} onChange={setCity}>
          <option value="">{t('s_any')}</option>
          {cities.map((c) => <option key={c.id} value={c.id}>{L(c.name)}</option>)}
        </Field>
        <span className="hidden h-10 w-px bg-snow-dark sm:block" />
        <Field label={t('s_type')} value={type} onChange={setType}>
          <option value="">{t('s_any')}</option>
          {types.map((x) => <option key={x.id} value={x.id}>{L(x.label)}</option>)}
        </Field>
        <span className="hidden h-10 w-px bg-snow-dark sm:block" />
        <Field label={t('s_budget')} value={budget} onChange={setBudget}>
          <option value="">{t('s_any')}</option>
          {budgets[mode].map((b) => <option key={b.v} value={b.v}>{lang === 'ar' ? b.ar : b.en}</option>)}
        </Field>
        <button onClick={go} className="btn-roof flex items-center justify-center gap-2 rounded-xl bg-alizarin px-7 py-4 text-[15px] font-bold text-white [--fill:#961522]">
          <Search className="h-5 w-5" /> {t('s_search')}
        </button>
      </div>
    </div>
  )
}
