import { Check, Star } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    name: 'Básico',
    description: 'Ideal para profesionales independientes y consultas pequeñas.',
    price: '29',
    period: '/mes',
    features: [
      '1 profesional',
      'Hasta 100 pacientes',
      'Gestión de citas',
      'Historial clínico básico',
      'Soporte por email',
      'Cumplimiento RGPD',
    ],
    cta: 'Comenzar gratis',
    highlighted: false,
  },
  {
    name: 'Profesional',
    description: 'Para clínicas y farmacias en crecimiento que necesitan más.',
    price: '69',
    period: '/mes',
    features: [
      'Hasta 5 profesionales',
      'Pacientes ilimitados',
      'Gestión de citas avanzada',
      'Historial clínico completo',
      'Episodios clínicos',
      'Documentos en la nube',
      'Notificaciones push y email',
      'Panel de estadísticas',
      'Soporte prioritario',
    ],
    cta: 'Solicitar demo',
    highlighted: true,
  },
  {
    name: 'Empresa',
    description: 'Para centros con múltiples sedes y equipos grandes.',
    price: 'Personalizado',
    period: '',
    features: [
      'Profesionales ilimitados',
      'Multi-organización',
      'Todas las funcionalidades',
      'Autenticación biométrica',
      'WhatsApp Business',
      'API personalizada',
      'Formación del equipo',
      'Gestor de cuenta dedicado',
      'SLA garantizado',
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
            Precios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Planes que se adaptan a{' '}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-lg text-neutral-text">
            Sin permanencia. Sin costes ocultos. Empieza con 30 días gratis en cualquier plan.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  Más popular
                </div>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-secondary'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/70' : 'text-neutral-text'}`}>
                {plan.description}
              </p>

              <div className="mb-8">
                <span className={`text-4xl lg:text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-secondary'}`}>
                  {plan.price === 'Personalizado' ? '' : '€'}{plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-neutral-text'}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-white/20' : 'bg-primary/10'
                    }`}>
                      <Check size={12} className={plan.highlighted ? 'text-white' : 'text-primary'} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-neutral-text'}`}>
                      {feature}
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
