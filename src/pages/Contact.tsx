import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHead from '../components/ui/PageHead'
import { cities, company, types } from '../data/site'
import { useLang } from '../i18n/LangContext'
import { ease } from '../lib/motion'

export default function Contact() {
  const { t, L } = useLang()
  const [q, setQ] = useSearchParams()
  const tab = q.get('tab') === 'list' ? 'list' : 'enquiry'
  const [f, setF] = useState({ name: '', phone: '', email: '', city: '', type: '', price: '', message: '' })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }))
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (f.name.trim().length < 2 || !/^(\+?966|0)?5\d{8}$/.test(f.phone.replace(/[\s-]/g, '')) || (tab === 'list' && (!f.city || !f.type))) return setErr(t('c_err'))
    setErr(''); setSent(true)
  }
  const info = [
    { I: MapPin, l: t('c_office'), v: L(company.address) },
    { I: Phone, l: t('d_call'), v: company.phone, ltr: true },
    { I: Mail, l: 'Email', v: company.email },
    { I: Clock, l: t('c_hours'), v: t('c_hours_v') },
  ]
  return (
    <>
      <PageHead l1={t('c_l1')} l2={t('c_l2')}>{t('c_text')}</PageHead>
      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          {info.map(({ I, l, v, ltr }, i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.07 }} className="flex items-center gap-4 rounded-2xl border border-snow-dark p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-alizarin text-white"><I className="h-5 w-5" /></span>
              <div><p className="text-[13px] text-manatee-dark">{l}</p><p className="font-bold" dir={ltr ? 'ltr' : undefined}>{v}</p></div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl bg-snow-dark/30 p-6 sm:p-10">
          <div className="inline-flex rounded-xl bg-white p-1">
            {(['enquiry', 'list'] as const).map((k) => (
              <button key={k} onClick={() => { setQ(k === 'list' ? { tab: 'list' } : {}, { replace: true }); setSent(false); setErr('') }} className={`relative rounded-lg px-5 py-2.5 text-[15px] font-bold ${tab === k ? 'text-white' : 'text-manatee-dark'}`}>
                {tab === k && <motion.span layoutId="c-tab" className="absolute inset-0 rounded-lg bg-revolver" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                <span className="relative">{k === 'list' ? t('c_listing') : t('c_enquiry')}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-16 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-alizarin text-white"><Check className="h-8 w-8" /></motion.span>
                <p className="mt-6 text-2xl font-bold">{t('c_sent')}</p>
                <p className="mt-2 text-[14px] text-manatee">{t('demo_note')}</p>
              </motion.div>
            ) : (
              <motion.form key={tab} onSubmit={submit} noValidate initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease }} className="mt-8 grid gap-4 sm:grid-cols-2">
                <label><span className="text-[14px] font-bold">{t('b_name')} *</span><input className="input mt-1.5" value={f.name} onChange={set('name')} autoComplete="name" /></label>
                <label><span className="text-[14px] font-bold">{t('b_phone')} *</span><input className="input mt-1.5" value={f.phone} onChange={set('phone')} inputMode="tel" dir="ltr" placeholder="05XXXXXXXX" autoComplete="tel" /></label>
                {tab === 'list' && (
                  <>
                    <label><span className="text-[14px] font-bold">{t('c_city')} *</span>
                      <select className="select mt-1.5" value={f.city} onChange={set('city')}><option value="">—</option>{cities.map((c) => <option key={c.id} value={c.id}>{L(c.name)}</option>)}</select></label>
                    <label><span className="text-[14px] font-bold">{t('s_type')} *</span>
                      <select className="select mt-1.5" value={f.type} onChange={set('type')}><option value="">—</option>{types.map((x) => <option key={x.id} value={x.id}>{L(x.label)}</option>)}</select></label>
                    <label className="sm:col-span-2"><span className="text-[14px] font-bold">{t('c_expected')}</span><input className="input mt-1.5" value={f.price} onChange={set('price')} inputMode="numeric" dir="ltr" /></label>
                  </>
                )}
                <label className="sm:col-span-2"><span className="text-[14px] font-bold">{t('c_message')}</span><textarea rows={4} className="input mt-1.5 resize-none" value={f.message} onChange={set('message')} /></label>
                {err && <p className="text-[14px] font-bold text-alizarin sm:col-span-2">{err}</p>}
                <div className="sm:col-span-2"><Button type="submit">{t('c_send')}</Button></div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
