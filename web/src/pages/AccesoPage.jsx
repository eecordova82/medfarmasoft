import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

const API_BASE = 'https://api.medfarmasoft.es'

// Defaults del flavor MedFarmaSoft — se usan si la API no devuelve URLs específicas
const DEFAULTS = {
  androidUrl: 'https://play.google.com/store/apps/details?id=com.medfarmasoft.app',
  iosUrl: 'https://apps.apple.com/app/medfarmasoft/id000000000',
}

/**
 * Página de acceso para pacientes via deep link.
 * URL: https://medfarmasoft.es/acceso/{tenantCodigo}
 *
 * Si la app está instalada → la abre directamente (Universal Link / App Link).
 * Si no → muestra esta página con los links de descarga correctos para el tenant.
 * Los links se cargan dinámicamente desde la API para soportar múltiples flavors.
 */
export default function AccesoPage() {
  const { t } = useTranslation()
  const { tenant } = useParams()
  const [tenantConfig, setTenantConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Intentar abrir la app via URI scheme como fallback
    const timer = setTimeout(() => {
      window.location.href = `medfarmasoft://acceso/${tenant}`
    }, 500)
    return () => clearTimeout(timer)
  }, [tenant])

  useEffect(() => {
    if (!tenant) {
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    fetch(`${API_BASE}/api/tenant/por-codigo/${encodeURIComponent(tenant)}`, {
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setTenantConfig(data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.warn(`[AccesoPage] No se pudo cargar config del tenant "${tenant}":`, err.message)
        }
        // Degradación elegante: se usan los defaults del flavor
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [tenant])

  const androidUrl = tenantConfig?.appUrlAndroid || DEFAULTS.androidUrl
  const iosUrl = tenantConfig?.appUrlIos || DEFAULTS.iosUrl
  const nombreTenant = tenantConfig?.nombre || tenant

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher className="text-gray-600" />
      </div>
      <div className="max-w-md w-full text-center">

        {/* Logo */}
        <div className="mb-8">
          {loading ? (
            <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 animate-pulse" />
          ) : tenantConfig?.logoUrl ? (
            <img
              src={tenantConfig.logoUrl}
              alt={nombreTenant}
              className="h-20 mx-auto mb-4 rounded-2xl object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-20 h-20 bg-[#11756A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl font-bold">
                {nombreTenant?.charAt(0)?.toUpperCase() || 'M'}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-800">{nombreTenant || 'MedFarmaSoft'}</h1>
          <p className="text-gray-500 mt-1">{t('acceso.subtitle')}</p>
        </div>

        {/* Mensaje principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <p className="text-gray-600 mb-2">
            {t('acceso.accessingTo')}
          </p>
          <p className="text-2xl font-bold text-[#11756A] mb-6">
            {loading ? (
              <span className="inline-block w-32 h-7 bg-gray-100 rounded animate-pulse" />
            ) : (
              nombreTenant
            )}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {t('acceso.openAppPrompt')}
          </p>

          {/* Botones de descarga */}
          {loading ? (
            <div className="flex flex-col gap-3">
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <a
                href={iosUrl}
                className="flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 px-6 hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {t('acceso.appStoreIos')}
              </a>
              <a
                href={androidUrl}
                className="flex items-center justify-center gap-3 bg-[#11756A] text-white rounded-xl py-3 px-6 hover:bg-[#0d5e55] transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.45-12.45L13 8l-9.82 14.96c-.01.27.03.54.18.8zM20.49 10.46l-2.87-1.65-3.49 3.49 3.49 3.49 2.91-1.67c.83-.48.83-1.67-.04-2.16zM1.53.3C1.2.6 1 1.09 1 1.73v20.54c0 .64.2 1.13.54 1.42L2.18 24l12.18-12.18L2.18.3 1.53.3zM16.24 4.04L3.18.24C2.83.2 2.49.27 2.19.44l3.62 3.62 10.43 0z" />
                </svg>
                {t('acceso.googlePlayAndroid')}
              </a>
            </div>
          )}
        </div>

        {/* Link directo */}
        <p className="text-xs text-gray-400">
          {t('acceso.alreadyInstalled')}{' '}
          <a
            href={`medfarmasoft://acceso/${tenant}`}
            className="text-[#11756A] underline"
          >
            {t('acceso.tapHere')}
          </a>
        </p>

      </div>
    </div>
  )
}
