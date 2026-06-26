// ============================================
// Shared Contact Form Validation Schema
// Used by both client (RHF) and server (API route)
// ============================================

import { z } from 'zod'

/**
 * Schema de validación compartido para el formulario de contacto.
 *
 * Reglas:
 * - nombre: requerido, 2-100 caracteres
 * - email: requerido, formato email válido
 * - telefono: opcional, formato flexible (espacios, guiones, paréntesis, +, .)
 * - empresa: opcional, máximo 150 caracteres
 * - mensaje: requerido, 10-2000 caracteres
 * - honeypot: campo oculto anti-spam, debe estar vacío
 */
export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),

  email: z
    .string()
    .email('Ingresa un email válido')
    .trim()
    .toLowerCase(),

  telefono: z
    .string()
    .regex(
      /^[\d\s\-\(\)\+\.]*$/,
      'El teléfono solo puede contener números, espacios, guiones y paréntesis'
    )
    .max(20, 'Teléfono demasiado largo')
    .optional()
    .or(z.literal('')),

  empresa: z
    .string()
    .max(150, 'El nombre de la empresa no puede exceder 150 caracteres')
    .optional()
    .or(z.literal('')),

  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .trim(),

  honeypot: z
    .string()
    .refine((val) => val === '', 'No debes llenar este campo'),
})

export type ContactFormData = z.infer<typeof contactSchema>

/**
 * Sanitiza datos ya validados para uso seguro en emails.
 * Escapa HTML para prevenir XSS en el contenido del email.
 */
export function sanitizeForEmail(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
