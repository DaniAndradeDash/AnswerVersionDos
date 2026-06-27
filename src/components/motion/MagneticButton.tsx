'use client'

import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: React.ElementType
  onClick?: () => void
  href?: string
}

export function MagneticButton({
  children,
  className,
  strength = 30,
  as: Component = 'div',
  onClick,
  href,
  ...props
}: MagneticButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const elementRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current || reducedMotion) return

      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const maxDistance = Math.max(rect.width, rect.height) / 2

      if (distance < maxDistance) {
        const intensity = 1 - distance / maxDistance
        gsap.to(elementRef.current, {
          x: deltaX * intensity * (strength / 100),
          y: deltaY * intensity * (strength / 100),
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    },
    [reducedMotion, strength]
  )

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current || reducedMotion) return

    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [reducedMotion])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  const Tag = href ? 'a' : Component

  return (
    <div ref={elementRef} className={className}>
      <Tag
        href={href}
        onClick={onClick}
        {...props}
      >
        {children}
      </Tag>
    </div>
  )
}
