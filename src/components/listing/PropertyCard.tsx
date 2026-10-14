import { motion } from 'framer-motion'
import { Bath, BedDouble, Check, MapPin, Maximize } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { cities, types, type Property } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { num, price } from '../../lib/format'
import SaveHeart from '../ui/SaveHeart'

/** Listing card. Sliding the mouse across the photo flips through the property's pictures. */
export default function PropertyCard({ p, onCompareLimit }: { p: Property; onCompareLimit?: () => void }) {
  const { L, t, lang, dir } = useLang()
  const { compare, toggleCompare } = useStore()
  const [idx, setIdx] = useState(0)
  const n = p.images.length
  const city = cities.find((c) => c.id === p.city)
  const type = types.find((x) => x.id === p.type)
  const inCompare = compare.includes(p.id)

  const peek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || n < 2) return
    const r = e.currentTarget.getBoundingClientRect()
    let f = (e.clientX - r.left) / r.width
    if (dir === 'rtl') f = 1 - f
    setIdx(Math.min(n - 1, Math.max(0, Math.floor(f * n))))
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(56,56,58,.06),0_14px_40px_-24px_rgba(56,56,58,.35)] ring-1 ring-revolver/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(219,35,46,.45)]">
      <Link to={`/property/${p.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-revolver" onPointerMove={peek} onPointerLeave={() => setIdx(0)}>
          {p.images.map((src, i) => (
            <img key={i} src={src} alt={i === 0 ? L(p.title) : ''} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-revolver-dark/60 to-transparent" />
          <div className="absolute start-3 top-3 flex gap-1.5">
            <span className={`rounded-md px-2.5 py-1 text-[12px] font-bold ${p.mode === 'buy' ? 'bg-alizarin text-white' : 'bg-white text-revolver'}`}>{p.mode === 'buy' ? t('for_sale') : t('for_rent')}</span>
            {p.isNew && <span className="rounded-md bg-revolver px-2.5 py-1 text-[12px] font-bold text-white">{lang === 'ar' ? 'جديد' : 'New'}</span>}
          </div>
          {n > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1">
              {p.images.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />)}
            </div>
          )}
        </div>
      </Link>
      <SaveHeart id={p.id} className="absolute end-3 top-3" />

      <div className="flex flex-1 flex-col p-5">
        <p className="fact text-[1.35rem] text-alizarin">{price(p, lang)}</p>
        <Link to={`/property/${p.id}`} className="mt-1 line-clamp-1 text-[17px] font-bold text-revolver transition-colors hover:text-alizarin">{L(p.title)}</Link>
        <p className="mt-1 flex items-center gap-1.5 text-[14px] text-manatee-dark"><MapPin className="h-3.5 w-3.5" />{L(p.district)}{lang === 'ar' ? '، ' : ', '}{city && L(city.name)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-snow-dark pt-4 text-[14px] text-revolver">
          {p.beds > 0 && <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-manatee" /><span className="fact">{p.beds}</span> {t('beds')}</span>}
          {p.baths > 0 && <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-manatee" /><span className="fact">{p.baths}</span> {t('baths')}</span>}
          <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-manatee" /><span className="fact">{num(p.area)}</span> {t('sqm')}</span>
          <span className="ms-auto text-[13px] text-manatee-dark">{type && L(type.label)}</span>
        </div>
        <label className="mt-4 flex cursor-pointer select-none items-center gap-2 text-[13px] font-bold text-manatee-dark hover:text-revolver">
          <input type="checkbox" className="peer sr-only" checked={inCompare} onChange={() => { if (!toggleCompare(p.id)) onCompareLimit?.() }} />
          <span className={`grid h-5 w-5 place-items-center rounded border transition ${inCompare ? 'border-alizarin bg-alizarin text-white' : 'border-snow-darker'} peer-focus-visible:ring-2 peer-focus-visible:ring-alizarin`}>
            {inCompare && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="h-3.5 w-3.5" strokeWidth={3} /></motion.span>}
          </span>
          {t('compare')}
        </label>
      </div>
    </article>
  )
}
