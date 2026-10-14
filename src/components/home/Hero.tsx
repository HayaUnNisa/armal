import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { img } from '../../data/images'
import { properties } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { price } from '../../lib/format'
import { ease } from '../../lib/motion'
import { introDelay } from '../layout/Preloader'
import FlapNumber from '../ui/FlapNumber'
import SearchPanel from './SearchPanel'

/**
 * "Night building" hero: the brand guide's red-lit building, with a red scanning light
 * sweeping over it, a roof drawn over the headline and the search right in the hero.
 */
export default function Hero() {
  const { t, L, lang } = useLang()
  const [D] = useState(introDelay)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const sample = properties.find((p) => p.featured)!

  return (
    <section ref={ref} className="pattern relative overflow-hidden bg-revolver pb-20 pt-32 text-white lg:min-h-[100svh] lg:pb-0 lg:pt-0">
      {/* red glow from the floor, like the street lights in the guide */}
      <div className="pointer-events-none absolute -bottom-40 start-1/4 h-[420px] w-[900px] rounded-full bg-alizarin/25 blur-[140px]" />

      <div className="wrap relative grid items-center gap-14 lg:min-h-[100svh] lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <motion.div style={{ opacity: fade }}>
          {/* roof draws above the headline */}
          <svg viewBox="0 0 220 60" className="h-10 w-36 sm:h-14 sm:w-52" aria-hidden="true">
            <motion.path d="M4 56 L110 6 L216 56" fill="none" stroke="#DB232E" strokeWidth="9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease, delay: D }} />
          </svg>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D + 0.2 }} className="mt-4 text-[15px] font-bold text-alizarin-light">{t('hero_kicker')}</motion.p>
          <h1 className="mt-3 text-[2.7rem] font-bold leading-[1.08] sm:text-6xl lg:text-[4.4rem]">
            {[t('hero_l1'), t('hero_l2')].map((line, i) => (
              <span key={line} className="-my-[0.12em] block overflow-hidden pb-[0.24em] pt-[0.12em]">
                <motion.span className={`block ${i === 1 ? 'text-alizarin' : ''}`} initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: D + 0.25 + i * 0.12 }}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: D + 0.6 }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-snow-darker">
            {t('hero_text')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: D + 0.75 }} className="mt-10">
            <SearchPanel />
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imgY }} className="relative hidden lg:block">
          <motion.div
            initial={{ clipPath: 'polygon(50% 0%, 100% 12%, 100% 12%, 0% 12%, 0% 12%)' }}
            animate={{ clipPath: 'polygon(50% 0%, 100% 12%, 100% 100%, 0% 100%, 0% 12%)' }}
            transition={{ duration: 1.5, ease, delay: D + 0.1 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img src={img('night-building')} alt={lang === 'ar' ? 'مبنى مضاء باللون الأحمر' : 'Building lit in red'} className="h-full w-full object-cover" />
            {/* scanning red light */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
              <div className="absolute inset-x-0 -top-1/3 h-1/3 bg-gradient-to-b from-transparent via-alizarin/55 to-transparent motion-safe:animate-[scan_5s_ease-in-out_infinite]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-revolver/70 via-transparent to-transparent" />
          </motion.div>
          {/* house-shaped frame line */}
          <svg viewBox="0 0 400 500" preserveAspectRatio="none" className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" aria-hidden="true">
            <motion.path d="M200 -14 L414 46 V514 H-14 V46 Z" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease, delay: D + 0.6 }} />
          </svg>
          {/* floating listing chip */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: D + 1.1 }} className="absolute -end-6 top-[22%] w-64 rounded-2xl bg-white p-4 text-revolver shadow-2xl">
            <div className="flex items-center gap-3">
              <img src={sample.images[0]} alt="" className="h-14 w-16 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold">{L(sample.title)}</p>
                <p className="fact text-[15px] text-alizarin"><FlapNumber value={price(sample, lang)} /></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
