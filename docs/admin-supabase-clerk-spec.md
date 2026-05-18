# Admin Platform Spec

## Objetivo

Extender el sitio de Mía Hilados con un backoffice interno para gestionar:

- colecciones
- proveedores
- solicitudes comerciales
- mensajes de contacto
- media assets

## Stack

- `Next.js 16` con App Router
- `Clerk` para autenticación
- `Drizzle` para schema y migraciones
- `Supabase Postgres` para persistencia
- `Supabase Storage` para imágenes y archivos

## Decisiones

### 1. Clerk solo para identidad

Clerk resuelve login y sesión del admin. Los permisos operativos viven en la base de datos.

### 2. Roles desde `admin_users`

La autorización real se decide contra `admin_users`, no desde metadata libre del proveedor de auth.

Roles actuales:

- `superadmin`
- `editor`
- `sales`

### 3. Proveedores como módulo canónico

La base comercial se modela como `providers`.

- `wholesaler` y `distributor` son valores de `provider_type`
- la tabla física ya fue renombrada a `providers`
- las rutas y la UI ya exponen el concepto `providers`

### 4. Media desacoplada del schema editorial

Las imágenes no se guardan en Postgres como blobs.

Modelo actual:

- binarios en `Supabase Storage`
- metadata en `media_assets`
- relaciones por `cover_image_asset_id`, `color_card_asset_id`, `image_asset_id`

## Módulos

### Colecciones

Gestiona el catálogo público de hilados y cartas de color.

Campos relevantes:

- `name`
- `slug`
- `status`
- `sort_order`
- `short_description`
- `long_description`
- `cover_image_asset_id`
- `color_card_asset_id`
- `seo_title`
- `seo_description`

### Collection items

Variantes o colores dentro de cada colección.

Campos relevantes:

- `name`
- `sku`
- `image_asset_id`
- `color_name`
- `color_hex`
- `sort_order`
- `is_active`

### Providers

Base comercial publicada e interna.

Campos relevantes:

- `name`
- `slug`
- `provider_type`
- `status`
- `contact_name`
- `email`
- `phone`
- `address`
- `city`
- `province`
- `country`
- `instagram`
- `website`
- `latitude`
- `longitude`
- `image_asset_id`
- `source_application_id`
- `internal_notes`

### Wholesale applications

Inbox operativo del formulario comercial público.

Campos relevantes:

- `store_name`
- `cuit`
- `email`
- `province`
- `city`
- `instagram`
- `website`
- `estimated_volume`
- `message`
- `status`
- `assigned_to`
- `review_notes`

### Contact messages

Inbox del formulario de contacto.

Campos relevantes:

- `full_name`
- `email`
- `subject`
- `message`
- `status`
- `review_notes`

### Media assets

Librería de medios reutilizable desde el admin.

Campos relevantes:

- `bucket`
- `object_path`
- `file_name`
- `mime_type`
- `size_bytes`
- `kind`
- `title`
- `alt_text`
- `is_public`

## Rutas del admin

```txt
/admin
/admin/wholesale-applications
/admin/providers
/admin/contact-messages
/admin/media
/admin/collections
```

Compatibilidad:

- `/admin/wholesalers` redirige a `/admin/providers`

## Flujos principales

### 1. Solicitud comercial

1. El formulario público envía a `/api/wholesale-applications`
2. Se valida con `zod`
3. Se crea una fila en `wholesale_applications`
4. El equipo comercial la procesa desde `/admin/wholesale-applications`
5. Puede convertirse en un proveedor

### 2. Conversión a proveedor

1. `sales` o `superadmin` abre una solicitud
2. actualiza estado y notas
3. ejecuta la conversión
4. se crea un registro en `providers` con `provider_type = wholesaler`
5. la solicitud queda vinculada por `source_application_id`

### 3. Gestión de colecciones

1. `editor` o `superadmin` crea o edita una colección
2. selecciona assets desde `/admin/media`
3. administra sus ítems
4. publica la colección
5. la home pública la consume desde DB

### 4. Gestión de media

1. un admin sube archivos al bucket correcto
2. se crea metadata en `media_assets`
3. el asset queda disponible para colecciones y proveedores
4. el sitio resuelve URLs públicas desde Storage

## Seguridad

### Protección del admin

- Clerk protege sesión
- el layout del admin exige `requireAdmin()`
- `requireAdmin()` valida existencia y estado en `admin_users`

### Base de datos

- `Drizzle` es la fuente de verdad del schema
- `DATABASE_URL` es la única variable de conexión para app y migraciones
- los cambios de schema deben reflejarse en `db/schema/index.ts` y `drizzle/`

### Media

- el cliente público no usa la service role key
- las cargas a Storage pasan por acciones server-side del admin

## Estado actual del proyecto

- proveedores públicos ya salen de DB
- colecciones públicas ya salen de DB con fallback legacy
- el CSV de Google Sheets ya no es dependencia operativa
- las imágenes de proveedores y colecciones ya migraron a Storage
- el markup público sigue siendo parcialmente legacy y debe tocarse con cuidado

## Próximos pasos razonables

- terminar de migrar más secciones públicas a componentes React nativos
- mejorar selección de media con picker dedicado por entidad
- sumar auditoría más completa sobre cambios del admin
