import { Mail, MapPin } from 'lucide-react'

const footerLinks = {
  Producto: [
    { label: 'Características', href: '#features' },
    { label: 'Cómo funciona', href: '#how-it-works' },
    { label: 'Plataformas', href: '#platforms' },
  ],
  Empresa: [
    { label: 'Sobre nosotros', href: '#' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contacto', href: '#contact' },
    { label: 'Empleo', href: '#' },
  ],
  Legal: [
    { label: 'Aviso legal', href: '/legal/aviso-legal.html' },
    { label: 'Términos de servicio', href: '/legal/terminos.html' },
    { label: 'Política de privacidad', href: '/legal/privacy.html' },
    { label: 'Política de cookies', href: '/legal/cookies.html' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold">
                MedFarma<span className="text-accent">Soft</span>
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Software de gestión integral para clínicas y farmacias.
              Multiplataforma, seguro y cumpliendo con toda la normativa RGPD.
            </p>

            <div className="space-y-3">
              <a href="mailto:info@medfarmasoft.es" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors text-sm">
                <Mail size={16} />
                info@medfarmasoft.es
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={16} />
                España
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} MedFarmaSoft. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-xs">
              v1.0.2
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
