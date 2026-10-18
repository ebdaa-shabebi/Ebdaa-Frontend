import './AdvertisingVideos.css'

import desktopImage from '../assets/خلفية الفيديوهات الاعلانية عرض.png 3.png'
import mobileImage from '../assets/خلفية الفيديوهات الاعلانية طول.png 2.png'
import DynamicPortfolio from './DynamicPortfolio'

const homeUrl = import.meta.env.BASE_URL

function AdvertisingVideos() {
  return (
    <div className="service-page service-page--advertisingvideos">
      <section className="service-page__hero" id="home">
        <picture className="service-page__background">
          <source media="(max-width: 600px)" srcSet={mobileImage} />
          <img src={desktopImage} alt="" aria-hidden="true" />
        </picture>

        <div className="service-page__hero-content">
          <h1>تصوير وإنتاج فيديو إعلاني</h1>

          <p className="service-page__tagline">
            <span>نحاكي الإبداع ...</span>
            <span>ونصنع التأثير</span>
          </p>

          <div className="service-page__actions">
            <a
              className="service-page__button service-page__button--primary"
              href="#clients"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('clients')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
            >
              أعمالنا
            </a>

            <a
              className="service-page__button service-page__button--outline"
              href={`${homeUrl}#contact`}
            >
              تواصل معنا
            </a>
          </div>
        </div>

        <a
          className="hero-scroll-arrow"
          href="#clients"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('clients')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 9L12 16L19 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <svg
          className="service-page__wave"
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

      <section className="service-page__clients" id="clients">
        <div className="service-page__clients-inner">
          <h2>أعمالنا في تصوير وإنتاج الفيديو الإعلاني</h2>
          <DynamicPortfolio category="video" />
        </div>
      </section>
    </div>
  )
}

export default AdvertisingVideos
