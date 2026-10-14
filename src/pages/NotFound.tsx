import { motion } from 'framer-motion'
import { Icon } from '../components/ui/Brand'
import Button from '../components/ui/Button'
import { useLang } from '../i18n/LangContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="pattern grid min-h-[90vh] place-items-center bg-revolver px-5 pt-20 text-center text-white">
      <div>
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, -8, 6, -3, 0] }} transition={{ delay: 0.9, duration: 1.2 }}>
          <Icon draw delay={0.7} className="mx-auto h-28 w-auto text-alizarin" />
        </motion.div>
        <p className="fact mt-6 text-7xl text-white/20">404</p>
        <h1 className="mt-2 text-3xl">{t('nf_title')}</h1>
        <p className="mt-3 text-snow-darker">{t('nf_text')}</p>
        <Button to="/" className="mt-8">{t('back_home')}</Button>
      </div>
    </section>
  )
}
