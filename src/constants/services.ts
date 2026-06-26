import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 1,
    title: 'Asesoramiento Personalizado',
    description:
      'Nuestro equipo de expertos está aquí para atender tus metas y necesidades personales o empresariales. Te brindamos orientación estratégica y soluciones a medida para cada situación.',
    image: '/asesoramiento_personalizado.png',
    icon: 'Users',
  },
  {
    id: 2,
    title: 'Análisis Detallado',
    description:
      'Realizamos un análisis exhaustivo de tu situación para identificar las mejores opciones y estrategias que resuelvan tus necesidades de manera óptima. Cada detalle cuenta para construir la mejor solución.',
    image: '/Analisis_detallado.png',
    icon: 'Search',
  },
  {
    id: 3,
    title: 'Gestión de Trámites',
    description:
      'Simplificamos el proceso de tu solicitud, gestionando los trámites correspondientes agilizando el desarrollo de los temas, garantizando amplios beneficios. Creamos soluciones sostenibles y estratégicas que generan resultados.',
    image: '/gestion_tramites.png',
    icon: 'ClipboardCheck',
  },
] as const
