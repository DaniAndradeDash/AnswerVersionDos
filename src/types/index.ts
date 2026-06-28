// ============================================
// Shared Types — AnswerST
// ============================================

export interface NavItem {
  label: string
  href: string
}

export interface Service {
  id: number
  title: string
  description: string
  image: string
  icon: string
}

export interface Advisory {
  id: number
  title: string
  icon: string
  color: string
  description: string
}

export interface DistintivoItem {
  id: number
  title: string
  description: string
  icon: string
}

export interface SliderImage {
  id: number
  src: string
  alt: string
}

// ContactFormData is now defined in @/lib/contact-schema
// to share validation schema + type in one place.
// Import with: import type { ContactFormData } from '@/lib/contact-schema'

export interface SocialLink {
  name: string
  href: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface SiteConfig {
  name: string
  shortName: string
  description: string
  url: string
  email: string
  phone: string
  location: string
  facebook: string
  whatsapp: string
  twitter: string
  instagram: string
}
