import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Heart, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { useLang } from '../../i18n/LangContext'
import { ease, easeIO } from '../../lib/motion'
import { Icon, LogoLink } from '../ui/Brand'
import Button from '../ui/Button'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const { saved } = useStore()
  const { pathname, search } = useLocation()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 30))
  useEffect(() => setOpen(false), [pathname, search])
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : '' }, [open])

  const links = [
    { to: '/properties?mode=buy', label: t('nav_buy'), match: pathname.startsWith('/properties') && !search.includes('rent') },
    { to: '/properties?mode=rent', label: t('nav_rent'), match: pathname.startsWith('/properties') && search.includes('rent') },
    { to: '/about', label: t('nav_about'), match: pathname === '/about' },
    { to: '/contact', label: t('nav_contact'), match: pathname === '/contact' },
  ]

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || pathname !== '/' ? 'bg-revolver/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)] backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="wrap flex h-20 items-center gap-8">
          <LogoLink light />
          <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`relative px-4 py-2 text-[15px] font-bold transition-colors ${l.match ? 'text-white' : 'text-snow-darker hover:text-white'}`}>
                {l.match && (
                  <motion.svg layoutId="nav-roof" viewBox="0 0 24 8" className="absolute -top-1 left-1/2 h-2 w-6 -translate-x-1/2" transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
                    <path d="M1 7 L12 1 L23 7" fill="none" stroke="#DB232E" strokeWidth="2.4" />
                  </motion.svg>
                )}
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="rounded-lg px-3 py-2 text-[14px] font-bold text-white transition hover:bg-white/10" lang={lang === 'ar' ? 'en' : 'ar'}>
              {t('lang_switch')}
            </button>
            <Link to="/saved" aria-label={t('nav_saved')} className="relative grid h-11 w-11 place-items-center rounded-lg text-white transition hover:bg-white/10">
              <Heart className="h-5 w-5" />
              <AnimatePresence>
                {saved.length > 0 && (
                  <motion.span key={saved.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="fact absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-alizarin px-1 text-[11px] text-white">
                    {saved.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Button to="/contact?tab=list" className="hidden !px-5 !py-3 !text-[14px] md:inline-flex">{t('nav_list')}</Button>
            <button onClick={() => setOpen(true)} aria-label="Menu" aria-expanded={open} className="grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pattern fixed inset-0 z-[70] flex flex-col bg-revolver lg:hidden"
            initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)' }}
            animate={{ clipPath: 'polygon(50% -40%, 140% 30%, 140% 140%, -40% 140%, -40% 30%)' }}
            exit={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)' }}
            transition={{ duration: 0.75, ease: easeIO }}
          >
            <div className="wrap flex h-20 items-center justify-between">
              <LogoLink light />
              <button onClick={() => setOpen(false)} aria-label={t('close')} className="grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10"><X className="h-6 w-6" /></button>
            </div>
            <nav className="wrap flex flex-1 flex-col justify-center gap-1">
              {[{ to: '/', label: t('nav_home') }, ...links, { to: '/saved', label: t('nav_saved') }].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.05 }}>
                  <NavLink to={l.to} end className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-bold text-white">
                    {l.label}
                    <Icon className="h-6 w-auto text-alizarin opacity-70" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="wrap pb-8"><Button to="/contact?tab=list" full>{t('nav_list')}</Button></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
