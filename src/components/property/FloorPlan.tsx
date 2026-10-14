import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { planFor, type Property } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'

/** Illustrative floor plan; tapping a room lifts it and shows that room's photo. */
export default function FloorPlan({ p }: { p: Property }) {
  const { t, L } = useLang()
  const rooms = planFor(p)
  const [sel, setSel] = useState(rooms[0]?.id)
  if (!rooms.length) return null
  const r = rooms.find((x) => x.id === sel) ?? rooms[0]
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl bg-snow-dark/30 p-4">
        <svg viewBox="0 0 400 300" className="w-full" role="group" aria-label={t('d_plan')}>
          <rect x="6" y="6" width="388" height="288" fill="#fff" stroke="#38383A" strokeWidth="6" />
          {rooms.map((room) => {
            const on = room.id === r.id
            return (
              <g key={room.id} role="button" tabIndex={0} aria-pressed={on} aria-label={L(room.name)} onClick={() => setSel(room.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(room.id)} className="cursor-pointer outline-none">
                <motion.rect x={room.x} y={room.y} width={room.w} height={room.h} animate={{ fill: on ? '#DB232E' : '#FFFFFF' }} transition={{ duration: 0.35 }} stroke="#38383A" strokeWidth="3" />
                <text x={room.x + room.w / 2} y={room.y + room.h / 2} textAnchor="middle" dominantBaseline="middle" className="pointer-events-none select-none text-[13px] font-bold" fill={on ? '#fff' : '#38383A'}>{L(room.name)}</text>
                <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 17} textAnchor="middle" className="pointer-events-none select-none text-[11px]" fill={on ? '#fff' : '#939598'}>{room.size} {t('sqm')}</text>
              </g>
            )
          })}
        </svg>
        <p className="mt-2 text-center text-[13px] text-manatee">{t('d_plan_hint')}</p>
      </div>
      <div className="relative overflow-hidden rounded-2xl bg-revolver">
        <AnimatePresence mode="wait">
          <motion.div key={r.id} initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }} animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} className="h-full min-h-[240px]">
            <img src={r.image} alt={L(r.name)} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-revolver-dark/85 to-transparent p-5 text-white">
          <p className="text-xl font-bold">{L(r.name)}</p>
          <p className="fact text-[14px] text-snow-dark">{r.size} {t('sqm')}</p>
        </div>
      </div>
    </div>
  )
}
