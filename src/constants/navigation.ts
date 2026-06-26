import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Asesorías', href: '#asesorias' },
  { label: 'Contacto', href: '#contacto' },
] as const
