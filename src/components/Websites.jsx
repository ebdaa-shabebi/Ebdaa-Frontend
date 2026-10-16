
import './Websites.css'

import desktopImage from '../assets/websites-hero-desktop.png'
import mobileImage from '../assets/websites-hero-mobile.png'

import shamaaLogo from '../assets/Shamaa.png'
import anisPhoneLogo from '../assets/شعار انيس فون.png'
import turboTravelLogo from '../assets/شعار تيربو ترافل.png'

const homeUrl = import.meta.env.BASE_URL

const clients = [
  {
    name: 'أنيس فون',
    logo: anisPhoneLogo,
    url: 'https://shabebi.github.io/anisphone/',
  },
  {
    name: 'تيربو ترافل',
    logo: turboTravelLogo,
    url: 'https://turbotravel.net/',
  },
  {
    name: 'شمعة',
    logo: shamaaLogo,
    url: 'https://shamaa.shop/',
  },
]

function Websites() {
  return (
    <div className="websites-page">
      <section className="websites-page__hero" id="home">
        <picture className="websites-page__background">
          <source media="(max-width: 600px)" srcSet={mobileImage} />
          <img
            src={desktopImage}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
        </picture>

        <div className="websites-page__hero-content">
          <h1>تصميم مواقع إلكترونية</h1>

          <p className="websites-page__tagline">
            <span>نحوّل أفكارك إلى تجربة رقمية ...</span>
            <span>تصنع الفرق</span>
          </p>

          <div className="websites-page__actions">
            <a
              className="websites-page__button websites-page__button--primary"
              href="#clients"
            >
              أعمالنا
            </a>

            <a
              className="websites-page__button websites-page__button--outline"
              href={`${homeUrl}#contact`}
            >
              تواصل معنا
            </a>
          </div>
        </div>

        <svg
          className="websites-page__wave"
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

      <section className="websites-page__clients" id="clients">
        <div className="websites-page__clients-inner">
          <h2>أعمالنا في تصميم المواقع الإلكترونية</h2>

          <div className="websites-page__logo-grid">
            {clients.map((client) => (
              <a
                className="websites-page__logo-card"
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`زيارة موقع ${client.name} في نافذة جديدة`}
                title={`زيارة موقع ${client.name}`}
              >
                <div className="websites-page__logo-card-inner">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Websites
