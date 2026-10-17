import { useEffect, useState } from 'react'
import './Websites.css'

import desktopImage from '../assets/websites-hero-desktop.png'
import mobileImage from '../assets/websites-hero-mobile.png'

const API = 'https://ebdaa-backend-zbiy.onrender.com'
const homeUrl = import.meta.env.BASE_URL

const statusStyle = {
  textAlign: 'center',
  padding: '42px 20px',
  color: '#412d2f',
  lineHeight: 1.8,
}

const retryButtonStyle = {
  marginTop: '12px',
  padding: '10px 18px',
  border: '0',
  borderRadius: '8px',
  background: '#701b35',
  color: '#fff',
  cursor: 'pointer',
  font: 'inherit',
}

async function readResponse(response) {
  const raw = await response.text()
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return { message: raw }
  }
}

function Websites() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadClients() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API}/website-clients`, {
          signal: controller.signal,
        })
        const data = await readResponse(response)

        if (!response.ok) {
          throw new Error(data?.message || `تعذر تحميل المواقع (HTTP ${response.status})`)
        }
        if (!Array.isArray(data)) {
          throw new Error('استجابة المواقع من الخادم غير صحيحة.')
        }

        if (!controller.signal.aborted) setClients(data)
      } catch (err) {
        if (err.name === 'AbortError' || controller.signal.aborted) return
        console.error('Website clients request failed:', err)
        setClients([])
        setError('تعذّر تحميل المواقع الإلكترونية حاليًا. حاول مرة أخرى.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadClients()
    return () => controller.abort()
  }, [retryCount])

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
              onClick={(event) => {
                event.preventDefault()
                document.getElementById('clients')?.scrollIntoView({
                  behavior: 'instant',
                  block: 'start',
                })
              }}
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

          {loading ? (
            <div style={statusStyle} role="status" aria-live="polite">
              جارٍ تحميل المواقع الإلكترونية...
            </div>
          ) : error ? (
            <div style={statusStyle} role="alert">
              <p>{error}</p>
              <button
                type="button"
                style={retryButtonStyle}
                onClick={() => setRetryCount((value) => value + 1)}
              >
                إعادة المحاولة
              </button>
            </div>
          ) : clients.length === 0 ? (
            <div style={statusStyle}>
              لا توجد مواقع مضافة حاليًا. ستظهر المواقع هنا بعد إضافتها من لوحة الإدارة.
            </div>
          ) : (
            <div className="websites-page__logo-grid">
              {clients.map((client) => (
                <a
                  className="websites-page__logo-card"
                  key={client.id}
                  href={client.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`زيارة موقع ${client.name} في نافذة جديدة`}
                  title={`زيارة موقع ${client.name}`}
                >
                  <div className="websites-page__logo-card-inner">
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Websites
