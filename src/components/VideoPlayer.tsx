'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface VideoPlayerProps {
  src: string
  title: string
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: reducedMotion ? 0.3 : 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-xl"
      role="region"
      aria-label={title}
    >
      <div className="relative w-full aspect-video">
        <video
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          playsInline
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta el formato de video.
        </video>
      </div>
      <div className="px-6 py-4">
        <p className="text-center text-sm font-semibold text-white/80">{title}</p>
      </div>
    </div>
  )
}
