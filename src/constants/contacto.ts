import type { ContactInfo, SocialLink } from '@/types'

export const contactInfo: ContactInfo = {
  email: 'contacto@answerst.com',
  phone: '(81) 8686 3395',
  location: 'Monterrey, Nuevo León',
} as const

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1JMbyxjzvd/',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8186863395',
  },
  {
    name: 'Correo',
    href: 'mailto:contacto@answerst.com',
  },
] as const
