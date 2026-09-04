import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowUpRight, ChevronUp } from 'lucide-react'
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.08) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }}
      role="contentinfo"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

      {/* Glow accents */}
      <div
        className="absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'var(--secondary)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'var(--primary)' }}
        aria-hidden="true"
      />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-black tracking-tighter opacity-[0.02] whitespace-nowrap dark:hidden"
          style={{ color: 'var(--foreground)' }}
        >
          ANSWER.st
        </span>
        <span
          className="hidden dark:block text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-black tracking-tighter opacity-[0.03] whitespace-nowrap"
          style={{ color: 'var(--foreground)' }}
        >
          ANSWER<span style={{ color: '#22c55e' }}> st</span>
        </span>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Column — spans 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo + Brand */}
            <Link href="#hero" className="inline-flex items-center gap-3 group" aria-label="Answer ST — Ir al inicio">
              <div className="relative h-14 w-14 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Logo_letra.png"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
              <div>
                <span className="block font-bold text-2xl text-foreground tracking-tight">
                  {/* Light mode — ANSWER.st */}
                  <span className="dark:hidden">
                    ANSWER<span className="text-secondary">.st</span>
                  </span>
                  {/* Dark mode — ANSWER st */}
                  <span className="hidden dark:inline">
                    ANSWER<span className="text-green-500 dark:text-green-400"> st</span>
                  </span>
                </span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">
                  Consultoría Estratégica
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/50 bg-surface/50 text-muted-foreground hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 hover:shadow-glow"
                aria-label="Visitar Facebook de Answer ST"
              >
                <FacebookIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/50 bg-surface/50 text-muted-foreground hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 hover:shadow-glow"
                aria-label="Contactar por WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/50 bg-surface/50 text-muted-foreground hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 hover:shadow-glow"
                aria-label="Enviar correo electrónico"
              >
                <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Navigation Links — spans 3 cols */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
              Navegación
            </h4>
            <nav aria-label="Enlaces del footer" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit py-1"
                >
                  <span className="w-0 h-px bg-secondary transition-all duration-300 group-hover:w-3" />
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0 group-hover:translate-y-0 text-secondary"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column — spans 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/40 bg-surface/30 text-secondary/70 group-hover:text-secondary group-hover:border-secondary/20 transition-all duration-300">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5">{siteConfig.email}</span>
              </a>
              <a
                href={`tel:+52${siteConfig.phone}`}
                className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/40 bg-surface/30 text-secondary/70 group-hover:text-secondary group-hover:border-secondary/20 transition-all duration-300">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5">+52 {siteConfig.phone}</span>
              </a>
              <div className="group flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/40 bg-surface/30 text-secondary/70">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5">{siteConfig.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 relative">
          {/* Gradient separator line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--border) 20%, var(--secondary) 50%, var(--border) 80%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/70">
              <span>&copy; {currentYear} {siteConfig.name}</span>
              <span className="opacity-30">·</span>
              <Link
                href="/aviso-privacidad/"
                className="font-medium text-muted-foreground hover:text-secondary underline underline-offset-4 decoration-border hover:decoration-secondary transition-colors"
              >
                Aviso de privacidad
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-[11px] text-muted-foreground/50">
                Desarrollado por{' '}
                <a
                  href="https://dashsystems.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground/60 hover:text-secondary transition-colors duration-200"
                >
                  Dash Systems
                </a>
              </p>

              {/* Back to top */}
              <a
                href="#hero"
                className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-secondary transition-colors duration-200"
                aria-label="Volver al inicio"
              >
                <span className="hidden sm:inline">Inicio</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-border/40 bg-surface/30 text-muted-foreground/50 group-hover:text-secondary group-hover:border-secondary/30 group-hover:bg-secondary/5 transition-all duration-300">
                  <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
