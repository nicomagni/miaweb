# AGENTS.md

## Propósito

Este repo contiene el sitio de Mía Hilados migrado a Next.js para deploy en Vercel. La UI todavía reutiliza gran parte del HTML, CSS y JavaScript legacy, por lo que la prioridad es preservar comportamiento mientras la base se moderniza.

## Stack y estructura

- `app/` contiene las rutas de Next App Router.
- `app/page.tsx` monta la home legacy dentro de Next.
- `app/terminos/page.tsx` y `app/privacidad/page.tsx` reemplazan las páginas legales HTML previas.
- `legacy-content/home-body.html` conserva el markup de la home migrado desde el HTML original.
- `css/styles.css` concentra los estilos legacy del sitio.
- `public/js/main.js` contiene lógica principal histórica y parcialmente desminificada.
- `public/js/ui-enhancements.js` contiene mejoras de UI más legibles y es el lugar preferido para cambios chicos de comportamiento.
- `public/images/` contiene assets productivos y catálogos; no renombrar ni mover masivamente sin validar referencias.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run format`
- `npm run check:format`

## Reglas de edición

- Preservar la estructura App Router de Next y la compatibilidad con Vercel.
- Evitar refactors grandes del markup legacy si el objetivo puede resolverse con cambios acotados.
- Priorizar cambios acotados en `public/js/ui-enhancements.js` antes que tocar `public/js/main.js`.
- Si hace falta editar `js/main.js`, hacer cambios mínimos y bien localizados; no refactorizar en bloque sin alcance acordado.
- No romper integraciones existentes con Web3Forms, Google Sheets ni embeds de YouTube.
- Validar que anchors, formularios, modales y sliders sigan funcionando en desktop y mobile.
- Cuidar SEO básico ya presente: metadata, JSON-LD, `robots`, `sitemap` y páginas legales.
- Optimizar imágenes o video solo si el cambio lo requiere; no recomprimir assets masivamente sin pedido.

## Convenciones de implementación

- Para UI nueva, seguir el lenguaje visual existente del sitio.
- Reutilizar clases y variables CSS existentes antes de crear nuevas.
- Si un cambio afecta contacto, branding o contenido legal, revisar metadata, contenido legacy y páginas legales.
- Antes de eliminar archivos públicos en `public/images/`, verificar referencias con `rg`.
- Si se toca `legacy-content/home-body.html`, mantener rutas root-relative (`/images/...`, `/terminos`, `/privacidad`).

## Verificación mínima

- Abrir el sitio con `npm run dev`.
- Verificar también `npm run build`.
- Probar navegación principal, formularios, carrusel/galería y modales.
- Si se modifica HTML o CSS, correr `npm run check:format`.
