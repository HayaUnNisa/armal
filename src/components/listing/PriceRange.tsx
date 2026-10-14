import { useLang } from '../../i18n/LangContext'
import { shortPrice } from '../../lib/format'

/** Dual-handle price slider with a histogram of listing prices underneath (bars inside the range light up red). */
export default function PriceRange({ prices, min, max, lo, hi, onChange }: { prices: number[]; min: number; max: number; lo: number; hi: number; onChange: (lo: number, hi: number) => void }) {
  const { lang, dir } = useLang()
  const bins = 18
  const span = Math.max(1, max - min)
  const counts = Array.from({ length: bins }, () => 0)
  prices.forEach((p) => { counts[Math.min(bins - 1, Math.floor(((p - min) / span) * bins))]++ })
  const top = Math.max(1, ...counts)
  const step = span / 200
  const pct = (v: number) => ((v - min) / span) * 100
  return (
    <div>
      <div className="flex h-14 items-end gap-[3px]" aria-hidden="true">
        {counts.map((c, i) => {
          const from = min + (span * i) / bins
          const inside = from + span / bins >= lo && from <= hi
          return <div key={i} className={`flex-1 rounded-t-sm transition-colors duration-300 ${inside ? 'bg-alizarin' : 'bg-snow-dark'}`} style={{ height: `${c ? 14 + (c / top) * 86 : 6}%` }} />
        })}
      </div>
      <div className="relative h-6" dir="ltr">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded bg-snow-dark" />
        <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-alizarin" style={dir === 'rtl' ? { right: `${pct(lo)}%`, left: `${100 - pct(hi)}%` } : { left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        {[lo, hi].map((v, k) => (
          <input
            key={k}
            type="range" min={min} max={max} step={step} value={v}
            aria-label={k === 0 ? 'Minimum price' : 'Maximum price'}
            onChange={(e) => { const n = +e.target.value; if (k === 0) onChange(Math.min(n, hi - step), hi); else onChange(lo, Math.max(n, lo + step)) }}
            className="range-thumb pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent"
            style={dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[13px] font-bold text-revolver">
        <span>{shortPrice(lo, lang)}</span><span>{shortPrice(hi, lang)}</span>
      </div>
    </div>
  )
}
