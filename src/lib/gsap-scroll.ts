import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function setupGsapScroll(): void {
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  })
}

export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh()
}

export function killScrollTrigger(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export type ScrollAnimation = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'none'

export interface ScrollAnimationConfig {
  animation: ScrollAnimation
  delay?: number
  duration?: number
  once?: boolean
  start?: string
  end?: string
}

export function getAnimationConfig(config: ScrollAnimationConfig) {
  const {
    animation,
    delay = 0,
    duration = 0.8,
    once = true,
    start = 'top 85%',
    end = 'bottom 15%',
  } = config

  const baseScrollTrigger = {
    trigger: null as HTMLElement | null,
    start,
    end,
    toggleActions: once ? 'play none none none' : 'play reverse play reverse',
  }

  switch (animation) {
    case 'fade-up':
      return {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0, duration, delay, ease: 'power3.out' },
        scrollTrigger: baseScrollTrigger,
      }
    case 'fade-left':
      return {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0, duration, delay, ease: 'power3.out' },
        scrollTrigger: baseScrollTrigger,
      }
    case 'fade-right':
      return {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0, duration, delay, ease: 'power3.out' },
        scrollTrigger: baseScrollTrigger,
      }
    case 'scale':
      return {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1, duration, delay, ease: 'power3.out' },
        scrollTrigger: baseScrollTrigger,
      }
    case 'none':
    default:
      return null
  }
}
