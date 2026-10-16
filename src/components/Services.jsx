import './services.css'

import contentImage from '../assets/service-content.png'
import campaignsImage from '../assets/service-campaigns.png'
import identityImage from '../assets/service-identity.png'
import digitalImage from '../assets/service-digital.png'
import socialImage from '../assets/service-social.png'
import videoImage from '../assets/service-video.png'

const baseUrl = import.meta.env.BASE_URL

const services = [
  {
    className: 'service-card--content',
    title: 'صناعة المحتوى التسويقي',
    description:
      'مع إبداع ميديا نصنع لك محتوى تسويقي يلتقط انتباه العملاء ويثير اهتمامهم. نحن من نصنعها.',
    image: contentImage,
    path: 'services/content',
  },
  {
    className: 'service-card--campaigns',
    title: 'إدارة الحملات الإعلانية',
    description:
      'نخطط وننفذ حملات إعلانية فعالة عبر الوسائط المختلفة، مع التركيز على إيصال الرسالة التسويقية بدقة وتحقيق أقصى تأثير ممكن ضمن الأهداف المحددة.',
    image: campaignsImage,
    path: 'services/campaigns',
  },
  {
    className: 'service-card--identity',
    title: 'تصميم الهوية البصرية',
    description:
      'نقدم حلولاً متكاملة لتصميم الهوية البصرية، تشمل الشعار، الألوان، والنمط البصري العام، بما يعكس رؤية العلامة التجارية ويعزز حضورها في أذهان الجمهور.',
    image: identityImage,
    path: 'services/identity',
  },
  {
    className: 'service-card--digital',
    title: 'تصميم الإعلانات الرقمية والمطبوعة',
    description:
      'نُصمم مواد إعلانية عالية الجودة، سواء للاستخدام الرقمي أو المطبوع، تجمع بين الإبداع البصري والوضوح في رسالة الإعلان لضمان تحقيق أفضل تفاعل مع الجمهور المستهدف.',
    image: digitalImage,
    path: 'services/digital-ads',
  },
  {
    className: 'service-card--social',
    title: 'إدارة حسابات السوشيال ميديا',
    description:
      'ندير حسابات التواصل الاجتماعي ونقدم محتوى إبداعياً يساهم في بناء حضور قوي للعلامة التجارية.',
    image: socialImage,
    path: 'services/social-media',
  },
  {
    className: 'service-card--video',
    title: 'عمل إعلانات الفيديو',
    description:
      'ننتج محتوى فيديو إبداعياً يعكس هوية العلامة التجارية ويقدم رسائل إعلانية مؤثرة.',
    image: videoImage,
    path: 'services/video',
  },
]

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__inner">
        <h2 className="services__title">خـدمـاتــنـــا</h2>

        <p className="services__subtitle">
          نقدم العديد من خدمات التسويق والإعلان والخدمات التسويقية المختلفة
        </p>

        <div className="services__cards">
          {services.map((service) => (
            <a
              key={service.className}
              href={`${baseUrl}#/${service.path}`}
              className={`service-card ${service.className}`}
              aria-label={`عرض خدمة ${service.title}`}
            >
              <div className="service-card__text">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <img
                className="service-card__image"
                src={service.image}
                alt=""
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services