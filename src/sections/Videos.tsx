'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { GradientOrb } from '@/components/motion/GradientOrb'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div
      className="relative aspect-video w-full rounded-xl bg-slate-800/50 animate-pulse"
      aria-hidden="true"
    />
  ),
})

export default function Videos() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const playOverlayRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const reducedMotion = useReducedMotion()

  // GSAP entrance animations
  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      // Subtle float-in for the video container area
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

  // Play button entrance animation
  useEffect(() => {
    const el = playOverlayRef.current
    if (!el || reducedMotion || isPlaying) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [reducedMotion, isPlaying])

  // Pulse animation for the play button ring
  useEffect(() => {
    const el = playOverlayRef.current
    if (!el || reducedMotion || isPlaying) return

    const ring = el.querySelector('[data-play-ring]')
    if (!ring) return

    const ctx = gsap.context(() => {
      gsap.to(ring, {
        scale: 1.15,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [reducedMotion, isPlaying])

  return (
    <Section
      ref={sectionRef}
      id="videos"
      variant="dark"
      headingId="videos-heading"
      className="relative overflow-hidden"
    >
      {/* ── Background Layers ── */}
      {!reducedMotion && (
        <>
          <GradientOrb
            size={600}
            color="var(--secondary)"
            blur={150}
            opacity={0.04}
            speed={0.4}
            className="top-0 -right-40"
          />
          <GradientOrb
            size={400}
            color="var(--primary)"
            blur={120}
            opacity={0.03}
            speed={0.6}
            className="bottom-0 -left-32"
          />
        </>
      )}

      {/* Large PLAY watermark */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="text-[18rem] sm:text-[22rem] lg:text-[28rem] font-black leading-none tracking-tighter text-white/[0.015]">
            PLAY
          </span>
        </div>
      )}

      {/* Subtle horizontal divider lines */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"
        aria-hidden="true"
      />

      {/* ── Section Header — Breaks the pattern ── */}
      <div ref={headerRef} className="relative z-10 mb-12 lg:mb-16">
        {/* Minimal label */}
        <AnimatedSection animation="fade-up" duration={0.6}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 ring-1 ring-secondary/20">
              <Play className="h-3.5 w-3.5 text-secondary" fill="currentColor" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-secondary uppercase tracking-[0.2em]">
              Video Institucional
            </span>
          </div>
        </AnimatedSection>

        {/* Title — left-aligned, bold, minimal */}
        <AnimatedSection animation="fade-up" delay={0.1} duration={0.6}>
          <h2
            id="videos-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Conoce{' '}
            <span className="text-gradient">Answer ST</span>
          </h2>
        </AnimatedSection>

        {/* Description — minimal, let the video speak */}
        <AnimatedSection animation="fade-up" delay={0.2} duration={0.6}>
          <p className="mt-4 text-slate-400 max-w-lg text-base sm:text-lg leading-relaxed">
            Descubre quiénes somos y cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </AnimatedSection>

        {/* Decorative line under header */}
        {!reducedMotion && (
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-secondary to-transparent" aria-hidden="true" />
            <div className="h-1 w-1 rounded-full bg-secondary/40" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ── Premium Video Presentation ── */}
      <div
        data-video-container
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Outer glow behind the video */}
        {!reducedMotion && (
          <div
            className="absolute -inset-4 bg-secondary/5 rounded-3xl blur-2xl scale-[0.98]"
            aria-hidden="true"
          />
        )}

        {/* Main video frame — glass morphism with gradient border */}
        <div
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-700/60 p-px shadow-2xl shadow-black/40"
        >
          {/* Inner container */}
          <div className="relative rounded-[15px] overflow-hidden bg-slate-900">
            {/* Top bar — subtle, not macOS dots */}
            <div className="relative flex items-center justify-between px-5 py-3 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/40">
              {/* Left side: dot indicator (minimal, single accent) */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary/60" aria-hidden="true" />
                <span className="text-xs text-slate-500 font-medium tracking-wide">
                  Video Institucional
                </span>
              </div>

              {/* Right side: resolution badge */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                  HD
                </span>
              </div>
            </div>

            {/* Video area with play overlay */}
            <div className="relative">
              <VideoPlayer
                src="/answerst.mp4"
                title="Video Institucional Answer ST"
              />

              {/* Custom play overlay — fades when playing */}
              {!isPlaying && (
                <div
                  ref={playOverlayRef}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer transition-opacity duration-500"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Reproducir video institucional"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setIsPlaying(true)
                    }
                  }}
                >
                  {/* Pulsing ring */}
                  <div
                    data-play-ring
                    className="absolute flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-secondary/20"
                    aria-hidden="true"
                  />

                  {/* Play button */}
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-secondary/90 backdrop-blur-sm shadow-lg shadow-secondary/30 ring-1 ring-white/10 transition-transform duration-300 hover:scale-110 group">
                    <Play
                      className="h-7 w-7 sm:h-8 sm:w-8 text-white ml-0.5 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom caption bar */}
            <div className="relative px-5 py-4 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Green accent line */}
                  <div className="h-6 w-0.5 rounded-full bg-secondary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white/90">
                      Answer ST — Consultoría Especializada
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Video institucional · Descubre nuestros servicios
                    </p>
                  </div>
                </div>

                {/* Subtle gradient line */}
                <div className="hidden sm:block h-px w-24 bg-gradient-to-r from-secondary/40 to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Reflection effect below the video */}
        {!reducedMotion && (
          <div
            className="relative mx-auto mt-2 max-w-[90%] h-16 rounded-b-3xl bg-gradient-to-b from-secondary/5 to-transparent blur-xl"
            aria-hidden="true"
          />
        )}

        {/* Bottom decorative dots */}
        {!reducedMotion && (
          <div className="flex items-center justify-center gap-2 mt-10" aria-hidden="true">
            <div className="h-1 w-8 rounded-full bg-secondary/30" />
            <div className="h-1 w-1 rounded-full bg-slate-600/40" />
            <div className="h-1 w-1 rounded-full bg-slate-600/40" />
          </div>
        )}
      </div>
    </Section>
  )
}
