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
  Mic,
  CalendarSync,
  ShieldCheck,
  ScrollText,
  PillBottle,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: CalendarDays,
    title: 'Gestión de Citas',
    description: 'Calendario semanal y mensual con gestión completa de horarios, estados y recordatorios automáticos por email, SMS y WhatsApp.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Users,
    title: 'Gestión de Pacientes',
    description: 'Perfiles completos con datos personales, alergias, medicación activa, documentos y seguimiento integral.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Historial Clínico',
    description: 'Registros estructurados en 6 pestañas: episodios, antecedentes, medicación, alergias, documentos y más.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Stethoscope,
    title: 'Episodios Clínicos',
    description: 'Consultas detalladas con autoguardado cada 30 segundos y dictado por voz. Nunca pierdes información.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: PillBottle,
    title: 'Medicación y Dispensación',
    description: 'Seguimiento de medicación activa, notas farmacéuticas e historial de dispensaciones con control de cantidades.',
    color: 'bg-lime-50 text-lime-600',
  },
  {
    icon: BellRing,
    title: 'Dosificación y Recordatorios',
    description: 'Planes de dosificación con recordatorios automáticos. El paciente registra sus tomas y el profesional monitoriza la adherencia.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Building2,
    title: 'Multi-Organizaciones',
    description: 'Sistema multi-tenant con aislamiento total de datos. Gestiona múltiples clínicas o farmacias de forma independiente.',
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
    description: 'Almacenamiento seguro de documentos clínicos en la nube. Accede desde cualquier dispositivo.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: CalendarSync,
    title: 'Sincronización de Calendario',
    description: 'Conecta Google Calendar y Microsoft Outlook para sincronización bidireccional de citas.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Fingerprint,
    title: 'Seguridad Avanzada',
    description: 'Autenticación biométrica (huella, Face ID, Windows Hello), PIN de acceso y gestión de roles y permisos.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: BellRing,
    title: 'Notificaciones Multicanal',
    description: 'Recordatorios automáticos por push, email, SMS y WhatsApp con horarios personalizables.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: BarChart3,
    title: 'Informes y Estadísticas',
    description: 'Dashboard con KPIs, gráficos de actividad, tasa de ocupación, servicios más utilizados y análisis de tendencias.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: ShieldCheck,
    title: 'RGPD y Consentimientos',
    description: 'Generación de PDFs de consentimiento, firma digital, aceptación de políticas y trazabilidad legal completa.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: ScrollText,
    title: 'Auditoría y Trazabilidad',
    description: 'Registro completo de acciones del sistema con filtros por usuario, fecha y tipo de operación.',
    color: 'bg-stone-50 text-stone-600',
  },
  {
    icon: ClipboardList,
    title: 'Gestión de Profesionales',
    description: 'Administra médicos, nutricionistas y farmacéuticos con sus especialidades, horarios y colores de agenda.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Mic,
    title: 'Notas por Voz',
    description: 'Dicta notas clínicas directamente en la consulta. Reconocimiento de voz en español, inglés y catalán.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación Integrada',
    description: 'Envía comunicaciones por email y WhatsApp directamente desde la aplicación a pacientes y equipo.',
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
            MedFarmaSoft integra más de 40 funcionalidades para la gestión completa de tu clínica o farmacia:
            desde citas y medicación hasta auditoría y cumplimiento normativo.
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
