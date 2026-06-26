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
    icon: '/Icono_Face.png',
    color: '#1877f2',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8186863395',
    icon: '/icono_whats.png',
    color: '#25d366',
  },
  {
    name: 'Correo',
    href: 'mailto:contacto@answerst.com',
    icon: '/icono_correo.png',
    color: '#ea4335',
  },
] as const
