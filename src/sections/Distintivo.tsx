'use client'

import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { Leaf, Lightbulb, ShieldCheck, Eye, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
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

export default function Distintivo() {
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollByAmount = useCallback((direction: 'prev' | 'next') => {
    const slider = sliderRef.current
    if (!slider) return
    const slideWidth = slider.querySelector('[role="group"]')?.clientWidth ?? 320
    const gap = 16 // matches gap-4
    const scrollAmount = slideWidth + gap
    slider.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
    setCurrentSlide((prev) => {
      if (direction === 'next') return Math.min(prev + 1, sliderImages.length - 1)
      return Math.max(prev - 1, 0)
    })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByAmount('prev')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByAmount('next')
    }
  }, [scrollByAmount])

  // Sync current slide on scroll
  const handleScroll = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return
    const slideWidth = slider.querySelector('[role="group"]')?.clientWidth ?? 320
    const gap = 16
    const index = Math.round(slider.scrollLeft / (slideWidth + gap))
    setCurrentSlide(Math.min(Math.max(index, 0), sliderImages.length - 1))
  }, [])

  return (
    <Section id="distintivo" variant="alt" headingId="distintivo-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: INFONAGREEN */}
        <div className="space-y-8">
          <AnimatedSection animation="fade-right" duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 sm:h-20 sm:w-20 relative flex-shrink-0">
                <Image
                  src="/infonagreen.png"
                  alt="Logo de INFONAGREEN"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 id="distintivo-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Infonagreen
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Estrategias sustentables para un futuro mejor
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Feature items */}
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {distintivoItems.map((item) => {
              const Icon = iconMap[item.icon] ?? Leaf
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors duration-200"
                >
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary flex-shrink-0 mt-0.5">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </StaggerContainer>

          {/* CTA */}
          <AnimatedSection animation="fade-right" delay={0.3} duration={0.6}>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              <FacebookIcon className="h-5 w-5" />
              Visítanos en Facebook
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </AnimatedSection>
        </div>

        {/* Right: Slider + Video */}
        <div className="space-y-8">
          {/* Image Slider */}
          <AnimatedSection animation="fade-left" duration={0.6}>
            <div>
              <h3 id="distintivo-gallery-heading" className="text-lg font-semibold text-foreground mb-4">Galería</h3>
              <div
                ref={sliderRef}
                className="scroll-snap-slider rounded-2xl overflow-hidden relative"
                role="region"
                aria-label="Galería Infonagreen"
                aria-roledescription="carousel"
                aria-labelledby="distintivo-gallery-heading"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
              >
                {/* Prev button */}
                <button
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 transition-colors duration-200 shadow-md"
                  onClick={() => scrollByAmount('prev')}
                  aria-label="Imagen anterior"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Next button */}
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 transition-colors duration-200 shadow-md"
                  onClick={() => scrollByAmount('next')}
                  aria-label="Imagen siguiente"
                  disabled={currentSlide === sliderImages.length - 1}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>

                {sliderImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="w-72 sm:w-80 h-48 sm:h-56 relative flex-shrink-0 rounded-xl overflow-hidden border border-border"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Imagen ${index + 1} de ${sliderImages.length}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Slide indicators */}
              <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Indicadores de diapositiva">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-secondary'
                        : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                    onClick={() => {
                      const slider = sliderRef.current
                      if (!slider) return
                      const slideWidth = slider.querySelector('[role="group"]')?.clientWidth ?? 320
                      const gap = 16
                      slider.scrollTo({ left: index * (slideWidth + gap), behavior: 'smooth' })
                      setCurrentSlide(index)
                    }}
                    aria-label={`Ir a imagen ${index + 1}`}
                    aria-selected={index === currentSlide}
                    tabIndex={index === currentSlide ? 0 : -1}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Video */}
          <AnimatedSection animation="fade-left" delay={0.2} duration={0.6}>
            <div>
              <h3 id="distintivo-video-heading" className="text-lg font-semibold text-foreground mb-4">Video Infonagreen</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-surface group cursor-pointer">
                <video
                  src="/answerst.mp4"
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  aria-label="Video institucional de Answer ST sobre Infonagreen"
                />
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
