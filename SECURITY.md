# Security Checklist — AnswerST Contact Form

## Implementadas

- [x] **Validación client-side** — Zod + React Hook Form
  - Schema compartido (`src/lib/contact-schema.ts`)
  - Validación en tiempo real mientras el usuario escribe
  - Mensajes de error claros en español

- [x] **Validación server-side** — Zod (API route) / PHP (producción)
  - `src/app/api/contact/route.ts` — validación con Zod en servidor
  - `phpmailer/sendmail.php` — validación manual en PHP
  - Los campos vacíos, inválidos o malformados son rechazados
  - Mensajes de error genéricos al cliente, detallados en logs internos

- [x] **Sanitización de inputs**
  - API route: HTML escape en `sanitizeForEmail()` antes de incluir en el email
  - PHP: `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` en todos los campos
  - Prevención de XSS en el contenido del email
  - Trim en todos los strings

- [x] **Honeypot anti-spam**
  - Campo oculto `honeypot` en el formulario HTML
  - Invisible para humanos (`opacity: 0`, `position: absolute`, `tabindex: -1`, `aria-hidden`)
  - Los bots que llenan campos ocultos son detectados
  - En PHP: retorna éxito para confundir al bot
  - En API route: validación con schema Zod

- [x] **Rate limiting**
  - API route: in-memory, 5 envíos por hora por IP
  - PHP: file-based (temp dir + JSON), 5 envíos por hora por IP hash (SHA-256)
  - Respuesta HTTP 429 con header `Retry-After`
  - Limpieza automática de entradas expiradas

- [x] **CSRF token (PHP)**
  - Token generado con `random_bytes(32)` almacenado en sesión PHP
  - Expira después de 30 minutos
  - Verificación con `hash_equals()` (timing-safe)
  - El frontend puede incluir `csrf_token` en el body del POST

- [x] **No exponer errores internos**
  - API route: mensajes genéricos al cliente, stack traces solo en `console.error`
  - PHP: `error_log()` para registro interno, nunca se envía `ErrorInfo` al cliente
  - Credenciales SMTP nunca aparecen en logs ni respuestas

- [x] **Headers de seguridad**
  - `Content-Type: application/json`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - CORS configurado (preflight OPTIONS manejado)

- [x] **Timeout en fetch**
  - `AbortController` con timeout de 15 segundos
  - Si el servidor no responde, el usuario recibe mensaje claro
  - No se bloquea la interfaz indefinidamente

- [x] **Retry automático**
  - En caso de error de red (no timeout), se reintenta 1 vez
  - Después del retry máximo, se muestra opción de reintentar manualmente

## A implementar en despliegue

- [x] **HTTPS forzado** — `.htaccess` incluido con regla de redirección HTTP → HTTPS (solo activar SSL en panel de hosting)
- [x] **Security headers** — `.htaccess` incluye X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy
- [ ] **CORS restrictivo** — Cambiar `ALLOWED_ORIGIN` de `*` a `https://www.answerst.com` en `phpmailer/sendmail.php`
- [ ] **Variables de entorno** — Configurar `.env` en producción con credenciales reales
- [x] **Archivos debug eliminados** — `debug-sendmail.php` y `test-php.php` removidos del proyecto
- [x] **Protección de `.env`** — `.htaccess` bloquea acceso a archivos que comienzan con `.`
- [ ] **SMTP autenticado** — Nunca usar `mail()` en producción; siempre PHPMailer + SMTP
- [ ] **Permisos de archivos** — `phpmailer/` legible, `.env` no accesible vía web (`chmod 600`)
- [ ] **Monitoreo de logs** — Revisar logs de error periódicamente

## Arquitectura de seguridad

```
┌─────────────────────────────────────────────────┐
│                   CLIENTE                        │
│  ┌─────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ Zod (RHF)   │  │ Honeypot   │  │ Timeout  │  │
│  │ Client-side │  │ Invisible  │  │ 15s      │  │
│  └──────┬──────┘  └─────┬──────┘  └────┬─────┘  │
│         │               │               │        │
│         ▼               ▼               ▼        │
│         ┌─────────────────────────────────┐      │
│         │      POST /api/contact           │      │
│         │  (dev: Next.js API route)        │      │
│         │  (prod: .htaccess rewrite →      │      │
│         │   phpmailer/sendmail.php)        │      │
│         └─────────────────────────────────┘      │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                   SERVIDOR                       │
│  ┌─────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ Rate Limit  │  │ Validación │  │ CSRF     │  │
│  │ 5/hora/IP   │  │ Zod / PHP  │  │ Token    │  │
│  └──────┬──────┘  └─────┬──────┘  └────┬─────┘  │
│         │               │               │        │
│         ▼               ▼               ▼        │
│         ┌─────────────────────────────────┐      │
│         │  Sanitización + Email HTML       │      │
│         │  (htmlspecialchars / escape)     │      │
│         └───────────────┬─────────────────┘      │
│                         │                        │
│                         ▼                        │
│              ┌─────────────────────┐             │
│              │  SMTP (PHPMailer)   │             │
│              │  o nodemailer (dev) │             │
│              └─────────────────────┘             │
└─────────────────────────────────────────────────┘
```

## Flujo de envío

### Desarrollo
1. Usuario llena formulario → Zod valida en cliente
2. POST → `/api/contact` (Next.js API route)
3. Rate limiting check (IP)
4. Zod server-side validation
5. Honeypot check
6. Sanitización + HTML email
7. nodemailer → Mailtrap sandbox
8. JSON response al cliente

### Producción
1. Usuario llena formulario → Zod valida en cliente
2. POST → `/api/contact` → `.htaccess` reescribe a `phpmailer/sendmail.php`
3. Rate limiting check (IP hash)
4. CSRF token validation (si se envía)
5. Honeypot check
6. PHP validation + sanitization
7. PHPMailer → SMTP autenticado (Neubox)
8. JSON response al cliente
