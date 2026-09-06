'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TiltCard } from '@/components/motion/TiltCard'

const DECLARATION_TEXT =
  'Se prohíbe negar, excluir o distinguir el acceso o prestación del servicio a cualquier persona o colectivo social por su origen étnico o nacional, raza, lara, lengua, sexo, género, edad, color de piel, discapacidad, condición jurídica, social, económica migratoria, identidad indígena, identidad de género, apariencia física, condiciones de salud, religión, formas de pensar, orientación o preferencia sexual, por tener tatuajes o cualquier otra razón que tenga como propósito impedir el goce y ejercicio de los derechos humanos.'

const TITLE = '¡NO DISCRIMINAMOS!'

export function DeclarationCard() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const y = reducedMotion ? 0 : 30
      const duration = reducedMotion ? 0.3 : 0.7

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.js-frame', { opacity: 0, y, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration })
        .fromTo('.js-screen', { opacity: 0, y: y * 0.6 }, { opacity: 1, y: 0, duration: reducedMotion ? 0.2 : 0.5 }, '-=0.25')
        .fromTo(
          '.js-title-char',
          { opacity: 0, y: reducedMotion ? 0 : '0.9em' },
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.15 : 0.45,
            stagger: reducedMotion ? 0 : 0.035,
          },
          '-=0.3'
        )
        .fromTo('.js-body', { opacity: 0, y: reducedMotion ? 0 : 12 }, { opacity: 1, y: 0, duration: reducedMotion ? 0.15 : 0.45 }, '-=0.15')
        .fromTo(
          '.js-foot, .js-label',
          { opacity: 0, y: reducedMotion ? 0 : 10 },
          { opacity: 1, y: 0, duration: reducedMotion ? 0.15 : 0.4, stagger: reducedMotion ? 0 : 0.08 },
          '-=0.1'
        )
    }, root)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={rootRef} className="group relative w-full max-w-md mx-auto">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[2.5rem] bg-cyan-500/20 blur-2xl pointer-events-none"
        style={{ animation: 'neon-pulse-slow 6s ease-in-out infinite' }}
      />

      {/* Floating particles */}
      <span
        aria-hidden="true"
        className="absolute -top-5 -left-4 h-2 w-2 rounded-full bg-cyan-400"
        style={{ boxShadow: '0 0 12px #22d3ee', animation: 'float-both-15-4 7s ease-in-out infinite' }}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/3 -right-5 h-1.5 w-1.5 rounded-full bg-cyan-300"
        style={{ boxShadow: '0 0 10px #67e8f9', animation: 'float-both-10-7 8s ease-in-out 1s infinite' }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-4 left-8 h-1.5 w-1.5 rounded-full bg-cyan-300"
        style={{ boxShadow: '0 0 10px #67e8f9', animation: 'float-both-15-4 9s ease-in-out 0.5s infinite' }}
      />

      <TiltCard className="relative" maxTilt={8} scale={1.015}>
        {/* Cyber frame */}
        <div
          className="js-frame relative w-full rounded-3xl border-2 border-cyan-400 p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-shadow duration-500 group-hover:shadow-[0_0_45px_rgba(6,182,212,0.75)]"
          style={reducedMotion ? undefined : { transformStyle: 'preserve-3d' }}
        >
          {/* Rotating conic energy border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              padding: 2,
              background:
                'conic-gradient(from var(--service-border-angle), rgba(34,211,238,0.9), rgba(34,211,238,0.15), rgba(34,211,238,0), rgba(34,211,238,0.25), rgba(34,211,238,0.9))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'service-border-spin 5s linear infinite',
            }}
          />

          {/* Corner brackets */}
          <span
            aria-hidden="true"
            className="absolute left-1.5 top-1.5 h-4 w-4 rounded-tl-xl border-l-2 border-t-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)', animation: 'neon-pulse 4s ease-in-out infinite' }}
          />
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 h-4 w-4 rounded-tr-xl border-r-2 border-t-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)', animation: 'neon-pulse 4s ease-in-out 1s infinite' }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-1.5 h-4 w-4 rounded-bl-xl border-b-2 border-l-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)', animation: 'neon-pulse 4s ease-in-out 2s infinite' }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-br-xl border-b-2 border-r-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)', animation: 'neon-pulse 4s ease-in-out 3s infinite' }}
          />

          {/* Neon top notch */}
          <div
            aria-hidden="true"
            className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
            style={{ animation: 'corner-dot-pulse 3s ease-in-out 0.5s infinite' }}
          />

          {/* Inner grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-xl opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.18) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 75%)',
            }}
          />

          {/* Beige inner screen */}
          <div className="js-screen relative mt-4 overflow-hidden rounded-xl border border-amber-200/50 bg-[#f5f0eb] p-6 text-center text-slate-900 shadow-inner">
            {/* Scanline sweep */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 left-0 right-0 h-px bg-cyan-500/40"
              style={{ animation: 'scanline-sweep 5s linear infinite' }}
            />

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 sm:text-sm">
              EN ANSWER st.
            </h3>

            <h2
              className="js-title-mask mb-4 overflow-hidden text-2xl font-extrabold uppercase tracking-wide text-blue-900"
              aria-label={TITLE}
            >
              {TITLE.split('').map((char, i) => (
                <span key={i} className="js-title-char inline-block will-change-transform">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            <p className="js-body mb-4 text-xs leading-relaxed text-justify text-slate-800 sm:text-sm">
              {DECLARATION_TEXT}
            </p>

            <p className="js-foot text-xs font-black uppercase tracking-widest text-blue-600 mt-2">
              DERECHOS HUMANOS PARA TODXS
            </p>
          </div>

          {/* Futuristic system label */}
          <div className="js-label mt-3 flex items-center gap-2 pl-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400 opacity-80">
            <span className="h-px w-5 bg-cyan-400/60" aria-hidden="true" />
            DIGITAL DECLARATION PLATFORM
            <span
              aria-hidden="true"
              className="inline-block h-3 w-1.5 bg-cyan-400"
              style={{ animation: 'corner-dot-pulse 1.2s ease-in-out infinite', boxShadow: '0 0 6px #22d3ee' }}
            />
          </div>
        </div>
      </TiltCard>
    </div>
  )
}