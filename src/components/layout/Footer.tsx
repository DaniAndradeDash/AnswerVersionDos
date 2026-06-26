import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { navItems } from '@/constants/navigation'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-surface border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-foreground">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Consultoría especializada en asesoría, orientación e innovación.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-surface-hover text-muted-foreground hover:text-secondary transition-colors duration-200"
                aria-label="Visitar Facebook de Answer ST"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-surface-hover text-muted-foreground hover:text-secondary transition-colors duration-200"
                aria-label="Contactar por WhatsApp"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 rounded-full hover:bg-surface-hover text-muted-foreground hover:text-secondary transition-colors duration-200"
                aria-label="Enviar correo electrónico"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Enlaces</h4>
            <nav aria-label="Enlaces del footer" className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-secondary transition-colors duration-200"
              >
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:+52${siteConfig.phone}`}
                className="flex items-center gap-2 hover:text-secondary transition-colors duration-200"
              >
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {siteConfig.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name} | Todos los derechos reservados
          </p>
          <p className="text-xs text-muted-foreground">
            Desarrollado por{' '}
            <a
              href="https://dashsystems.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Dash Systems
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
