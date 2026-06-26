'use client'

import { useEffect, useRef, type ReactNode, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'none'

export interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  as?: string
}

const animationConfigs: Record<AnimationType, Record<string, number>> = {
  'fade-up': { opacity: 0, y: 60 },
  'fade-left': { opacity: 0, x: -60 },
  'fade-right': { opacity: 0, x: 60 },
  'scale': { opacity: 0, scale: 0.95 },
  'none': { opacity: 1 },
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  (
    {
      children,
      animation = 'fade-up',
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
      if (!el || animation === 'none') return

      const fromVars: Record<string, number> = reducedMotion
        ? { opacity: 0 }
        : animationConfigs[animation]

      const ctx = gsap.context(() => {
        gsap.fromTo(el, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.3 : duration,
          delay,
          ease: reducedMotion ? 'none' : 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        })
      })

      return () => ctx.revert()
    }, [animation, delay, duration, once, reducedMotion])

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

AnimatedSection.displayName = 'AnimatedSection'

export { AnimatedSection }
