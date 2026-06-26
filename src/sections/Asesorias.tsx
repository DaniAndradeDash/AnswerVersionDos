'use client'

import Link from 'next/link'
import {
  Landmark,
  Scale,
  Building2,
  HeartPulse,
  Handshake,
  Leaf,
  ArrowRight,
  Rocket,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { asesorias } from '@/constants/asesorias'

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  Scale,
  Building2,
  HeartPulse,
  Handshake,
  Leaf,
}

export default function Asesorias() {
  return (
    <Section id="asesorias" variant="default" headingId="asesorias-heading">
      <div className="text-center">
        <AnimatedSection animation="fade-up" duration={0.6}>
          <h2 id="asesorias-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Portafolio de <span className="text-secondary">Asesorías</span>
          </h2>
        </AnimatedSection>
      </div>

      {/* Advisory Cards Grid */}
      <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {asesorias.map((item) => {
          const Icon = iconMap[item.icon] ?? Landmark
          return (
            <Card
              key={item.id}
              variant="hover"
              className="p-6 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="mb-4 p-4 rounded-full bg-white dark:bg-surface shadow-md transition-all duration-300 group-hover:shadow-glow"
                style={{
                  boxShadow: `0 0 20px ${item.color}20`,
                }}
                aria-hidden="true"
              >
                <Icon
                  className="h-8 w-8"
                  style={{ color: item.color }}
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          )
        })}
      </StaggerContainer>

      {/* More Options Badge */}
      <AnimatedSection animation="scale" delay={0.3} duration={0.6}>
        <div className="mt-16 text-center">
          <Badge variant="success" size="md" className="inline-flex items-center gap-2 px-6 py-3 text-base">
            <Rocket className="h-5 w-5" aria-hidden="true" />
            Más opciones en desarrollo
          </Badge>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection animation="fade-up" delay={0.4} duration={0.6}>
        <div className="mt-8 text-center">
          <Link href="#contacto">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
            >
              Solicita tu asesoría
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </Section>
  )
}
