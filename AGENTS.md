# AGENTS.md — Answer ST (cliente_answer)

## Nota Crítica de Arquitectura

**Exportación estática**: `next.config.ts` configura `output: 'export'` + `images.unoptimized: true`. Esto significa:
- `npm run build` genera HTML estático en `out/`
- **Las rutas API (`/api/contact`) NO funcionan en producción**
- El formulario de contacto envía correos mediante scripts PHP desplegados junto a los archivos estáticos en un host PHP (Neubox)

## Comandos

```
npm run dev       # Next.js 15 con Turbopack (flag --turbopack)
npm run build     # Exportación estática → out/
npm run start     # NO funciona con exportación estática
npm run lint      # ESLint flat config (eslint.config.mjs)
```

No hay framework de tests configurado. No hay CI/CD.

## Flujo de Correo (Dos Rutas)

- **Desarrollo**: `src/app/api/contact/route.ts` usa nodemailer → Mailtrap sandbox. Requiere variables de entorno: `SMTP_HOST`, `SMTP_PORT`, `MAILTRAP_USER`, `MAILTRAP_PASS`, `EMAILJS_USER`
- **Producción**: Scripts PHP en la raíz manejan el correo. `phpmailer/sendmail.php` lee `../.env` para credenciales SMTP (Neubox). `sendmail-simple.php` es un fallback usando `mail()` de PHP. `debug-sendmail.php` para troubleshooting.

## Estructura de Directorios

- `src/app/` — Entrada de Next.js App Router. `page.tsx` compone 7 secciones en orden.
- `src/sections/` — Hero, Servicios, Distintivo, Asesorias, Videos, Compromiso, Contacto
- `src/components/` — Header (fijo, 16px de padding top en body), Footer, FloatingShapes, Particles, VideoPlayer
- `src/styles/colors.ts` — Definiciones de color compartidas
- `phpmailer/` — Librería PHPMailer + handler sendmail para producción
- `public/` — Assets estáticos
- `out/` — Output del build (gitignored)

## Convenciones y Particularidades

- **Alias de ruta**: `@/*` → `./src/*`
- **Tailwind CSS v4** con plugin `@tailwindcss/postcss` (no el plugin antiguo `tailwindcss` de PostCSS)
- **Favicon**: `Favicon.ico` (F mayúscula) en `src/app/` y `public/`. Sensible a mayúsculas — no renombrar.
- **Idioma**: Español (`lang="es"`), sitio para la consultora "Answer ST"
- **`globals.css`**: Usa tanto `@import "tailwindcss"` (Tailwind v4) como directivas legacy `@tailwind`. Ambos presentes — no eliminar ninguno sin verificar.
- **Smooth scroll**: `scroll-margin-top: 90px` en secciones para compensar el header fijo
- **Sin `.env` en el repo** — gitignored. Variables necesarias para correo en dev: `SMTP_HOST`, `SMTP_PORT`, `MAILTRAP_USER`, `MAILTRAP_PASS`, `EMAILJS_USER`

## Dependencias a Tener en Cuenta

- framer-motion (animaciones), react-slick + slick-carousel (carruseles), react-icons
- React 19, Next.js 15, TypeScript 5 (modo estricto)
