'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, RefreshCw, ArrowUpRight, Loader2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { GradientOrb } from '@/components/motion/GradientOrb'
import { contactInfo, socialLinks } from '@/constants/contacto'
import { contactSchema } from '@/lib/contact-schema'
import type { ContactFormData } from '@/lib/contact-schema'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const FETCH_TIMEOUT_MS = 15_000
const MAX_RETRIES = 1

type FormFields = Omit<ContactFormData, 'honeypot'> & { honeypot: string }

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  isLink,
  index,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
  isLink: boolean
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const iconColor = index === 0 ? 'icon-blue' : index === 1 ? 'icon-green' : 'icon-cyan'
  const delayStyle = { animationDelay: `${index * 0.12}s` }

  const content = (
    <>
      <div className="relative flex-shrink-0">
        <div className={`contact-tech-icon ${iconColor}`}>
          {!prefersReducedMotion && (
            <>
              <span className="pulse-ring" />
              <span className="pulse-ring" />
              <span className="pulse-ring" />
            </>
          )}
          {!prefersReducedMotion && (
            <>
              <span className="tech-dot top-right" />
              <span className="tech-dot bottom-left" />
            </>
          )}
          <Icon className="h-5 w-5 icon-svg" style={{ color: `var(--icon-color)` }} aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-foreground font-medium mt-0.5">{value}</span>
      </div>
      {isLink && (
        <div className="ml-auto flex-shrink-0 relative">
          <ArrowUpRight
            className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
            style={{ color: `var(--icon-color, #31bf2c)` }}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  )

  const baseClasses =
    'group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-surface/80 dark:hover:bg-surface/50'

  if (prefersReducedMotion) {
    if (isLink && href) {
      return (
        <a
          href={href}
          className={baseClasses}
          aria-label={`${label}: ${value}`}
        >
          {content}
        </a>
      )
    }
    return (
      <div className={baseClasses}>
        {content}
      </div>
    )
  }

  if (isLink && href) {
    return (
      <a
        href={href}
        className={`${baseClasses} fade-slide-in`}
        style={delayStyle}
        aria-label={`${label}: ${value}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={`${baseClasses} fade-slide-in`} style={delayStyle}>
      {content}
    </div>
  )
}

function SocialButton({
  name,
  href,
  index,
}: {
  name: string
  href: string
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const delayStyle = { animationDelay: `${0.4 + index * 0.08}s` }

  const brandClasses: Record<string, string> = {
    Facebook: 'social-facebook',
    WhatsApp: 'social-whatsapp',
    Correo: 'social-email',
  }

  const socialClass = brandClasses[name] ?? ''

  const renderIcon = () => {
    if (name === 'Facebook') return <FacebookIcon className="h-5 w-5" />
    if (name === 'WhatsApp') return <MessageSquare className="h-5 w-5" aria-hidden="true" />
    return <Mail className="h-5 w-5" aria-hidden="true" />
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-neon-btn ${socialClass} ${prefersReducedMotion ? '' : 'fade-scale-in'}`}
      style={prefersReducedMotion ? {} : delayStyle}
      aria-label={`Visitar ${name} de Answer ST`}
      role="listitem"
    >
      {!prefersReducedMotion && (
        <>
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
        </>
      )}
      <span className="social-icon">
        {renderIcon()}
      </span>
      <span className="social-label">{name}</span>
    </a>
  )
}

function FormSuccessState({ onReset }: { onReset: () => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="text-center py-14 space-y-5">
      {/* Animated checkmark */}
      <div className="relative mx-auto w-20 h-20">
        {!prefersReducedMotion && (
          <div className="absolute inset-0 rounded-full bg-secondary/10 animate-pulse" />
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/30">
          {!prefersReducedMotion ? (
            <CheckCircle className="h-10 w-10 text-secondary success-checkmark" aria-hidden="true" />
          ) : (
            <CheckCircle className="h-10 w-10 text-secondary" aria-hidden="true" />
          )}
        </div>
      </div>

      <h3 className={`text-2xl font-bold text-foreground ${prefersReducedMotion ? '' : 'fade-up-in'}`} style={{ animationDelay: '0.15s' }}>
        ¡Mensaje enviado!
      </h3>

      <p
        className={`text-muted-foreground max-w-xs mx-auto ${prefersReducedMotion ? '' : 'fade-up-in'}`}
        style={{ animationDelay: '0.25s' }}
      >
        Gracias por contactarnos. Te responderemos lo antes posible.
      </p>

      <div className={prefersReducedMotion ? '' : 'fade-up-in'} style={{ animationDelay: '0.4s' }}>
        <Button
          variant="outline"
          onClick={onReset}
          className="mx-auto"
        >
          Enviar otro mensaje
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function Contacto() {
  const prefersReducedMotion = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      mensaje: '',
      honeypot: '',
    },
  })

  const sendWithTimeout = useCallback(async (url: string, options: RequestInit): Promise<Response> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      return response
    } finally {
      clearTimeout(timeoutId)
    }
  }, [])

  const onSubmit = useCallback(async (data: FormFields) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await sendWithTimeout('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsTransitioning(true)
        setTimeout(() => {
          setStatus('success')
          setRetryCount(0)
          reset()
          setIsTransitioning(false)
        }, 200)
      } else {
        const isRateLimited = response.status === 429
        const message = isRateLimited
          ? result.message || 'Demasiados intentos. Espera un momento.'
          : result.message || 'Error al enviar el mensaje. Intenta de nuevo.'

        setStatus('error')
        setErrorMessage(message)
      }
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === 'AbortError'
      const isRetry = retryCount < MAX_RETRIES

      if (isRetry && !isTimeout) {
        setRetryCount((prev) => prev + 1)
        try {
          const response = await sendWithTimeout('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })

          const result = await response.json()

          if (result.success) {
            setStatus('success')
            setRetryCount(0)
            reset()
            return
          }
        } catch {
          // Fall through to error state
        }
      }

      setStatus('error')
      setErrorMessage(
        isTimeout
          ? 'La conexión tardó demasiado. Verifica tu internet e intenta de nuevo.'
          : 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.'
      )
    }
  }, [sendWithTimeout, retryCount, reset])

  const handleReset = useCallback(() => {
    setStatus('idle')
    reset()
  }, [reset])

  return (
    <Section id="contacto" variant="default" headingId="contacto-heading">
      {/* Background decoration */}
      <div className="relative overflow-hidden" aria-hidden="true">
        <GradientOrb
          size={350}
          color="var(--primary)"
          className="-top-20 -right-20"
          opacity={0.08}
          blur={120}
          speed={0.6}
        />
        <GradientOrb
          size={280}
          color="var(--secondary)"
          className="bottom-10 -left-16"
          opacity={0.06}
          blur={100}
          speed={0.4}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
        {/* ============================================================ */}
        {/*  LEFT COLUMN — Visual header + contact info + social          */}
        {/* ============================================================ */}
        <AnimatedSection animation="fade-right" duration={0.7}>
          <div className="space-y-10 lg:pr-4">
            <div className="relative">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2
                  id="contacto-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gradient leading-[1.1]"
                >
                  Hablemos
                </h2>
                <span className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground">
                  de tu proyecto
                </span>
              </div>

              <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />

              <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                Un equipo dedicado para ayudarte a crecer. Ponte en contacto
                con nosotros para resolver tus dudas o recibir asesoría
                personalizada.
              </p>
            </div>

            <div className="relative pl-1">
              <div
                className="absolute left-[2.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-primary/30 via-secondary/30 to-transparent dark:from-primary/20 dark:via-secondary/20"
                aria-hidden="true"
              />

              <div className="relative space-y-1">
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value={contactInfo.email}
                  href={`mailto:${contactInfo.email}`}
                  isLink
                  index={0}
                />
                <ContactItem
                  icon={Phone}
                  label="Teléfono"
                  value={contactInfo.phone}
                  href={`tel:+52${contactInfo.phone.replace(/\D/g, '')}`}
                  isLink
                  index={1}
                />
                <ContactItem
                  icon={MapPin}
                  label="Ubicación"
                  value={contactInfo.location}
                  isLink={false}
                  index={2}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Conecta con nosotros
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Redes sociales de Answer ST">
                {socialLinks.map((link, i) => (
                  <SocialButton
                    key={link.name}
                    name={link.name}
                    href={link.href}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ============================================================ */}
        {/*  RIGHT COLUMN — Premium form card                            */}
        {/* ============================================================ */}
        <AnimatedSection animation="fade-left" duration={0.7}>
          <div className="relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent dark:via-primary/40" aria-hidden="true" />

            <Card variant="glass" className="relative p-6 sm:p-8 lg:p-10 border-border/60 dark:border-border/40">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02] dark:from-primary/[0.03] dark:to-secondary/[0.03] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative">
                {/* CSS-based transition between form and success (replaces AnimatePresence) */}
                <div className="contact-form-container">
                  {/* Success state */}
                  <div
                    className={`contact-form-panel ${status === 'success' && !isTransitioning ? 'panel-visible' : 'panel-hidden'}`}
                    aria-hidden={status !== 'success'}
                  >
                    <FormSuccessState onReset={handleReset} />
                  </div>

                  {/* Form state */}
                  <form
                    className={`contact-form-panel ${status !== 'success' || isTransitioning ? 'panel-visible' : 'panel-hidden'}`}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-label="Formulario de contacto"
                    aria-hidden={status === 'success' && !isTransitioning}
                  >
                    {/* Honeypot — invisible to humans, catches bots */}
                    <input
                      type="text"
                      aria-hidden="true"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute left-[-9999px] opacity-0 pointer-events-none"
                      {...register('honeypot')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Nombre"
                        placeholder="Tu nombre"
                        error={errors.nombre?.message}
                        {...register('nombre')}
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="(81) 1234 5678"
                        error={errors.telefono?.message}
                        {...register('telefono')}
                      />
                      <Input
                        label="Empresa"
                        placeholder="Nombre de tu empresa (opcional)"
                        error={errors.empresa?.message}
                        {...register('empresa')}
                      />
                    </div>

                    <Textarea
                      label="Mensaje"
                      placeholder="¿En qué podemos ayudarte?"
                      rows={4}
                      error={errors.mensaje?.message}
                      {...register('mensaje')}
                    />

                    {/* Error message */}
                    {status === 'error' && (
                      <div
                        className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm border border-red-200/50 dark:border-red-800/30 fade-up-in"
                        role="alert"
                        aria-live="polite"
                      >
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-px" aria-hidden="true" />
                        <div className="flex-1">
                          <p className="font-medium">{errorMessage}</p>
                          {retryCount >= MAX_RETRIES && (
                            <button
                              type="button"
                              onClick={() => {
                                setStatus('idle')
                                setErrorMessage('')
                                setRetryCount(0)
                              }}
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 hover:no-underline transition-all"
                            >
                              <RefreshCw className="h-3 w-3" aria-hidden="true" />
                              Reintentar
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Neon Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || status === 'loading'}
                      className="neon-submit-btn"
                    >
                      {!prefersReducedMotion && <span className="glow-pulse" />}
                      <span className="shimmer" aria-hidden="true" />
                      {!prefersReducedMotion && (
                        <>
                          <span className="particle" />
                          <span className="particle" />
                          <span className="particle" />
                          <span className="particle" />
                        </>
                      )}
                      {isSubmitting || status === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin relative z-10" aria-hidden="true" />
                          <span className="relative z-10">Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Enviar mensaje</span>
                          <Send className="h-5 w-5 send-icon relative z-10" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  )
}
