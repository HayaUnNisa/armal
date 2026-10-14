import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext'
import arRaw from '../../assets/brand/logo-ar.svg?raw'
import enRaw from '../../assets/brand/logo-en.svg?raw'
import { ease } from '../../lib/motion'

const inline = (raw: string) => raw.replace('<svg ', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ')

/** The house "a" icon (redrawn as clean vector from the brand guide). Uses currentColor. */
export function Icon({ className = 'h-8 w-auto', draw = false, delay = 0 }: { className?: string; draw?: boolean; delay?: number }) {
  return (
    <svg viewBox="0 0 100 123" className={className} fill="currentColor" aria-hidden="true">
      <motion.path
        d="M0 36 L49.4 0 L100 36 H88.2 L49.4 8.8 L12.2 36 Z"
        initial={draw ? { y: -26, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: delay + 0.35 }}
      />
      <motion.g initial={draw ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay }}>
        <path fillRule="evenodd" d="M11.6 71 C11.6 47 28 32 50 32 C72 32 88.4 47 88.4 71 V122.8 H41 C25 122.8 11.6 110 11.6 93 Z M26 72 C26 56 36 46 50 46 C64 46 74 56 74 72 V108.6 H46.5 C35 108.6 26 100 26 89 Z" />
        <path d="M11.6 108.6 H14.8 L29 122.8 H11.6 Z" />
      </motion.g>
    </svg>
  )
}

/** Primary logo (Arabic) in Arabic mode, secondary logo (English) in English mode — never both side by side. */
export function Logo({ className = 'h-11', color = 'text-alizarin' }: { className?: string; color?: string }) {
  const { lang } = useLang()
  const raw = lang === 'ar' ? arRaw : enRaw
  const ratio = lang === 'ar' ? 2872 / 1084 : 2872 / 1044
  return (
    <span className={`block ${color} ${className}`} style={{ aspectRatio: String(ratio) }} aria-label={lang === 'ar' ? 'أرمال العقارية' : 'Armal Real Estate'} role="img" dangerouslySetInnerHTML={{ __html: inline(raw) }} />
  )
}

export function LogoLink({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label="Armal home">
      <Logo className={className ?? 'h-10 sm:h-11'} color={light ? 'text-white' : 'text-alizarin'} />
    </Link>
  )
}
