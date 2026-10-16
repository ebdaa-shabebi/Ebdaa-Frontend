import './whyus.css'

import experienceIcon from '../assets/1.png'
import teamIcon from '../assets/2.png'
import qualityIcon from '../assets/3.png'
import speedIcon from '../assets/4.png'

const baseUrl = import.meta.env.BASE_URL

const features = [
  {
    title: 'الخبرة الواسعة',
    description:
      'تتمتع إبداع ميديا بخبرة واسعة تمتد لعدد من السنوات، عملت خلالها على تنفيذ العديد من المشاريع باحترافية، مكتسبة من ذلك ثقة عملاء كثر.',
    icon: experienceIcon,
  },
  {
    title: 'فريق العمل',
    description:
      'نقدم في إبداع ميديا مختلف خدمات الدعاية والإعلان بالاعتماد على فرق عملنا المتخصصة في تقديم كل خدمة، مما يوفر لعملائنا الحصول على خدمات مقدمة باحترافية عالية.',
    icon: teamIcon,
  },
  {
    title: 'الجودة العالية',
    description:
      'نعتمد في إبداع ميديا على استخدام أحدث الأدوات وتقديم أنواع الخدمات بما يضمن لعملائنا الحصول على الخدمات التي يحتاجونها بأعلى جودة ممكنة.',
    icon: qualityIcon,
  },
  {
    title: 'الالتزام والسرعة',
    description:
      'إضافة إلى الجودة العالية التي نحرص على أن نقدم بها خدماتنا، فإننا نحرص أيضًا على إنجاز كافة المشاريع في أقل وقت ممكن، وتسليمها لعملائنا في المواعيد المتفق عليها.',
    icon: speedIcon,
  },
]

const portfolioLinks = [
  {
    label: 'تصميم موشن جرافيك',
    path: 'motion-graphics',
  },
  {
    label: 'تصوير وإنتاج فيديو إعلاني',
    path: 'advertising-videos',
  },
  {
    label: 'حملات إعلانية',
    path: 'advertising-campaigns',
  },
  {
    label: 'تصميم مواقع إلكترونية',
    path: 'websites',
  },
]

function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      <div className="why-us__container">
        <h2 className="why-us__title">
          ما يجعل إبداع ميديا الأفضل ؟
        </h2>

        <div className="why-us__features">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`why-us__card why-us__card--${index + 1}`}
            >
              <img
                className="why-us__icon"
                src={feature.icon}
                alt=""
                aria-hidden="true"
              />

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>

        <h2 className="why-us__works-title">
          اعــمــالنـــا
        </h2>

        <div className="why-us__buttons" id="portfolio">
          {portfolioLinks.map((item) => (
            <a
              key={item.path}
              href={`${baseUrl}#/${item.path}`}
              className="why-us__button"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs