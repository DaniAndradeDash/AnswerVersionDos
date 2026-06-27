'use client'

import { useEffect, useRef } from 'react'

interface LenisInstance {
  raf: (time: number) => void
  destroy: () => void
  on: (event: string, callback: () => void) => void
  scrollTo: (value: number, options?: Record<string, unknown>) => void
  scroll: number
}

export function useLenis() {
  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    let lenis: LenisInstance | undefined
    let rafId: number

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        }) as LenisInstance

        lenisRef.current = lenis

        function raf(time: number) {
          lenis!.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        lenis.on('scroll', () => {
          // GSAP ScrollTrigger sync
          import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            ScrollTrigger.update()
          })
        })
      } catch (error) {
        console.warn('Lenis failed to initialize:', error)
      }
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
