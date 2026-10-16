import { useEffect, useState } from 'react'
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

    if (!hash || hash === '#admin-ebdaa-2026' || hash === '#/admin') {
      return
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(
          decodeURIComponent(hash.slice(1))
        )

        target?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    })
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