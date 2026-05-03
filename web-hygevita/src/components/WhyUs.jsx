import { TrendingDown, Smartphone, Shield, Globe, MessageCircle, Activity } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const reasons = [
  {
    icon: TrendingDown,
    title: 'Hasta 5x más económico',
    description: 'Planes desde una fracción de lo que cobran Doctoralia o Doctolib, con más funcionalidades incluidas.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'App nativa multiplataforma',
    description: 'No es una web responsive: es una aplicación nativa para Android, iOS y Windows con rendimiento real y modo offline.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp + SMS + Email',
    description: 'Recordatorios multicanal automáticos que reducen las ausencias hasta un 40%. Configura horarios y canales.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Shield,
    title: 'RGPD y trazabilidad total',
    description: 'Consentimientos con firma digital y PDF, auditoría de acciones, cifrado de datos y cumplimiento Ley 41/2002.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Activity,
    title: 'Integraciones profesionales',
    description: 'Sincronización con Google Calendar y Outlook, integración InBody y API REST para conectar con tus sistemas.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Globe,
    title: 'Trilingüe: ES, EN, CA',
    description: 'Interfaz completa en español, inglés y catalán. Dictado por voz en los tres idiomas.',
    color: 'bg-amber-50 text-amber-600',
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
            <span className="gradient-text">Hygevita</span>?
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
