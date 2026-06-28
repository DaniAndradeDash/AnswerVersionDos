# Changelog

Todos los cambios notables en el proyecto AnswerST.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/).

---

## [1.2.0] — 2026-06-27

### Optimización de rendimiento

Reducción significativa del bundle, eliminación de código muerto y optimización de recursos.

#### Bundle JavaScript
- **Eliminada dependencia `framer-motion`** (~150 KB gzipped) — todas las animaciones migradas a CSS puro
  - Header: transiciones de iconos (theme toggle, menu) con CSS keyframes
  - Distintivo: CTA Facebook con CSS hover animations (pulse, wiggle, bounce)
  - Contacto: stagger animations, form/success transitions con CSS
- **`next.config.ts`** — Agregado `experimental.optimizePackageImports` para tree-shaking agresivo de GSAP y lucide-react
- **Resultado:** First Load JS de 259 kB → **218 kB** (-41 kB, -15.8%)

#### Imágenes
- **Eliminadas 14 imágenes muertas** (~13.4 MB):
  - `financiera_img.png`, `Legal_img_gray.png`, `Empresarial_img_red.png`
  - `salud_img.png`, `salud_img_celeste.png`, `mediacion_conflictos.png`
  - `Medio_ambiente_img.png`, `logo_answer.png`, `fondo_servicios.png`
  - `infonagreen.png`, `infonagreen_tres.jpeg`
  - `Icono_Face.png`, `icono_whats.png`, `icono_correo.png`

#### Código muerto eliminado
- `src/lib/gsap-scroll.ts` (1.9 KB)
- `src/lib/lenis.ts` (1.6 KB)
- `src/hooks/useLenis.ts` (1.6 KB)
- `src/components/motion/ParallaxSection.tsx` (1.2 KB)
- `src/components/motion/ScrollReveal.tsx` (2.7 KB)
- `src/components/VideoPlayer.tsx` (1.7 KB)
- `src/components/ui/Badge.tsx` (1.3 KB)
- `src/styles/tokens.ts` (4.8 KB)
- `deprequeted/compromiso.tsx` (17.8 KB)
- Tipo `VideoItem` de `src/types/index.ts`
- Campos `icon` y `color` de `SocialLink` (no usados en UI)

#### Video
- **Videos.tsx** — Cambiado `preload="metadata"` → `preload="none"` para evitar descarga de 7 MB antes de la interacción

---

## [1.1.0] — 2026-06-27

### Preparación para producción

Correcciones de seguridad e infraestructura para despliegue en Neubox/Hostinger.

#### Infraestructura
- **`.htaccess`** — Creado con configuración completa para producción:
  - Rewrite de `/api/contact` → `phpmailer/sendmail.php` (formulario funciona sin cambiar código frontend)
  - Redirección forzada HTTP → HTTPS
  - Security headers (X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy)
  - Bloqueo de acceso a `.env` y archivos sensibles
  - Caching optimizado para assets estáticos (imágenes, CSS, JS con content hashing)
  - Compresión Gzip
  - Prevención de listing de directorios

#### Seguridad
- **Eliminados archivos de debug:** `debug-sendmail.php` y `test-php.php` removidos del proyecto
- **Dependencias actualizadas:** `npm audit fix` aplicado, reducidas de 8 a 3 vulnerabilidades

#### Documentación
- `DEPLOYMENT.md` actualizado con instrucciones de `.htaccess`
- Checklist de deploy actualizado

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
