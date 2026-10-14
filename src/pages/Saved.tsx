import { AnimatePresence, motion } from 'framer-motion'
import PropertyCard from '../components/listing/PropertyCard'
import { Icon } from '../components/ui/Brand'
import Button from '../components/ui/Button'
import PageHead from '../components/ui/PageHead'
import { useStore } from '../context/StoreContext'
import { properties } from '../data/site'
import { useLang } from '../i18n/LangContext'

export default function Saved() {
  const { t } = useLang()
  const { saved } = useStore()
  const list = properties.filter((p) => saved.includes(p.id))
  return (
    <>
      <PageHead l1={t('saved_title')} />
      <section className="wrap min-h-[40vh] py-14">
        {list.length === 0 ? (
          <div className="mx-auto max-w-md py-10 text-center">
            <Icon className="mx-auto h-16 w-auto text-snow-dark" />
            <p className="mt-6 text-manatee-dark">{t('saved_empty')}</p>
            <Button to="/properties" className="mt-8">{t('browse')}</Button>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }}><PropertyCard p={p} /></motion.div>)}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}
