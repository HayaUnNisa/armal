import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bath, BedDouble, CalendarDays, Check, Images, MapPin, Maximize, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropertyCard from '../components/listing/PropertyCard'
import FloorPlan from '../components/property/FloorPlan'
import Mortgage from '../components/property/Mortgage'
import Button from '../components/ui/Button'
import FlapNumber from '../components/ui/FlapNumber'
import { Heading, Reveal } from '../components/ui/Reveal'
import SaveHeart from '../components/ui/SaveHeart'
import { useStore } from '../context/StoreContext'
import { agents, cities, company, getProperty, properties, types } from '../data/site'
import { useLang } from '../i18n/LangContext'
import { num, price } from '../lib/format'
import { ease } from '../lib/motion'
import { useLenisSafe } from '../lib/scrollLock'
import NotFound from './NotFound'

export default function PropertyPage() {
  const { id } = useParams()
  const p = getProperty(id)
  const { t, L, lang } = useLang()
  const { setViewing } = useStore()
  const [lb, setLb] = useState<number | null>(null)
  useLenisSafe(lb !== null)
  useEffect(() => {
    if (lb === null || !p) return
    const k = (e: KeyboardEvent) => {
      const n = p.images.length
      if (e.key === 'Escape') setLb(null)
      if (e.key === 'ArrowRight') setLb((i) => ((i ?? 0) + (lang === 'ar' ? -1 : 1) + n) % n)
      if (e.key === 'ArrowLeft') setLb((i) => ((i ?? 0) + (lang === 'ar' ? 1 : -1) + n) % n)
    }
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [lb, p, lang])
  if (!p) return <NotFound />

  const city = cities.find((c) => c.id === p.city)!
  const type = types.find((x) => x.id === p.type)!
  const agent = agents.find((a) => a.id === p.agent)!
  const similar = properties.filter((x) => x.id !== p.id && x.mode === p.mode && (x.type === p.type || x.city === p.city)).slice(0, 3)
  const specs = [
    p.beds > 0 && { I: BedDouble, v: String(p.beds), l: t('beds') },
    p.baths > 0 && { I: Bath, v: String(p.baths), l: t('baths') },
    { I: Maximize, v: num(p.area), l: t('sqm') },
    { I: CalendarDays, v: String(p.year), l: t('d_year') },
  ].filter(Boolean) as { I: typeof Bath; v: string; l: string }[]
  const go = (d: number) => setLb((i) => ((i ?? 0) + d + p.images.length) % p.images.length)

  return (
    <>
      <div className="bg-revolver pt-20" />
      {/* gallery */}
      <section className="wrap pt-8">
        <nav className="mb-5 flex items-center gap-2 text-[13px] text-manatee-dark" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-alizarin">{t('nav_home')}</Link><span>/</span>
          <Link to={`/properties?mode=${p.mode}`} className="hover:text-alizarin">{p.mode === 'buy' ? t('nav_buy') : t('nav_rent')}</Link><span>/</span>
          <span className="text-revolver">{p.id}</span>
        </nav>
        <div className="grid h-[300px] gap-2 overflow-hidden rounded-3xl sm:h-[460px] sm:grid-cols-4 sm:grid-rows-2">
          {p.images.slice(0, 5).map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLb(i)}
              initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.6 + i * 0.08 }}
              className={`group relative overflow-hidden bg-revolver ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : 'hidden sm:block'} ${p.images.length < 3 && i === 0 ? 'sm:col-span-4' : ''}`}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={src} alt={i === 0 ? L(p.title) : ''} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {i === Math.min(4, p.images.length - 1) && p.images.length > 1 && (
                <span className="absolute bottom-4 end-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-[13px] font-bold text-revolver"><Images className="h-4 w-4" /> {p.images.length} {t('d_photos')}</span>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-12 py-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex gap-2">
                <span className={`rounded-md px-2.5 py-1 text-[12px] font-bold ${p.mode === 'buy' ? 'bg-alizarin text-white' : 'bg-revolver text-white'}`}>{p.mode === 'buy' ? t('for_sale') : t('for_rent')}</span>
                <span className="rounded-md bg-snow-dark/60 px-2.5 py-1 text-[12px] font-bold">{L(type.label)}</span>
              </div>
              <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{L(p.title)}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-manatee-dark"><MapPin className="h-4 w-4" />{L(p.district)}{lang === 'ar' ? '، ' : ', '}{L(city.name)}</p>
            </div>
            <SaveHeart id={p.id} className="!h-12 !w-12 border border-snow-dark shadow-none" />
          </div>
          <p className="fact mt-6 text-4xl text-alizarin sm:text-5xl"><FlapNumber value={num(p.price)} /> <span className="text-xl text-revolver">{t('sar')}{p.mode === 'rent' ? ` ${t('per_year')}` : ''}</span></p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-snow-dark sm:grid-cols-4">
            {specs.map(({ I, v, l }) => (
              <div key={l} className="flex items-center gap-3 bg-white p-4">
                <I className="h-6 w-6 text-alizarin" strokeWidth={1.6} />
                <div><dd className="fact text-xl">{v}</dd><dt className="text-[13px] text-manatee-dark">{l}</dt></div>
              </div>
            ))}
          </dl>

          <Reveal className="mt-14">
            <Heading title={t('d_overview')} />
            <p className="mt-5 max-w-3xl text-[17px] leading-loose text-revolver-light">{L(p.description)}</p>
          </Reveal>

          <Reveal className="mt-14">
            <Heading title={t('d_features')} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <motion.li key={f.en} initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 rounded-xl border border-snow-dark px-4 py-3 text-[15px]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-alizarin text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{L(f)}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          {p.type !== 'land' && (
            <Reveal className="mt-14">
              <Heading title={t('d_plan')} />
              <div className="mt-6"><FloorPlan p={p} /></div>
            </Reveal>
          )}

          {p.mode === 'buy' && (
            <Reveal className="mt-14">
              <Heading title={t('d_mortgage')} />
              <div className="mt-6 rounded-2xl border border-snow-dark p-6 sm:p-8"><Mortgage price={p.price} /></div>
            </Reveal>
          )}
        </div>

        <aside>
          <div className="sticky top-28 space-y-4">
            <div className="rounded-2xl bg-revolver p-6 text-white">
              <p className="text-[13px] text-snow-darkest">{t('d_agent')}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-alizarin text-lg font-bold">{agent.initials}</span>
                <div><p className="text-lg font-bold">{L(agent.name)}</p><p className="text-[14px] text-snow-darker">{L(agent.role)}</p></div>
              </div>
              <Button full className="mt-6" onClick={() => setViewing(p.id)}><CalendarDays className="h-5 w-5" /> {t('d_book')}</Button>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`${p.id} — ${L(p.title)}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-white/20 py-3 text-[14px] font-bold transition hover:border-white"><MessageCircle className="h-4 w-4" /> {t('d_whatsapp')}</a>
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 rounded-lg border border-white/20 py-3 text-[14px] font-bold transition hover:border-white"><Phone className="h-4 w-4" /> {t('d_call')}</a>
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-[13px] text-snow-darkest">{t('d_ref')}: <span className="fact text-white">{p.id}</span></p>
            </div>
          </div>
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="bg-snow-dark/30 py-20">
          <div className="wrap">
            <Heading title={t('d_similar')} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s, i) => <Reveal key={s.id} delay={i * 0.08}><PropertyCard p={s} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      {/* mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-snow-dark bg-white/95 p-3 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="flex-1"><p className="fact text-lg leading-tight text-alizarin">{price(p, lang)}</p><p className="text-[12px] text-manatee-dark">{p.id}</p></div>
        <Button onClick={() => setViewing(p.id)} className="!px-5 !py-3">{t('d_book')}</Button>
      </div>

      <AnimatePresence>
        {lb !== null && (
          <motion.div className="fixed inset-0 z-[85] flex flex-col bg-revolver-dark/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 text-white">
              <span className="fact" dir="ltr">{lb + 1} / {p.images.length}</span>
              <button onClick={() => setLb(null)} aria-label={t('close')} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-white/10"><X className="h-6 w-6" /></button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.img key={lb} src={p.images[lb]} alt="" initial={{ opacity: 0, clipPath: 'polygon(50% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 0%)' }} animate={{ opacity: 1, clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} drag="x" dragSnapToOrigin onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 80) go(i.offset.x < 0 ? 1 : -1) }} className="max-h-[78vh] max-w-full rounded-xl object-contain" />
              </AnimatePresence>
              <button onClick={() => go(-1)} aria-label="Previous" className="absolute start-4 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-alizarin sm:grid"><ArrowLeft className="h-5 w-5 rtl:rotate-180" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="absolute end-4 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-alizarin sm:grid"><ArrowRight className="h-5 w-5 rtl:rotate-180" /></button>
            </div>
            <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto p-5">
              {p.images.map((src, i) => <button key={i} onClick={() => setLb(i)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === lb ? 'ring-alizarin' : 'opacity-50 ring-transparent'}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
