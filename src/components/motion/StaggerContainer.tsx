'use client'

import { useEffect, useRef, type ReactNode, cloneElement, isValidElement, Children } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  childAnimation?: {
    from?: Record<string, number>
    duration?: number
    ease?: string
  }
  className?: string
  once?: boolean
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  childAnimation = {
    from: { opacity: 0, y: 30 },
    duration: 0.6,
    ease: 'power3.out',
  },
  className,
  once = true,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const childElements = Array.from(container.children) as HTMLElement[]
    if (childElements.length === 0) return

    const ctx = gsap.context(() => {
      const effectiveStagger = reducedMotion ? 0 : staggerDelay
      const effectiveDuration = reducedMotion ? 0.3 : (childAnimation.duration ?? 0.6)
      const fromVars = childAnimation.from ?? { opacity: 0, y: 30 }

      gsap.fromTo(
        childElements,
        fromVars,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: effectiveDuration,
          stagger: effectiveStagger,
          ease: childAnimation.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [staggerDelay, childAnimation, once, reducedMotion])

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child) => {
        if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
          return cloneElement(child, {
            ...child.props,
            style: {
              ...(child.props.style || {}),
              willChange: 'transform, opacity',
            },
          })
        }
        return child
      })}
    </div>
  )
}
