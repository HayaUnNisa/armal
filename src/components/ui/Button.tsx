import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = { children: ReactNode; to?: string; onClick?: () => void; variant?: 'red' | 'dark' | 'light' | 'outline' | 'outline-light'; className?: string; type?: 'button' | 'submit'; full?: boolean }

const styles = {
  red: 'bg-alizarin text-white [--fill:#961522]',
  dark: 'bg-revolver text-white [--fill:#DB232E]',
  light: 'bg-white text-revolver hover:text-white [--fill:#DB232E]',
  outline: 'border border-revolver/25 text-revolver hover:text-white hover:border-alizarin [--fill:#DB232E]',
  'outline-light': 'border border-white/30 text-white hover:border-alizarin [--fill:#DB232E]',
}

/** Brand button. On hover the fill climbs in along the roof's diagonal. */
export default function Button({ children, to, onClick, variant = 'red', className = '', type = 'button', full }: Props) {
  const cls = `btn-roof inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-bold transition-colors duration-300 ${styles[variant]} ${full ? 'w-full' : ''} ${className}`
  return to ? <Link to={to} className={cls}>{children}</Link> : <button type={type} onClick={onClick} className={cls}>{children}</button>
}
