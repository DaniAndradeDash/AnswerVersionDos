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

  // Don't render animation for reduced motion
  if (reducedMotion) {
    return <>{children}</>
  }

  const animationStyle = getFloatStyle({ distance, duration, delay, axis })

  return (
    <div className={className} style={animationStyle}>
      {children}
    </div>
  )
}

function getFloatStyle({
  distance,
  duration,
  delay,
  axis,
}: {
  distance: number
  duration: number
  delay: number
  axis: FloatAxis
}): React.CSSProperties {
  const keyframeName = `float-${axis}-${distance}-${duration}`

  // Inject keyframes once per unique config
  if (typeof document !== 'undefined' && !document.getElementById(keyframeName)) {
    const style = document.createElement('style')
    style.id = keyframeName

    let keyframes = ''
    if (axis === 'y') {
      keyframes = `
        @keyframes ${keyframeName} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${distance}px); }
        }
      `
    } else if (axis === 'x') {
      keyframes = `
        @keyframes ${keyframeName} {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(${distance}px); }
        }
      `
    } else {
      keyframes = `
        @keyframes ${keyframeName} {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(${distance * 0.5}px, -${distance}px); }
          50% { transform: translate(0px, -${distance * 0.5}px); }
          75% { transform: translate(-${distance * 0.5}px, 0px); }
        }
      `
    }

    style.textContent = keyframes
    document.head.appendChild(style)
  }

  return {
    animation: `${keyframeName} ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    willChange: 'transform',
  }
}
