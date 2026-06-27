'use client'

import { useEffect, useRef, type ReactNode, useState } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function TiltCard({
  children,
  className,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card || reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: scale,
        transformPerspective: perspective,
        duration: speed / 1000,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed / 1000 * 1.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt, perspective, scale, speed, reducedMotion])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: isHovered && !reducedMotion ? 'translateZ(20px)' : 'translateZ(0)',
          transition: `transform ${speed}ms ease-out`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
