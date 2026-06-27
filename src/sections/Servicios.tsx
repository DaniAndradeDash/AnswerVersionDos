'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Search, ClipboardCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { services } from '@/constants/services'

const iconMap: Record<string, React.ElementType> = {
  Users,
  Search,
  ClipboardCheck,
}

export default function Servicios() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Section id="servicios" variant="default" headingId="servicios-heading">
      <div className="text-center">
        <AnimatedSection animation="fade-up" duration={0.6}>
          <h2 id="servicios-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Nuestros <span className="text-secondary">Servicios</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.15} duration={0.6}>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            En Answer <span className="text-secondary font-semibold">st</span> ofrecemos soluciones estratégicas,
            asesoría personalizada y gestión eficiente de trámites para ayudarte a
            alcanzar tus objetivos.
          </p>
        </AnimatedSection>
      </div>

      {/* Service Cards */}
      <StaggerContainer
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        staggerDelay={0.15}
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? Users
          const isSelected = selected === service.id
          const panelId = `service-panel-${service.id}`
          const buttonId = `service-button-${service.id}`

          return (
            <Card
              key={service.id}
              variant={isSelected ? 'selected' : 'hover'}
              className="p-6 min-h-[280px] flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Icon */}
              <div className="relative z-10 mb-4 p-4 rounded-2xl bg-surface group-hover:bg-secondary/10 transition-colors duration-300">
                <Icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-foreground relative z-10">
                {service.title}
              </h3>

              {/* Toggle button */}
              <button
                id={buttonId}
                type="button"
                className="mt-3 text-muted-foreground group-hover:text-secondary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-full p-1"
                aria-expanded={isSelected}
                aria-controls={panelId}
                aria-label={`${service.title} — ${isSelected ? 'ocultar detalles' : 'ver detalles'}`}
                onClick={() => setSelected(isSelected ? null : service.id)}
              >
                {isSelected ? (
                  <ChevronUp className="h-5 w-5 mx-auto" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5 mx-auto" aria-hidden="true" />
                )}
              </button>

              {/* Expanded description panel */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSelected ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed text-left">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </StaggerContainer>

      {/* CTA */}
      <AnimatedSection animation="fade-up" delay={0.3} duration={0.6}>
        <div className="mt-12 text-center">
          <Link href="#contacto">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
            >
              Contáctanos
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </Section>
  )
}
