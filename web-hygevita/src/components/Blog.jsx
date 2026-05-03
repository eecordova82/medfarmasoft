import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const articles = [
  {
    title: 'Cómo digitalizar tu clínica en 5 pasos',
    excerpt:
      'La digitalización de una clínica no tiene por qué ser complicada. Descubre los pasos esenciales para modernizar tu gestión sanitaria y mejorar la experiencia del paciente.',
    category: 'Gestión clínica',
    date: '22 Ene 2026',
    readTime: '5 min',
    href: '/blog/digitalizar-clinica.html',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
  },
  {
    title: 'RGPD en el sector salud: guía práctica 2026',
    excerpt:
      'Todo lo que necesitas saber sobre la protección de datos en clínicas y farmacias. Obligaciones, derechos de los pacientes y cómo cumplir con la normativa vigente.',
    category: 'Normativa',
    date: '15 Ene 2026',
    readTime: '7 min',
    href: '/blog/rgpd-sector-salud.html',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
  },
  {
    title: 'Gestión de inventario en farmacias: mejores prácticas',
    excerpt:
      'Optimiza el control de stock de tu farmacia con estas estrategias probadas. Reduce pérdidas, controla caducidades y mejora la rentabilidad de tu negocio.',
    category: 'Farmacia',
    date: '8 Ene 2026',
    readTime: '6 min',
    href: '/blog/gestion-inventario-farmacias.html',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop',
  },
]

export default function Blog() {
  const ref = useScrollReveal()

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
            Recursos para tu{' '}
            <span className="gradient-text">negocio sanitario</span>
          </h2>
          <p className="text-lg text-neutral-text max-w-2xl mx-auto">
            Artículos, guías y consejos para optimizar la gestión de tu clínica o farmacia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <a
              key={article.title}
              href={article.href}
              className="reveal group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-text mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-text">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
