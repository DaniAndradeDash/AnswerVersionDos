# Auditoría de Calidad: Proyecto Answer ST

**Auditor:** Quality Manager Bot
**Fecha:** 06 de Julio de 2026
**Estado:** Crítico - Bloqueo de Despliegue (403 Forbidden)

---

## 1. Diagnóstico del Estado Actual (Bloqueos)

El proyecto presenta fallas estructurales que impiden un despliegue exitoso en el entorno de producción (Neubox/Apache). La principal causa del error `403 Forbidden` es la **incompatibilidad en la resolución de rutas** entre la exportación estática por defecto de Next.js y la configuración de seguridad del servidor Apache.

### Puntos Críticos a Resolver (Inmediato)

1.  **Configuración de Rutas (Trailing Slash):**
    *   **Hallazgo:** La estructura de archivos generada por Next.js sin `trailingSlash` no es nativamente compatible con la gestión de directorios de Apache.
    *   **Acción:** Es obligatorio modificar `next.config.ts` para incluir `trailingSlash: true`. Esto garantiza que cada ruta sea una carpeta con su propio `index.html`, evitando el error 403.

2.  **Protocolo de Despliegue (Build & Upload):**
    *   **Hallazgo:** Los errores 403 recurrentes sugieren un manejo incorrecto de la carpeta `out/` durante la subida al servidor (subir la carpeta `out/` en lugar de su contenido).
    *   **Acción:** Implementar un protocolo estricto:
        1. Limpieza total de `public_html` en el servidor antes de cada subida.
        2. Subida exclusiva del contenido de `out/` a `public_html/`.

---

## 2. Infraestructura y Proceso (Riesgos)

La arquitectura híbrida (Next.js estático + PHP para correo) introduce riesgos significativos si no se gestiona con rigor.

### Debilidades de Calidad

*   **Ausencia de Framework de Testing:** No existen pruebas unitarias ni de integración. Cualquier cambio en `QuienesSomos.tsx` o cualquier componente crítico se despliega sin validación automática, confiando únicamente en pruebas manuales.
*   **Gestión de Entorno:** La dependencia de archivos PHP externos (`phpmailer/`) que leen variables de entorno relativas (`../.env`) es frágil. Un cambio en la estructura de directorios del servidor romperá el flujo de correo en producción.
*   **Falta de CI/CD:** El despliegue es puramente manual, aumentando la probabilidad de error humano (subir archivos incorrectos, permisos mal configurados).

---

## 3. Plan de Acción Recomendado (QM Directives)

### Fase A: Corrección (Urgente)
- [ ] Aplicar `trailingSlash: true` en `next.config.ts`.
- [ ] Ejecutar `npm run build` localmente y verificar la estructura de carpetas (debe haber directorios con `index.html` dentro).
- [ ] Limpiar `public_html` en el hosting y realizar la subida correcta del contenido de `out/`.
- [ ] Verificar permisos de archivos (644) y carpetas (755) en el servidor.

### Fase B: Estabilización (Recomendado)
- [ ] **Implementar Testing:** Configurar un entorno básico (ej. Playwright o Jest) para validar al menos el renderizado de páginas críticas y el formulario de contacto antes de cada build.
- [ ] **Documentar Protocolo de Despliegue:** Crear un script o checklist riguroso que automatice (o guíe) la limpieza y subida de archivos para evitar errores manuales.
- [ ] **Refactorizar Integración PHP:** Evaluar la posibilidad de mover los scripts PHP a un subdirectorio dedicado y configurar el `.htaccess` de forma centralizada y robusta para evitar conflictos entre las rutas de Next.js y el backend.

---
*Este informe tiene carácter vinculante para garantizar la estabilidad del proyecto.*
