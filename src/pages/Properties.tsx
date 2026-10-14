import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PriceRange from '../components/listing/PriceRange'
import PropertyCard from '../components/listing/PropertyCard'
import FlapNumber from '../components/ui/FlapNumber'
import { cities, properties, types, type Mode } from '../data/site'
import { useLang } from '../i18n/LangContext'
import { ease, easeIO } from '../lib/motion'
import { useLenisSafe } from '../lib/scrollLock'

export default function Properties() {
  const { t, L, lang } = useLang()
  const [q, setQ] = useSearchParams()
  const mode = (q.get('mode') as Mode) || 'buy'
  const city = q.get('city') || ''
  const type = q.get('type') || ''
  const beds = +(q.get('beds') || 0)
  const sort = q.get('sort') || 'new'
  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState(false)
  useLenisSafe(drawer)

  const pool = properties.filter((p) => p.mode === mode)
  const pMin = Math.min(...pool.map((p) => p.price))
  const pMax = Math.max(...pool.map((p) => p.price))
  const lo = Math.max(pMin, +(q.get('min') || pMin))
  const hi = Math.min(pMax, +(q.get('max') || pMax))

  const set = (patch: Record<string, string | number | null>) => {
    const n = new URLSearchParams(q)
    Object.entries(patch).forEach(([k, v]) => (v === null || v === '' || v === 0 ? n.delete(k) : n.set(k, String(v))))
    setQ(n, { replace: true })
  }

  const results = useMemo(() => {
    const r = pool.filter((p) => (!city || p.city === city) && (!type || p.type === type) && (!beds || p.beds >= beds) && p.price >= lo && p.price <= hi)
    return [...r].sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : sort === 'big' ? b.area - a.area : b.added - a.added))
  }, [pool, city, type, beds, lo, hi, sort])

  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(false), 2200); return () => clearTimeout(id) }, [toast])

  const filters = (
    <div className="space-y-7">
      <div>
        <p className="text-[14px] font-bold">{t('s_type')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[{ id: '', label: { ar: t('s_any'), en: t('s_any') } }, ...types].map((x) => (
            <button key={x.id} onClick={() => set({ type: x.id })} className={`rounded-lg border px-3.5 py-2 text-[14px] font-bold transition ${type === x.id ? 'border-revolver bg-revolver text-white' : 'border-snow-dark hover:border-revolver/40'}`}>{L(x.label)}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[14px] font-bold">{t('s_city')}</p>
        <select value={city} onChange={(e) => set({ city: e.target.value })} className="select mt-3">
          <option value="">{t('s_any')}</option>
          {cities.map((c) => <option key={c.id} value={c.id}>{L(c.name)}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-3 text-[14px] font-bold">{t('f_price')}</p>
        <PriceRange prices={pool.map((p) => p.price)} min={pMin} max={pMax} lo={lo} hi={hi} onChange={(a, b) => set({ min: Math.round(a) === pMin ? null : Math.round(a), max: Math.round(b) === pMax ? null : Math.round(b) })} />
      </div>
      <div>
        <p className="text-[14px] font-bold">{t('f_beds')}</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map((b) => (
            <button key={b} onClick={() => set({ beds: b })} className={`fact rounded-lg border py-2 text-[14px] transition ${beds === b ? 'border-alizarin bg-alizarin text-white' : 'border-snow-dark hover:border-revolver/40'}`}>{b === 0 ? t('s_any') : `${b}+`}</button>
          ))}
        </div>
      </div>
      <button onClick={() => setQ(new URLSearchParams({ mode }), { replace: true })} className="flex items-center gap-2 text-[14px] font-bold text-manatee-dark hover:text-alizarin"><RotateCcw className="h-4 w-4" /> {t('f_reset')}</button>
    </div>
  )

  return (
    <>
      <section className="pattern bg-revolver pb-10 pt-32 text-white">
        <div className="wrap">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.6 }} className="text-4xl sm:text-5xl">{t('f_title')}</motion.h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl bg-white/10 p-1">
              {(['buy', 'rent'] as Mode[]).map((m) => (
                <button key={m} onClick={() => setQ(new URLSearchParams({ mode: m }), { replace: true })} className={`relative rounded-lg px-6 py-2.5 text-[15px] font-bold ${mode === m ? 'text-revolver' : 'text-white/80'}`}>
                  {mode === m && <motion.span layoutId="list-mode" className="absolute inset-0 rounded-lg bg-white" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                  <span className="relative">{m === 'buy' ? t('s_buy') : t('s_rent')}</span>
                </button>
              ))}
            </div>
            <p className="ms-auto text-[15px] text-snow-darker"><span className="fact text-2xl text-white"><FlapNumber value={String(results.length)} trigger={results.length} /></span> {t('f_results')}</p>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-10 py-10 lg:grid-cols-[290px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-snow-dark p-6">{filters}</div>
        </aside>
        <div>
          <div className="mb-6 flex items-center gap-3">
            <button onClick={() => setDrawer(true)} className="flex items-center gap-2 rounded-lg border border-snow-dark px-4 py-2.5 text-[14px] font-bold lg:hidden"><SlidersHorizontal className="h-4 w-4" /> {t('f_filters')}</button>
            <label className="ms-auto flex items-center gap-2 text-[14px] text-manatee-dark">
              {t('f_sort')}
              <select value={sort} onChange={(e) => set({ sort: e.target.value === 'new' ? null : e.target.value })} className="select !w-auto !py-2">
                <option value="new">{t('f_newest')}</option><option value="low">{t('f_low')}</option><option value="high">{t('f_high')}</option><option value="big">{t('f_big')}</option>
              </select>
            </label>
          </div>
          {results.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-snow-darker p-14 text-center text-manatee-dark">{t('f_none')}</motion.div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, rotateY: lang === 'ar' ? -70 : 70 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scaleY: 0.2, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.6, ease, delay: Math.min(i, 8) * 0.04 }}
                    style={{ transformPerspective: 1200, transformOrigin: lang === 'ar' ? 'right' : 'left' }}
                  >
                    <PropertyCard p={p} onCompareLimit={() => setToast(true)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {toast && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed inset-x-0 top-24 z-50 mx-auto w-fit rounded-lg bg-revolver px-5 py-3 text-[14px] font-bold text-white shadow-xl">{t('cmp_max')}</motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-[80] bg-revolver-dark/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.55, ease: easeIO }} className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-6">
              <div className="mb-6 flex items-center justify-between"><p className="text-xl font-bold">{t('f_filters')}</p><button onClick={() => setDrawer(false)} aria-label={t('close')}><X className="h-6 w-6" /></button></div>
              {filters}
              <button onClick={() => setDrawer(false)} className="mt-8 w-full rounded-lg bg-alizarin py-3.5 font-bold text-white">{t('f_show')} ({results.length})</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
