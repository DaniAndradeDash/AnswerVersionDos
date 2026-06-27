# Changelog

Todos los cambios notables en el proyecto AnswerST.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.0] — 2026-06-26

### Lanzamiento inicial

Landing page completa para AnswerST con 7 secciones, dark mode, animaciones, formulario de contacto y SEO.

#### Agregado
- **Hero** — Presentación principal con CTA, grid pattern y elementos decorativos animados
- **Servicios** — 8 cards de servicios con patrón accordion (botones `aria-expanded`/`aria-controls`)
- **Distintivo** — Badge Infonagreen + galería slider con navegación por teclado (prev/next + dots)
- **Asesorías** — Sección de valor con CTAs
- **Videos** — Reproductor de video con lazy loading y poster
- **Compromiso** — Sección de confianza y valores con efecto shine
- **Contacto** — Info de contacto + formulario con validación Zod + React Hook Form

#### Componentes UI
- `Button` — CVA variants (primary, secondary, ghost, outline, icon), loading state, asChild
- `Input` / `Textarea` — Labels, errores, icon slots, ARIA attributes
- `Card` — CVA variants (default, hover, selected, glass)
- `Badge` — CVA variants con dark mode
- `Section` — CVA variants (default, alt, dark) con `aria-labelledby`

#### Motion
- `AnimatedSection` — GSAP scroll-triggered animations
- `StaggerContainer` — Staggered children animations
- `Float` — Floating animation con keyframes CSS (sin inyección imperativa)
- `ScrollReveal` — Reveal on scroll con GSAP

#### Accesibilidad
- Skip-to-content link
- Navegación por teclado completa
- `prefers-reduced-motion` respetado en todas las animaciones
- Focus visible global
- ARIA labels, roles semánticos, `aria-expanded`, `aria-controls`

#### Dark Mode
- `next-themes` con `data-theme` attribute
- Variables CSS completas para light/dark
- Toggle manual + detección automática del sistema

#### Seguridad del Formulario
- Validación Zod compartida (client + server)
- Honeypot anti-spam
- Rate limiting (5 envíos/hora por IP)
- Sanitización XSS (`htmlspecialchars` / HTML escape)
- Timeout de 15s con `AbortController`
- Retry automático (1 intento)
- CSRF token (producción PHP)

#### SEO
- Metadata API (title, description, keywords, OG, Twitter Cards)
- JSON-LD: Organization, WebSite, BreadcrumbList
- `sitemap.xml` + `robots.txt`
- Canonical URL
- Encabezados semánticos (H1→H2→H3)

#### Arquitectura
- Next.js 15 App Router con exportación estática
- TypeScript 5 (strict mode)
- Tailwind CSS v4
- Dual email flow: nodemailer (dev) / PHPMailer (prod)

#### Correcciones QA aplicadas en esta release
- 🔴 Header scroll handler con `useRef` (elimina re-suscripción en cada frame)
- 🔴 Float keyframes movidos de inyección imperativa a `globals.css`
- 🔴 Imágenes del slider Distintivo corregidas (rutas reales)
- 🟠 Transiciones CSS limitadas a elementos interactivos (no universal)
- 🟠 Slider Distintivo con navegación por teclado completa
- 🟡 Servicios refactorizado a disclosure pattern con `<button>` explícito
- 🟡 Robots condicional por `NODE_ENV`
- 🟡 Eliminadas directivas `@tailwind` legacy
- 🟢 JsonLd keys descriptivas
- 🟢 `type="button"` en theme toggles
- 🟢 Eliminado `aria-label` duplicado en VideoPlayer

---

## Notas para producción

### Pendiente
- [ ] Crear `og-image.png` (1200x630) en `public/` para Open Graph y Twitter Cards
- [ ] Agregar Google Search Console verification code en `seo.ts`
- [ ] Configurar variables de entorno en producción
- [ ] Configurar HTTPS forzado en Hostinger/Neubox
- [ ] Cambiar CORS de `*` a `https://answerst.com`
