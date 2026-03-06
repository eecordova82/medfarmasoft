import { Check, X, Star } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    name: 'Trial',
    target: 'Prueba el sistema sin compromiso durante 14 días',
    trial: true,
    features: [
      { text: '1 profesional', included: true },
      { text: 'Hasta 20 pacientes', included: true },
      { text: 'Citas ilimitadas', included: true },
      { text: 'Historial clínico completo', included: true },
      { text: 'Horarios profesionales', included: true },
      { text: 'Recordatorios por email', included: true },
      { text: 'Consentimientos RGPD', included: true },
      { text: 'Recordatorios WhatsApp', included: false },
      { text: 'Panel de estadísticas', included: false },
    ],
    cta: 'Empezar gratis',
    highlighted: false,
  },
  {
    name: 'Básico',
    target: 'Profesionales autónomos y consultorios pequeños',
    features: [
      { text: 'Hasta 2 profesionales', included: true },
      { text: 'Hasta 100 pacientes', included: true },
      { text: 'Citas ilimitadas', included: true },
      { text: 'Historial clínico completo', included: true },
      { text: 'Horarios profesionales', included: true },
      { text: 'Recordatorios por email', included: true },
      { text: 'Consentimientos RGPD', included: true },
      { text: 'Recordatorios WhatsApp', included: false },
      { text: 'Panel de estadísticas', included: false },
      { text: 'API REST', included: false },
    ],
    cta: 'Solicitar demo',
    highlighted: false,
  },
  {
    name: 'Profesional',
    target: 'Clínicas medianas, centros de salud y farmacias en crecimiento',
    features: [
      { text: 'Hasta 5 profesionales', included: true },
      { text: 'Hasta 500 pacientes', included: true },
      { text: 'Citas ilimitadas', included: true },
      { text: 'Historial clínico completo', included: true },
      { text: 'Horarios profesionales', included: true },
      { text: 'Recordatorios por email', included: true },
      { text: 'Consentimientos RGPD', included: true },
      { text: 'Recordatorios WhatsApp', included: true },
      { text: 'Panel de estadísticas', included: true },
      { text: 'API REST', included: false },
    ],
    cta: 'Solicitar demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    target: 'Clínicas grandes, policlínicas y cadenas de farmacias',
    features: [
      { text: 'Hasta 25 profesionales', included: true },
      { text: 'Hasta 10.000 pacientes', included: true },
      { text: 'Citas ilimitadas', included: true },
      { text: 'Todas las funcionalidades', included: true },
      { text: 'WhatsApp + SMS incluidos', included: true },
      { text: 'Acceso API para integraciones', included: true },
      { text: 'Marca blanca (tu logo)', included: true },
      { text: 'Panel de estadísticas', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Multi-sucursal', included: true },
    ],
    cta: 'Contactar ventas',
    highlighted: false,
  },
]

export default function Pricing() {
  const ref = useScrollReveal()

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Planes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Un plan para cada{' '}
            <span className="gradient-text">tipo de centro</span>
          </h2>
          <p className="text-lg text-neutral-text">
            Empieza con 14 días gratis. Sin tarjeta de crédito, sin compromiso, sin permanencia.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`reveal relative rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl shadow-primary/25 scale-105 lg:scale-110 z-10'
                  : 'bg-white border border-gray-200 hover-lift'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 bg-accent text-secondary text-xs font-bold rounded-full shadow-lg">
                  <Star size={12} className="fill-current" />
                  Recomendado
                </div>
              )}
              {plan.trial && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                  14 días gratis
                </div>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-secondary'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/70' : 'text-neutral-text'}`}>
                {plan.target}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      feature.included
                        ? plan.highlighted ? 'bg-white/20' : 'bg-primary/10'
                        : plan.highlighted ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      {feature.included ? (
                        <Check size={12} className={plan.highlighted ? 'text-white' : 'text-primary'} />
                      ) : (
                        <X size={10} className={plan.highlighted ? 'text-white/40' : 'text-gray-300'} />
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included
                        ? plan.highlighted ? 'text-white/90' : 'text-neutral-text'
                        : plan.highlighted ? 'text-white/40 line-through' : 'text-gray-300 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-accent hover:bg-accent-light text-secondary shadow-lg'
                    : 'bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
