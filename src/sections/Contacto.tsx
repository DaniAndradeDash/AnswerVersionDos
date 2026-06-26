'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { AnimatedSection } from '@/components/motion/AnimatedSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
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

const FETCH_TIMEOUT_MS = 15_000 // 15 seconds
const MAX_RETRIES = 1

type FormFields = Omit<ContactFormData, 'honeypot'> & { honeypot: string }

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

  const sendWithTimeout = async (url: string, options: RequestInit): Promise<Response> => {
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
  }

  const onSubmit = async (data: FormFields) => {
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
        // Retry once on network errors (not timeout)
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
  }

  return (
    <Section id="contacto" variant="default" headingId="contacto-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Info */}
        <AnimatedSection animation="fade-right" duration={0.6}>
          <div className="space-y-8">
            <div>
              <h2 id="contacto-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Contáctanos
              </h2>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                Un equipo dedicado para ayudarte a crecer. Ponte en contacto con nosotros
                para resolver tus dudas o recibir asesoría personalizada.
              </p>
            </div>

            {/* Contact Info */}
            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-foreground">{contactInfo.email}</span>
              </a>

              <a
                href={`tel:+52${contactInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-foreground">{contactInfo.phone}</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-foreground">{contactInfo.location}</span>
              </div>
            </StaggerContainer>

            {/* Social Links */}
            <div>
              <h3 id="contacto-social-heading" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Síguenos
              </h3>
              <div className="flex flex-wrap gap-4" role="list" aria-labelledby="contacto-social-heading">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-border text-foreground hover:border-secondary hover:text-secondary transition-all duration-200"
                    aria-label={`Visitar ${link.name} de Answer ST`}
                    role="listitem"
                  >
                    {link.name === 'Facebook' && <FacebookIcon className="h-4 w-4" />}
                    {link.name === 'WhatsApp' && <MessageSquare className="h-4 w-4" aria-hidden="true" />}
                    {link.name === 'Correo' && <Mail className="h-4 w-4" aria-hidden="true" />}
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Right Column: Form */}
        <AnimatedSection animation="fade-left" duration={0.6}>
          <Card variant="default" className="p-6 sm:p-8">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="h-16 w-16 text-secondary mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-bold text-foreground">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus('idle')
                    reset()
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Formulario de contacto">
                {/* Honeypot - invisible to humans, catches bots */}
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
                    className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-sm"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p>{errorMessage}</p>
                      {retryCount >= MAX_RETRIES && (
                        <button
                          type="button"
                          onClick={() => {
                            setStatus('idle')
                            setErrorMessage('')
                            setRetryCount(0)
                          }}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 hover:no-underline"
                        >
                          <RefreshCw className="h-3 w-3" aria-hidden="true" />
                          Reintentar
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  iconRight={!isSubmitting ? <Send className="h-5 w-5" aria-hidden="true" /> : undefined}
                >
                  Enviar mensaje
                </Button>
              </form>
            )}
          </Card>
        </AnimatedSection>
      </div>
    </Section>
  )
}
