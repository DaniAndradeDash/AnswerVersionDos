'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  direction = 'up',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        {
          y: direction === 'up' ? 60 * speed : -60 * speed,
        },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [reducedMotion, speed, direction])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
