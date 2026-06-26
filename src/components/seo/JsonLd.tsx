import {
  jsonLdOrganization,
  jsonLdWebsite,
  jsonLdBreadcrumb,
} from '@/constants/seo'

/**
 * JSON-LD structured data injector.
 * Renders Organization, WebSite, and BreadcrumbList schemas.
 * Static data — no re-renders, zero runtime cost.
 */
export function JsonLd() {
  const schemas = [jsonLdOrganization, jsonLdWebsite, jsonLdBreadcrumb]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
