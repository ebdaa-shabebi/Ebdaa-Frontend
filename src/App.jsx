
import { useEffect, useRef, useState } from 'react'
import './App.css'

import Header from './components/Header'
import Hero from './components/Hero'
import WhoAreWe from './components/WhoAreWe'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Footer from './components/Footer'

import MotionGraphics from './components/MotionGraphics'
import AdvertisingVideos from './components/AdvertisingVideos'
import AdvertisingCampaigns from './components/AdvertisingCampaigns'
import Websites from './components/Websites'

import Admin from './components/Admin'

import EbdaaContentServicePage from './components/EbdaaContentServicePage'
import EbdaaCampaignsServicePage from './components/EbdaaCampaignsServicePage'
import EbdaaIdentityServicePage from './components/EbdaaIdentityServicePage'
import EbdaaDigitalAdsServicePage from './components/EbdaaDigitalAdsServicePage'
import EbdaaSocialMediaServicePage from './components/EbdaaSocialMediaServicePage'
import EbdaaVideoServicePage from './components/EbdaaVideoServicePage'

const serviceRoutes = {
  '/motion-graphics': MotionGraphics,
  '/advertising-videos': AdvertisingVideos,
  '/advertising-campaigns': AdvertisingCampaigns,
  '/websites': Websites,

  '/services/content': EbdaaContentServicePage,
  '/services/campaigns': EbdaaCampaignsServicePage,
  '/services/identity': EbdaaIdentityServicePage,
  '/services/digital-ads': EbdaaDigitalAdsServicePage,
  '/services/social-media': EbdaaSocialMediaServicePage,
  '/services/video': EbdaaVideoServicePage,
}

function getCurrentRoute() {
  const pathname =
    window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname !== '/') {
    return pathname
  }

  const hash = window.location.hash

  if (hash.startsWith('#/')) {
    return hash.slice(1).split('?')[0].replace(/\/+$/, '') || '/'
  }

  return '/'
}

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash

    if (
      !hash ||
      hash.startsWith('#/') ||
      hash === '#admin-ebdaa-2026'
    ) {
      return
    }

    const targetId = decodeURIComponent(hash.slice(1))

    const frame = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <Header />

      <main>
        <Hero />
        <WhoAreWe />
        <Services />
        <WhyUs />
      </main>

      <Footer />
    </>
  )
}

function App({ initialRoute }) {
  const [route, setRoute] = useState(
    () => initialRoute ?? getCurrentRoute()
  )

  const previousRoute = useRef(null)

  useEffect(() => {
    const handleNavigation = () => {
      setRoute(getCurrentRoute())
    }

    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('hashchange', handleNavigation)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('hashchange', handleNavigation)
    }
  }, [])

  useEffect(() => {
    if (previousRoute.current === route) return

    previousRoute.current = route

    const isHomeSectionLink =
      route === '/' &&
      window.location.hash !== '' &&
      !window.location.hash.startsWith('#/') &&
      window.location.hash !== '#admin-ebdaa-2026'

    if (isHomeSectionLink) return

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [route])

  if (
    (typeof window !== 'undefined' &&
      window.location.hash === '#admin-ebdaa-2026') ||
    route === '/admin'
  ) {
    return <Admin />
  }

  const ServiceComponent = serviceRoutes[route]

  if (ServiceComponent) {
    return (
      <>
        <Header />
        <main>
          <ServiceComponent />
        </main>
        <Footer />
      </>
    )
  }

  return <HomePage />
}

export default App
