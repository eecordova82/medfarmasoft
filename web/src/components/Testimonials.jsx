import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    name: 'Dra. María García',
    role: 'Directora Médica',
    entity: 'Clínica Salud Integral',
    text: 'MedFarmaSoft ha transformado la gestión de nuestra clínica. El historial clínico digital y la gestión de citas nos han permitido atender a más pacientes con mayor eficiencia.',
    rating: 5,
    initials: 'MG',
    color: 'bg-primary',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Farmacéutico Titular',
    entity: 'Farmacia Central',
    text: 'La facilidad de uso y el cumplimiento RGPD nos dieron la confianza para digitalizar todos nuestros procesos. El soporte técnico es excepcional.',
    rating: 5,
    initials: 'CR',
    color: 'bg-blue-600',
  },
  {
    name: 'Ana Martínez',
    role: 'Administradora',
    entity: 'Centro Médico Norte',
    text: 'El sistema multi-organización nos permite gestionar tres centros desde una sola cuenta. Las notificaciones automáticas han reducido las ausencias un 40%.',
    rating: 5,
    initials: 'AM',
    color: 'bg-purple-600',
  },
  {
    name: 'Dr. Fernando López',
    role: 'Nutricionista',
    entity: 'NutriVida Consultas',
    text: 'Los episodios clínicos con autoguardado son una maravilla. Puedo concentrarme en el paciente sin preocuparme por perder información.',
    rating: 5,
    initials: 'FL',
    color: 'bg-amber-600',
  },
  {
    name: 'Laura Sánchez',
    role: 'Coordinadora',
    entity: 'Clínica Dental Sonríe',
    text: 'La autenticación biométrica y el almacenamiento en la nube nos dan tranquilidad total sobre la seguridad de los datos de nuestros pacientes.',
    rating: 5,
    initials: 'LS',
    color: 'bg-rose-600',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useScrollReveal()

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-light-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Lo que dicen nuestros{' '}
            <span className="gradient-text">profesionales</span>
          </h2>
          <p className="text-lg text-neutral-text">
            Clínicas y farmacias que ya confían en MedFarmaSoft para su gestión diaria.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="reveal max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
            <Quote size={48} className="text-primary/10 absolute top-8 right-8" />

            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div className={`w-16 h-16 lg:w-20 lg:h-20 ${testimonials[current].color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xl lg:text-2xl font-bold">
                    {testimonials[current].initials}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div>
                  <div className="font-bold text-secondary">{testimonials[current].name}</div>
                  <div className="text-sm text-neutral-text">
                    {testimonials[current].role} — {testimonials[current].entity}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === current ? 'bg-primary w-8' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Testimonio ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
