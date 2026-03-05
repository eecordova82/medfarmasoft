import { TrendingDown, Smartphone, Shield, Globe, HeartHandshake, MessageCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const reasons = [
  {
    icon: TrendingDown,
    title: 'Hasta 5x más económico',
    description: 'Planes desde una fracción de lo que cobran Doctoralia o Doctolib, con las mismas funcionalidades esenciales.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'App nativa multiplataforma',
    description: 'No es una web responsive: es una aplicación nativa para Android, iOS, Windows y macOS con rendimiento real.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp integrado',
    description: 'Recordatorios automáticos por WhatsApp que reducen las ausencias hasta un 40%. Sin configuraciones complejas.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Shield,
    title: 'RGPD completo',
    description: 'Consentimientos digitales, cifrado en reposo y tránsito, retención de datos según Ley 41/2002. Todo incluido.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Globe,
    title: '100% en español',
    description: 'Interfaz, soporte y documentación en español. También disponible en inglés y catalán.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeartHandshake,
    title: 'Soporte local en Madrid',
    description: 'Equipo de soporte cercano que entiende las necesidades del sector sanitario español.',
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function WhyUs() {
  const ref = useScrollReveal()

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-light-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Diferencial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            ¿Por qué elegir{' '}
            <span className="gradient-text">MedFarmaSoft</span>?
          </h2>
          <p className="text-lg text-neutral-text">
            Software de gestión sanitaria diseñado para clínicas, consultorios y farmacias en España.
            Asequible, completo y fácil de usar.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="reveal group relative bg-white rounded-2xl p-6 border border-gray-100 hover-lift cursor-default"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <reason.icon size={24} />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">
                {reason.title}
              </h3>
              <p className="text-neutral-text text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
