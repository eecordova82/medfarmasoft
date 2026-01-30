import {
  CalendarDays,
  Users,
  FileText,
  Stethoscope,
  FolderOpen,
  BellRing,
  Fingerprint,
  BarChart3,
  Building2,
  Pill,
  ClipboardList,
  MessageSquare,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: CalendarDays,
    title: 'Gestión de Citas',
    description: 'Calendario semanal y mensual con gestión completa de horarios, estados y recordatorios automáticos.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Users,
    title: 'Gestión de Pacientes',
    description: 'Perfiles completos con datos personales, alergias, condiciones médicas y seguimiento integral.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Historial Clínico',
    description: 'Registros estructurados en 6 pestañas: episodios, antecedentes, medicación, alergias y más.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Stethoscope,
    title: 'Episodios Clínicos',
    description: 'Consultas detalladas con autoguardado cada 30 segundos. Nunca pierdes información.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Building2,
    title: 'Multi-Organizaciones',
    description: 'Sistema multi-tenant que permite gestionar múltiples clínicas o farmacias de forma independiente.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Pill,
    title: 'Servicios y Catálogo',
    description: 'Gestión de servicios profesionales con precios, duración y asignación a especialistas.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: FolderOpen,
    title: 'Documentos en la Nube',
    description: 'Almacenamiento seguro de documentos clínicos con Supabase. Accede desde cualquier dispositivo.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Fingerprint,
    title: 'Autenticación Biométrica',
    description: 'Acceso seguro con huella dactilar, Face ID o Windows Hello. Máxima protección de datos.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: BellRing,
    title: 'Notificaciones',
    description: 'Sistema de alertas push, email y WhatsApp para recordatorios de citas y comunicaciones.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: BarChart3,
    title: 'Panel de Estadísticas',
    description: 'Dashboard administrativo con métricas de rendimiento, auditoría y análisis de actividad.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: ClipboardList,
    title: 'Gestión de Profesionales',
    description: 'Administra médicos, nutricionistas y farmacéuticos con sus especialidades y horarios.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación Integrada',
    description: 'Envía comunicaciones por email y WhatsApp directamente desde la aplicación.',
    color: 'bg-sky-50 text-sky-600',
  },
]

export default function Features() {
  const ref = useScrollReveal()

  return (
    <section id="features" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Funcionalidades
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Todo lo que necesitas en{' '}
            <span className="gradient-text">una sola plataforma</span>
          </h2>
          <p className="text-lg text-neutral-text">
            MedFarmaSoft reúne las herramientas esenciales para la gestión diaria de tu clínica o farmacia,
            con un diseño intuitivo y cumplimiento normativo completo.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`reveal group relative bg-white rounded-2xl p-6 border border-gray-100 hover-lift cursor-default`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-secondary text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-text text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
