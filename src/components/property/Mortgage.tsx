import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { num } from '../../lib/format'
import { ease } from '../../lib/motion'

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="block">
      <span className="flex justify-between text-[14px]"><span className="font-bold">{label}</span><span className="fact text-alizarin" dir="ltr">{display}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-alizarin" style={{ background: `linear-gradient(to var(--dir-end, right), #DB232E ${pct}%, #D1D2D2 ${pct}%)` }} />
    </label>
  )
}

/** Finance estimate. The ring shows how the total splits between the amount financed and the profit. */
export default function Mortgage({ price }: { price: number }) {
  const { t, dir } = useLang()
  const [down, setDown] = useState(20)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(4.5)
  const loan = price * (1 - down / 100)
  const m = rate / 100 / 12
  const n = years * 12
  const monthly = m ? (loan * m) / (1 - Math.pow(1 + m, -n)) : loan / n
  const profit = monthly * n - loan
  const share = loan / (loan + profit)
  const R = 70
  const C = 2 * Math.PI * R
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]" style={{ ['--dir-end' as string]: dir === 'rtl' ? 'left' : 'right' }}>
      <div className="space-y-6">
        <Slider label={t('d_down')} value={down} min={10} max={50} step={5} onChange={setDown} display={`${down}% · ${num(Math.round(price * down / 100))}`} />
        <Slider label={t('d_years')} value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} ${t('d_yrs')}`} />
        <Slider label={t('d_rate')} value={rate} min={2.5} max={8} step={0.25} onChange={setRate} display={`${rate.toFixed(2)}%`} />
        <p className="text-[12px] text-manatee">{t('d_estimate')}</p>
      </div>
      <div className="relative mx-auto grid h-56 w-56 place-items-center">
        <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="90" cy="90" r={R} fill="none" stroke="#38383A" strokeWidth="18" />
          <motion.circle cx="90" cy="90" r={R} fill="none" stroke="#DB232E" strokeWidth="18" strokeDasharray={C} initial={false} animate={{ strokeDashoffset: C * (1 - share) }} transition={{ duration: 0.8, ease }} />
        </svg>
        <div className="text-center">
          <p className="text-[12px] text-manatee-dark">{t('d_monthly')}</p>
          <p className="fact text-3xl text-revolver">{num(Math.round(monthly))}</p>
          <p className="text-[12px] font-bold text-manatee-dark">{t('sar')}</p>
        </div>
      </div>
      <div className="flex gap-6 text-[13px] md:col-span-2">
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-alizarin" />{t('d_loan')}: <b className="fact">{num(Math.round(loan))}</b></span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-revolver" />{t('d_profit')}: <b className="fact">{num(Math.round(profit))}</b></span>
      </div>
    </div>
  )
}
