
import { useEffect, useState } from 'react'
import safeSrcSet from '../utils/safeSrcSet'
import './hero.css'

import hero1 from '../assets/hero-1.webp'
import hero2 from '../assets/hero-2.webp'
import hero3 from '../assets/hero-3.webp'
import hero4 from '../assets/hero-4.webp'

import mobileHero1 from '../assets/خلفية-طول-1.webp'
import mobileHero2 from '../assets/خلفية-طول-2.webp'
import mobileHero3 from '../assets/خلفية-طول-3.webp'
import mobileHero4 from '../assets/خلفية-طول-4.webp'

const heroImages = [
  { desktop: hero1, mobile: mobileHero1 },
  { desktop: hero2, mobile: mobileHero2 },
  { desktop: hero3, mobile: mobileHero3 },
  { desktop: hero4, mobile: mobileHero4 },
]

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="home">

      <div className="hero__slides" aria-hidden="true">
        {heroImages.map((image, index) => (
          <picture
            key={image.desktop}
            className={`hero__slide ${
              index === activeSlide ? 'hero__slide--active' : ''
            }`}
          >
            <source media="(max-width: 767px)" srcSet={safeSrcSet(image.mobile)} />

            <img src={image.desktop} alt="" />
          </picture>
        ))}
      </div>

      <div className="hero__content">
        <div className="hero__copy">

          <h1>إبداع ميديا للدعاية والإعلان</h1>

          <p className="hero__subtitle">
            إنتاج الفيديو الإعلاني والحلول التسويقية في عدن – اليمن
          </p>

          <div className="hero__tagline">
            <span>نحاكي الإبداع...</span>
            <span>ونصنع التأثير</span>
          </div>

          <p className="hero__description">
            في إبداع ميديا، نحول الأفكار التسويقية إلى تجارب بصرية
            وإعلانية مؤثرة، من التخطيط الإبداعي وصناعة الفكرة إلى
            التصوير والإنتاج والمونتاج وإطلاق الحملات.
          </p>

          <p className="hero__description">
            نقدم خدمات إنتاج الفيديو الإعلاني، والموشن جرافيك،
            والتصوير الاحترافي، وتصميم الهويات البصرية،
            وإدارة الحملات التسويقية، وإعلانات الطرق والشاشات الرقمية.
          </p>

          <p className="hero__description">
            نعمل على بناء حضور أقوى للعلامات التجارية من خلال حلول
            تجمع بين الإبداع والتنفيذ الاحترافي وفهم أهداف العملاء.
          </p>

          <div className="hero__actions">
            <a
              className="hero__button hero__button--primary"
              href="#why-us"
            >
              شاهد أعمالنا
            </a>

            <a
              className="hero__button hero__button--outline"
              href="#contact"
            >
              اطلب عرض سعر
            </a>
          </div>

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
  )
}

export default Hero
