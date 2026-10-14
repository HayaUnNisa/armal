import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../i18n/LangContext'
import { easeIO } from '../../lib/motion'
import { Icon } from '../ui/Brand'

/** Language switch: two panels sweep across like a page turning, the layout mirrors underneath. */
export default function LangCurtain() {
  const { switching, lang } = useLang()
  // sweep in the reading direction of the language we're going TO
  const toEn = lang === 'ar'
  const k = toEn ? 1 : -1
  const path = [`${-100 * k}%`, '0%', '0%', `${100 * k}%`]
  return (
    <AnimatePresence>
      {switching && (
        <motion.div key="lc" className="pointer-events-none fixed inset-0 z-[95]" aria-hidden="true" exit={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 bg-alizarin"
            initial={{ x: path[0] }}
            animate={{ x: path }}
            transition={{ duration: 1.1, times: [0, 0.4, 0.55, 1], ease: easeIO }}
          />
          <motion.div
            className="absolute inset-0 grid place-items-center bg-revolver"
            initial={{ x: path[0] }}
            animate={{ x: path }}
            transition={{ duration: 1.1, times: [0, 0.45, 0.6, 1], ease: easeIO, delay: 0.05 }}
          >
            <motion.div initial={{ rotateY: 0 }} animate={{ rotateY: 180 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformPerspective: 600 }}>
              <Icon className="h-14 w-auto text-alizarin" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
