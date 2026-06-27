'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface GradientOrbProps {
  size?: number
  color?: string
  className?: string
  blur?: number
  opacity?: number
  speed?: number
}

export function GradientOrb({
  size = 400,
  color = 'var(--primary)',
  className,
  blur = 100,
  opacity = 0.15,
  speed = 1,
}: GradientOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = orbRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(el, {
        x: `random(-50, 50)`,
        y: `random(-50, 50)`,
        scale: `random(0.9, 1.1)`,
        duration: `random(${4 / speed}, ${8 / speed})`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Parallax on scroll
      gsap.to(el, {
        y: -100 * speed,
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [reducedMotion, speed])

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      aria-hidden="true"
    />
  )
}
