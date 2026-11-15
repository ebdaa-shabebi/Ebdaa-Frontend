
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

const rootElement = document.getElementById('root')

const isAdminRoute =
  window.location.pathname.replace(/\/+$/, '') === '/admin' ||
  window.location.hash === '#admin-ebdaa-2026'

const isLegacyHashRoute =
  window.location.hash.startsWith('#/')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (
  rootElement.hasChildNodes() &&
  !isAdminRoute &&
  !isLegacyHashRoute
) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
