import './EbdaaIdentityServicePage.css'

import desktopHero from '../assets/خدمة الهوية البصرية/خلفية عرض.png'
import mobileHero from '../assets/خدمة الهوية البصرية/خلفية طول.png'
import overviewImage from '../assets/خدمة الهوية البصرية/خدمة( تصميم الهوية البصرية ).png'
import logoImage from '../assets/خدمة الهوية البصرية/الشعار.png'
import colorsImage from '../assets/خدمة الهوية البصرية/الالوان.png'
import fontsImage from '../assets/خدمة الهوية البصرية/الخطوط.png 2.png'
import guideImage from '../assets/خدمة الهوية البصرية/دليل الهوية.png'
import applicationImage from '../assets/خدمة الهوية البصرية/تطبيق الهوية.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'تصميم الشعار',
    description:
      'نصمم شعارًا مميزًا يعكس شخصية علامتك التجارية، ويمنحها حضورًا واضحًا وسهل التذكر.',
    image: logoImage,
  },
  {
    title: 'اختيار الألوان',
    description:
      'نختار لوحة ألوان متناسقة تعبّر عن هوية علامتك وتساعد على ترسيخها بصريًا لدى الجمهور.',
    image: colorsImage,
  },
  {
    title: 'الخطوط والطباعة',
    description:
      'نحدد الخطوط المناسبة للعناوين والنصوص لضمان وضوح الرسائل واتساق المظهر في جميع الاستخدامات.',
    image: fontsImage,
  },
  {
    title: 'دليل الهوية البصرية',
    description:
      'نجهز دليلًا يوضح قواعد استخدام الشعار والألوان والخطوط والعناصر البصرية للحفاظ على هوية موحدة.',
    image: guideImage,
  },
  {
    title: 'تطبيق الهوية',
    description:
      'نطبق الهوية على المواد التسويقية والمطبوعات والوسائط الرقمية لتظهر علامتك بصورة متكاملة واحترافية.',
    image: applicationImage,
  },
]

function EbdaaIdentityServicePage() {
  return (
    <main className="service-detail service-detail--content" dir="rtl">
      <section className="service-detail__hero" id="home">
        <picture className="service-detail__hero-media">
          <source media="(max-width: 600px)" srcSet={mobileHero} />
          <img
            src={desktopHero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
        </picture>

        <div className="service-detail__hero-copy">
          <h1>تصميم الهوية البصرية</h1>

          <p className="service-detail__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="service-detail__hero-description">
            نصمم هويات بصرية متكاملة تعكس شخصية علامتك التجارية وتمنحها حضورًا
            مميزًا ومتناسقًا.
          </p>

          <div className="service-detail__actions">
            <a
              className="service-detail__button service-detail__button--primary"
              href="#why-us"
            >
              أعمالنا
            </a>

            <a
              className="service-detail__button service-detail__button--outline"
              href={`${homeUrl}#contact`}
            >
              تواصل معنا
            </a>
          </div>
        </div>

      <svg
        className="hero__wave"
        viewBox="0 0 1279.5 117.04"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g transform="translate(0 -150)">
          <path
            d="M1278.5 251.299C1266 242.299 1179.99 209.799 1017.5 209.799C859 209.799 533.259 266.813 291 266.799C68.5 278.299 7.5 206.299 -1 206.299V171.299C11.5 166.799 81.4576 207.071 270 195.799C574 177.623 861.5 143.484 1005.5 152.484C1163.19 162.34 1272.5 182.299 1278.5 199.299V251.299Z"
            fill="#F0B152"
          />
        </g>
      </svg>
      </section>

      <section className="service-detail__overview">
        <div className="service-detail__overview-card">
          <img
            className="service-detail__overview-image"
            src={overviewImage}
            alt="تصميم الهوية البصرية من إبداع ميديا"
            loading="lazy"
          />

          <div className="service-detail__overview-copy">
            <h2>نصمم هوية بصرية تميّز علامتك وتُرسّخ حضورها</h2>

            <p>
              نساعدك على بناء هوية بصرية متكاملة تعبّر عن شخصية علامتك التجارية،
              وتمنحها مظهرًا احترافيًا يسهل تمييزه وتذكّره.
            </p>

            <p>
              من تصميم الشعار واختيار الألوان والخطوط إلى إعداد دليل الهوية
              وتطبيقها، نحرص على أن تظهر علامتك بصورة متناسقة في جميع نقاط التواصل.
            </p>
          </div>
        </div>

        <h2 className="service-detail__section-title">ماذا نقدم؟</h2>

        <div className="service-detail__feature-grid" id="work">
          {services.map((service) => (
            <article className="service-detail__feature-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <img src={service.image} alt={service.title} loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail__closing" id="identity-contact">
        <h2>امنح علامتك هوية تُعرف بها</h2>

        <p>
          سواء كنت تطلق مشروعًا جديدًا أو تطوّر هوية قائمة، نساعدك على بناء هوية
          بصرية متناسقة تعبّر عن علامتك وتترك انطباعًا واضحًا لدى جمهورك.
        </p>

        <a href={`${homeUrl}#contact`}>تواصل معنا الآن ←</a>
      </section>
    </main>
  )
}

export default EbdaaIdentityServicePage
