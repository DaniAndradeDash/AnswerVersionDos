'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowDownRight } from 'lucide-react'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { Float } from '@/components/motion/Float'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-var(--header-height))] bg-background flex items-center overflow-hidden grid-pattern"
      aria-labelledby="hero-heading"
    >
      {/* Decorative Elements */}
      {!reducedMotion && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

          {/* Floating corner accents */}
          <Float distance={8} duration={5} delay={0} axis="y" className="absolute top-24 right-20 hidden lg:block">
            <div className="w-12 h-12 border-t-2 border-l-2 border-secondary/40" aria-hidden="true" />
          </Float>
          <Float distance={10} duration={6} delay={1} axis="y" className="absolute bottom-32 left-16 hidden lg:block">
            <div className="w-16 h-16 border-b-2 border-r-2 border-primary/30" aria-hidden="true" />
          </Float>
        </>
      )}

      <div className="mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 py-12 lg:py-0 px-4 sm:px-6 w-full">
        {/* Left Column: Content */}
        <div className="flex-1 text-center lg:text-left">
          <AnimatedSection animation="fade-up" duration={0.6}>
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-gradient">Consultoría</span>
              <br />
              <span className="text-foreground">especializada</span>
              <br />
              <span className="text-foreground">en orientación.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.2} duration={0.6}>
            <p className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Somos una consultoría especializada en asesoría, orientación e innovación.
              Contamos con un equipo de asesores altamente calificados para encontrar
              la solución indicada a tus problemas.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.4} duration={0.6}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#servicios">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                >
                  Nuestros Servicios
                </Button>
              </Link>
              <Link href="#asesorias">
                <Button
                  variant="outline"
                  size="lg"
                  iconRight={<ArrowDownRight className="h-5 w-5" aria-hidden="true" />}
                >
                  Nuestras Asesorías
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Right Column: Image */}
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center mx-auto">
          {/* Corner brackets */}
          <AnimatedSection animation="scale" delay={0.2} duration={0.5}>
            {/* Top-left */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-secondary" aria-hidden="true" />
            {/* Top-right */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-secondary" aria-hidden="true" />
            {/* Bottom-left */}
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary" aria-hidden="true" />
            {/* Bottom-right */}
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-secondary" aria-hidden="true" />
          </AnimatedSection>

          {/* Logo */}
          <AnimatedSection animation="scale" delay={0.4} duration={0.8}>
            <div className="relative z-10 w-full h-full p-8">
              <Image
                src="/answer_heroDos.png"
                alt="Answer ST — Logo de la consultora"
                fill
                className="object-contain"
                priority
              />
            </div>
          </AnimatedSection>

          {/* Decorative glow */}
          {!reducedMotion && (
            <div className="absolute inset-0 bg-secondary/5 rounded-full blur-3xl scale-75" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  )
}
