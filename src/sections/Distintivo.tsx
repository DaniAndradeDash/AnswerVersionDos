'use client'

import { useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import { Leaf, Lightbulb, ShieldCheck, Eye, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { Float } from '@/components/motion/Float'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { distintivoItems, sliderImages } from '@/constants/distintivo'
import { siteConfig } from '@/config/site'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Lightbulb,
  ShieldCheck,
  Eye,
}

const iconColors = [
  { bg: 'bg-red-500/10', text: 'text-red-500', neon: 'neon-red' },
  { bg: 'bg-yellow-500/10', text: 'text-yellow-500', neon: 'neon-yellow' },
  { bg: 'bg-blue-500/10', text: 'text-blue-500', neon: 'neon-blue' },
  { bg: 'bg-cyan-400/10', text: 'text-cyan-400', neon: 'neon-cyan' },
]

/* ═══════════════════════════════════════════════════
   Tech Tree — Animated SVG (Desktop Only)
   Represents Infonagreen: environmental + technology
   8s cycle: 3s visible/forming → 5s fading out
   ═══════════════════════════════════════════════════ */
function TechTreeAnimation() {
  return (
    <div
      className="tech-tree-container hidden lg:flex items-end justify-center flex-shrink-0"
      style={{ width: '180px', height: '520px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ '--tree-glow': 'rgba(34,197,94,0.6)' } as React.CSSProperties}
      >
        {/* ═══ ROOTS — circuit lines spreading at base ═══ */}
        <path
          className="tech-tree-root"
          d="M90 480 L60 500 L30 505"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          className="tech-tree-root"
          d="M90 480 L120 500 L150 505"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          className="tech-tree-root"
          d="M90 480 L75 495 L70 510"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          className="tech-tree-root"
          d="M90 480 L105 495 L110 510"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Root node */}
        <circle cx="90" cy="480" r="5" className="tech-tree-node tech-tree-node-1" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="505" r="3" className="tech-tree-node tech-tree-node-2" fill="currentColor" opacity="0.5" />
        <circle cx="150" cy="505" r="3" className="tech-tree-node tech-tree-node-3" fill="currentColor" opacity="0.5" />

        {/* ═══ TRUNK — main circuit path ═══ */}
        <path
          className="tech-tree-trunk"
          d="M90 480 L90 380 L90 280 L90 180 L90 120"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ═══ BRANCHES — left side ═══ */}
        {/* Branch 1 (low-left) */}
        <path
          className="tech-tree-branch tech-tree-branch-1"
          d="M90 420 L60 390 L35 370"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch 2 (mid-left) */}
        <path
          className="tech-tree-branch tech-tree-branch-2"
          d="M90 340 L55 310 L30 290"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch 3 (high-left) */}
        <path
          className="tech-tree-branch tech-tree-branch-3"
          d="M90 260 L60 230 L40 210"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ═══ BRANCHES — right side ═══ */}
        {/* Branch 4 (low-right) */}
        <path
          className="tech-tree-branch tech-tree-branch-4"
          d="M90 400 L120 370 L145 350"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch 5 (mid-right) */}
        <path
          className="tech-tree-branch tech-tree-branch-5"
          d="M90 300 L125 270 L150 250"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch 6 (high-right) */}
        <path
          className="tech-tree-branch tech-tree-branch-6"
          d="M90 220 L120 190 L140 170"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ═══ NODES — glowing circles at branch ends ═══ */}
        {/* Left nodes */}
        <circle cx="35" cy="370" r="7" className="tech-tree-node tech-tree-node-1" fill="currentColor" />
        <circle cx="35" cy="370" r="3.5" fill="white" className="tech-tree-node tech-tree-node-1" opacity="0.3" />
        <circle cx="30" cy="290" r="7" className="tech-tree-node tech-tree-node-2" fill="currentColor" />
        <circle cx="30" cy="290" r="3.5" fill="white" className="tech-tree-node tech-tree-node-2" opacity="0.3" />
        <circle cx="40" cy="210" r="7" className="tech-tree-node tech-tree-node-3" fill="currentColor" />
        <circle cx="40" cy="210" r="3.5" fill="white" className="tech-tree-node tech-tree-node-3" opacity="0.3" />
        {/* Right nodes */}
        <circle cx="145" cy="350" r="7" className="tech-tree-node tech-tree-node-4" fill="currentColor" />
        <circle cx="145" cy="350" r="3.5" fill="white" className="tech-tree-node tech-tree-node-4" opacity="0.3" />
        <circle cx="150" cy="250" r="7" className="tech-tree-node tech-tree-node-5" fill="currentColor" />
        <circle cx="150" cy="250" r="3.5" fill="white" className="tech-tree-node tech-tree-node-5" opacity="0.3" />
        <circle cx="140" cy="170" r="7" className="tech-tree-node tech-tree-node-6" fill="currentColor" />
        <circle cx="140" cy="170" r="3.5" fill="white" className="tech-tree-node tech-tree-node-6" opacity="0.3" />

        {/* Trunk junction nodes */}
        <circle cx="90" cy="420" r="4" className="tech-tree-node tech-tree-node-1" fill="currentColor" opacity="0.7" />
        <circle cx="90" cy="340" r="4" className="tech-tree-node tech-tree-node-2" fill="currentColor" opacity="0.7" />
        <circle cx="90" cy="260" r="4" className="tech-tree-node tech-tree-node-3" fill="currentColor" opacity="0.7" />
        <circle cx="90" cy="300" r="4" className="tech-tree-node tech-tree-node-4" fill="currentColor" opacity="0.7" />

        {/* ═══ LEAVES — digital leaf shapes ═══ */}
        {/* Left leaves */}
        <g className="tech-tree-leaf tech-tree-leaf-1">
          <ellipse cx="20" cy="365" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(-30 20 365)" />
          <circle cx="20" cy="365" r="2" fill="currentColor" opacity="0.4" />
        </g>
        <g className="tech-tree-leaf tech-tree-leaf-2">
          <ellipse cx="18" cy="285" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(-25 18 285)" />
          <circle cx="18" cy="285" r="2" fill="currentColor" opacity="0.4" />
        </g>
        <g className="tech-tree-leaf tech-tree-leaf-3">
          <ellipse cx="28" cy="205" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(-35 28 205)" />
          <circle cx="28" cy="205" r="2" fill="currentColor" opacity="0.4" />
        </g>
        {/* Right leaves */}
        <g className="tech-tree-leaf tech-tree-leaf-4">
          <ellipse cx="160" cy="345" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(30 160 345)" />
          <circle cx="160" cy="345" r="2" fill="currentColor" opacity="0.4" />
        </g>
        <g className="tech-tree-leaf tech-tree-leaf-5">
          <ellipse cx="162" cy="245" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(25 162 245)" />
          <circle cx="162" cy="245" r="2" fill="currentColor" opacity="0.4" />
        </g>
        <g className="tech-tree-leaf tech-tree-leaf-6">
          <ellipse cx="152" cy="165" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(35 152 165)" />
          <circle cx="152" cy="165" r="2" fill="currentColor" opacity="0.4" />
        </g>

        {/* ═══ CROWN — top digital canopy ═══ */}
        <circle
          cx="90"
          cy="100"
          className="tech-tree-crown"
          fill="currentColor"
          opacity="0.12"
        />
        <circle
          cx="90"
          cy="100"
          r="25"
          className="tech-tree-crown"
          fill="currentColor"
          opacity="0.08"
        />
        {/* Crown node */}
        <circle cx="90" cy="100" r="6" className="tech-tree-node tech-tree-node-6" fill="currentColor" />
        <circle cx="90" cy="100" r="3" fill="white" className="tech-tree-node tech-tree-node-6" opacity="0.3" />

        {/* Crown branches */}
        <path className="tech-tree-branch tech-tree-branch-5" d="M90 120 L70 100 L55 95" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path className="tech-tree-branch tech-tree-branch-6" d="M90 120 L110 100 L125 95" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

        {/* Crown leaves */}
        <g className="tech-tree-leaf tech-tree-leaf-3">
          <ellipse cx="50" cy="92" rx="10" ry="5" fill="currentColor" opacity="0.12" transform="rotate(-20 50 92)" />
        </g>
        <g className="tech-tree-leaf tech-tree-leaf-6">
          <ellipse cx="130" cy="92" rx="10" ry="5" fill="currentColor" opacity="0.12" transform="rotate(20 130 92)" />
        </g>

        {/* ═══ DATA FLOW DOTS — particles traveling up the trunk ═══ */}
        <circle r="2.5" fill="currentColor" opacity="0.8" className="tech-tree-data-dot" />
        <circle r="2" fill="currentColor" opacity="0.6" className="tech-tree-data-dot-2" />
        <circle r="1.5" fill="currentColor" opacity="0.5" className="tech-tree-data-dot-3" />

        {/* ═══ SECONDARY CIRCUIT PATHS — decorative tech lines ═══ */}
        <path
          className="tech-tree-branch tech-tree-branch-3"
          d="M60 390 L50 375 L35 370"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        <path
          className="tech-tree-branch tech-tree-branch-6"
          d="M120 370 L130 355 L145 350"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Floating data points */}
        <circle cx="15" cy="430" r="2" className="tech-tree-leaf tech-tree-leaf-1" fill="currentColor" opacity="0.3" />
        <circle cx="165" cy="400" r="2" className="tech-tree-leaf tech-tree-leaf-4" fill="currentColor" opacity="0.3" />
        <circle cx="10" cy="320" r="1.5" className="tech-tree-leaf tech-tree-leaf-2" fill="currentColor" opacity="0.25" />
        <circle cx="170" cy="280" r="1.5" className="tech-tree-leaf tech-tree-leaf-5" fill="currentColor" opacity="0.25" />
      </svg>
    </div>
  )
}

/* ── Facebook CTA with pulse + shine (CSS-only, no framer-motion) ── */
function CTAFacebook() {
  const reducedMotion = useReducedMotion()

  return (
    <a
      href={siteConfig.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-fb-btn relative group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-base font-semibold rounded-full overflow-hidden shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
        !reducedMotion ? 'cta-fb-pulse' : ''
      }`}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Pulsing glow ring */}
      {!reducedMotion && (
        <span
          className="cta-fb-ring absolute -inset-1 rounded-full border-2 border-blue-400/40"
          aria-hidden="true"
        />
      )}

      {/* Facebook icon */}
      <span className="relative z-10 cta-fb-icon">
        <FacebookIcon className="h-5 w-5" />
      </span>

      {/* Text */}
      <span className="relative z-10">Visítanos en Facebook</span>

      {/* External link arrow */}
      <span className="relative z-10 cta-fb-arrow">
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </span>
    </a>
  )
}

export default function Distintivo() {
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = useCallback((index: number) => {
    const maxIndex = sliderImages.length - 1
    const targetIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentSlide(targetIndex)
  }, [])

  const scrollByAmount = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? currentSlide + 1 : currentSlide - 1
    goToSlide(newIndex)
  }, [currentSlide, goToSlide])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByAmount('prev')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByAmount('next')
    }
  }, [scrollByAmount])

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentSlide + 1) % sliderImages.length
      goToSlide(next)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide, goToSlide])

  return (
    <Section id="distintivo" variant="alt" headingId="distintivo-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left: INFONAGREEN */}
        <div className="space-y-8">
          <AnimatedSection animation="fade-right" duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 sm:h-20 sm:w-20 relative flex-shrink-0">
                <Image
                  src="/Infonagreen.png"
                  alt="Logo de INFONAGREEN"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 id="distintivo-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-green-700">
                  Infonagreen
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {distintivoItems.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Leaf
              const colors = iconColors[index % iconColors.length]
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors duration-200"
                >
                  <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} ${colors.neon} flex-shrink-0 mt-0.5`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <AnimatedSection animation="fade-up" delay={0.3} duration={0.6}>
            <div className="flex justify-center lg:justify-start">
              <CTAFacebook />
            </div>
          </AnimatedSection>
        </div>

        {/* Right: Slider + Video */}
        <div className="space-y-8">
          <AnimatedSection animation="fade-left" duration={0.6}>
            <div>
              <h3 id="distintivo-gallery-heading" className="text-lg font-semibold text-foreground mb-4">Galería</h3>
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 shadow-2xl"
                role="region"
                aria-label="Galería Infonagreen"
                aria-roledescription="carousel"
                aria-labelledby="distintivo-gallery-heading"
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <Image
                  key={currentSlide}
                  src={sliderImages[currentSlide].src}
                  alt={sliderImages[currentSlide].alt}
                  fill
                  className="object-cover transition-opacity duration-500"
                />

                <button
                  type="button"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 text-white transition-all duration-300
                    ${currentSlide === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'opacity-80 hover:opacity-100 hover:scale-110 hover:bg-slate-900/60 hover:border-white/20'
                    }
                  `}
                  onClick={() => scrollByAmount('prev')}
                  aria-label="Imagen anterior"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/10 text-white transition-all duration-300
                    ${currentSlide === sliderImages.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : 'opacity-80 hover:opacity-100 hover:scale-110 hover:bg-slate-900/60 hover:border-white/20'
                    }
                  `}
                  onClick={() => scrollByAmount('next')}
                  aria-label="Imagen siguiente"
                  disabled={currentSlide === sliderImages.length - 1}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-5" role="tablist" aria-label="Indicadores de diapositiva">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-400 ${
                      index === currentSlide
                        ? 'w-10 bg-gradient-to-r from-secondary to-green-400 shadow-md shadow-secondary/40'
                        : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60 hover:w-3'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                    aria-selected={index === currentSlide}
                    tabIndex={index === currentSlide ? 0 : -1}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left" delay={0.2} duration={0.6}>
            <div>
              <h3 id="distintivo-video-heading" className="text-lg font-semibold text-foreground mb-4">Video Infonagreen</h3>
              <div className="flex flex-row items-end gap-4 lg:gap-6">
                {/* Video — centered, respects original portrait dimensions */}
                <div className="flex-1 flex justify-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[360px] rounded-2xl overflow-hidden border border-border bg-surface">
                    <video
                      src="/Infonagreen.mp4"
                      className="w-full h-auto rounded-2xl"
                      controls
                      preload="metadata"
                      aria-label="Video institucional de Answer ST sobre Infonagreen"
                    />
                  </div>
                </div>

                {/* Tech Tree — desktop only, fills remaining space */}
                <div className="hidden lg:block text-green-600 dark:text-green-400">
                  <TechTreeAnimation />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Floating decorative elements (desktop only) */}
      {isDesktop && !reducedMotion && (
        <Float distance={10} duration={5} delay={0.5} axis="y" className="absolute top-10 right-4 z-0">
          <div className="relative h-[60px] w-[60px]">
            <Image
              src="/confiabilidad_transparencia.png"
              alt=""
              fill
              className="object-contain opacity-50"
              aria-hidden="true"
            />
          </div>
        </Float>
      )}
    </Section>
  )
}
