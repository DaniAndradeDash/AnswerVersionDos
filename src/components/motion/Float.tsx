'use client'

import { type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type FloatAxis = 'y' | 'x' | 'both'

export interface FloatProps {
  children: ReactNode
  distance?: number
  duration?: number
  delay?: number
  axis?: FloatAxis
  className?: string
}

export function Float({
  children,
  distance = 15,
  duration = 4,
  delay = 0,
  axis = 'y',
  className,
}: FloatProps) {
  const reducedMotion = useReducedMotion()

  // Don't render animation wrapper for reduced motion
  if (reducedMotion) {
    return <>{children}</>
  }

  const animationName = getFloatAnimationName({ distance, duration, axis })

  return (
    <div
      className={className}
      style={{
        animation: `${animationName} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

function getFloatAnimationName({
  distance,
  duration,
  axis,
}: {
  distance: number
  duration: number
  axis: FloatAxis
}): string {
  return `float-${axis}-${distance}-${duration}`
}
