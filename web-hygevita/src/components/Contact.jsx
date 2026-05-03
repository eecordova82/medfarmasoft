import { useState } from 'react'
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const entityTypes = [
  'Clínica privada',
  'Farmacia',
  'Centro médico',
  'Consulta independiente',
  'Centro de nutrición',
  'Otro',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const ref = useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-light-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
              ¿Listo para{' '}
              <span className="gradient-text">transformar tu gestión?</span>
            </h2>
            <p className="text-lg text-neutral-text mb-10">
              Cuéntanos sobre tu negocio y te ayudaremos a encontrar el plan perfecto.
              Sin compromiso, sin presión.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Email</h4>
                  <a href="mailto:info@hygevita.com" className="text-primary hover:underline">
                    info@hygevita.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Ubicación</h4>
                  <p className="text-neutral-text">España</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">RGPD</div>
                  <div className="text-xs text-neutral-text mt-1">Cumplimiento total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">SSL</div>
                  <div className="text-xs text-neutral-text mt-1">Conexión segura</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-neutral-text mt-1">Disponibilidad</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-3">¡Mensaje enviado!</h3>
                  <p className="text-neutral-text">
                    Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">Apellidos</label>
                      <input
                        type="text"
                        required
                        placeholder="Tus apellidos"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Tipo de entidad</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm text-neutral-text"
                    >
                      <option value="">Selecciona una opción</option>
                      {entityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Mensaje</label>
                    <textarea
                      rows={4}
                      placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label className="text-xs text-neutral-text">
                      Acepto la{' '}
                      <a href="/legal/privacy.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        política de privacidad
                      </a>{' '}
                      y el tratamiento de mis datos según el RGPD.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-primary/25"
                  >
                    <Send size={20} />
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
