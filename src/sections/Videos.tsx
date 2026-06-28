'use client'

import { useRef, useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { GradientOrb } from '@/components/motion/GradientOrb'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function VectorGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid)" />
    </svg>
  )
}

function CircuitLines({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 150 H80 L100 100 H150" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="150" cy="100" r="3" fill="currentColor" opacity="0.3" />
      <path d="M150 100 V50 L200 30 H250" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <circle cx="250" cy="30" r="2" fill="currentColor" opacity="0.25" />
      <path d="M100 100 V180 L160 200 H200 V250" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <circle cx="200" cy="250" r="2.5" fill="currentColor" opacity="0.2" />
      <path d="M160 200 H280" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <path d="M80 150 V220 L40 240 H0" stroke="currentColor" strokeWidth="1" opacity="0.12" />
    </svg>
  )
}

function HexPattern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M50 10 L85 30 V70 L50 90 L15 70 V30 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M100 50 L135 70 V110 L100 130 L65 110 V70 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      <path d="M150 90 L185 110 V150 L150 170 L115 150 V110 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <path d="M30 100 L65 120 V160 L30 180 L-5 160 V120 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
    </svg>
  )
}

function DotMatrix({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="150" height="150" fill="url(#dots)" />
    </svg>
  )
}

export default function Videos() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      const videoContainer = el.querySelector('[data-video-container]')
      if (videoContainer) {
        gsap.fromTo(
          videoContainer,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoContainer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Section
      ref={sectionRef}
      id="videos"
      variant="alt"
      headingId="videos-heading"
      className="relative overflow-hidden"
    >
      {/* ── Background Layers ── */}
      {!reducedMotion && (
        <>
          <GradientOrb
            size={500}
            color="var(--secondary)"
            blur={150}
            opacity={0.06}
            speed={0.4}
            className="top-10 -right-40"
          />
          <GradientOrb
            size={350}
            color="var(--primary)"
            blur={120}
            opacity={0.04}
            speed={0.6}
            className="bottom-10 -left-32"
          />
        </>
      )}

      {/* ── Vector Effects ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block" aria-hidden="true">
        {/* Left side: circuit lines */}
        <CircuitLines className="absolute top-8 left-4 w-64 h-64 text-secondary neon-circuit opacity-60" />

        {/* Right side: hex pattern */}
        <HexPattern className="absolute top-12 right-8 w-40 h-40 text-primary neon-hex opacity-50" />

        {/* Bottom-left: dot matrix */}
        <DotMatrix className="absolute bottom-16 left-8 w-36 h-36 text-secondary neon-dots opacity-40" />

        {/* Bottom-right: grid */}
        <VectorGrid className="absolute bottom-8 right-12 w-52 h-52 text-primary neon-grid opacity-40" />

        {/* Center-left floating hex */}
        <HexPattern className="absolute top-1/2 -translate-y-1/2 left-16 w-32 h-32 text-cyan-400 neon-cyan opacity-30" />

        {/* Top-right circuit */}
        <CircuitLines className="absolute top-20 right-1/3 w-48 h-48 text-green-400 neon-green opacity-35 scale-75" />

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-24 h-px bg-gradient-to-r from-secondary/30 to-transparent neon-line" />
        <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-l from-primary/30 to-transparent neon-line-reverse" />
      </div>

      {/* ── Section Header ── */}
      <div className="relative z-10 mb-8 sm:mb-10 lg:mb-14 text-center">
        <AnimatedSection animation="fade-up" duration={0.6}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 ring-1 ring-secondary/20">
              <Play className="h-3.5 w-3.5 text-secondary" fill="currentColor" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-secondary uppercase tracking-[0.2em]">
              Video Institucional
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.1} duration={0.6}>
          <h2
            id="videos-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
          >
            Conoce{' '}
            <span className="text-gradient">Answer </span>
            <span className="text-green-500">ST</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.2} duration={0.6}>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
            Descubre quiénes somos y cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </AnimatedSection>
      </div>

      {/* ── Vertical Video ── */}
      <div
        data-video-container
        className="relative z-10 flex justify-center"
      >
        {/* Video container */}
        <div className="relative">
          {/* Outer glow */}
          {!reducedMotion && (
            <div
              className="absolute -inset-6 bg-secondary/10 rounded-[2rem] blur-3xl scale-[0.95] neon-glow"
              aria-hidden="true"
            />
          )}

          {/* Main video wrapper */}
          <div
            ref={videoWrapperRef}
            className="relative aspect-[9/16] w-[280px] max-w-[85vw] sm:w-72 md:w-80 lg:w-96 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-border/50"
          >
            {/* Video */}
            <video
              src="/answerst.mp4"
              className="w-full h-full object-cover"
              controls
              preload="none"
              playsInline
              aria-label="Video institucional de Answer ST"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer transition-opacity duration-500"
                onClick={() => {
                  const video = videoWrapperRef?.current?.querySelector('video')
                  video?.play()
                  setIsPlaying(true)
                }}
                role="button"
                tabIndex={0}
                aria-label="Reproducir video institucional"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    const video = videoWrapperRef?.current?.querySelector('video')
                    video?.play()
                    setIsPlaying(true)
                  }
                }}
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-secondary/90 backdrop-blur-sm shadow-lg shadow-secondary/40 ring-1 ring-white/10 transition-transform duration-300 hover:scale-110 group">
                  <Play
                    className="h-7 w-7 text-white ml-0.5 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
