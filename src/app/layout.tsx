import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LenisProvider } from '@/providers/LenisProvider'
import { siteMetadata } from '@/constants/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import SkipToContent from '@/components/seo/SkipToContent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
})

export const metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: siteMetadata.authors,
  creator: siteMetadata.creator,
  publisher: siteMetadata.publisher,
  formatDetection: siteMetadata.formatDetection,
  icons: {
    icon: [
      { url: '/Favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/Favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    shortcut: '/Favicon.ico',
    apple: '/Favicon.ico',
  },
  openGraph: siteMetadata.openGraph,
  twitter: siteMetadata.twitter,
  robots: siteMetadata.robots,
  alternates: siteMetadata.alternates,
  verification: siteMetadata.verification,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/Favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/Favicon.ico" />
        <meta name="msapplication-TileImage" content="/Favicon.ico" />
        <meta name="theme-color" content="#04268c" />
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans scroll-smooth pt-[var(--header-height)] bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <LenisProvider>
            <SkipToContent />
            <Header />
            <main id="main-content" className="min-h-screen" role="main">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
