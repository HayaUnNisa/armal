import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { strings, type StringKey } from './strings'

export type Lang = 'ar' | 'en'
export type Bi = { ar: string; en: string }

type Ctx = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  t: (k: StringKey) => string
  L: (v: Bi) => string
  setLang: (l: Lang) => void
  switching: boolean
}
const LangCtx = createContext<Ctx | null>(null)

const initial = (): Lang => {
  try { return localStorage.getItem('armal-lang') === 'en' ? 'en' : 'ar' } catch { return 'ar' }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('armal-lang', lang) } catch { /* ignore */ }
  }, [lang])

  // The "mirror" switch: a panel sweeps across, the language flips underneath, then it sweeps away.
  const setLang = useCallback((l: Lang) => {
    if (l === lang || switching) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setLangState(l); return }
    setSwitching(true)
    setTimeout(() => setLangState(l), 520)
    setTimeout(() => setSwitching(false), 1150)
  }, [lang, switching])

  const t = useCallback((k: StringKey) => strings[k][lang], [lang])
  const L = useCallback((v: Bi) => v[lang], [lang])
  return <LangCtx.Provider value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', t, L, setLang, switching }}>{children}</LangCtx.Provider>
}

export function useLang() {
  const v = useContext(LangCtx)
  if (!v) throw new Error('useLang must be inside LangProvider')
  return v
}
