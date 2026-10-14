import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import LangCurtain from './components/layout/LangCurtain'
import Navbar from './components/layout/Navbar'
import Preloader from './components/layout/Preloader'
import RoofTransition, { NextTitle } from './components/layout/RoofTransition'
import CompareTray from './components/listing/CompareTray'
import ViewingDrawer from './components/property/ViewingDrawer'
import { StoreProvider } from './context/StoreContext'
import { getProperty } from './data/site'
import { LangProvider, useLang } from './i18n/LangContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Properties from './pages/Properties'
import PropertyPage from './pages/PropertyPage'
import Saved from './pages/Saved'

function Pages() {
  const location = useLocation()
  const { t, L } = useLang()
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/properties', element: <Properties /> },
    { path: '/property/:id', element: <PropertyPage /> },
    { path: '/saved', element: <Saved /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '*', element: <NotFound /> },
  ].map((r) => ({ ...r, element: <RoofTransition>{r.element}</RoofTransition> }))
  const el = useRoutes(routes, location)

  const path = location.pathname
  const prop = path.startsWith('/property/') ? getProperty(path.split('/')[2]) : undefined
  const title = path === '/' ? t('nav_home') : path === '/properties' ? t('nav_properties') : prop ? L(prop.title) : path === '/saved' ? t('nav_saved') : path === '/about' ? t('nav_about') : path === '/contact' ? t('nav_contact') : '404'
  useEffect(() => {
    document.title = `${title} | ${L({ ar: 'أرمال العقارية', en: 'Armal Real Estate' })}`
  }, [title, L])

  return (
    <NextTitle.Provider value={title}>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}>
        {el && <div key={path}>{el}</div>}
      </AnimatePresence>
    </NextTitle.Provider>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <StoreProvider>
          <Preloader />
          <Navbar />
          <main id="main"><Pages /></main>
          <Footer />
          <CompareTray />
          <ViewingDrawer />
          <LangCurtain />
        </StoreProvider>
      </LangProvider>
    </MotionConfig>
  )
}
