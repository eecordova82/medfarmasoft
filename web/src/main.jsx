import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Subscribe from './pages/Subscribe.jsx'
import BookingPage from './pages/BookingPage.jsx'
import AccesoPage from './pages/AccesoPage.jsx'

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
      <Routes>
        {isCustomDomain ? (
          <Route path="*" element={<BookingPage />} />
        ) : (
          <>
            <Route path="/" element={<App />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/reservar/:slug" element={<BookingPage />} />
            <Route path="/acceso/:tenant" element={<AccesoPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
