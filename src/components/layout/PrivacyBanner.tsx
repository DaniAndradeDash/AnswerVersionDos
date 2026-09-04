'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck, X } from 'lucide-react'

const CONSENT_KEY = 'answer-st-privacy-consent'
const CONSENT_VERSION = '2026-09-v1'

type StoredConsent = {
  accepted: boolean
  version: string
  date: string
}

function hasValidConsent(): boolean {
  if (typeof window === 'undefined') return true // SSR: hide to avoid mismatch, will check on mount
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as StoredConsent
    return parsed.version === CONSENT_VERSION
  } catch {
    return false
  }
}

function saveConsent(accepted: boolean) {
  try {
    const payload: StoredConsent = {
      accepted,
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
    }
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload))
    // Synchronous cookie fallback for static hosts that might need it (opcional)
    // document.cookie = `${CONSENT_KEY}=1; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`
  } catch {
    // storage may be blocked — fail silently
  }
}

export default function PrivacyBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // No mostrar el banner cuando el usuario ya está leyendo el aviso
  const isPrivacyPage = pathname?.includes('aviso-privacidad')

  useEffect(() => {
    setMounted(true)
    if (isPrivacyPage) return
    if (hasValidConsent()) return

    // Pequeño delay para no ser intrusivo al cargar
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [isPrivacyPage])

  const handleAccept = useCallback(() => {
    saveConsent(true)
    setVisible(false)
  }, [])

  const handleDismiss = useCallback(() => {
    // "Solo aparece 1 vez para no molestar" — guardar también el dismiss
    // así no vuelve a aparecer aunque no haya aceptado explícitamente.
    // Si prefieres que siga apareciendo hasta aceptar, cambia a no guardar aquí.
    saveConsent(false)
    setVisible(false)
  }, [])

  if (!mounted || isPrivacyPage || !visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label="Aviso de privacidad"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-xl supports-[backdrop-filter]:bg-card/80">
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5">
          {/* Close X */}
          <button
            onClick={handleDismiss}
            aria-label="Cerrar aviso de privacidad"
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex gap-3 sm:gap-4 flex-1 min-w-0 pr-6 sm:pr-0">
            <span className="hidden sm:inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight pr-2">
                Tu privacidad nos importa
              </p>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Usamos datos de contacto solo para responder a tu solicitud. Al continuar navegando aceptas nuestro{' '}
                <Link
                  href="/aviso-privacidad/"
                  className="font-medium text-secondary underline underline-offset-2 hover:text-secondary/80"
                  onClick={handleDismiss}
                >
                  Aviso de privacidad
                </Link>
                . Este mensaje solo aparece una vez.
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto flex-shrink-0 items-center gap-2 sm:gap-3 self-stretch sm:self-auto">
            <Link
              href="/aviso-privacidad/"
              onClick={handleDismiss}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface transition-colors text-center"
            >
              Ver aviso
            </Link>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors shadow-sm"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
