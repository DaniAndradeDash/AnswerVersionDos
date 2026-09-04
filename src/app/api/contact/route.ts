import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactSchema, sanitizeForEmail } from '@/lib/contact-schema'

// ============================================
// Rate Limiter (in-memory, dev only)
// ============================================

interface RateLimitEntry {
  count: number
  firstRequest: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return { allowed: true }
  }

  const elapsed = now - entry.firstRequest

  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return { allowed: true }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.firstRequest + RATE_LIMIT_WINDOW_MS - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count += 1
  return { allowed: true }
}

// Cleanup old entries every 30 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip)
    }
  }
}, 30 * 60 * 1000)

// ============================================
// Email HTML Template
// ============================================

function buildEmailHTML(data: {
  nombre: string
  email: string
  telefono: string
  empresa: string
  mensaje: string
}): string {
  const { nombre, email, telefono, empresa, mensaje } = data

  const safeNombre = sanitizeForEmail(nombre)
  const safeEmail = sanitizeForEmail(email)
  const safeTelefono = sanitizeForEmail(telefono)
  const safeEmpresa = sanitizeForEmail(empresa || 'No especificada')
  const safeMensaje = sanitizeForEmail(mensaje)

  const timestamp = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Monterrey',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #04268c; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Answer<span style="color: #31bf2c;">ST</span>
              </h1>
              <p style="margin: 8px 0 0; color: #93c5fd; font-size: 14px;">
                Nuevo mensaje desde el sitio web
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a; font-weight: 500;">${safeNombre}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0; font-size: 16px;">
                      <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a;">${safeTelefono || 'No proporcionado'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Empresa</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a;">${safeEmpresa}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</span>
                    <div style="margin: 8px 0 0; padding: 16px; background-color: #f1f5f9; border-radius: 8px; font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${safeMensaje}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Enviado el ${timestamp}
              </p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #cbd5e1;">
                Este correo fue enviado desde el formulario de contacto de AnswerST. 
                Si no esperabas este mensaje, puedes ignorarlo de forma segura.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest) {
  // Security headers
  const headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  }

  // Rate limiting
  const clientIp = getClientIp(request)
  const rateLimit = checkRateLimit(clientIp)

  if (!rateLimit.allowed) {
    console.warn('[Contact API] Rate limit exceeded for IP:', clientIp)
    return NextResponse.json(
      {
        success: false,
        message: `Demasiados intentos. Inténtalo de nuevo en ${rateLimit.retryAfter} segundos.`,
        retryAfter: rateLimit.retryAfter,
      },
      { status: 429, headers: { ...headers, 'Retry-After': String(rateLimit.retryAfter) } }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    console.warn('[Contact API] Invalid JSON body')
    return NextResponse.json(
      { success: false, message: 'Formato de datos inválido' },
      { status: 400, headers }
    )
  }

  // Server-side validation with shared schema
  const validation = contactSchema.safeParse(body)

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors
    console.warn('[Contact API] Validation failed:', fieldErrors)
    return NextResponse.json(
      {
        success: false,
        message: 'Datos inválidos',
        errors: fieldErrors,
      },
      { status: 400, headers }
    )
  }

  const { nombre, email, telefono, empresa, mensaje } = validation.data

  console.log('[Contact API] New message from:', nombre, email)

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
    port: Number(process.env.SMTP_PORT) || 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
    secure: false,
  })

  // Send email with timeout
  const emailHTML = buildEmailHTML({
    nombre,
    email,
    telefono: telefono || '',
    empresa: empresa || '',
    mensaje,
  })

  try {
    const sendPromise = transporter.sendMail({
      from: `"AnswerST Web" <${process.env.MAILTRAP_USER || 'noreply@answerst.com'}>`,
      to: process.env.EMAILJS_USER || 'contacto@answerst.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} desde AnswerST`,
      html: emailHTML,
    })

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Email timeout')), 15_000)
    })

    await Promise.race([sendPromise, timeoutPromise])

    console.log('[Contact API] Email sent successfully')

    return NextResponse.json(
      {
        success: true,
        message: 'Correo enviado correctamente',
      },
      { status: 200, headers }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    console.error('[Contact API] Failed to send email:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: 'Error al enviar el mensaje. Intenta de nuevo más tarde.',
      },
      { status: 500, headers }
    )
  }
}
