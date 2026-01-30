import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Características', href: '#features' },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Plataformas', href: '#platforms' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
              MedFarma<span className="text-accent">Soft</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-secondary hover:text-primary hover:bg-primary/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-accent hover:bg-accent-light text-secondary font-semibold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Solicitar Demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-secondary' : 'text-white'
            }`}
            aria-label="Menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-xl border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-secondary hover:text-primary hover:bg-primary/5 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center mt-3 px-6 py-3 bg-accent hover:bg-accent-light text-secondary font-semibold rounded-full transition-all"
          >
            Solicitar Demo
          </a>
        </div>
      </div>
    </nav>
  )
}
