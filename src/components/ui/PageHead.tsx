import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../../lib/motion'

export default function PageHead({ l1, l2, children, image }: { l1: string; l2?: string; children?: ReactNode; image?: string }) {
  return (
    <section className="pattern relative overflow-hidden bg-revolver pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />}
      <div className="absolute inset-0 bg-gradient-to-t from-revolver via-revolver/70 to-revolver/30" />
      <div className="wrap relative">
        <svg viewBox="0 0 220 60" className="h-9 w-32" aria-hidden="true">
          <motion.path d="M4 56 L110 6 L216 56" fill="none" stroke="#DB232E" strokeWidth="9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease, delay: 0.7 }} />
        </svg>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          {[l1, l2].filter(Boolean).map((l, i) => (
            <span key={i} className="-my-[0.12em] block overflow-hidden pb-[0.24em] pt-[0.12em]"><motion.span className={`block ${i === 1 ? 'text-alizarin' : ''}`} initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.75 + i * 0.12 }}>{l}</motion.span></span>
          ))}
        </h1>
        {children && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.05 }} className="mt-6 max-w-2xl text-[17px] leading-relaxed text-snow-darker">{children}</motion.div>}
      </div>
    </section>
  )
}
