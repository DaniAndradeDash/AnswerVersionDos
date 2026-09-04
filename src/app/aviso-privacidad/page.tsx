import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { privacySections, PRIVACY_LAST_UPDATED, privacyContact } from '@/constants/privacy'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Answer ST',
  description:
    'Conoce cómo Answer ST recaba, usa y protege tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  alternates: {
    canonical: `${siteConfig.url}/aviso-privacidad/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Aviso de Privacidad | Answer ST',
    description:
      'Información sobre el tratamiento de datos personales de Answer ST — Consultoría Estratégica en Monterrey.',
    url: `${siteConfig.url}/aviso-privacidad/`,
    type: 'article',
  },
}

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean)
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-7 text-muted-foreground whitespace-pre-line">
          {p}
        </p>
      ))}
    </>
  )
}

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header hero */}
      <div className="relative overflow-hidden border-b border-border/50 bg-surface/30">
        {/* Decorative orbs */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--primary)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--secondary)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Legal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Aviso de <span className="text-secondary">Privacidad</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            En {siteConfig.name} tu privacidad es fundamental. Este documento explica qué datos recabamos,
            para qué los usamos y cómo puedes ejercer tus derechos.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Última actualización: {PRIVACY_LAST_UPDATED}
            </span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span className="text-muted-foreground/70">
              Responsable: {privacyContact.responsable} — Monterrey, N.L.
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <article className="space-y-8">
          {privacySections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-2xl border border-border/60 bg-card p-6 sm:p-7 shadow-sm"
            >
              <h2 className="text-base sm:text-lg font-bold text-foreground mb-3">{section.title}</h2>
              <div className="space-y-3">
                <Paragraphs text={section.content} />
              </div>
            </section>
          ))}

          {/* Contact block */}
          <section className="rounded-2xl border border-border/60 bg-surface/50 p-6 sm:p-7">
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-4">Datos de contacto del responsable</h2>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-foreground font-medium">{privacyContact.responsable}</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-secondary flex-shrink-0" />
                <span>{privacyContact.domicilio}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-secondary flex-shrink-0" />
                <a href={`mailto:${privacyContact.email}`} className="text-foreground hover:text-secondary transition-colors">
                  {privacyContact.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-secondary flex-shrink-0" />
                <a href={`tel:+52${privacyContact.telefono.replace(/\D/g, '')}`} className="text-foreground hover:text-secondary transition-colors">
                  {privacyContact.telefono}
                </a>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
            >
              Contactar
            </Link>
          </div>
        </article>
      </div>

    </div>
  )
}
