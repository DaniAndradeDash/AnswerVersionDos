'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Shield, Eye, Lock, FileCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Values data
// ---------------------------------------------------------------------------
const values = [
  {
    number: '01',
    title: 'Confidencialidad',
    description: 'Protección absoluta de datos sensibles',
    icon: Lock,
  },
  {
    number: '02',
    title: 'Transparencia',
    description: 'Procesos claros y auditables en cada etapa',
    icon: Eye,
  },
  {
    number: '03',
    title: 'Integridad',
    description: 'Ética profesional como fundamento de cada acción',
    icon: Shield,
  },
  {
    number: '04',
    title: 'Trazabilidad',
    description: 'Registro documentado de cada gestión realizada',
    icon: FileCheck,
  },
]

// ---------------------------------------------------------------------------
// Geometric pattern for the premium card
// ---------------------------------------------------------------------------
function GeometricPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white rotate-12 origin-top" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white -rotate-12 origin-top" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white rotate-6 origin-top" />
      </div>
      {/* Corner accent */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-white/10" />
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-white/10" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Value Card
// ---------------------------------------------------------------------------
function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const Icon = value.icon

  useEffect(() => {
    const el = cardRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      // Hover glow intensify
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -4,
          boxShadow: '0 20px 40px rgba(49, 191, 44, 0.15)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-shadow duration-300 group"
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Connecting line (between cards) */}
      {index < values.length - 1 && (
        <div
          className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-secondary/40 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Number watermark */}
      <span className="absolute top-3 right-4 text-4xl font-black text-secondary/5 select-none" aria-hidden="true">
        {value.number}
      </span>

      {/* Icon with colored background */}
      <div className="relative mb-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors duration-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
        {/* Icon glow ring */}
        <div className="absolute inset-0 rounded-2xl bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />
      </div>

      {/* Number badge */}
      <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-widest mb-2">
        {value.number}
      </span>

      {/* Title */}
      <h4 className="text-lg font-bold text-foreground mb-2">
        {value.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {value.description}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Section
// ---------------------------------------------------------------------------
export default function Compromiso() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const floatingRightRef = useRef<HTMLDivElement>(null)
  const floatingLeftRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  // GSAP scroll-driven parallax for floating images
  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Right floating image parallax
      if (floatingRightRef.current) {
        gsap.to(floatingRightRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Left floating image parallax
      if (floatingLeftRef.current) {
        gsap.to(floatingLeftRef.current, {
          y: 60,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Headline subtle parallax
      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Section
      ref={sectionRef}
      id="compromiso"
      variant="alt"
      headingId="compromiso-heading"
      className="relative overflow-hidden"
    >
      {/* Ambient glow */}
      {!reducedMotion && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Floating decorative images — enhanced visibility */}
      {!reducedMotion && (
        <>
          {/* Right: confiabilidad_transparencia — larger, with glow */}
          <div
            ref={floatingRightRef}
            className="absolute top-4 right-4 md:right-8 lg:right-16 hidden md:block z-0"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary/10 blur-2xl" aria-hidden="true" />
              <div className="relative h-[120px] w-[120px] md:h-[160px] md:w-[160px]">
                <Image
                  src="/confiabilidad_transparencia.png"
                  alt=""
                  fill
                  className="object-contain opacity-75 drop-shadow-lg pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Left: mira_futurista — larger, with glow */}
          <div
            ref={floatingLeftRef}
            className="absolute bottom-8 left-4 md:left-8 lg:left-16 hidden md:block z-0"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="relative h-[100px] w-[100px] md:h-[140px] md:w-[140px]">
                <Image
                  src="/mira_futurista.png"
                  alt=""
                  fill
                  className="object-contain opacity-70 drop-shadow-lg pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── HEADER: Breaks the pattern — no badge, large statement ── */}
      <div ref={headlineRef} className="relative z-10 mb-12 md:mb-16">
        {/* Decorative top line + label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gradient-to-r from-secondary to-transparent" aria-hidden="true" />
          <span className="text-xs font-mono font-medium text-secondary uppercase tracking-[0.25em]">
            Nuestro compromiso
          </span>
        </div>

        {/* Main headline — the commitment message IS the heading */}
        <h2
          id="compromiso-heading"
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground tracking-tight leading-[1.05] max-w-4xl"
        >
          Confidencialidad{' '}
          <span className="text-gradient">y Transparencia</span>
        </h2>

        {/* Subtitle as secondary statement */}
        <p className="mt-4 text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
          Cada dato que nos confías está protegido con los más altos estándares de seguridad y ética profesional.
        </p>
      </div>

      {/* ── MAIN STATEMENT CARD — Epic centerpiece ── */}
      <div className="relative z-10 mb-16 md:mb-20">
        <AnimatedSection animation="scale" delay={0.1} duration={0.7}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-secondary/10">
            {/* Multi-stop diagonal gradient background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-light to-primary"
              aria-hidden="true"
            />

            {/* Geometric pattern overlay */}
            <GeometricPattern />

            {/* Enhanced shine effect */}
            {!reducedMotion && (
              <div
                className="absolute inset-0 pointer-events-none shine-effect"
                aria-hidden="true"
              />
            )}

            {/* Layered depth shadows as pseudo-elements */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
              aria-hidden="true"
            />

            {/* Content — split layout on desktop */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-8 sm:p-10 md:p-14 lg:p-16">
              {/* Text content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Shield icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                  <Shield className="h-8 w-8 text-white" aria-hidden="true" />
                </div>

                {/* Main commitment message — large and impactful */}
                <p className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
                  Garantizamos la protección total de tu información con protocolos de cifrado avanzados y estrictos controles de acceso.
                </p>

                {/* Supporting line */}
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                  <div className="h-px w-8 bg-white/30" aria-hidden="true" />
                  <p className="text-white/70 text-sm sm:text-base font-medium">
                    Compromiso verificado por estándares internacionales
                  </p>
                </div>
              </div>

              {/* Visual element — floating stats/badges */}
              <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-xs lg:max-w-none">
                {/* Stat 1 */}
                <div className="flex flex-col items-center p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Lock className="h-6 w-6 text-white/80 mb-2" aria-hidden="true" />
                  <span className="text-white text-2xl font-bold">100%</span>
                  <span className="text-white/60 text-xs mt-1">Cifrado</span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Eye className="h-6 w-6 text-white/80 mb-2" aria-hidden="true" />
                  <span className="text-white text-2xl font-bold">24/7</span>
                  <span className="text-white/60 text-xs mt-1">Monitoreo</span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Shield className="h-6 w-6 text-white/80 mb-2" aria-hidden="true" />
                  <span className="text-white text-2xl font-bold">ISO</span>
                  <span className="text-white/60 text-xs mt-1">Estándares</span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <FileCheck className="h-6 w-6 text-white/80 mb-2" aria-hidden="true" />
                  <span className="text-white text-2xl font-bold">NDA</span>
                  <span className="text-white/60 text-xs mt-1">Firmado</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── VALUES — Horizontal scroll on mobile, grid on desktop ── */}
      <div className="relative z-10">
        <AnimatedSection animation="fade-up" delay={0.2} duration={0.6}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-secondary/50" aria-hidden="true" />
            <span className="text-xs font-mono font-medium text-secondary uppercase tracking-[0.2em]">
              Nuestros pilares
            </span>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          staggerDelay={0.1}
        >
          {values.map((value, index) => (
            <ValueCard key={value.number} value={value} index={index} />
          ))}
        </StaggerContainer>

        {/* Bottom accent line */}
        <div className="mt-12 flex justify-center" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      </div>
    </Section>
  )
}
