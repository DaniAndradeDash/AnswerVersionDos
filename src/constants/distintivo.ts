import type { DistintivoItem, SliderImage } from '@/types'

export const distintivoItems: DistintivoItem[] = [
  {
    id: 1,
    title: 'Sustentabilidad',
    description: 'Comprometidos con prácticas que protegen el medio ambiente.',
    icon: 'Leaf',
  },
  {
    id: 2,
    title: 'Innovación',
    description: 'Soluciones vanguardistas para problemas complejos.',
    icon: 'Lightbulb',
  },
  {
    id: 3,
    title: 'Responsabilidad',
    description: 'Cumplimiento total de normativas y estándares de calidad.',
    icon: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Transparencia',
    description: 'Comunicación clara y honesta en cada proceso.',
    icon: 'Eye',
  },
] as const

export const sliderImages: SliderImage[] = [
  { id: 1, src: '/infonagreen_1.png', alt: 'Infonagreen - Imagen 1' },
  { id: 2, src: '/infonagreen_2.png', alt: 'Infonagreen - Imagen 2' },
  { id: 3, src: '/infonagreen_3.png', alt: 'Infonagreen - Imagen 3' },
] as const
