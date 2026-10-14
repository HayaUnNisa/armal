import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { easeIO } from '../../lib/motion'
import { Icon } from '../ui/Brand'

/** First load: the "a" rises, its roof drops onto it, then the screen lifts away in a roof shape. */
export default function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => { const t = setTimeout(() => setShow(false), 1700); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pattern fixed inset-0 z-[200] grid place-items-center bg-revolver"
          initial={{ clipPath: 'polygon(50% -60%, 160% 20%, 160% 100%, -60% 100%, -60% 20%)' }}
          exit={{ clipPath: 'polygon(50% -60%, 160% 20%, 160% -80%, -60% -80%, -60% 20%)' }}
          transition={{ duration: 0.9, ease: easeIO }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <Icon draw className="h-24 w-auto text-alizarin" />
            <div className="mt-6 h-[3px] w-28 overflow-hidden rounded bg-white/10">
              <motion.div className="h-full bg-alizarin" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: easeIO }} style={{ transformOrigin: 'var(--o, left)' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export const boot = performance.now()
export const introDelay = () => (performance.now() - boot < 1800 ? 1.75 : 0.65)
