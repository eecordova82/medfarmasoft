import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { Check, Loader2, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { apiFetch } from '../lib/api'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

const PLAN_OPTIONS = [
  { value: 'basic', label: 'Básico — Hasta 2 profesionales' },
  { value: 'professional', label: 'Profesional — Hasta 10 profesionales' },
  { value: 'enterprise', label: 'Enterprise — Sin límite' },
]

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombreNegocio: '',
    nombrePropietario: '',
    apellidosPropietario: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    plan: 'basic',
    aceptaTerminos: false,
  })
  const [errors, setErrors] = useState({})
  const [captchaToken, setCaptchaToken] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [formLoadedAt] = useState(Date.now())
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')
  const [submitCount, setSubmitCount] = useState(0)

  const validate = () => {
    const errs = {}

    if (!form.nombreNegocio.trim()) errs.nombreNegocio = 'El nombre del negocio es obligatorio'
    else if (form.nombreNegocio.trim().length < 2) errs.nombreNegocio = 'Mínimo 2 caracteres'

    if (!form.nombrePropietario.trim()) errs.nombrePropietario = 'El nombre es obligatorio'
    if (!form.apellidosPropietario.trim()) errs.apellidosPropietario = 'Los apellidos son obligatorios'

    if (!form.email.trim()) errs.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email no válido'

    if (!form.telefono.trim()) errs.telefono = 'El teléfono es obligatorio'
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.telefono)) errs.telefono = 'Teléfono no válido'

    if (!form.password) errs.password = 'La contraseña es obligatoria'
    else if (form.password.length < 8) errs.password = 'Mínimo 8 caracteres'
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Debe incluir al menos una mayúscula'
    else if (!/[0-9]/.test(form.password)) errs.password = 'Debe incluir al menos un número'

    if (!form.confirmPassword) errs.confirmPassword = 'Confirma la contraseña'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden'

    if (!form.aceptaTerminos) errs.aceptaTerminos = 'Debes aceptar los términos y condiciones'

    if (!captchaToken && TURNSTILE_SITE_KEY) errs.captcha = 'Verifica que no eres un robot'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Protección anti-spam: si el honeypot está relleno, silenciosamente ignorar
    if (honeypot) return

    // Protección anti-spam: si el formulario se envió en menos de 3 segundos, es un bot
    const elapsed = Date.now() - formLoadedAt
    if (elapsed < 3000) return

    // Límite de intentos en cliente
    if (submitCount >= 5) {
      setServerError('Demasiados intentos. Por favor, espera unos minutos y vuelve a intentarlo.')
      return
    }

    if (!validate()) return

    setSubmitCount((c) => c + 1)
    setStatus('submitting')
    setServerError('')

    try {
      await apiFetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          businessName: form.nombreNegocio.trim(),
          ownerName: form.nombrePropietario.trim(),
          ownerLastName: form.apellidosPropietario.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.telefono.trim(),
          password: form.password,
          planCode: form.plan,
          captchaToken,
          website: honeypot,
          elapsed,
        }),
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      if (err.status === 409) {
        setServerError('Ya existe una cuenta con ese email. ¿Quieres iniciar sesión?')
      } else if (err.status === 429) {
        setServerError('Demasiadas solicitudes. Por favor, espera unos minutos.')
      } else {
        setServerError(err.message || 'Error al crear la cuenta. Inténtalo de nuevo.')
      }
    }
  }

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cuenta creada!</h2>
          <p className="text-gray-600 mb-4">
            Hemos enviado un email de bienvenida a <strong>{form.email}</strong> con los datos de acceso.
          </p>

          {/* Resumen de credenciales */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-left mb-4 text-sm">
            <p className="text-gray-500 mb-2 text-xs uppercase font-semibold tracking-wide">Tus credenciales de acceso</p>
            <p className="text-gray-800 mb-1"><span className="font-medium">Usuario:</span> {form.email}</p>
            <p className="text-gray-800"><span className="font-medium">Contraseña:</span> la que configuraste en este formulario</p>
          </div>

          <p className="text-sm text-amber-600 mb-6">
            Por seguridad, te recomendamos cambiar tu contraseña después del primer inicio de sesión.
          </p>

          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Volver al inicio
          </a>
          <p className="text-xs text-gray-400 mt-4">
            ¿No recibiste el email? Revisa la carpeta de spam.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Volver</span>
          </a>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-primary">MedFarma<span className="text-accent">Soft</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta gratis</h1>
          <p className="text-gray-500">14 días de prueba sin tarjeta de crédito. Sin permanencia.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

            {/* Datos del negocio */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Datos del negocio
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del negocio o clínica *
                </label>
                <input
                  type="text"
                  value={form.nombreNegocio}
                  onChange={handleChange('nombreNegocio')}
                  placeholder="Clínica San Rafael, Farmacia García..."
                  autoComplete="organization"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    errors.nombreNegocio ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.nombreNegocio && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />{errors.nombreNegocio}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1.5 flex items-start gap-1">
                  <span className="mt-0.5">ℹ️</span>
                  <span>Este nombre será tu <strong className="text-gray-500">código de workspace</strong> — los usuarios lo usarán para encontrarte en la app.</span>
                </p>
              </div>
            </div>

            {/* Datos del propietario */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Datos del responsable
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    value={form.nombrePropietario}
                    onChange={handleChange('nombrePropietario')}
                    autoComplete="given-name"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.nombrePropietario ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.nombrePropietario && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.nombrePropietario}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    value={form.apellidosPropietario}
                    onChange={handleChange('apellidosPropietario')}
                    autoComplete="family-name"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.apellidosPropietario ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.apellidosPropietario && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.apellidosPropietario}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={handleChange('telefono')}
                    autoComplete="tel"
                    placeholder="+34 600 000 000"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.telefono ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.telefono}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Contraseña
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange('password')}
                      autoComplete="new-password"
                      className={`w-full rounded-xl border px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.password}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">Mín. 8 caracteres, una mayúscula y un número</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      autoComplete="new-password"
                      className={`w-full rounded-xl border px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />{errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Plan */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Plan inicial
              </h2>
              <div className="space-y-2">
                {PLAN_OPTIONS.map((plan) => (
                  <label
                    key={plan.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      form.plan === plan.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.value}
                      checked={form.plan === plan.value}
                      onChange={handleChange('plan')}
                      className="accent-primary"
                    />
                    <span className="text-sm text-gray-700">{plan.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Puedes cambiar de plan en cualquier momento.</p>
            </div>

            {/* Honeypot — invisible para humanos, trampa para bots */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
              <label htmlFor="b_website" style={{ display: 'none' }}>No rellenar</label>
              <input
                id="b_website"
                name="b_website"
                tabIndex={-1}
                autoComplete="nope"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Captcha Cloudflare Turnstile */}
            {TURNSTILE_SITE_KEY && (
              <div>
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(token) => {
                    setCaptchaToken(token)
                    if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: undefined }))
                  }}
                  onError={() => setCaptchaToken('')}
                  onExpire={() => setCaptchaToken('')}
                />
                {errors.captcha && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />{errors.captcha}
                  </p>
                )}
              </div>
            )}

            {/* Términos */}
            <div>
              <label className={`flex items-start gap-3 cursor-pointer ${errors.aceptaTerminos ? 'text-red-500' : 'text-gray-600'}`}>
                <input
                  type="checkbox"
                  checked={form.aceptaTerminos}
                  onChange={handleChange('aceptaTerminos')}
                  className="mt-0.5 accent-primary"
                />
                <span className="text-sm">
                  Acepto los{' '}
                  <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    Términos y Condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    Política de Privacidad
                  </a>.
                </span>
              </label>
              {errors.aceptaTerminos && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />{errors.aceptaTerminos}
                </p>
              )}
            </div>

            {/* Error del servidor */}
            {serverError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={status === 'submitting' || submitCount >= 5}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta gratis — 14 días sin compromiso'
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <a href="/" className="text-primary font-medium hover:underline">
                Descarga la app
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
