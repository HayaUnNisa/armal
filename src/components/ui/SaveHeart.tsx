import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../context/StoreContext'
import { useLang } from '../../i18n/LangContext'

/** Heart that, when saved, sketches a small house outline around itself. */
export default function SaveHeart({ id, className = '' }: { id: string; className?: string }) {
  const { saved, toggleSaved } = useStore()
  const { t } = useLang()
  const on = saved.includes(id)
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(id) }}
      aria-pressed={on}
      aria-label={t('save')}
      className={`relative grid h-10 w-10 place-items-center rounded-full bg-white/95 text-revolver shadow-md backdrop-blur transition hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <AnimatePresence>
          {on && (
            <motion.path
              d="M7 19 L20 8 L33 19 V32 H7 Z"
              fill="none" stroke="#DB232E" strokeWidth="1.6" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 1 }} animate={{ pathLength: 1, opacity: [1, 1, 0] }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, opacity: { times: [0, 0.75, 1], duration: 1.2 } }}
            />
          )}
        </AnimatePresence>
      </svg>
      <motion.svg viewBox="0 0 24 24" className="relative h-[18px] w-[18px]" animate={on ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.45 }}>
        <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z" fill={on ? '#DB232E' : 'none'} stroke={on ? '#DB232E' : 'currentColor'} strokeWidth="1.8" strokeLinejoin="round" />
      </motion.svg>
    </button>
  )
}
