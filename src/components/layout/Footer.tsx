import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, types } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { Icon, LogoLink } from '../ui/Brand'
import Socials from '../ui/Socials'

export default function Footer() {
  const { t, L } = useLang()
  return (
    <footer className="pattern relative overflow-hidden bg-revolver-dark text-white">
      <Icon className="pointer-events-none absolute -bottom-24 -end-16 h-[420px] w-auto text-white/[0.03]" />
      <div className="wrap relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <LogoLink light className="h-12" />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-snow-darker">{t('footer_text')}</p>
          <p className="mt-8 text-[13px] font-bold text-snow-darkest">{t('footer_follow')}</p>
          <Socials className="mt-3" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-alizarin">{t('footer_links')}</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-snow-darker">
            {[['/', 'nav_home'], ['/properties?mode=buy', 'nav_buy'], ['/properties?mode=rent', 'nav_rent'], ['/about', 'nav_about'], ['/contact', 'nav_contact'], ['/saved', 'nav_saved']].map(([to, k]) => (
              <li key={to}><Link to={to} className="transition hover:text-white">{t(k as 'nav_home')}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-alizarin">{t('sec_types')}</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-snow-darker">
            {types.map((ty) => <li key={ty.id}><Link to={`/properties?type=${ty.id}`} className="transition hover:text-white">{L(ty.plural)}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-alizarin">{t('c_office')}</p>
          <ul className="mt-4 space-y-3.5 text-[15px] text-snow-darker">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-alizarin" />{L(company.address)}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-alizarin" /><span dir="ltr">{company.phone}</span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-alizarin" />{company.email}</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-[13px] text-snow-darkest sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {L({ ar: 'أرمال العقارية', en: 'Armal Real Estate' })}. {t('rights')}.</p>
          <p>{t('demo_note')}</p>
        </div>
      </div>
    </footer>
  )
}
