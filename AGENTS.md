# AGENTS.md

## Propósito

Este repo contiene el sitio de Mía Hilados migrado a Next.js para deploy en Vercel. La UI todavía reutiliza gran parte del HTML, CSS y JavaScript legacy, por lo que la prioridad es preservar comportamiento mientras la base se moderniza.

## Stack y estructura

- `app/` contiene las rutas de Next App Router.
- `app/page.tsx` monta la home legacy dentro de Next.
- `app/terminos/page.tsx` y `app/privacidad/page.tsx` reemplazan las páginas legales HTML previas.
- `legacy-content/home-body.html` conserva el markup de la home migrado desde el HTML original.
- `docs/admin-supabase-clerk-spec.md` documenta la arquitectura actual del backoffice con Clerk + Supabase.
- `docs/drizzle-workflow.md` documenta el flujo de schema y migraciones con Drizzle.
- `db/schema/index.ts` es la fuente de verdad del schema gestionado con Drizzle.
- `drizzle/` contiene migraciones SQL generadas por Drizzle.
- `drizzle.config.ts` usa `DATABASE_URL` como única variable de conexión para Drizzle.
- `lib/db/client.ts` usa `postgres-js` con `prepare: false` para compatibilidad con el pooler transaction de Supabase.
- `scripts/generate-legacy-seed-sql.mjs` genera SQL reproducible para seedear proveedores y colecciones legacy dentro de migraciones Drizzle custom.
- `css/styles.css` concentra los estilos legacy del sitio.
- `public/js/main.js` contiene lógica principal histórica y parcialmente desminificada.
- `public/js/ui-enhancements.js` contiene mejoras de UI más legibles y es el lugar preferido para cambios chicos de comportamiento.
- `public/images/` contiene assets productivos y catálogos; no renombrar ni mover masivamente sin validar referencias.
- `app/admin/providers/` es la ruta canónica del módulo comercial; `app/admin/wholesalers/` quedó solo como compatibilidad de rutas.
- `app/admin/media/` es la entrada para subir y reutilizar assets desde Supabase Storage.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run db:generate`
- `npm run db:migrate:deploy`
- `npm run db:check`
- `npm run db:studio`
- `npm run db:seed:legacy:providers`
- `npm run db:seed:legacy:collections`
- `npm run format`
- `npm run check:format`

## Reglas de edición

- Preservar la estructura App Router de Next y la compatibilidad con Vercel.
- Mantener Drizzle como fuente de verdad del schema en código.
- Mantener el `.env` lo más chico posible; hoy la conexión de DB usa solo `DATABASE_URL`.
- No usar `supabase/migrations` como fuente primaria del schema mientras Drizzle siga siendo el sistema elegido.
- En el backoffice, tratar la base comercial como `proveedores`; `wholesaler` y `distributor` son tipos del proveedor, no módulos conceptualmente distintos.
- Evitar refactors grandes del markup legacy si el objetivo puede resolverse con cambios acotados.
- Priorizar cambios acotados en `public/js/ui-enhancements.js` antes que tocar `public/js/main.js`.
- Si hace falta editar `js/main.js`, hacer cambios mínimos y bien localizados; no refactorizar en bloque sin alcance acordado.
- No romper integraciones existentes con Web3Forms ni embeds de YouTube.
- La web pública ya no depende operativamente de Google Sheets para proveedores; el origen actual es la base y la inyección server-side.
- Validar que anchors, formularios, modales y sliders sigan funcionando en desktop y mobile.
- Cuidar SEO básico ya presente: metadata, JSON-LD, `robots`, `sitemap` y páginas legales.
- Optimizar imágenes o video solo si el cambio lo requiere; no recomprimir assets masivamente sin pedido.
- Si un cambio de backend modifica el schema, actualizar `db/schema/index.ts` y generar migración en `drizzle/`.

## Convenciones de implementación

- Para UI nueva, seguir el lenguaje visual existente del sitio.
- Reutilizar clases y variables CSS existentes antes de crear nuevas.
- Si un cambio afecta contacto, branding o contenido legal, revisar metadata, contenido legacy y páginas legales.
- Antes de eliminar archivos públicos en `public/images/`, verificar referencias con `rg`.
- Si se toca `legacy-content/home-body.html`, mantener rutas root-relative (`/images/...`, `/terminos`, `/privacidad`).
- Si se cambia el schema, commitear tanto `db/schema/*` como `drizzle/*`.
- Si se regeneran seeds legacy, usar los scripts `db:seed:legacy:*` y volcar el resultado en migraciones custom de Drizzle, no en SQL suelto fuera del flujo.

## Verificación mínima

- Abrir el sitio con `npm run dev`.
- Verificar también `npm run build`.
- Si se toca schema o migraciones, validar también `npm run db:check`.
- Probar navegación principal, formularios, carrusel/galería y modales.
- Si se modifica HTML o CSS, correr `npm run check:format`.
