'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  splitBy?: 'words' | 'chars' | 'lines'
  as?: React.ElementType
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  splitBy = 'words',
  as: Component = 'p',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into spans
    const text = children
    let items: string[]

    if (splitBy === 'chars') {
      items = text.split('')
    } else if (splitBy === 'words') {
      items = text.split(' ')
    } else {
      items = text.split('\n')
    }

    container.innerHTML = ''

    items.forEach((item, i) => {
      const span = document.createElement('span')
      span.className = splitBy === 'chars' ? 'inline-block' : 'inline-block mr-1'
      span.textContent = item
      span.style.opacity = '0'
      span.style.transform = reducedMotion ? 'translateY(0)' : 'translateY(100%)'
      span.style.display = 'inline-block'
      container.appendChild(span)

      // Add space after words
      if (splitBy === 'words' && i < items.length - 1) {
        container.appendChild(document.createTextNode(' '))
      }
    })

    const spans = container.querySelectorAll('span')

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: reducedMotion ? 0.3 : duration,
        stagger: reducedMotion ? 0 : 0.03,
        delay,
        ease: reducedMotion ? 'none' : 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [children, delay, duration, splitBy, reducedMotion])

  const Tag = Component as React.ElementType

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}
