import Link from 'next/link'

/**
 * Skip to content link — hidden until focused.
 * Critical for keyboard navigation accessibility (WCAG 2.4.1).
 */
export default function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-secondary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
    >
      Ir al contenido principal
    </Link>
  )
}
