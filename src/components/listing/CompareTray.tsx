import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLenisSafe } from '../../lib/scrollLock'
import { useStore } from '../../context/StoreContext'
import { cities, properties, types } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { num, price } from '../../lib/format'
import { ease, easeIO } from '../../lib/motion'
import Button from '../ui/Button'

/** Tray rises from the bottom when homes are ticked for comparison; opens a side-by-side table. */
export default function CompareTray() {
  const { compare, toggleCompare, clearCompare, compareOpen, setCompareOpen } = useStore()
  const { t, L, lang } = useLang()
  const items = properties.filter((p) => compare.includes(p.id))
  useLenisSafe(compareOpen)

  const rows: [string, (p: (typeof items)[number]) => string][] = [
    [t('price'), (p) => price(p, lang)],
    [t('type'), (p) => L(types.find((x) => x.id === p.type)!.label)],
    [t('location'), (p) => `${L(p.district)}, ${L(cities.find((c) => c.id === p.city)!.name)}`],
    [t('area'), (p) => `${num(p.area)} ${t('sqm')}`],
    [t('price_per_m'), (p) => `${num(Math.round(p.price / p.area))} ${t('sar')}`],
    [t('beds'), (p) => (p.beds ? String(p.beds) : '—')],
    [t('baths'), (p) => (p.baths ? String(p.baths) : '—')],
    [t('d_year'), (p) => String(p.year)],
  ]

  return (
    <>
      <AnimatePresence>
        {items.length > 0 && !compareOpen && (
          <motion.div initial={{ y: 140 }} animate={{ y: 0 }} exit={{ y: 140 }} transition={{ duration: 0.6, ease }} className="fixed inset-x-3 bottom-3 z-40 mx-auto sm:max-w-[720px]">
            <div className="flex items-center gap-3 rounded-2xl bg-revolver p-3 text-white shadow-2xl">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {items.map((p) => (
                  <motion.button layout key={p.id} onClick={() => toggleCompare(p.id)} aria-label={`Remove ${L(p.title)}`} className="group relative h-12 w-16 overflow-hidden rounded-lg ring-2 ring-revolver">
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center bg-alizarin/80 opacity-0 transition group-hover:opacity-100"><X className="h-4 w-4" /></span>
                  </motion.button>
                ))}
              </div>
              <p className="flex-1 text-[14px]"><span className="fact">{items.length}</span>/3 {t('cmp_tray')}</p>
              <button onClick={clearCompare} className="px-2 text-[13px] text-snow-darker hover:text-white">{t('cmp_clear')}</button>
              <Button onClick={() => setCompareOpen(true)} className="!px-4 !py-2.5 !text-[14px]">{t('cmp_go')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {compareOpen && (
          <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-revolver-dark/60 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCompareOpen(false)} role="dialog" aria-modal="true" aria-label={t('cmp_title')}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.6, ease: easeIO }} className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-t-3xl bg-white sm:rounded-3xl" data-lenis-prevent>
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-snow-dark bg-white px-6 py-5">
                <h2 className="text-2xl">{t('cmp_title')}</h2>
                <button onClick={() => setCompareOpen(false)} aria-label={t('close')} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-snow-dark/50"><X className="h-5 w-5" /></button>
              </div>
              <div className="overflow-x-auto p-6">
                <table className="w-full min-w-[560px] text-start">
                  <thead>
                    <tr>
                      <th className="w-40" />
                      {items.map((p) => (
                        <th key={p.id} className="p-2 text-start align-top">
                          <img src={p.images[0]} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
                          <p className="mt-3 text-[15px] font-bold leading-snug">{L(p.title)}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(([label, fn], ri) => {
                      // highlight the best value on price and price-per-m²
                      const vals = items.map((p) => (ri === 0 ? p.price : ri === 4 ? p.price / p.area : ri === 3 ? -p.area : 0))
                      const best = ri === 0 || ri === 3 || ri === 4 ? Math.min(...vals) : null
                      return (
                        <tr key={label} className="border-t border-snow-dark">
                          <td className="p-3 text-[14px] font-bold text-manatee-dark">{label}</td>
                          {items.map((p, i) => <td key={p.id} className={`p-3 text-[15px] ${best !== null && vals[i] === best && items.length > 1 ? 'fact text-alizarin' : ''}`}>{fn(p)}</td>)}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
