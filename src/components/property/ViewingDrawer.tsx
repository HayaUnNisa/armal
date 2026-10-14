import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../context/StoreContext'
import { getProperty } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { easeIO, ease } from '../../lib/motion'
import { useLenisSafe } from '../../lib/scrollLock'
import Button from '../ui/Button'

const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00', '20:00']

/** "Book a viewing": a sheet that lifts from the bottom with a 2-week day strip and time slots. */
export default function ViewingDrawer() {
  const { viewing, setViewing } = useStore()
  const { t, L, lang } = useLang()
  const p = getProperty(viewing ?? undefined)
  const [day, setDay] = useState(1)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  useLenisSafe(!!viewing)
  useEffect(() => { if (viewing) { setDone(false); setErr(''); setTime(null) } }, [viewing])
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setViewing(null)
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [setViewing])

  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d }).filter((d) => d.getDay() !== 5), [])
  const loc = lang === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB'

  const submit = () => {
    if (!time) return setErr(t('b_err_time'))
    if (name.trim().length < 2) return setErr(t('b_err_name'))
    if (!/^(\+?966|0)?5\d{8}$/.test(phone.replace(/[\s-]/g, ''))) return setErr(t('b_err_phone'))
    setErr(''); setDone(true)
  }

  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[85] flex items-end justify-center bg-revolver-dark/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewing(null)} role="dialog" aria-modal="true" aria-label={t('b_title')}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: '105%' }} animate={{ y: 0 }} exit={{ y: '105%' }} transition={{ duration: 0.65, ease: easeIO }} className="relative w-full max-w-2xl overflow-hidden rounded-t-[28px] bg-white" data-lenis-prevent>
            {/* roof-shaped handle */}
            <svg viewBox="0 0 80 14" className="mx-auto mt-3 h-3 w-14" aria-hidden="true"><path d="M3 12 L40 3 L77 12" fill="none" stroke="#D1D2D2" strokeWidth="4" strokeLinecap="round" /></svg>
            <button onClick={() => setViewing(null)} aria-label={t('close')} className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-lg hover:bg-snow-dark/50"><X className="h-5 w-5" /></button>
            <div className="max-h-[85vh] overflow-y-auto px-6 pb-8 pt-4 sm:px-9">
              {done ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-alizarin text-white"><Check className="h-8 w-8" /></motion.span>
                  <h3 className="mt-6 text-2xl">{t('b_done')}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-manatee-dark">{t('b_done_text')}</p>
                  <p className="mt-4 text-[13px] text-manatee">{t('demo_note')}</p>
                  <Button variant="dark" className="mt-8" onClick={() => setViewing(null)}>{t('close')}</Button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <img src={p.images[0]} alt="" className="h-16 w-20 rounded-lg object-cover" />
                    <div><h3 className="text-xl">{t('b_title')}</h3><p className="line-clamp-1 text-[14px] text-manatee-dark">{L(p.title)}</p></div>
                  </div>
                  <p className="mt-7 text-[14px] font-bold">{t('b_day')}</p>
                  <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 sm:-mx-9 sm:px-9">
                    {days.map((d, i) => (
                      <button key={i} onClick={() => { setDay(i); setTime(null) }} className={`relative flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-xl border transition-colors ${day === i ? 'border-alizarin text-white' : 'border-snow-dark text-revolver hover:border-revolver/40'}`}>
                        {day === i && <motion.span layoutId="vd-day" className="absolute inset-0 rounded-xl bg-alizarin" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                        <span className="relative text-[12px] opacity-80">{d.toLocaleDateString(loc, { weekday: 'short' })}</span>
                        <span className="fact relative text-xl">{d.getDate()}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-6 text-[14px] font-bold">{t('b_time')}</p>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {times.map((tm, i) => (
                      <motion.button key={tm + day} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02, ease }} onClick={() => setTime(tm)} className={`fact rounded-lg border py-2.5 text-[14px] transition ${time === tm ? 'border-revolver bg-revolver text-white' : 'border-snow-dark hover:border-revolver/40'}`} dir="ltr">{tm}</motion.button>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <label><span className="text-[14px] font-bold">{t('b_name')}</span><input className="input mt-1.5" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
                    <label><span className="text-[14px] font-bold">{t('b_phone')}</span><input className="input mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" dir="ltr" placeholder="05XXXXXXXX" autoComplete="tel" /></label>
                  </div>
                  <AnimatePresence>{err && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-[14px] font-bold text-alizarin">{err}</motion.p>}</AnimatePresence>
                  <Button full className="mt-6" onClick={submit}>{t('b_confirm')}</Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
