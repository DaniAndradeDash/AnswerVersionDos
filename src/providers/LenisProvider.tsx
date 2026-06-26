'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type Lenis from 'lenis'

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const lenisRef = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    // Skip Lenis for reduced motion or mobile
    if (reducedMotion || !isDesktop) return

    let rafId: number
    let cleanupFn: (() => void) | undefined

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis')

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis

      // Integrate with requestAnimationFrame
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      // Integrate with GSAP ScrollTrigger
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (value !== undefined) {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: document.body.style.transform ? 'fixed' : 'transform',
      })

      lenis.on('scroll', ScrollTrigger.update)

      ScrollTrigger.defaults({ scroller: document.body })

      ScrollTrigger.addEventListener('refresh', () => lenis.resize())
      ScrollTrigger.refresh()

      cleanupFn = () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }

    initLenis()

    return () => cleanupFn?.()
  }, [reducedMotion, isDesktop])

  return <>{children}</>
}
