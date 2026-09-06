import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, ArrowRight, Sparkles, Users, HeartHandshake } from 'lucide-react'
import { DeclarationCard } from '@/components/layout/DeclarationCard'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Derechos para Todxs | Answer ST',
  description:
    'ANSWER ST no discrimina. Compromiso público de no discriminación y respeto a los derechos humanos de todas las personas y colectivos sociales.',
  alternates: {
    canonical: `${siteConfig.url}/derechos-para-todxs/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Derechos para Todxs | Answer ST',
    description:
      'DECLARACIÓN DE NO DISCRIMINACIÓN — Compromiso público de Answer ST con los derechos humanos para todxs.',
    url: `${siteConfig.url}/derechos-para-todxs/`,
    type: 'website',
  },
}

const values = [
  {
    icon: Users,
    title: 'Igualdad',
    text: 'Nadie es menos ni más. Todxs acceden y reciben el servicio en igualdad de condiciones.',
  },
  {
    icon: HeartHandshake,
    title: 'Inclusión',
    text: 'Nos abrimos a la diversidad de orígenes, identidades, cuerpos y formas de vida.',
  },
  {
    icon: Sparkles,
    title: 'Respeto',
    text: 'Trato digno y sin barreras, porque el goce de derechos humanos no admite excepciones.',
  },
]

export default function DerechosParaTodxsPage() {
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
            className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Volver al inicio
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-500">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Derechos Humanos
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Derechos para{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">
              Todxs
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} se compromete públicamente a la no discriminación y al respeto de los
            derechos humanos de todas las personas, sin excepción.
          </p>
        </div>
      </div>

      {/* Declaration card */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <DeclarationCard />
      </div>

      {/* Values */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-cyan-400/40"
            >
              <span
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/10"
                aria-hidden="true"
              />
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-500 border border-cyan-400/20">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mb-1 text-sm font-bold text-foreground">{title}</h2>
              <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
              <span
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Legal note */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/60 bg-surface/50 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="text-sm leading-relaxed text-muted-foreground">
            Esta declaración es de aplicación permanente para {siteConfig.name} en la prestación de
            sus servicios de consultoría, asesoría e innovación.
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <Link
              href="/aviso-privacidad/"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
            >
              Aviso de privacidad
            </Link>
            <Link
              href="/#contacto"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
            >
              Contactar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}