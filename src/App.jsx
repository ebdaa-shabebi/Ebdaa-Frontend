
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

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash

    // Do not treat application routes as section anchors.
    if (
      !hash ||
      hash.startsWith('#/') ||
      hash === '#admin-ebdaa-2026'
    ) {
      return
    }

    const targetId = decodeURIComponent(hash.slice(1))

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId)

      // Jump directly to the requested section without animation.
      target?.scrollIntoView({
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

function App() {
  const [currentHash, setCurrentHash] = useState(
    window.location.hash
  )

  const previousRoute = useRef(null)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const route = currentHash.startsWith('#/')
    ? currentHash.slice(1).split('?')[0].replace(/\/+$/, '') || '/'
    : '/'

  // Reset scrolling only when navigating to a different route.
  useEffect(() => {
    if (previousRoute.current === route) {
      return
    }

    previousRoute.current = route

    // Let homepage section links scroll to their own target.
    const isHomeSectionLink =
      route === '/' &&
      currentHash !== '' &&
      !currentHash.startsWith('#/') &&
      currentHash !== '#admin-ebdaa-2026'

    if (isHomeSectionLink) {
      return
    }

    // Immediately jump to the top and stop any ongoing scroll animation.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [route, currentHash])

  if (
    currentHash === '#admin-ebdaa-2026' ||
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
