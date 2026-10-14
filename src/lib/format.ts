import type { Lang } from '../i18n/LangContext'
import { strings } from '../i18n/strings'
import type { Property } from '../data/site'

export const num = (n: number) => n.toLocaleString('en-US')
export function price(p: Pick<Property, 'price' | 'mode'>, lang: Lang) {
  const v = `${num(p.price)} ${strings.sar[lang]}`
  return p.mode === 'rent' ? `${v} ${strings.per_year[lang]}` : v
}
export function shortPrice(n: number, lang: Lang) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(2)}${lang === 'ar' ? ' مليون' : 'M'}`
  if (n >= 1000) return `${Math.round(n / 1000)}${lang === 'ar' ? ' ألف' : 'K'}`
  return String(n)
}
