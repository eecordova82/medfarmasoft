import { Smartphone, Monitor, Apple, TabletSmartphone } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const platforms = [
  {
    icon: Smartphone,
    name: 'Android',
    version: 'API 21+',
    description: 'Compatible con la mayoría de dispositivos Android del mercado.',
    gradient: 'from-green-500 to-green-400',
    bg: 'bg-green-50',
  },
  {
    icon: Apple,
    name: 'iOS',
    version: 'iOS 15.0+',
    description: 'iPhone y iPad con la experiencia nativa que esperas.',
    gradient: 'from-gray-800 to-gray-600',
    bg: 'bg-gray-50',
  },
  {
    icon: Monitor,
    name: 'Windows',
    version: 'Windows 10+',
    description: 'Aplicación de escritorio completa para estaciones de trabajo.',
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-50',
  },
  {
    icon: TabletSmartphone,
    name: 'macOS',
    version: 'macOS 14.0+',
    description: 'Aplicación nativa optimizada para el ecosistema Apple.',
    gradient: 'from-purple-600 to-purple-400',
    bg: 'bg-purple-50',
  },
]

export default function Platforms() {
  const ref = useScrollReveal()

  return (
    <section id="platforms" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Multiplataforma
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
              Una app,{' '}
              <span className="gradient-text">todas las plataformas</span>
            </h2>
            <p className="text-lg text-neutral-text mb-8">
              MedFarmaSoft funciona de forma nativa en Android, iOS, Windows y macOS.
              Tus datos se sincronizan en tiempo real y puedes trabajar desde cualquier
              dispositivo sin perder información.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <p className="text-neutral-text">
                  <span className="font-semibold text-secondary">Sincronización en la nube</span> — Tus datos siempre actualizados en todos los dispositivos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <p className="text-neutral-text">
                  <span className="font-semibold text-secondary">Modo offline</span> — Trabaja sin conexión a internet sin perder información.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <p className="text-neutral-text">
                  <span className="font-semibold text-secondary">Interfaz adaptada</span> — Diseño optimizado para cada dispositivo y resolución.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Platform cards */}
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '200ms' }}>
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className={`${platform.bg} rounded-2xl p-6 hover-lift border border-gray-100`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <platform.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-secondary text-lg">{platform.name}</h3>
                <p className="text-xs text-primary font-medium mt-1 mb-2">{platform.version}</p>
                <p className="text-neutral-text text-sm">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
