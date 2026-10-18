import './EbdaaDigitalAdsServicePage.css'

import desktopHero from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/خلفية عرض.png'
import mobileHero from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/خلفية طول.png'
import overviewImage from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/خدمة ( الاعلانات الرقمية والمطبوعة ).png'
import digitalAdsImage from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/الإعلانات الرقمية.png'
import printAdsImage from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/الإعلانات المطبوعة.png'
import sizingImage from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/تكييف التصميم لمختلف المقاسات.png'
import brandIdentityImage from '../assets/خدمة تصميم الإعلانات الرقمية والمطبوعة/التصميم حسب هوية العلامة.png'

const homeUrl = import.meta.env.BASE_URL

const services = [
  {
    title: 'الإعلانات الرقمية',
    description:
      'تصميم إعلانات مخصصة للمنصات الرقمية ووسائل التواصل الاجتماعي، بمقاسات وتنسيقات مناسبة لكل منصة.',
    items: [
      'منشورات إعلانية',
      'إعلانات القصص والـ Reels',
      'إعلانات المنتجات والخدمات',
      'إعلانات العروض والتخفيضات',
      'البانرات الرقمية',
      'تصاميم الحملات الإعلانية',
    ],
    image: digitalAdsImage,
  },
  {
    title: 'التصميم حسب هوية العلامة',
    description:
      'نستخدم ألوان وخطوط وعناصر الهوية البصرية للعلامة التجارية لضمان ظهور جميع الإعلانات بأسلوب متناسق واحترافي.',
    image: brandIdentityImage,
  },
  {
    title: 'تكييف التصميم لمختلف المقاسات',
    description:
      'نجهز التصميم بأحجام وتنسيقات مختلفة بما يتناسب مع المنصة أو وسيلة العرض، دون التأثير على وضوح الرسالة أو جودة التصميم.',
    image: sizingImage,
  },
  {
    title: 'الإعلانات المطبوعة',
    description:
      'تصميم مواد إعلانية جاهزة للطباعة بجودة عالية، مع مراعاة المقاسات ومتطلبات الطباعة.',
    items: [
      'البروشورات',
      'الفلايرات',
      'البوسترات',
      'الكتيبات',
      'النشرات الإعلانية',
      'الكتالوجات',
      'بطاقات الدعوة',
      'اللوحات والمواد الدعائية',
    ],
    image: printAdsImage,
  },
]

function EbdaaDigitalAdsServicePage() {
  return (
    <main className="ebdaa-digital-ads-page" dir="rtl">
      <section className="digital-ads__hero" id="home">
        <picture className="digital-ads__hero-media">
          <source media="(max-width: 600px)" srcSet={mobileHero} />
          <img
            src={desktopHero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
        </picture>

        <div className="digital-ads__hero-copy">
          <h1>تصميم الإعلانات الرقمية والمطبوعة</h1>

          <p className="digital-ads__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <p className="digital-ads__hero-description">
            نُصمم مواد إعلانية عالية الجودة، سواء للاستخدام الرقمي أو المطبوع،
            تجمع بين الإبداع البصري والوضوح في رسالة الإعلان لضمان تحقيق أفضل
            تفاعل مع الجمهور المستهدف.
          </p>

          <div className="digital-ads__actions">
            <a
              className="digital-ads__button digital-ads__button--primary"
              href="#why-us"
            >
              أعمالنا
            </a>
            <a
              className="digital-ads__button digital-ads__button--outline"
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

      <section className="digital-ads__overview">
        <div className="digital-ads__overview-card">
          <img
            className="digital-ads__overview-image"
            src={overviewImage}
            alt="خدمات تصميم الإعلانات الرقمية والمطبوعة من إبداع ميديا"
            loading="lazy"
          />

          <div className="digital-ads__overview-copy">
            <h2>نصمم إعلانات تلفت الانتباه وتوصل رسالتك بوضوح</h2>
            <p>
              نحوّل أفكارك ورسائلك التسويقية إلى تصاميم إعلانية احترافية تجمع
              بين الإبداع والوضوح، وتناسب مختلف المنصات الرقمية ووسائل الإعلان
              المطبوعة.
            </p>
            <p>
              سواء كنت بحاجة إلى إعلان لمنصات التواصل الاجتماعي، أو لوحة إعلانية،
              أو بروشور مطبوع، نحرص على أن يكون التصميم متناسقًا مع هوية علامتك
              التجارية ومناسبًا للجمهور المستهدف.
            </p>
          </div>
        </div>

        <h2 className="digital-ads__section-title">ماذا نقدم؟</h2>

        <div className="digital-ads__feature-grid" id="work">
          {services.map((service) => (
            <article className="digital-ads__feature-card" key={service.title}>
              <h3>{service.title}</h3>

              <div className="digital-ads__feature-card-content">
                <p>{service.description}</p>

                {service.items && (
                  <div className="digital-ads__feature-card-includes">
                    <strong>تشمل:</strong>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <img src={service.image} alt={service.title} loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      <section className="digital-ads__closing">
        <h2>اجعل إعلانك هو أول ما يلفت الانتباه</h2>
        <p>
          من إعلان رقمي على شاشة الهاتف إلى لوحة إعلانية في الشارع، نصمم لك مواد
          إعلانية تعكس قيمة علامتك وتوصل رسالتك بالشكل الصحيح.
        </p>
        <a href={`${homeUrl}#contact`}>تواصل معنا الآن ←</a>
      </section>
    </main>
  )
}

export default EbdaaDigitalAdsServicePage
