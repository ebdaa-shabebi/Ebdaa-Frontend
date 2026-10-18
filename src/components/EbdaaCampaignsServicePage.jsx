import './EbdaaCampaignsServicePage.css'

import desktopHero from '../assets/hero11.png'
import mobileHero from '../assets/hero12.png'
import overviewImage from '../assets/service.png'
import audienceImage from '../assets/تحديد الجمهور.png'
import launchImage from '../assets/إطلاق وإدارة الحملات.png'
import strategyImage from '../assets/التخطيط والاستراتيجية.png'
import monitoringImage from '../assets/المراقبة والتحسين.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'التخطيط والاستراتيجية',
    description:
      'نحدد أهداف الحملة والجمهور المستهدف والرسالة الإعلانية، ونضع استراتيجية مناسبة لطبيعة نشاطك وميزانيتك.',
    image: strategyImage,
  },
  {
    title: 'تحديد الجمهور',
    description:
      'نحلل الجمهور المستهدف ونحدد الشرائح الأكثر ملاءمة لمنتجك أو خدمتك، للوصول إلى الأشخاص الأكثر اهتمامًا بما تقدمه.',
    image: audienceImage,
  },
  {
    title: 'إطلاق وإدارة الحملات',
    description:
      'نقوم بإعداد الحملات وإطلاقها وإدارة ميزانيتها ومتابعة نتائجها على المنصات الإعلانية المناسبة.',
    image: launchImage,
  },
  {
    title: 'المراقبة والتحسين',
    description:
      'لا تنتهي الحملة بمجرد إطلاقها. نتابع الأداء باستمرار ونختبر النتائج ونُجري التحسينات اللازمة لرفع كفاءة الحملة.',
    image: monitoringImage,
  },
]

function EbdaaCampaignsServicePage() {
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
          <h1>إدارة الحملات الإعلانية</h1>

          <p className="service-detail__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="service-detail__hero-description">
            نخطط وننفذ حملات إعلانية فعالة عبر الوسائط المختلفة، مع التركيز على
            إيصال الرسالة التسويقية بدقة وتحقيق أقصى تأثير ممكن ضمن الأهداف
            المحددة.
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
            alt="إدارة الحملات الإعلانية من إبداع ميديا"
            loading="lazy"
          />

          <div className="service-detail__overview-copy">
            <h2>نحوّل إعلاناتك إلى حملات تحقق نتائج</h2>

            <p>
              نخطط وندير حملات إعلانية متكاملة تساعد علامتك التجارية على الوصول
              إلى الجمهور المناسب، في الوقت والمكان المناسبين، من خلال استراتيجية
              مدروسة ومتابعة مستمرة للأداء.
            </p>

            <p>
              من تحديد الهدف والجمهور، إلى تصميم المحتوى وإطلاق الحملة وتحليل
              النتائج، نعمل على إدارة جميع مراحل الحملة لتحقيق أفضل استفادة من
              ميزانيتك الإعلانية.
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
        <h2>اجعل ميزانيتك الإعلانية تعمل بشكل أفضل</h2>

        <p>
          سواء كنت تطلق منتجًا جديدًا، أو تريد زيادة المبيعات، أو بناء الوعي
          بعلامتك التجارية، نساعدك على تحويل أهدافك إلى حملة إعلانية مدروسة
          وقابلة للقياس.
        </p>

        <a href={`${homeUrl}#contact`}>تواصل معنا الآن ←</a>
      </section>
    </main>
  )
}

export default EbdaaCampaignsServicePage
