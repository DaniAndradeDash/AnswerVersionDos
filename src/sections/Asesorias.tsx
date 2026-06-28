'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Landmark,
  Scale,
  Building2,
  HeartPulse,
  Handshake,
  Leaf,
  ArrowRight,
  Target,
  Users,
  Briefcase,
  TrendingUp,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { GradientOrb } from '@/components/motion/GradientOrb'
import { asesorias } from '@/constants/asesorias'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  Scale,
  Building2,
  HeartPulse,
  Handshake,
  Leaf,
}

const statIcons = [Target, Users, Briefcase, TrendingUp]

/* ──────────────────────────────────────────────
   Advisory Card — horizontal layout, colored bar
   Light mode = original styles
   Dark mode = futuristic neon styles
   ────────────────────────────────────────────── */
function AsesoriaCard({
  item,
  index,
}: {
  item: (typeof asesorias)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const Icon = iconMap[item.icon] ?? Landmark

  // Icon entrance
  useEffect(() => {
    const el = iconRef.current
    if (!el || reducedMotion) return

    gsap.fromTo(
      el,
      { scale: 0, rotate: -90 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index, reducedMotion])

  return (
    <div
      ref={cardRef}
      className="asesoria-neon-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      style={{
        boxShadow: `0 0 0px ${item.color}00`,
      }}
      onMouseEnter={() => {
        if (!cardRef.current || reducedMotion) return
        gsap.to(cardRef.current, {
          boxShadow: `0 20px 40px ${item.color}20, 0 0 0 1px ${item.color}30`,
          duration: 0.4,
          ease: 'power2.out',
        })
      }}
      onMouseLeave={() => {
        if (!cardRef.current || reducedMotion) return
        gsap.to(cardRef.current, {
          boxShadow: `0 0 0px ${item.color}00`,
          duration: 0.4,
          ease: 'power2.out',
        })
      }}
    >
      {/* Light mode left colored bar (hidden in dark mode via CSS) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 z-10 transition-all duration-500 group-hover:w-1.5 dark:hidden"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      />

      {/* Dark mode corner accents */}
      <div
        className="hidden dark:block absolute top-3 right-3 w-4 h-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none">
          <path d="M16 0L16 16" stroke={item.color} strokeWidth="0.5" opacity="0.4" />
          <path d="M0 0L16 0" stroke={item.color} strokeWidth="0.5" opacity="0.4" />
          <circle cx="14" cy="2" r="1" fill={item.color} opacity="0.6" />
          <circle cx="2" cy="14" r="1" fill={item.color} opacity="0.3" />
        </svg>
      </div>

      {/* Card grid pattern (dark mode) */}
      <div className="card-grid-pattern" aria-hidden="true" />

      {/* Card body */}
      <div className="relative h-full p-6 pl-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm dark:border-none dark:bg-transparent dark:backdrop-blur-0">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${item.color}06 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Dark mode inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl dark:block hidden"
          style={{
            background: `radial-gradient(ellipse at top left, ${item.color}08 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-start gap-5">
          {/* Icon */}
          <div
            ref={iconRef}
            className="flex-shrink-0 p-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)`,
              boxShadow: `0 0 16px ${item.color}12`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: item.color }} aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-base text-foreground truncate">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:hidden"
          style={{
            background: `linear-gradient(90deg, ${item.color}80, transparent)`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Main Section
   ────────────────────────────────────────────── */
export default function Asesorias() {
  const reducedMotion = useReducedMotion()
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <Section
      id="asesorias"
      variant="default"
      headingId="asesorias-heading"
      className="relative overflow-hidden"
    >
      {/* Background decoration */}
      {!reducedMotion && (
        <>
          <GradientOrb
            size={500}
            color="var(--primary)"
            blur={120}
            opacity={0.06}
            speed={0.7}
            className="-top-40 left-1/4"
          />
          <GradientOrb
            size={400}
            color="var(--secondary)"
            blur={100}
            opacity={0.05}
            speed={1}
            className="-bottom-32 right-1/4"
          />
        </>
      )}

      {/* ─── HEADER — Left-aligned, breaks pattern ─── */}
      <div className="relative z-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left column: number + title */}
          <div className="lg:col-span-7">
            <AnimatedSection animation="fade-up" duration={0.6} delay={0.1}>
              <h2
                id="asesorias-heading"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground leading-tight"
              >
                Portafolio de
                <br />
                <span className="text-gradient">Asesorías</span>
              </h2>
            </AnimatedSection>
          </div>

          {/* Right column: description */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatedSection animation="fade-left" duration={0.6} delay={0.2}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Expertos en múltiples disciplinas a tu disposición.
                Cada área de práctica está diseñada para brindarte
                soluciones integrales que impulsan el crecimiento
                sostenible de tu organización.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" duration={0.5} delay={0.3}>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  áreas de especialización
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* ─── STATS — Bento-style dark band ─── */}
      <AnimatedSection animation="scale" duration={0.6} delay={0.1}>
        <div
          ref={statsRef}
          className="relative z-10 rounded-3xl overflow-hidden mb-16"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #0a1e5c 50%, var(--primary) 100%)',
          }}
        >
          {/* Subtle inner pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />

          {/* Gradient orb inside stats */}
          {!reducedMotion && (
            <GradientOrb
              size={300}
              color="var(--secondary)"
              blur={80}
              opacity={0.15}
              speed={0.8}
              className="-top-20 -right-20"
            />
          )}

          <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { label: 'Áreas de práctica', value: 6, suffix: '+' },
                { label: 'Clientes atendidos', value: 150, suffix: '+' },
                { label: 'Proyectos completados', value: 300, suffix: '+' },
                { label: 'Años de experiencia', value: 10, suffix: '' },
              ].map((stat, i) => {
                const StatIcon = statIcons[i] ?? Target
                const isFirst = i === 0

                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center text-center ${
                      isFirst ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                  >
                    {/* Icon circle */}
                    <div className="mb-3 p-2.5 rounded-full bg-white/10 backdrop-blur-sm">
                      <StatIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>

                    {/* Number */}
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2.2}
                        delay={0.3 + i * 0.12}
                      />
                    </div>

                    {/* Label */}
                    <div className="text-sm text-white/70 mt-2 font-medium">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── ADVISORY CARDS ─── */}
      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative z-10"
        staggerDelay={0.1}
      >
        {asesorias.map((item, index) => (
          <AsesoriaCard key={item.id} item={item} index={index} />
        ))}
      </StaggerContainer>

      {/* ─── FOOTER NOTE + CTA ─── */}
      <div className="mt-14 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Futuristic development badge */}
          <AnimatedSection animation="fade-right" delay={0.2} duration={0.5}>
            <div className="dev-badge">
              <span className="badge-dot" />
              <span>Más áreas de asesoría en desarrollo</span>
            </div>
          </AnimatedSection>

          {/* Neon CTA Button */}
          <AnimatedSection animation="fade-left" delay={0.3} duration={0.5}>
            <Link href="#contacto">
              <button
                className="neon-cta group"
                aria-label="Solicita tu asesoría"
              >
                Solicita tu asesoría
                <ArrowRight className="h-5 w-5 cta-arrow" aria-hidden="true" />
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </Section>
  )
}
