import './whoarewe.css'

import aboutImage from '../assets/about-image.png'
import aboutComputerImage from '../assets/about-computer.png'

function WhoAreWe() {
  return (
    <section className="who-we-are" id="about">
      <div className="who-we-are__card">

        {/* First image */}
        <img
          className="who-we-are__main-image"
          src={aboutImage}
          alt="إبداع ميديا"
        />

        {/* About text */}
        <div className="who-we-are__about">
          <h2>من نحن...؟</h2>

          <p>
            <strong>
              إبداع ميديا للدعاية والإعلان والتسويق الإبداعي
            </strong>
            <br />
            <br />
            إبداع ميديا هي شركة متخصصة في الدعاية والإعلان والتسويق الإبداعي،
            نسعى لابتكار حلول إعلانية فعالة تبرز هوية عملائنا، وتوصل رسائلهم
            بأسلوب فني مؤثر، بخبرة تجمع بين الاحتراف والتجديد. نقدم خدمات تشمل:
            التصميم الإعلاني، إدارة الحملات التسويقية، صناعة المحتوى البصري،
            والهوية البصرية المتكاملة. نحن نؤمن بأن كل علامة تجارية تملك قصة
            تستحق أن تُروى بإبداع... ونحن هنا لنرويها بأفضل صورة.
          </p>

          <a href="#contact" className="who-we-are__button">
            تواصل معنا
          </a>
        </div>

        {/* Vision */}
        <div className="who-we-are__vision">
          <h2>رؤيتنا ...</h2>

          <p>
            <strong>
              إبداع ميديا للدعاية والإعلان والتسويق الإبداعي
            </strong>
            <br />
            <br />

            أن نكون الخيار الأول في عالم الدعاية والإعلان، من خلال تقديم حلول
            إبداعية تُلهم، وتحقق التأثير الحقيقي لعلامات عملائنا.
          </p>

          <a href="#contact" className="who-we-are__button">
            تواصل معنا
          </a>
        </div>

        {/* Second image */}
        <img
          className="who-we-are__computer-image"
          src={aboutComputerImage}
          alt="إبداع ميديا"
        />

      </div>
    </section>
  )
}

export default WhoAreWe