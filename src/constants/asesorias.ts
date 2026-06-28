import type { Advisory } from '@/types'

export const asesorias: Advisory[] = [
  {
    id: 1,
    title: 'Financiera',
    icon: 'Landmark',
    color: '#2b92fa',
    description: 'Asesoría en planificación financiera, inversiones y optimización de recursos.',
  },
  {
    id: 2,
    title: 'Legal',
    icon: 'Scale',
    color: '#a91cf5',
    description: 'Orientación jurídica para proteger tus intereses patrimoniales y empresariales.',
  },
  {
    id: 3,
    title: 'Empresarial',
    icon: 'Building2',
    color: '#ffea28',
    description: 'Estrategias de crecimiento, optimización operativa y desarrollo organizacional.',
  },
  {
    id: 4,
    title: 'Salud',
    icon: 'HeartPulse',
    color: '#87ceeb',
    description: 'Consultoría en bienestar corporativo y programas de salud integral.',
  },
  {
    id: 5,
    title: 'Mediación de Conflictos',
    icon: 'Handshake',
    color: '#d90b80',
    description: 'Resolución efectiva de disputas mediante mediación profesional.',
  },
  {
    id: 6,
    title: 'Medio Ambiente',
    icon: 'Leaf',
    color: '#67f714',
    description: 'Asesoría en sustentabilidad, normatividad ambiental y estrategias verdes.',
  },
] as const
