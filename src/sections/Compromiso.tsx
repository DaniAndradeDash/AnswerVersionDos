'use client'

import Image from 'next/image'
import { Shield, Eye } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { Float } from '@/components/motion/Float'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Compromiso() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="compromiso" variant="alt" headingId="compromiso-heading">
      <div className="text-center relative">
        <AnimatedSection animation="fade-up" duration={0.6}>
          <h2 id="compromiso-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold inline-block relative">
            <span className="text-secondary relative z-10">
              Estrategias Sustentables
            </span>
            {!reducedMotion && (
              <span className="absolute inset-0 bg-secondary/10 rounded-full blur-xl animate-pulse-slow" aria-hidden="true" />
            )}
          </h2>
        </AnimatedSection>

        {/* Main Card */}
        <div className="mt-10 mx-auto max-w-4xl relative">
          <AnimatedSection animation="scale" delay={0.2} duration={0.6}>
            <div className="relative bg-secondary text-white rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none px-8 md:px-16 py-10 md:py-14 text-center font-semibold text-lg md:text-xl shadow-2xl overflow-hidden shine-effect">
              <Shield className="h-8 w-8 mx-auto mb-4 opacity-80" aria-hidden="true" />
              <p className="relative z-10">
                Confidencialidad y Transparencia
                <br />
                en el manejo de todos los datos
              </p>
              <Eye className="h-6 w-6 mx-auto mt-4 opacity-60" aria-hidden="true" />
            </div>
          </AnimatedSection>
        </div>

        {/* Floating decorative images (desktop only) */}
        {!reducedMotion && (
          <>
            <Float distance={12} duration={5} delay={0} axis="y" className="absolute top-8 right-4 hidden md:block z-0">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src="/confiabilidad_transparencia.png"
                  alt=""
                  fill
                  className="object-contain opacity-60 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </Float>

            <Float distance={10} duration={7} delay={1} axis="both" className="absolute top-1/2 left-4 hidden md:block z-0">
              <div className="relative h-[60px] w-[60px]">
                <Image
                  src="/mira_futurista.png"
                  alt=""
                  fill
                  className="object-contain opacity-50 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </Float>
          </>
        )}
      </div>
    </Section>
  )
}
