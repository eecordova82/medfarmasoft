import { Building2, UserPlus, CalendarDays, BarChart3 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    icon: Building2,
    title: 'Crea tu organización',
    description: 'Registra tu clínica o farmacia en minutos. Configura los datos, horarios y servicios que ofreces.',
    color: 'from-primary to-primary-light',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Añade tu equipo',
    description: 'Invita a profesionales y personal administrativo. Asigna roles y permisos personalizados.',
    color: 'from-blue-500 to-blue-400',
  },
  {
    number: '03',
    icon: CalendarDays,
    title: 'Gestiona tu agenda',
    description: 'Organiza citas con sincronización Google/Outlook, registra pacientes, dicta notas por voz y documenta episodios clínicos.',
    color: 'from-accent to-accent-light',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Analiza y crece',
    description: 'Consulta KPIs, informes de ocupación, auditoría de acciones y toma decisiones basadas en datos reales.',
    color: 'from-emerald-500 to-emerald-400',
  },
]

export default function HowItWorks() {
  const ref = useScrollReveal()

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-light-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Comienza en <span className="gradient-text">4 sencillos pasos</span>
          </h2>
          <p className="text-lg text-neutral-text">
            Pon en marcha la digitalización de tu centro sanitario de forma rápida y sin complicaciones.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift text-center">
                {/* Step number */}
                <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} items-center justify-center mb-6 shadow-lg`}>
                  <step.icon size={28} className="text-white" />
                </div>

                <div className="text-xs font-bold text-primary/40 tracking-widest uppercase mb-2">
                  Paso {step.number}
                </div>

                <h3 className="font-bold text-secondary text-xl mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-text text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video tutorial */}
        <div id="tutorial" className="reveal mt-20 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Tutorial
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-secondary mb-4">
            Mira cómo acceder a tu espacio de trabajo
          </h3>
          <p className="text-neutral-text mb-8">
            En menos de 2 minutos verás cómo entrar a tu cuenta y empezar a usar la plataforma.
          </p>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100"
               style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/vVU98V42Apk"
              title="Cómo acceder a tu espacio de trabajo - Hygevita"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
