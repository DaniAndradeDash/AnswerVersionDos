'use client'

import { useEffect, useRef, type ReactNode, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export interface ScrollRevealProps {
  children: ReactNode
  direction?: RevealDirection
  distance?: number
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  as?: string
}

const directionMap: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: {},
}

const ScrollReveal = forwardRef<HTMLElement, ScrollRevealProps>(
  (
    {
      children,
      direction = 'up',
      distance = 60,
      delay = 0,
      duration = 0.8,
      once = true,
      className,
      as: Component = 'div',
    },
    forwardedRef
  ) => {
    const elementRef = useRef<HTMLElement>(null)
    const reducedMotion = useReducedMotion()

    useEffect(() => {
      const el = elementRef.current
      if (!el) return

      const directionConfig = directionMap[direction]
      const scaledConfig: Record<string, number> = {}
      if (directionConfig.x !== undefined) {
        scaledConfig.x = directionConfig.x > 0 ? distance : -distance
      }
      if (directionConfig.y !== undefined) {
        scaledConfig.y = directionConfig.y > 0 ? distance : -distance
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, ...scaledConfig },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: reducedMotion ? 0.3 : duration,
            delay,
            ease: reducedMotion ? 'none' : 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        )
      })

      return () => ctx.revert()
    }, [direction, distance, delay, duration, once, reducedMotion])

    const Tag = Component as unknown as React.ComponentType<
      React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    >

    return (
      <Tag
        ref={(node) => {
          elementRef.current = node
          if (typeof forwardedRef === 'function') forwardedRef(node as HTMLElement | null)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        className={className}
      >
        {children}
      </Tag>
    )
  }
)

ScrollReveal.displayName = 'ScrollReveal'

export { ScrollReveal }
