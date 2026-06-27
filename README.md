# AnswerST — Landing Page

> Consultoría Especializada en Monterrey, Nuevo León.

## Descripción

Landing page moderna, tecnológica y orientada a la conversión para **Answer ST**, consultora especializada en asesoría empresarial, legal, financiera, ambiental y más.

Diseñada con inspiración en Vercel, Stripe, Linear y Framer. Transmite innovación, confianza y calidad.

---

## Stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19 |
| Lenguaje | TypeScript 5 (strict) |
| Estilos | Tailwind CSS v4 |
| Animaciones | GSAP + Lenis (smooth scroll) |
| Formularios | React Hook Form + Zod |
| Email (dev) | nodemailer + Mailtrap |
| Email (prod) | PHPMailer + SMTP (Neubox) |
| Deploy | Exportación estática → Hostinger |

---

## Comandos

```bash
npm run dev       # Desarrollo con Turbopack → http://localhost:3000
npm run build     # Exportación estática → out/
npm run lint      # ESLint
```

> **Nota:** `npm run start` NO funciona con exportación estática.

---

## Arquitectura

### Exportación Estática

El proyecto usa `output: 'export'` en `next.config.ts`. Esto genera HTML estático en `out/` sin servidor Node.js. Los archivos se despliegan directamente a un host PHP (Neubox/Hostinger).

### Flujo de Correo (Dos Rutas)

| Ambiente | Método | Proveedor |
|----------|--------|-----------|
| **Desarrollo** | `POST /api/contact` → nodemailer | Mailtrap sandbox |
| **Producción** | `POST phpmailer/sendmail.php` → PHPMailer | SMTP Neubox |

**Variables de entorno (desarrollo):**

```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
MAILTRAP_USER=tu_usuario
MAILTRAP_PASS=tu_password
EMAILJS_USER=contacto@answerst.com
```

### Estructura

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout + metadata + providers
│   │   ├── page.tsx            # Composición de 7 secciones
│   │   ├── globals.css         # Variables CSS + keyframes + utilidades
│   │   └── api/contact/        # API route (solo desarrollo)
│   ├── sections/               # Hero, Servicios, Distintivo, Asesorías, Videos, Compromiso, Contacto
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── ui/                 # Button, Input, Card, Badge, Section
│   │   ├── motion/             # AnimatedSection, StaggerContainer, Float, ScrollReveal
│   │   └── seo/                # JsonLd, SkipToContent
│   ├── providers/              # ThemeProvider, LenisProvider
│   ├── constants/              # Servicios, Distintivo, SEO, Navegación, Contacto
│   ├── hooks/                  # useReducedMotion, useMediaQuery
│   ├── lib/                    # Contact schema, GSAP scroll utils, Lenis config
│   ├── styles/                 # Design tokens (colores, tipografía, spacing)
│   ├── config/                 # Site config (URL, contacto, redes)
│   └── types/                  # TypeScript types
├── public/                     # Assets estáticos (imágenes, videos, favicon)
├── phpmailer/                  # PHPMailer + sendmail.php (producción)
└── out/                        # Output del build (gitignored)
```

---

## Secciones

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | Hero | Presentación principal con CTA y animaciones decorativas |
| 2 | Servicios | 8 cards de servicios con accordion expandible |
| 3 | Distintivo | Badge Infonagreen + galería slider con navegación |
| 4 | Asesorías | Sección de valor con CTAs |
| 5 | Videos | Reproductor de video con lazy loading |
| 6 | Compromiso | Sección de confianza y valores |
| 7 | Contacto | Info de contacto + formulario con validación completa |

---

## Características

### Accesibilidad (WCAG AA)
- Skip-to-content link
- Navegación por teclado completa
- ARIA labels y roles semánticos
- Focus visible
- `prefers-reduced-motion` respetado
- Formulario con `aria-invalid` y `aria-describedby`

### Dark Mode
- Automático según preferencia del sistema
- Toggle manual en Header
- Variables CSS para light/dark
- `next-themes` con `data-theme` attribute

### Seguridad del Formulario
- Validación Zod (client + server)
- Honeypot anti-spam
- Rate limiting (5 envíos/hora por IP)
- Sanitización XSS
- Timeout de 15s + retry automático
- CSRF token (producción PHP)

### SEO
- Metadata API completa (title, description, OG, Twitter)
- JSON-LD (Organization, WebSite, Breadcrumb)
- Sitemap.xml + robots.txt
- Canonical URL
- Encabezados semánticos (H1→H2→H3)

---

## Responsive

Diseñado mobile-first. Breakpoints validados:

| Breakpoint | Resolución |
|------------|------------|
| Mobile | 320px, 375px |
| Tablet | 768px |
| Laptop | 1024px |
| Desktop | 1440px |
| UltraWide | 1920px |

---

## Producción

### Despliegue

1. `npm run build` → genera `out/`
2. Subir contenido de `out/` a Hostinger/Neubox
3. Subir `phpmailer/` al mismo directorio
4. Configurar `.env` en producción con credenciales SMTP
5. Configurar HTTPS forzado
6. Cambiar CORS de `*` a `https://answerst.com`

### Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] SMTP autenticado (no `mail()`)
- [ ] HTTPS activo
- [ ] CORS restrictivo
- [ ] `og-image.png` creada (1200x630) en `public/`
- [ ] Google Search Console verification code agregado
- [ ] Permisos de `.env` restringidos

---

## Librerías

### Permitidas
- Framer Motion, GSAP, Lenis
- React Hook Form, Zod
- Lucide React
- clsx, class-variance-authority
- next-themes

### Prohibidas
- Bootstrap, jQuery
- PHPMailer en desarrollo (solo producción)
- CSS frameworks adicionales

---

## Créditos

- **Desarrollo:** Dash Systems
- **Diseño:** Inspirado en Vercel, Stripe, Linear, Framer, Apple
- **Hosting:** Hostinger / Neubox
