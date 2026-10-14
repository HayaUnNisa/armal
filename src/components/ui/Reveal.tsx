import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../../lib/motion'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease, delay }}>
      {children}
    </motion.div>
  )
}

/** Section heading with the roof chevron drawing in above it. */
export function Heading({ kicker, title, light, center, children }: { kicker?: string; title: string; light?: boolean; center?: boolean; children?: ReactNode }) {
  return (
    <motion.div initial="h" whileInView="s" viewport={{ once: true, amount: 0.5 }} className={center ? 'text-center' : ''}>
      <svg viewBox="0 0 60 20" className={`h-4 w-12 ${center ? 'mx-auto' : ''}`} aria-hidden="true">
        <motion.path d="M2 18 L30 2 L58 18" fill="none" stroke="#DB232E" strokeWidth="4" strokeLinejoin="miter" variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 0.9, ease } } }} />
      </svg>
      {kicker && <motion.p variants={{ h: { opacity: 0 }, s: { opacity: 1, transition: { delay: 0.2 } } }} className="eyebrow mt-3">{kicker}</motion.p>}
      <h2 className={`mt-1 overflow-hidden pb-[0.2em] pt-[0.12em] text-3xl leading-tight sm:text-[2.6rem] ${light ? 'text-white' : 'text-revolver'}`}>
        <motion.span className="inline-block" variants={{ h: { y: '100%' }, s: { y: 0, transition: { duration: 0.9, ease, delay: 0.1 } } }}>{title}</motion.span>
      </h2>
      {children && <motion.div variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.7 } } }} className={`mt-3 max-w-xl text-[16px] leading-relaxed ${light ? 'text-snow-darker' : 'text-manatee-dark'} ${center ? 'mx-auto' : ''}`}>{children}</motion.div>}
    </motion.div>
  )
}
