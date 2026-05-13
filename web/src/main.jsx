import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.jsx'
import BookingPage from './pages/BookingPage.jsx'

const Subscribe = lazy(() => import('./pages/Subscribe.jsx'))
const AccesoPage = lazy(() => import('./pages/AccesoPage.jsx'))
const RegistroPage = lazy(() => import('./pages/RegistroPage.jsx'))
const RedLoginPage = lazy(() => import('./pages/red/RedLoginPage.jsx'))
const RedDashboardPage = lazy(() => import('./pages/red/RedDashboardPage.jsx'))
const RedLocalesPage = lazy(() => import('./pages/red/RedLocalesPage.jsx'))

// Si el hostname es un dominio personalizado de tenant (no medfarmasoft.es),
// mostrar directamente la página de reservas en la raíz
const hostname = window.location.hostname;
const isCustomDomain = hostname !== 'localhost'
  && hostname !== 'medfarmasoft.es'
  && hostname !== 'www.medfarmasoft.es'
  && !hostname.startsWith('localhost');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {isCustomDomain ? (
            <Route path="*" element={<BookingPage />} />
          ) : (
            <>
              <Route path="/" element={<App />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/reservar/:slug" element={<BookingPage />} />
              <Route path="/acceso/:tenant" element={<AccesoPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/red/:orgCodigo/login" element={<RedLoginPage />} />
              <Route path="/red/:orgCodigo/dashboard" element={<RedDashboardPage />} />
              <Route path="/red/:orgCodigo/locales" element={<RedLocalesPage />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
