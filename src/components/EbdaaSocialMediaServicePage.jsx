import './EbdaaSocialMediaServicePage.css'

import desktopHero from '../assets/hero2.png'
import mobileHero from '../assets/hero1.png'
import overviewImage from '../assets/social1.png'
import planningImage from '../assets/تخطيط المحتوى.png'
import creationImage from '../assets/صناعة وتصميم المحتوى.png'
import publishingImage from '../assets/النشر وإدارة الحسابات.png'
import engagementImage from '../assets/التفاعل مع الجمهور.png'
import performanceImage from '../assets/متابعة الأداء والتحليل.png'
import reportsImage from '../assets/التقارير الشهرية.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'تخطيط المحتوى',
    description:
      'نضع خطة محتوى شهرية منظمة تحدد الموضوعات والأفكار وأنواع المنشورات ومواعيد النشر، بما يضمن استمرارية وتنوع المحتوى.',
    image: planningImage,
  },
  {
    title: 'صناعة وتصميم المحتوى',
    description:
      'ننتج محتوى متكاملًا يحافظ على هوية علامتك، من التصاميم والمنشورات إلى الفيديوهات القصيرة والمحتوى التفاعلي.',
    image: creationImage,
  },
  {
    title: 'النشر وإدارة الحسابات',
    description:
      'نتولى تجهيز المحتوى ونشره وفق جدول منظم، مع مراعاة أفضل أوقات النشر وطبيعة كل منصة.',
    image: publishingImage,
  },
  {
    title: 'التفاعل مع الجمهور',
    description:
      'نتابع التعليقات والرسائل والتفاعلات، ونساعد على بناء علاقة إيجابية ومستدامة بين علامتك التجارية وجمهورها.',
    image: engagementImage,
  },
  {
    title: 'متابعة الأداء والتحليل',
    description:
      'نراقب مؤشرات أداء الحسابات ونحلل التفاعل والوصول ونمو الجمهور، ونستخدم هذه البيانات لتطوير استراتيجية المحتوى.',
    image: performanceImage,
  },
  {
    title: 'التقارير الشهرية',
    description:
      'نقدم تقارير واضحة توضح أداء الحسابات والمحتوى والنتائج، مع مؤشرات تساعدك على فهم ما ينجح وما يحتاج إلى تطوير.',
    image: reportsImage,
  },
]

function EbdaaSocialMediaServicePage() {
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
          <h1>إدارة حسابات السوشل ميديا</h1>

          <p className="service-detail__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="service-detail__hero-description">
            ندير الحسابات باحترافية عالية، من إعداد الخطط إلى إنتاج المحتوى ومتابعة التفاعل.
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
            alt="خدمات إدارة حسابات السوشل ميديا من إبداع ميديا"
            loading="lazy"
          />

          <div className="service-detail__overview-copy">
            <h2>ندير حضورك الرقمي ونبني علاقة أقوى مع جمهورك</h2>

            <p>
              نتولى إدارة حسابات علامتك التجارية على منصات التواصل الاجتماعي من خلال استراتيجية محتوى واضحة، وتصاميم ومحتوى احترافي، ونشر منتظم، ومتابعة مستمرة لتفاعل الجمهور وأداء الحسابات.
            </p>

            <p>
              نساعدك على بناء حضور رقمي متناسق يعكس هوية علامتك التجارية، ويزيد من تفاعل الجمهور، ويحقق أهدافك التسويقية.
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

      <section className="service-detail__closing">
        <h2>ندير حضورك الرقمي ونبني علاقة أقوى مع جمهورك</h2>
        <p>
          نساعدك على بناء حضور رقمي متناسق يعكس هوية علامتك التجارية، ويزيد من تفاعل الجمهور، ويحقق أهدافك التسويقية.
        </p>
        <a href={`${homeUrl}#contact`}>تواصل معنا الآن ←</a>
      </section>
    </main>
  )
}

export default EbdaaSocialMediaServicePage

