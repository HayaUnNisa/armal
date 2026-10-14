import Hero from '../components/home/Hero'
import { Cities, Featured, ListCTA, Numbers, Services, TypeStrip, Values } from '../components/home/Sections'

export default function Home() {
  return (
    <>
      <Hero />
      <TypeStrip />
      <Featured />
      <Values />
      <Cities />
      <Numbers />
      <Services />
      <ListCTA />
    </>
  )
}
