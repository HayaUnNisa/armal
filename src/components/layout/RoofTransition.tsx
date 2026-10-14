import { motion } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'
import { easeIO } from '../../lib/motion'
import { Icon } from '../ui/Brand'

export const NextTitle = createContext('')

const house = 'polygon(50% 0%, 100% 18%, 100% 100%, 0% 100%, 0% 18%)'

/**
 * "Roof drop": a giant house silhouette (the logo's roof on top) drops down over the page,
 * shows the next page's name under the icon, then keeps falling to reveal the new page.
 */
export default function RoofTransition({ children }: { children: ReactNode }) {
  const title = useContext(NextTitle)
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.55 } }} exit={{ opacity: 1, transition: { duration: 0.7 } }}>
        {children}
      </motion.div>
      {/* red layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[130vh] bg-alizarin"
        style={{ clipPath: house }}
        initial={{ y: '-15vh' }}
        animate={{ y: '110vh', transition: { duration: 0.9, ease: easeIO, delay: 0.2 } }}
        exit={{ y: ['-135vh', '-15vh'], transition: { duration: 0.7, ease: easeIO } }}
      />
      {/* charcoal layer with icon + title */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[91] flex h-[130vh] flex-col items-center justify-center bg-revolver pb-[30vh]"
        style={{ clipPath: house }}
        initial={{ y: '-15vh' }}
        animate={{ y: '110vh', transition: { duration: 0.9, ease: easeIO, delay: 0.1 } }}
        exit={{ y: ['-135vh', '-15vh'], transition: { duration: 0.7, ease: easeIO, delay: 0.08 } }}
      >
        <Icon className="h-16 w-auto text-alizarin" />
        <span className="mt-5 text-2xl font-bold text-white">{title}</span>
      </motion.div>
    </>
  )
}
