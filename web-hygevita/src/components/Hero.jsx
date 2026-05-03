import { ArrowRight, Play, Shield, Users, CalendarDays } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-tab/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
              <Shield size={16} />
              <span>Cumplimiento RGPD garantizado</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up animate-delay-100">
              Gestiona tu clínica
              <span className="block text-accent">de forma sencilla</span>
              y asequible
            </h1>

            <p className="text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up animate-delay-200">
              Citas, pacientes, historial clínico, medicación, facturación y recordatorios WhatsApp en una app nativa multiplataforma.
              Con sincronización de Google Calendar, dictado por voz, auditoría completa y cumplimiento RGPD total.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-300">
              <a
                href="/registro"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-secondary font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Empezar gratis
                <ArrowRight size={20} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-lg backdrop-blur-sm transition-all border border-white/20"
              >
                <Play size={20} />
                Ver cómo funciona
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 animate-fade-in-up animate-delay-400">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">14</div>
                <div className="text-white/60 text-sm mt-1">Días gratis</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">4</div>
                <div className="text-white/60 text-sm mt-1">Plataformas</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">40+</div>
                <div className="text-white/60 text-sm mt-1">Funcionalidades</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">100%</div>
                <div className="text-white/60 text-sm mt-1">RGPD</div>
              </div>
            </div>
          </div>

          {/* Right - App mockup */}
          <div className="relative animate-fade-in-up animate-delay-300">
            <div className="relative mx-auto max-w-md">
              {/* Phone frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/30">
                <div className="bg-gradient-to-br from-primary/10 via-white to-teal-tab/10 rounded-[2.3rem] overflow-hidden aspect-[9/19]">
                  {/* Screen content */}
                  <div className="p-6 pt-12">
                    {/* Status bar */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xs text-gray-500">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                        <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                        <div className="w-6 h-3 bg-primary rounded-sm" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">H</span>
                      </div>
                      <div>
                        <div className="font-bold text-secondary text-sm">Hygevita</div>
                        <div className="text-xs text-gray-400">Panel de Control</div>
                      </div>
                    </div>

                    {/* Dashboard cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CalendarDays size={16} className="text-primary" />
                          </div>
                          <span className="font-semibold text-sm text-secondary">Citas Hoy</span>
                        </div>
                        <div className="text-3xl font-bold text-primary">12</div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                          <div className="bg-primary rounded-full h-1.5 w-3/4" />
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Users size={16} className="text-accent" />
                          </div>
                          <span className="font-semibold text-sm text-secondary">Pacientes</span>
                        </div>
                        <div className="text-3xl font-bold text-accent">248</div>
                        <div className="text-xs text-green-500 font-medium mt-1">+12% este mes</div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                              <Shield size={16} className="text-green-600" />
                            </div>
                            <span className="font-semibold text-sm text-secondary">RGPD</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">Cumplido</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield size={16} className="text-green-600" />
                </div>
                <span className="text-xs font-semibold text-secondary pr-1">Seguro</span>
              </div>

              <div className="absolute -right-4 bottom-1/3 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <CalendarDays size={16} className="text-primary" />
                </div>
                <span className="text-xs font-semibold text-secondary pr-1">Citas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
