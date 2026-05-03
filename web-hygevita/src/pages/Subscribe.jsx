import { useEffect, useState } from 'react'
import { Check, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.hygevita.com'

const planNames = {
  basic: 'Básico',
  professional: 'Profesional',
  enterprise: 'Enterprise',
}

const cycleNames = {
  monthly: 'Mensual',
  annual: 'Anual',
}

export default function Subscribe() {
  const [status, setStatus] = useState('loading') // loading, ready, redirecting, error, invalid
  const [error, setError] = useState('')
  const [planCode, setPlanCode] = useState('')
  const [billingCycle, setBillingCycle] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      setStatus('invalid')
      setError('No se ha proporcionado un token de checkout válido.')
      return
    }

    // Decodificar el token para mostrar info del plan (el payload es base64url)
    try {
      const payloadB64 = token.split('.')[0]
      const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
      const data = JSON.parse(json)
      setPlanCode(data.PlanCode || '')
      setBillingCycle(data.BillingCycle || '')
    } catch {
      // Si no puede decodificar, no pasa nada, el API lo validará
    }

    setStatus('ready')
  }, [])

  const handleCheckout = async () => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    setStatus('redirecting')

    try {
      const response = await fetch(`${API_BASE}/api/payment/web/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Error al crear la sesión de pago')
      }

      const data = await response.json()

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        throw new Error('No se recibió la URL de pago')
      }
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Error inesperado. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-secondary">Hygevita</span>
          </a>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {status === 'loading' && (
            <div className="text-center py-8">
              <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-500">Cargando...</p>
            </div>
          )}

          {status === 'invalid' && (
            <div className="text-center py-8">
              <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Enlace no válido</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <p className="text-sm text-gray-400">
                Para suscribirte, abre la aplicación Hygevita y selecciona un plan desde la sección de suscripción.
              </p>
            </div>
          )}

          {status === 'ready' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Activar suscripción
                </h2>
                <p className="text-gray-500">
                  Completa el pago de forma segura con Stripe
                </p>
              </div>

              {/* Plan info */}
              {planCode && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Plan seleccionado</p>
                      <p className="font-semibold text-gray-900">
                        {planNames[planCode] || planCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Facturación</p>
                      <p className="font-semibold text-gray-900">
                        {cycleNames[billingCycle] || billingCycle}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Continuar al pago seguro
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                <span className="text-xs text-gray-400">
                  Pago seguro procesado por Stripe. No almacenamos datos de tu tarjeta.
                </span>
              </div>
            </>
          )}

          {status === 'redirecting' && (
            <div className="text-center py-8">
              <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Redirigiendo a Stripe...</h2>
              <p className="text-gray-500">
                Serás redirigido a la pasarela de pago segura en unos segundos.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={() => setStatus('ready')}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a hygevita.com
          </a>
        </div>
      </div>
    </div>
  )
}
