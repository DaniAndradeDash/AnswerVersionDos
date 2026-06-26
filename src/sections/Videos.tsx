'use client'

import dynamic from 'next/dynamic'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl bg-surface animate-pulse" aria-hidden="true" />
  ),
})

export default function Videos() {
  return (
    <Section id="videos" variant="dark" headingId="videos-heading">
      <div className="text-center">
        <AnimatedSection animation="fade-up" duration={0.6}>
          <h2 id="videos-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Conoce <span className="text-secondary">Answer ST</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.15} duration={0.6}>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Descubre quiénes somos y cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </AnimatedSection>
      </div>

      <div className="mt-12">
        <AnimatedSection animation="scale" delay={0.2} duration={0.8}>
          <VideoPlayer src="/answerst.mp4" title="Video Institucional Answer ST" />
        </AnimatedSection>
      </div>
    </Section>
  )
}
