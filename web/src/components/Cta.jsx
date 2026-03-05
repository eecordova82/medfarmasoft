import { ArrowRight, Smartphone, Monitor, Apple } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Cta() {
  const ref = useScrollReveal()

  return (
    <section className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-primary-light p-10 lg:p-16">
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Empieza a gestionar tu centro{' '}
                <span className="text-accent">hoy mismo</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Prueba MedFarmaSoft gratis durante 14 días en tu dispositivo favorito.
                Sin tarjeta de crédito, sin compromiso, sin permanencia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-secondary font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-accent/25"
                >
                  Empezar gratis
                  <ArrowRight size={20} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-lg backdrop-blur-sm transition-all border border-white/20"
                >
                  Solicitar demo
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end gap-6">
              {/* Platform icons */}
              <div className="flex flex-col gap-4 items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover-lift">
                  <Smartphone size={32} className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-medium">Android</span>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover-lift">
                  <Apple size={32} className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-medium">iOS</span>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover-lift">
                  <Monitor size={32} className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-medium">Windows</span>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover-lift">
                  <Apple size={32} className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-medium">macOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
