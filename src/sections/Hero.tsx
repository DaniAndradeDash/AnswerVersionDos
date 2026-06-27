'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, CheckCircle2, TrendingUp, Users } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'
import { GradientOrb } from '@/components/motion/GradientOrb'
import { TextReveal } from '@/components/motion/TextReveal'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/* ── Trust Pill ── */
function TrustPill({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 group">
      <div className="p-1.5 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
        <Icon className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
      </div>
      <div>
        <span className="text-sm font-bold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground ml-1.5">{label}</span>
      </div>
    </div>
  )
}

/* ── Floating Particle ── */
function Particle({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return

    gsap.fromTo(el,
      { opacity: 0, y: 0 },
      {
        opacity: 0.5,
        y: -100 - Math.random() * 60,
        x: (Math.random() - 0.5) * 40,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }
    )
  }, [delay, duration, reducedMotion])

  return (
    <div
      ref={ref}
      className="absolute rounded-full bg-secondary/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity: 0 }}
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Particles
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    x: Math.random() * 100,
    y: 20 + Math.random() * 70,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
  }))

  // Mouse parallax
  useEffect(() => {
    if (reducedMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })

      // Title clip-path reveal
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('.title-line')
        tl.fromTo(lines,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.9 },
          '-=0.3'
        )
      }

      // Image float in
      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          '-=0.6'
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-var(--header-height))] bg-background flex items-center overflow-hidden grid-pattern"
      aria-labelledby="hero-heading"
      style={{ opacity: 0 }}
    >
      {/* ── Background layers ── */}
      {!reducedMotion && (
        <>
          {/* Gradient orbs */}
          <GradientOrb size={600} color="var(--primary)" blur={120} opacity={0.06} speed={0.4} className="-top-48 -left-32" />
          <GradientOrb size={500} color="var(--secondary)" blur={100} opacity={0.05} speed={0.7} className="top-1/3 -right-24" />
          <GradientOrb size={350} color="var(--primary-light)" blur={80} opacity={0.04} speed={1} className="bottom-0 left-1/3" />

          {/* Diagonal gradient overlay for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(49,191,44,0.03) 60%, transparent 80%)' }}
            aria-hidden="true"
          />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((p) => <Particle key={p.id} {...p} />)}
          </div>

          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" aria-hidden="true" />
        </>
      )}

      {/* ── Content ── */}
      <div
        className="mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 py-16 lg:py-0 px-4 sm:px-6 w-full relative z-10"
        style={
          !reducedMotion
            ? { transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)`, transition: 'transform 0.3s ease-out' }
            : undefined
        }
      >
        {/* Left — Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary tracking-wide">Asesoría · Innovación · Resultados</span>
          </div>

          {/* Title — clip-path reveal */}
          <h1
            id="hero-heading"
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
          >
            <span className="title-line block text-gradient">Tu negocio merece</span>
            <span className="title-line block text-foreground">mejores</span>
            <span className="title-line block text-gradient">respuestas.</span>
          </h1>

          {/* Subtitle — word reveal */}
          <div className="mt-6 max-w-xl mx-auto lg:mx-0">
            <TextReveal
              className="text-muted-foreground text-base sm:text-lg leading-relaxed"
              splitBy="words"
              delay={0.3}
              duration={0.7}
            >
              Somos una consultoría especializada en asesoría, orientación e innovación. Encontramos la solución indicada para tus desafíos.
            </TextReveal>
          </div>

          {/* CTAs — clear hierarchy */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <MagneticButton strength={25}>
              <Link href="#servicios">
                <Button
                  variant="secondary"
                  size="lg"
                  className="group"
                >
                  Nuestros Servicios
                  <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </MagneticButton>

            <Link href="#contacto">
              <Button
                variant="ghost"
                size="md"
                className="group text-muted-foreground hover:text-foreground"
              >
                Contáctanos
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Trust Pills */}
          <div className="mt-12 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
            <TrustPill icon={Users} value="+150" label="Clientes" />
            <TrustPill icon={TrendingUp} value="98%" label="Satisfacción" />
            <TrustPill icon={CheckCircle2} value="10+" label="Años" />
          </div>
        </div>

        {/* Right — Logo Image */}
        <div
          ref={imageRef}
          className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center mx-auto"
          style={!reducedMotion ? { transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`, transition: 'transform 0.4s ease-out' } : undefined}
        >
          {/* Soft glow behind logo */}
          {!reducedMotion && (
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 blur-3xl" aria-hidden="true" />
          )}

          {/* Spinning conic-gradient ring */}
          {!reducedMotion && (
            <div
              className="absolute inset-4 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(49,191,44,0.15) 25%, transparent 50%, rgba(4,38,140,0.1) 75%, transparent 100%)',
                animation: 'spin 25s linear infinite',
                mask: 'radial-gradient(circle, transparent 60%, black 61%, black 65%, transparent 66%)',
                WebkitMask: 'radial-gradient(circle, transparent 60%, black 61%, black 65%, transparent 66%)',
              }}
              aria-hidden="true"
            />
          )}

          {/* Logo with breathe animation */}
          <div className="relative z-10 w-full h-full p-8 lg:p-12">
            <Image
              src="/answer_heroDos.png"
              alt="Answer ST — Logo de la consultora"
              fill
              className="object-contain drop-shadow-2xl logo-breathe"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs">
          <span>Descubre más</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
