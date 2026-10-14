import { img } from '../data/images'
import { agents } from '../data/site'
import { Numbers, Services, Values } from '../components/home/Sections'
import PageHead from '../components/ui/PageHead'
import { Heading, Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Brand'
import { useLang } from '../i18n/LangContext'

export default function About() {
  const { t, L, lang } = useLang()
  return (
    <>
      <PageHead l1={t('about_l1')} l2={t('about_l2')} image={img('street')}>{t('about_text')}</PageHead>
      <section className="wrap grid items-center gap-14 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-revolver [clip-path:polygon(50%_0%,100%_10%,100%_100%,0%_100%,0%_10%)]">
            <img src={img('night-building')} alt="" className="aspect-[4/5] w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <Heading kicker={L({ ar: 'قصتنا', en: 'Our story' })} title={L({ ar: 'وسيط تثق به، لا مجرد إعلان', en: 'An advisor you trust, not just a listing' })} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-loose text-revolver-light">{lang === 'ar'
              ? 'بدأت أرمال بفكرة بسيطة: أن تكون تجربة شراء أو استئجار العقار واضحة ومريحة كما يجب. نجمع بين معرفة دقيقة بالأحياء، وتسويق احترافي، وفريق يتابع كل تفصيلة من أول معاينة حتى استلام المفتاح.'
              : 'Armal started with a simple idea: buying or renting property should feel as clear and comfortable as it deserves to. We combine detailed neighbourhood knowledge, professional marketing and a team that follows every detail from the first viewing to the keys.'}</p>
            <p className="mt-4 text-[17px] leading-loose text-revolver-light">{lang === 'ar'
              ? 'نعمل في الرياض وجدة والدمام والخبر، ونخدم العائلات والمستثمرين والشركات.'
              : 'We work across Riyadh, Jeddah, Dammam and Al Khobar, serving families, investors and companies.'}</p>
          </Reveal>
        </div>
      </section>
      <Values />
      <Numbers />
      <section className="wrap py-20">
        <Heading kicker={L({ ar: 'فريقنا', en: 'Our team' })} title={L({ ar: 'مستشارون يعرفون السوق', en: 'Advisors who know the market' })} />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {agents.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-snow-dark p-7">
                <Icon className="absolute -bottom-6 -end-4 h-32 w-auto text-snow-dark/40 transition-transform duration-700 group-hover:-translate-y-2" />
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-revolver text-xl font-bold text-white transition group-hover:bg-alizarin">{a.initials}</span>
                <p className="relative mt-5 text-xl font-bold">{L(a.name)}</p>
                <p className="relative text-[15px] text-manatee-dark">{L(a.role)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Services />
    </>
  )
}
