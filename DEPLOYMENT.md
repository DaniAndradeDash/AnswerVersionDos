# AnswerST — Guía de Despliegue a Producción

## 1. Build Estático

```bash
npm run build
```

Esto genera los archivos estáticos en el directorio `out/`.

---

## 2. Archivos a Subir al Hosting (Neubox)

### Archivos del build (`out/`)
Sube **todo el contenido** de `out/` al `public_html` (o equivalente) de tu hosting.

### Scripts PHP (raíz del proyecto)
Sube estos archivos al mismo nivel que `public_html`:

| Archivo | Propósito |
|---------|-----------|
| `phpmailer/sendmail.php` | Handler principal con PHPMailer |
| `phpmailer/PHPMailer.php` | Librería PHPMailer |
| `phpmailer/SMTP.php` | Librería SMTP |
| `phpmailer/Exception.php` | Librería Exception |
| `sendmail-simple.php` | Fallback con `mail()` nativo de PHP |

### Archivos de debug (solo desarrollo)
**Eliminar antes de producción:**

- `debug-sendmail.php`
- `test-php.php`

---

## 3. Variables de Entorno (`.env`)

Crea un archivo `.env` en la **raíz del proyecto** (mismo nivel que `public_html`), junto a los scripts PHP.

### Contenido mínimo requerido

```env
# SMTP de Neubox (correo del hosting)
SMTP_HOST=mail.answerst.com
SMTP_PORT=465
SMTP_SECURE=ssl
SMTP_USERNAME=contacto@answerst.com
SMTP_PASSWORD=tu_password_real_del_correo

# CORS — restringir al dominio real
ALLOWED_ORIGIN=https://answerst.com
```

### Notas importantes

- **El `.env` NO se sube al repositorio** — créalo directamente en el servidor.
- **Permisos del archivo**: `chmod 600 .env` (solo lectura por el propietario).
- **`SMTP_PASSWORD`**: usa la contraseña real de la cuenta `contacto@answerst.com` en Neubox.
- **`ALLOWED_ORIGIN`**: si usas `www.answerst.com`, cámbialo a `https://www.answerst.com`.

---

## 4. Configuración de HTTPS Forzado

### Opción A: Panel de Neubox/Hostinger

1. Entra al panel de tu hosting.
2. Ve a **SSL/TLS** o **Certificados SSL**.
3. Activa **Let's Encrypt** (gratuito) o sube tu certificado SSL.
4. Espera a que el certificado se provisione (puede tardar 5-30 min).
5. Activa **Forzar HTTPS** o **Redirigir HTTP a HTTPS**.

### Opción B: `.htaccess` (si el panel no tiene opción)

Crea o edita el archivo `.htaccess` en `public_html`:

```apache
RewriteEngine On

# Forzar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Forzar www (opcional, quita si no usas www)
# RewriteCond %{HTTP_HOST} !^www\. [NC]
# RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]

# Security headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Content-Security-Policy "upgrade-insecure-requests"
```

### Verificación

Visita `http://answerst.com` — debe redirigir automáticamente a `https://answerst.com`.

---

## 5. Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console).
2. Agrega tu propiedad (`https://answerst.com`).
3. Verifica la propiedad con el método de **etiqueta HTML**.
4. Copia el contenido de `google-site-verification`.
5. Edita `src/constants/seo.ts` y reemplaza el valor vacío:

```typescript
verification: {
  google: 'TU_CODIGO_DE_VERIFICACION_AQUI', // <-- pega aquí el código
},
```

6. Haz `npm run build` y vuelve a subir los archivos.

---

## 6. Post-Despliegue — Checklist

- [ ] Build generado sin errores (`npm run build`)
- [ ] Archivos de `out/` subidos al hosting
- [ ] Scripts PHP subidos al nivel correcto
- [ ] `.env` creado en el servidor con credenciales reales
- [ ] Permisos del `.env`: `chmod 600`
- [ ] HTTPS activo y forzando redirección
- [ ] CORS configurado con `ALLOWED_ORIGIN=https://answerst.com`
- [ ] Archivos de debug eliminados (`debug-sendmail.php`, `test-php.php`)
- [ ] Formulario de contacto probado (envío real de correo)
- [ ] Google Search Console verificado
- [ ] Open Graph preview probado con [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
- [ ] `og-image.png` accesible en `https://answerst.com/og-image.png`
- [ ] `robots.txt` accesible y correcto
- [ ] `sitemap.xml` accesible y correcto
