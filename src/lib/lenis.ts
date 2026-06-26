import type Lenis from 'lenis'

export interface LenisConfig {
  duration?: number
  easing?: (t: number) => number
  orientation?: 'vertical' | 'horizontal'
  smoothWheel?: boolean
  wheelMultiplier?: number
  touchMultiplier?: number
}

export const desktopConfig: LenisConfig = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
}

export const mobileConfig: LenisConfig = {
  duration: 0.8,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: false,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
}

export async function initLenis(config: LenisConfig = desktopConfig): Promise<Lenis> {
  const { default: Lenis } = await import('lenis')

  const lenis = new Lenis({
    ...config,
    infinite: false,
  })

  return lenis
}

export function setupScrollTrigger(lenis: Lenis): void {
  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? 'fixed' : 'transform',
    })

    lenis.on('scroll', ScrollTrigger.update)

    ScrollTrigger.addEventListener('refresh', () => lenis.resize())
    ScrollTrigger.refresh()
  })
}
