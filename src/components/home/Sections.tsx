import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Building2, ClipboardCheck, Home as HomeIcon, KeyRound, LandPlot, LineChart, Rows3, Handshake } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../../data/images'
import { cities, properties, types, type Mode } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'
import { Icon } from '../ui/Brand'
import Button from '../ui/Button'
import FlapNumber from '../ui/FlapNumber'
import { Heading, Reveal } from '../ui/Reveal'
import PropertyCard from '../listing/PropertyCard'

const typeIcons = { villa: HomeIcon, apartment: Building2, townhouse: Rows3, office: Briefcase, land: LandPlot }

/** Property types as a row of "doors": hovering one raises its roof and shows the count. */
export function TypeStrip() {
  const { t, L } = useLang()
  return (
    <section className="relative z-10 -mt-px bg-white py-16">
      <div className="wrap">
        <Heading kicker={t('sec_types')} title={t('nav_properties')} />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {types.map((ty, i) => {
            const I = typeIcons[ty.id]
            const count = properties.filter((p) => p.type === ty.id).length
            return (
              <Reveal key={ty.id} delay={i * 0.06}>
                <Link to={`/properties?type=${ty.id}`} className="group relative block overflow-hidden rounded-2xl border border-snow-dark bg-white p-5 pt-10 transition-colors duration-500 hover:border-alizarin hover:bg-alizarin hover:text-white">
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-5 w-full -translate-y-full transition-transform duration-500 group-hover:translate-y-0" aria-hidden="true"><path d="M0 20 L50 0 L100 20 Z" fill="#961522" /></svg>
                  <I className="h-8 w-8 text-alizarin transition-colors group-hover:text-white" strokeWidth={1.6} />
                  <p className="mt-6 text-lg font-bold">{L(ty.plural)}</p>
                  <p className="text-[14px] text-manatee-dark transition-colors group-hover:text-white/80"><span className="fact">{count}</span> {t('listings')}</p>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Featured() {
  const { t } = useLang()
  const [mode, setMode] = useState<Mode>('buy')
  const list = properties.filter((p) => p.mode === mode && p.featured).concat(properties.filter((p) => p.mode === mode && !p.featured)).slice(0, 6)
  return (
    <section className="pattern-dark bg-snow-dark/30 py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading kicker={t('sec_featured_sub')} title={t('sec_featured')} />
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-xl bg-white p-1 shadow-sm">
              {(['buy', 'rent'] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`relative rounded-lg px-5 py-2 text-[14px] font-bold ${mode === m ? 'text-white' : 'text-manatee-dark hover:text-revolver'}`}>
                  {mode === m && <motion.span layoutId="feat-mode" className="absolute inset-0 rounded-lg bg-revolver" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                  <span className="relative">{m === 'buy' ? t('s_buy') : t('s_rent')}</span>
                </button>
              ))}
            </div>
            <Link to={`/properties?mode=${mode}`} className="hidden items-center gap-1.5 text-[15px] font-bold text-alizarin sm:flex">{t('view_all')} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" /></Link>
          </div>
        </div>
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, rotateX: -60, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.7, ease, delay: i * 0.06 }} style={{ transformPerspective: 1000, transformOrigin: 'top' }}>
                <PropertyCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/** Cities: tall panels whose skyline photo rises into view; hover widens the panel. */
export function Cities() {
  const { t, L } = useLang()
  const [hover, setHover] = useState(0)
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="wrap">
        <Heading kicker={t('s_city')} title={t('sec_cities')} />
        <div className="mt-12 flex flex-col gap-3 lg:h-[460px] lg:flex-row" onMouseLeave={() => setHover(0)}>
          {cities.map((c, i) => {
            const n = properties.filter((p) => p.city === c.id).length
            const on = hover === i
            return (
              <motion.div key={c.id} onMouseEnter={() => setHover(i)} animate={{ flexGrow: on ? 2.4 : 1 }} transition={{ duration: 0.8, ease }} className="relative h-56 basis-0 overflow-hidden rounded-2xl bg-revolver lg:h-auto">
                <Link to={`/properties?city=${c.id}`} className="absolute inset-0">
                  <motion.img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" animate={{ scale: on ? 1.04 : 1.15 }} transition={{ duration: 1, ease }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-revolver-dark/85 via-revolver-dark/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-3xl font-bold">{L(c.name)}</p>
                    <p className="mt-1 text-[14px] text-white/80"><span className="fact">{n}</span> {t('listings')}</p>
                  </div>
                  <span className={`absolute end-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-alizarin text-white transition-all duration-500 ${on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}><ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" /></span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** The four brand emotions from the guide; one is lit at a time, cycling like a lit sign. */
export function Values() {
  const { t, lang } = useLang()
  const vals = [
    { ar: 'الشغف', en: 'Passion', dar: 'نحب ما نعمل، ونتعامل مع كل عقار كأنه بيتنا.', den: 'We love what we do, and treat every property as if it were our own home.' },
    { ar: 'البساطة', en: 'Simplicity', dar: 'خطوات واضحة، أسعار شفافة، وبلا تعقيد.', den: 'Clear steps, transparent prices, no complications.' },
    { ar: 'الاحترافية', en: 'Professionalism', dar: 'فريق مرخّص يتابع كل تفصيلة حتى الإفراغ.', den: 'A licensed team that follows every detail through to transfer.' },
    { ar: 'الطاقة', en: 'Energy', dar: 'نتحرك بسرعة لأن الفرص الجيدة لا تنتظر.', den: 'We move fast, because good opportunities don’t wait.' },
  ]
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => { if (paused) return; const id = setInterval(() => setI((v) => (v + 1) % 4), 2600); return () => clearInterval(id) }, [paused])
  return (
    <section className="pattern relative overflow-hidden bg-revolver py-24 text-white sm:py-32" onMouseLeave={() => setPaused(false)}>
      <Icon className="pointer-events-none absolute -end-20 top-10 h-[520px] w-auto text-white/[0.03]" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <Heading light kicker={t('sec_values')} title={lang === 'ar' ? 'أربع كلمات تصف أرمال' : 'Four words that describe Armal'} />
          <AnimatePresence mode="wait">
            <motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="mt-8 max-w-md text-xl leading-relaxed text-snow-dark">
              {lang === 'ar' ? vals[i].dar : vals[i].den}
            </motion.p>
          </AnimatePresence>
        </div>
        <ul>
          {vals.map((v, k) => (
            <li key={v.en} onMouseEnter={() => { setI(k); setPaused(true) }} className="border-b border-white/10 last:border-0">
              <button onClick={() => { setI(k); setPaused(true) }} className="flex w-full items-baseline gap-5 py-4 text-start">
                <span className="fact text-[15px] text-manatee">0{k + 1}</span>
                <span className={`text-5xl font-bold transition-all duration-500 sm:text-6xl ${i === k ? 'text-alizarin [text-shadow:0_0_40px_rgba(219,35,46,.55)]' : 'text-white/20'}`}>{lang === 'ar' ? v.ar : v.en}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Numbers() {
  const { t, lang } = useLang()
  const stats = [
    { v: '1,250', l: lang === 'ar' ? 'عقار تم بيعه وتأجيره' : 'homes sold & leased' },
    { v: '3,400', l: lang === 'ar' ? 'عميل سعيد' : 'happy clients' },
    { v: '4', l: lang === 'ar' ? 'مدن رئيسية' : 'major cities' },
    { v: '15', l: lang === 'ar' ? 'سنة خبرة' : 'years of experience' },
  ]
  return (
    <section className="bg-white py-20">
      <div className="wrap">
        <Heading center kicker={t('sec_numbers')} title={lang === 'ar' ? 'أرقام نفخر بها' : 'Numbers we’re proud of'} />
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-snow-dark lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-white p-8 text-center">
              <dd className="fact text-5xl text-revolver sm:text-6xl"><span className="text-alizarin">+</span><FlapNumber value={s.v} /></dd>
              <dt className="mt-2 text-[15px] text-manatee-dark">{s.l}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-center text-[12px] text-manatee">{t('demo_note')}</p>
      </div>
    </section>
  )
}

export function Services() {
  const { t, lang } = useLang()
  const list = [
    { I: Handshake, ar: ['بيع العقارات', 'تسويق احترافي وتصوير ووصول لمشترين جادين.'], en: ['Selling', 'Professional marketing, photography and serious buyers.'] },
    { I: KeyRound, ar: ['التأجير', 'نجد المستأجر المناسب ونتولى العقود والتوثيق.'], en: ['Leasing', 'We find the right tenant and handle contracts.'] },
    { I: ClipboardCheck, ar: ['إدارة الأملاك', 'تحصيل الإيجارات والصيانة وتقارير دورية.'], en: ['Property management', 'Rent collection, maintenance and regular reports.'] },
    { I: LineChart, ar: ['التقييم العقاري', 'تقدير واقعي لقيمة عقارك بناءً على السوق.'], en: ['Valuation', 'A realistic, market-based value for your property.'] },
  ]
  return (
    <section className="bg-snow-dark/30 py-20 sm:py-28">
      <div className="wrap">
        <Heading kicker={t('sec_services')} title={lang === 'ar' ? 'كل ما يحتاجه عقارك، في مكان واحد' : 'Everything your property needs, in one place'} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(({ I, ...s }, i) => {
            const [title, text] = lang === 'ar' ? s.ar : s.en
            return (
              <Reveal key={title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-7">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-revolver transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [clip-path:polygon(50%_0%,100%_14%,100%_100%,0%_100%,0%_14%)] group-hover:scale-y-100" />
                  <div className="relative">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-alizarin/10 text-alizarin transition group-hover:bg-alizarin group-hover:text-white"><I className="h-7 w-7" strokeWidth={1.6} /></span>
                    <h3 className="mt-8 text-xl transition-colors group-hover:text-white">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-manatee-dark transition-colors group-hover:text-snow-darker">{text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ListCTA() {
  const { t } = useLang()
  return (
    <section className="bg-white py-20">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-revolver-dark text-white">
            <img src={img('billboard')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-r from-revolver-dark via-revolver-dark/80 to-transparent rtl:bg-gradient-to-l" />
            <div className="relative grid gap-8 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl">{t('cta_title')}</h2>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-snow-dark">{t('cta_text')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/contact?tab=list">{t('nav_list')}</Button>
                  <Button to="/contact" variant="outline-light">{t('nav_contact')}</Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
