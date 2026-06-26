import { siteConfig } from '@/config/site'

export const SITE_URL = siteConfig.url
export const DEFAULT_LOCALE = 'es_MX'

export const siteMetadata = {
  title: `${siteConfig.name} | Consultoría Especializada en Monterrey`,
  description: siteConfig.description,
  keywords: [
    'consultoría especializada',
    'asesoría empresarial Monterrey',
    'consultoría financiera',
    'asesoría legal Monterrey',
    'consultoría ambiental',
    'mediación de conflictos',
    'gestión de trámites',
    'orientación empresarial',
    'consultoría en salud corporativa',
    'Infonagreen',
    'Answer ST',
    'consultoría Monterrey Nuevo León',
  ].join(', '),
  url: siteConfig.url,
  canonical: siteConfig.url,
  openGraph: {
    title: `${siteConfig.name} | Consultoría Especializada`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: DEFAULT_LOCALE,
    type: 'website' as const,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Consultoría Especializada en Monterrey`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `${siteConfig.name} | Consultoría Especializada`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: 'Dash Systems',
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'es-MX': siteConfig.url,
    },
  },
  verification: {
    google: '', // Add Google Search Console verification code
  },
} as const

export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/Logo_completo.png`,
  image: `${siteConfig.url}/og-image.png`,
  telephone: `+52${siteConfig.phone}`,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monterrey',
    addressRegion: 'Nuevo León',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.6866,
    longitude: -100.3161,
  },
  sameAs: [siteConfig.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+52${siteConfig.phone}`,
    contactType: 'customer service',
    availableLanguage: ['Spanish'],
  },
  areaServed: {
    '@type': 'City',
    name: 'Monterrey',
  },
} as const

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: DEFAULT_LOCALE,
  publisher: { '@id': `${siteConfig.url}#organization` },
} as const

export const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: siteConfig.url,
    },
  ],
} as const
