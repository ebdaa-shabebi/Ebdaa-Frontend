import './EbdaaVideoServicePage.css'

import desktopHero from '../assets/خدمة عمل إعلانات الفيديو/خلفية عرض.png'
import mobileHero from '../assets/خدمة عمل إعلانات الفيديو/خلفية طول.png'
import overviewImage from '../assets/خدمة عمل إعلانات الفيديو/خدمة ( عمل إعلانات الفيديو ).png'
import motionGraphicsImage from '../assets/خدمة عمل إعلانات الفيديو/إعلانات الموشن جرافيك.png'
import productsServicesImage from '../assets/خدمة عمل إعلانات الفيديو/إعلانات المنتجات والخدمات.png'
import promotionalVideosImage from '../assets/خدمة عمل إعلانات الفيديو/الفيديوهات الترويجية.png'
import voiceoverImage from '../assets/خدمة عمل إعلانات الفيديو/التعليق الصوتي والموسيقى.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'إعلانات الموشن جرافيك',
    description:
      'نحوّل المعلومات والخدمات والأفكار إلى رسوم متحركة واضحة وجذابة، تساعد على إيصال الرسالة بطريقة سهلة وممتعة.',
    image: motionGraphicsImage,
  },
  {
    title: 'إعلانات المنتجات والخدمات',
    description:
      'نصمم فيديوهات تبرز مميزات المنتج أو الخدمة وتوضح قيمتها بطريقة بصرية تساعد الجمهور على فهمها واتخاذ القرار.',
    image: productsServicesImage,
  },
  {
    title: 'الفيديوهات الترويجية',
    description:
      'نصنع فيديوهات تعريفية وترويجية للعلامات التجارية والمنتجات والخدمات والفعاليات والعروض الخاصة.',
    image: promotionalVideosImage,
  },
  {
    title: 'التعليق الصوتي والموسيقى',
    description:
      'نختار الموسيقى والمؤثرات الصوتية المناسبة، وننسق التعليق الصوتي مع المشاهد لتعزيز الرسالة والإحساس العام للفيديو.',
    image: voiceoverImage,
  },
]

function EbdaaVideoServicePage() {
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
          <h1>عمل إعلانات الفيديو</h1>

          <p className="service-detail__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="service-detail__hero-description">
            نقوم بتصوير ومونتاج وتلوين وكتابة سيناريو وإخراج إعلانات فيديو احترافية.
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
            alt="خدمات عمل إعلانات الفيديو من إبداع ميديا"
            loading="lazy"
          />

          <div className="service-detail__overview-copy">
            <h2>نحوّل فكرتك إلى فيديو يلفت الانتباه ويصنع تأثيرًا</h2>

            <p>
              ننتج إعلانات فيديو إبداعية تساعد علامتك التجارية على تقديم منتجاتها
              وخدماتها بطريقة جذابة ومؤثرة، تجمع بين الفكرة الإبداعية والتصميم
              والحركة والصوت والرسالة التسويقية.
            </p>

            <p>
              من فيديوهات منصات التواصل الاجتماعي إلى الإعلانات التجارية والموشن
              جرافيك، نصمم محتوى بصريًا يناسب علامتك التجارية ويجذب جمهورك من
              اللحظة الأولى.
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
        <h2>فيديو مصمم لهدفك</h2>

        <p>
          سواء كنت تريد إطلاق منتج جديد، أو الترويج لخدمة، أو الإعلان عن عرض، أو
          بناء حضور أقوى لعلامتك التجارية، نساعدك على تحويل رسالتك إلى فيديو
          إعلاني واضح وجذاب.
        </p>

        <a href={`${homeUrl}#contact`}>تواصل معنا الآن ←</a>
      </section>
    </main>
  )
}

export default EbdaaVideoServicePage
