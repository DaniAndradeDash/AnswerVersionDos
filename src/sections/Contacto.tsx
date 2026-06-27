'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, RefreshCw, ArrowUpRight } from 'lucide-react'
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
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const contactItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const checkmarkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
}

const successTextVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.35, duration: 0.4, ease: 'easeOut' as const },
  },
}

const successButtonVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.35, ease: 'easeOut' as const },
  },
}

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

  const content = (
    <>
      {/* Icon circle */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 blur-sm group-hover:blur-md transition-all duration-500" />
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 border border-primary/20 dark:border-primary/10 text-primary dark:text-primary-light group-hover:border-secondary/40 dark:group-hover:border-secondary/30 transition-all duration-300">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-foreground font-medium mt-0.5">{value}</span>
      </div>
      {/* Arrow (links only) */}
      {isLink && (
        <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-secondary transition-all duration-300 flex-shrink-0" aria-hidden="true" />
      )}
    </>
  )

  const baseClasses =
    'group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-surface/80 dark:hover:bg-surface/50'

  if (isLink && href) {
    return (
      <motion.a
        href={href}
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={!prefersReducedMotion ? contactItemVariants : undefined}
        className={baseClasses}
        aria-label={`${label}: ${value}`}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={!prefersReducedMotion ? contactItemVariants : undefined}
      className={baseClasses}
    >
      {content}
    </motion.div>
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

  const brandColors: Record<string, { hover: string; icon: string }> = {
    Facebook: {
      hover: 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white',
      icon: 'group-hover:scale-110',
    },
    WhatsApp: {
      hover: 'hover:bg-[#25d366] hover:border-[#25d366] hover:text-white',
      icon: 'group-hover:scale-110',
    },
    Correo: {
      hover: 'hover:bg-[#ea4335] hover:border-[#ea4335] hover:text-white',
      icon: 'group-hover:scale-110',
    },
  }

  const brand = brandColors[name] ?? { hover: 'hover:border-secondary hover:text-secondary', icon: '' }

  const renderIcon = () => {
    if (name === 'Facebook') return <FacebookIcon className="h-5 w-5" />
    if (name === 'WhatsApp') return <MessageSquare className="h-5 w-5" aria-hidden="true" />
    return <Mail className="h-5 w-5" aria-hidden="true" />
  }

  return (
    <motion.a
      key={name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={!prefersReducedMotion ? socialItemVariants : undefined}
      className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-border bg-card text-foreground font-medium text-sm transition-all duration-300 ${brand.hover} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2`}
      aria-label={`Visitar ${name} de Answer ST`}
      role="listitem"
    >
      <span className={`transition-transform duration-300 ${brand.icon}`}>
        {renderIcon()}
      </span>
      <span>{name}</span>
    </motion.a>
  )
}

function FormSuccessState({ onReset }: { onReset: () => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="text-center py-14 space-y-5"
      initial="hidden"
      animate="visible"
    >
      {/* Animated checkmark */}
      <motion.div
        className="relative mx-auto w-20 h-20"
        variants={!prefersReducedMotion ? checkmarkVariants : undefined}
      >
        <div className="absolute inset-0 rounded-full bg-secondary/10 animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/30">
          <CheckCircle className="h-10 w-10 text-secondary" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-foreground"
        variants={!prefersReducedMotion ? successTextVariants : undefined}
      >
        ¡Mensaje enviado!
      </motion.h3>

      <motion.p
        className="text-muted-foreground max-w-xs mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' as const }}
      >
        Gracias por contactarnos. Te responderemos lo antes posible.
      </motion.p>

      <motion.div variants={!prefersReducedMotion ? successButtonVariants : undefined}>
        <Button
          variant="outline"
          onClick={onReset}
          className="mx-auto"
        >
          Enviar otro mensaje
        </Button>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function Contacto() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [retryCount, setRetryCount] = useState(0)

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
        setStatus('success')
        setRetryCount(0)
        reset()
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

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
        {/* ============================================================ */}
        {/*  LEFT COLUMN — Visual header + contact info + social          */}
        {/* ============================================================ */}
        <AnimatedSection animation="fade-right" duration={0.7}>
          <div className="space-y-10 lg:pr-4">
            {/* ---- Premium header (breaks the badge→h2→p pattern) ---- */}
            <div className="relative">
              {/* Large display text */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2
                  id="contacto-heading"
                  className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gradient leading-[1.1]"
                >
                  Hablemos
                </h2>
                <span className="text-2xl sm:text-3xl font-light text-muted-foreground">
                  de tu proyecto
                </span>
              </div>

              {/* Decorative gradient line */}
              <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />

              <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                Un equipo dedicado para ayudarte a crecer. Ponte en contacto
                con nosotros para resolver tus dudas o recibir asesoría
                personalizada.
              </p>
            </div>

            {/* ---- Contact info with timeline connector ---- */}
            <div className="relative pl-1">
              {/* Timeline vertical line */}
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

            {/* ---- Social links ---- */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Conecta con nosotros
              </h3>
              <div className="flex flex-wrap gap-3" role="list" aria-label="Redes sociales de Answer ST">
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
            {/* Gradient top accent line */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent dark:via-primary/40" aria-hidden="true" />

            <Card variant="glass" className="relative p-6 sm:p-8 lg:p-10 border-border/60 dark:border-border/40">
              {/* Subtle gradient overlay behind form */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02] dark:from-primary/[0.03] dark:to-secondary/[0.03] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormSuccessState onReset={handleReset} />
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-5"
                      aria-label="Formulario de contacto"
                      initial={{ opacity: 1 }}
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
                        <motion.div
                          className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm border border-red-200/50 dark:border-red-800/30"
                          role="alert"
                          aria-live="polite"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
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
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                        iconRight={!isSubmitting ? <Send className="h-5 w-5" aria-hidden="true" /> : undefined}
                        className="relative overflow-hidden group"
                      >
                        {/* Subtle shimmer on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" aria-hidden="true" />
                        <span className="relative">Enviar mensaje</span>
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  )
}
