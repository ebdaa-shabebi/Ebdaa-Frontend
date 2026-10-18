import './EbdaaContentServicePage.css'

import desktopHero from '../assets/خلفية عرض.png'
import mobileHero from '../assets/خلفية طول.png'
import overviewImage from '../assets/خدمة ( صناعة المحتوى التسويقي ).png'
import writingImage from '../assets/كتابة المحتوى التسويقي.png'
import strategyImage from '../assets/استراتيجية المحتوى.png'
import interactiveImage from '../assets/المحتوى التفاعلي.png'
import videoImage from '../assets/محتوى الفيديو.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'كتابة المحتوى التسويقي',
    description:
      'نكتب نصوصًا تسويقية واضحة وجذابة تساعد على تقديم منتجاتك وخدماتك بطريقة تقنع الجمهور وتحفزه على التفاعل.',
    image: writingImage,
  },
  {
    title: 'استراتيجية المحتوى',
    description:
      'نحدد أهداف المحتوى والجمهور المستهدف والرسائل التي تريد علامتك إيصالها، ونبني خطة محتوى مناسبة لنشاطك.',
    image: strategyImage,
  },
  {
    title: 'محتوى الفيديو',
    description:
      'ننتج محتوى فيديو قصيرًا مناسبًا للمنصات الرقمية، مثل Reels وStories وTikTok، بهدف زيادة الوصول والتفاعل.',
    image: videoImage,
  },
  {
    title: 'المحتوى التفاعلي',
    description:
      'نصمم أفكارًا تشجع الجمهور على المشاركة والتفاعل، مثل الأسئلة والاستطلاعات والمسابقات والمحتوى القائم على المشاركة.',
    image: interactiveImage,
  },
]

function EbdaaContentServicePage() {
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
          <h1>صناعة المحتوى التسويقي</h1>

          <p className="service-detail__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="service-detail__hero-description">
مع إبداع ميديا نصنع لك محتوى تسويقي يلتقط انتباه العملاء ويثير اهتمامهم. نحن من نصنعها .
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
            alt="خدمات صناعة المحتوى التسويقي من إبداع ميديا"
            loading="lazy"
          />

          <div className="service-detail__overview-copy">
            <h2>نصنع محتوى يعبّر عن علامتك ويجذب جمهورك</h2>

            <p>
              نحوّل أفكار علامتك التجارية ومنتجاتك وخدماتك إلى محتوى تسويقي
              إبداعي يساعدك على الوصول إلى جمهورك، وبناء حضور قوي، وتحقيق
              أهدافك التسويقية.
            </p>

            <p>
              من الفكرة وكتابة المحتوى إلى التصميم والفيديو والنشر، نعمل على
              صناعة محتوى متكامل يحافظ على هوية علامتك التجارية ويتناسب مع
              طبيعة كل منصة وجمهور.
            </p>
          </div>
        </div>

        <h2 className="service-detail__section-title">ماذا نقدم؟</h2>

        <div className="service-detail__feature-grid" id="work">
          {services.map((service) => (
            <article className="service-detail__feature-card" key={service.title}>
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail__closing">
        <h2>اجعل كل قطعة محتوى تخدم علامتك</h2>

        <p>
          سواء كنت تريد بناء حضور رقمي من البداية، أو تطوير محتواك الحالي، أو
          إطلاق منتج أو خدمة جديدة، نساعدك على بناء محتوى متناسق يعبّر عن
          علامتك ويخاطب جمهورك.
        </p>

        <a href={`${homeUrl}#contact`}>
          تواصل معنا الآن ←
        </a>
      </section>
    </main>
  )
}

export default EbdaaContentServicePage
