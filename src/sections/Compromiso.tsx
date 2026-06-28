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
    title: 'Confidencialidad',
    description: 'Protección absoluta de datos sensibles',
    icon: Lock,
  },
  {
    title: 'Transparencia',
    description: 'Procesos claros y auditables en cada etapa',
    icon: Eye,
  },
  {
    title: 'Integridad',
    description: 'Ética profesional como fundamento de cada acción',
    icon: Shield,
  },
  {
    title: 'Trazabilidad',
    description: 'Registro documentado de cada gestión realizada',
    icon: FileCheck,
  },
]

// ---------------------------------------------------------------------------
// Circuit SVG decoration — animated nodes and traces
// ---------------------------------------------------------------------------
function CircuitDecoration({ variant = 0 }: { variant?: number }) {
  const configs = [
    // Confidencialidad — circuit pattern
    {
      lines: [
        { x1: 0, y1: 20, x2: 15, y2: 20, flow: true },
        { x1: 15, y1: 20, x2: 15, y2: 8, flow: false },
        { x1: 40, y1: 20, x2: 55, y2: 20, flow: true },
        { x1: 55, y1: 20, x2: 55, y2: 14, flow: false },
        { x1: 20, y1: 50, x2: 35, y2: 50, flow: true },
      ],
      nodes: [
        { cx: 15, cy: 20, delay: 0 },
        { cx: 55, cy: 20, delay: 0.3 },
        { cx: 35, cy: 50, delay: 0.6 },
      ],
    },
    // Transparencia — circuit pattern
    {
      lines: [
        { x1: 5, y1: 10, x2: 20, y2: 10, flow: true },
        { x1: 20, y1: 10, x2: 20, y2: 25, flow: false },
        { x1: 45, y1: 15, x2: 55, y2: 15, flow: true },
        { x1: 50, y1: 40, x2: 50, y2: 55, flow: true },
        { x1: 50, y1: 55, x2: 35, y2: 55, flow: false },
      ],
      nodes: [
        { cx: 20, cy: 25, delay: 0.2 },
        { cx: 55, cy: 15, delay: 0.5 },
        { cx: 50, cy: 55, delay: 0.8 },
      ],
    },
    // Integridad — circuit pattern
    {
      lines: [
        { x1: 10, y1: 5, x2: 10, y2: 20, flow: true },
        { x1: 10, y1: 20, x2: 25, y2: 20, flow: false },
        { x1: 40, y1: 10, x2: 40, y2: 30, flow: true },
        { x1: 40, y1: 30, x2: 55, y2: 30, flow: false },
        { x1: 15, y1: 50, x2: 30, y2: 50, flow: true },
        { x1: 30, y1: 50, x2: 30, y2: 40, flow: false },
      ],
      nodes: [
        { cx: 10, cy: 20, delay: 0.1 },
        { cx: 40, cy: 30, delay: 0.4 },
        { cx: 30, cy: 50, delay: 0.7 },
      ],
    },
    // Trazabilidad — circuit pattern
    {
      lines: [
        { x1: 0, y1: 15, x2: 12, y2: 15, flow: true },
        { x1: 12, y1: 15, x2: 12, y2: 5, flow: false },
        { x1: 25, y1: 25, x2: 40, y2: 25, flow: true },
        { x1: 40, y1: 25, x2: 40, y2: 15, flow: false },
        { x1: 40, y1: 15, x2: 60, y2: 15, flow: true },
        { x1: 20, y1: 55, x2: 35, y2: 55, flow: false },
      ],
      nodes: [
        { cx: 12, cy: 15, delay: 0.15 },
        { cx: 40, cy: 25, delay: 0.45 },
        { cx: 35, cy: 55, delay: 0.75 },
      ],
    },
  ]

  const config = configs[variant % configs.length]

  return (
    <svg
      className="circuit-traces absolute inset-0 w-full h-full"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Circuit traces */}
      {config.lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={line.flow ? 0.6 : 0.3}
          className={line.flow ? 'circuit-flow-line' : ''}
        />
      ))}

      {/* Circuit nodes */}
      {config.nodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r="1.5"
            fill="currentColor"
            opacity="0.4"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.2"
          >
            <animate
              attributeName="r"
              values="3;5;3"
              dur="2s"
              begin={`${node.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0;0.2"
              dur="2s"
              begin={`${node.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Corner micro-details */}
      <circle cx="2" cy="2" r="0.8" fill="currentColor" opacity="0.15" />
      <circle cx="58" cy="58" r="0.8" fill="currentColor" opacity="0.15" />
      <line x1="2" y1="2" x2="8" y2="2" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
      <line x1="52" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Pillar Card — futuristic with circuit decoration
// ---------------------------------------------------------------------------
function PillarCard({
  value,
  index,
}: {
  value: (typeof values)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const Icon = value.icon

  // Icon entrance animation
  useEffect(() => {
    const el = iconRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, {
        scale: 0,
        rotate: -180,
        opacity: 0,
      }, {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [index, reducedMotion])

  // Hover effect
  useEffect(() => {
    const el = cardRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -4,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
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
      className="pillar-card group"
    >
      {/* Circuit SVG decoration */}
      <CircuitDecoration variant={index} />

      {/* Icon with circuit node styling */}
      <div
        ref={iconRef}
        className="circuit-node relative bg-secondary/10 text-secondary group-hover:bg-secondary/15 transition-colors duration-300 dark:bg-secondary/10 dark:text-secondary"
      >
        {/* Pulsing corner dots */}
        {!reducedMotion && (
          <>
            <span className="node-dot top" />
            <span className="node-dot right" />
            <span className="node-dot bottom" />
            <span className="node-dot left" />
          </>
        )}
        <Icon className="h-6 w-6 relative z-10" aria-hidden="true" />
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-foreground mb-2 relative z-10">
        {value.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
        {value.description}
      </p>

      {/* Bottom circuit line */}
      <div className="mt-4 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div className="w-1 h-1 rounded-full bg-secondary/40" />
        <div className="w-8 h-px bg-gradient-to-r from-secondary/20 to-secondary/40" />
        <div className="w-1 h-1 rounded-full bg-secondary/40" />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Geometric pattern for the premium card
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GeometricPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-compromiso" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-compromiso)" />
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
            className="absolute top-4 right-4 lg:right-16 hidden lg:block z-0"
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
            className="absolute bottom-8 left-4 lg:left-16 hidden lg:block z-0"
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
      <div ref={headlineRef} className="relative z-10 mb-8 sm:mb-12 md:mb-16">
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground tracking-tight leading-[1.05] max-w-4xl"
        >
          Confidencialidad{' '}
          <span className="text-gradient">y Transparencia</span>
        </h2>

        {/* Subtitle as secondary statement */}
        <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
          Cada dato que nos confías está protegido con los más altos estándares de seguridad y ética profesional.
        </p>
      </div>

      

      {/* ── PILLARS — Fixed grid, futuristic circuit cards ── */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          staggerDelay={0.12}
        >
          {values.map((value, index) => (
            <PillarCard key={value.title} value={value} index={index} />
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
