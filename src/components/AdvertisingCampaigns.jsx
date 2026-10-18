import { useEffect, useMemo, useState } from 'react'
import './AdvertisingCampaigns.css'

import desktopImage from '../assets/خلفية الحملات الاعلانية عرض.png'
import mobileImage from '../assets/خلفية الحملات الاعلانية طول.png 2.png'

const API_URL = 'https://ebdaa-backend-zbiy.onrender.com'
const BILLBOARD_LOGOS_CATEGORY = 'billboard-portfolio'
const homeUrl = import.meta.env.BASE_URL

async function readResponse(response) {
  const raw = await response.text()
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return { message: raw }
  }
}

function LoadingIndicator({ label }) {
  return (
    <div className="advertisingcampaigns__loading" role="status" aria-live="polite">
      <div className="advertisingcampaigns__loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {label ? <p>{label}</p> : null}
    </div>
  )
}

function Notice({ children, error = false, action }) {
  return (
    <div
      className={`advertisingcampaigns__notice${error ? ' advertisingcampaigns__notice--error' : ''}`}
      role={error ? 'alert' : undefined}
    >
      <div className="advertisingcampaigns__notice-icon" aria-hidden="true">
        {error ? '!' : '✦'}
      </div>
      <p>{children}</p>
      {action}
    </div>
  )
}

function AdvertisingCampaigns() {
  const [logos, setLogos] = useState([])
  const [loadingLogos, setLoadingLogos] = useState(true)
  const [logosError, setLogosError] = useState('')
  const [retryLogos, setRetryLogos] = useState(0)

  const [selectedLogoId, setSelectedLogoId] = useState(null)
  const [billboardImages, setBillboardImages] = useState([])
  const [loadingBillboards, setLoadingBillboards] = useState(false)
  const [billboardsError, setBillboardsError] = useState('')
  const [retryBillboards, setRetryBillboards] = useState(0)

  const selectedLogo = useMemo(
    () => logos.find((logo) => String(logo.id) === String(selectedLogoId)) || null,
    [logos, selectedLogoId],
  )

  // Company logos live in the shared images table under this category.
  useEffect(() => {
    const controller = new AbortController()

    async function loadLogos() {
      setLoadingLogos(true)
      setLogosError('')

      try {
        const response = await fetch(
          `${API_URL}/images/${BILLBOARD_LOGOS_CATEGORY}`,
          { signal: controller.signal },
        )
        const data = await readResponse(response)

        if (!response.ok) {
          throw new Error(data?.message || `Logo request failed: ${response.status}`)
        }
        if (!Array.isArray(data)) {
          throw new Error('Unexpected logo response')
        }

        if (!controller.signal.aborted) setLogos(data)
      } catch (error) {
        if (error.name === 'AbortError' || controller.signal.aborted) return
        console.error('Advertising campaign logos failed to load:', error)
        setLogos([])
        setLogosError('تعذّر تحميل شعارات الشركات حاليًا. تحقق من الاتصال وحاول مرة أخرى.')
      } finally {
        if (!controller.signal.aborted) setLoadingLogos(false)
      }
    }

    loadLogos()
    return () => controller.abort()
  }, [retryLogos])

  // Billboard photos for a logo use category `billboard-portfolio-<logo id>`.
  // This reuses the existing images table and GET /images/:category endpoint.
  useEffect(() => {
    if (selectedLogoId == null) {
      setBillboardImages([])
      setBillboardsError('')
      setLoadingBillboards(false)
      return undefined
    }

    const controller = new AbortController()

    async function loadBillboardImages() {
      setLoadingBillboards(true)
      setBillboardsError('')
      setBillboardImages([])

      const category = `${BILLBOARD_LOGOS_CATEGORY}-${selectedLogoId}`

      try {
        const response = await fetch(
          `${API_URL}/images/${encodeURIComponent(category)}`,
          { signal: controller.signal },
        )
        const data = await readResponse(response)

        if (!response.ok) {
          throw new Error(data?.message || `Billboard request failed: ${response.status}`)
        }
        if (!Array.isArray(data)) {
          throw new Error('Unexpected billboard image response')
        }

        if (!controller.signal.aborted) setBillboardImages(data)
      } catch (error) {
        if (error.name === 'AbortError' || controller.signal.aborted) return
        console.error('Company billboard images failed to load:', error)
        setBillboardImages([])
        setBillboardsError('تعذّر تحميل صور اللوحات لهذه الشركة. حاول مرة أخرى.')
      } finally {
        if (!controller.signal.aborted) setLoadingBillboards(false)
      }
    }

    loadBillboardImages()
    return () => controller.abort()
  }, [selectedLogoId, retryBillboards])

  function handleLogoClick(logo) {
    setSelectedLogoId((currentId) =>
      String(currentId) === String(logo.id) ? null : logo.id,
    )
  }

  function backToLogos() {
    setSelectedLogoId(null)
  }

  return (
    <div className="service-page service-page--advertisingcampaigns">
      <section className="service-page__hero" id="home">
        <picture className="service-page__background">
          <source media="(max-width: 600px)" srcSet={mobileImage} />
          <img src={desktopImage} alt="" aria-hidden="true" />
        </picture>

        <div className="service-page__hero-content">
          <h1>حملات إعلانية</h1>

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
          <h2>
            {selectedLogo
              ? 'لوحات الشركة الإعلانية'
              : 'أعمالنا في الحملات الإعلانية'}
          </h2>

          {loadingLogos ? (
            <div className="advertisingcampaigns__loading-area">
              <LoadingIndicator label="جارٍ تحميل شعارات الشركات" />
            </div>
          ) : logosError ? (
            <Notice
              error
              action={(
                <button
                  type="button"
                  className="advertisingcampaigns__retry"
                  onClick={() => setRetryLogos((count) => count + 1)}
                >
                  إعادة المحاولة
                </button>
              )}
            >
              {logosError}
            </Notice>
          ) : selectedLogo ? (
            <div className="advertisingcampaigns__selected" key={selectedLogo.id}>
              <button
                type="button"
                className="advertisingcampaigns__selected-logo"
                onClick={backToLogos}
                aria-label="العودة إلى جميع الشركات"
                title="العودة إلى جميع الشركات"
              >
                <img src={selectedLogo.url} alt="شعار الشركة المختارة" decoding="async" />
              </button>

              <button
                type="button"
                className="advertisingcampaigns__back"
                onClick={backToLogos}
              >
                <span aria-hidden="true">→</span>
               الرجوع الى قائمة العملاء
              </button>

              <h3 className="advertisingcampaigns__boards-title">
                اللوحات الإعلانية الخاصة بهذه الشركة
              </h3>

              {loadingBillboards ? (
                <div className="advertisingcampaigns__loading-area">
                  <LoadingIndicator label="جارٍ تحميل صور اللوحات الإعلانية" />
                </div>
              ) : billboardsError ? (
                <Notice
                  error
                  action={(
                    <button
                      type="button"
                      className="advertisingcampaigns__retry"
                      onClick={() => setRetryBillboards((count) => count + 1)}
                    >
                      إعادة المحاولة
                    </button>
                  )}
                >
                  {billboardsError}
                </Notice>
              ) : billboardImages.length === 0 ? (
                <Notice>لا توجد صور لوحات مضافة لهذه الشركة حاليًا.</Notice>
              ) : (
                <div className="advertisingcampaigns__board-grid">
                  {billboardImages.map((board, index) => (
                    <figure
                      className="advertisingcampaigns__board-card"
                      key={board.id}
                      style={{ '--board-index': index }}
                    >
                      <img
                        src={board.url}
                        alt={`لوحة إعلانية رقم ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ) : logos.length === 0 ? (
            <Notice>لا توجد شعارات مضافة حاليًا. أضف شعارات الشركات من لوحة الإدارة.</Notice>
          ) : (
            <div className="service-page__logo-grid advertisingcampaigns__logo-grid">
              {logos.map((logo, index) => (
                <button
                  type="button"
                  className="service-page__logo-card advertisingcampaigns__logo-button"
                  key={logo.id}
                  onClick={() => handleLogoClick(logo)}
                  aria-label={`عرض اللوحات الإعلانية للشركة رقم ${index + 1}`}
                  title="عرض اللوحات الإعلانية لهذه الشركة"
                  style={{ '--logo-index': index }}
                >
                  <span className="service-page__logo-card-inner">
                    <img
                      src={logo.url}
                      alt={`شعار شركة رقم ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdvertisingCampaigns
