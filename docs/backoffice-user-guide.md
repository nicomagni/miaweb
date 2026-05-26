# Instructivo de uso del backoffice

Este documento explica como usar el panel interno de Mía Hilados desde el punto de vista de un usuario no técnico. El backoffice sirve para gestionar contenido, consultas y datos comerciales del sitio sin editar código.

## Acceso

El panel se encuentra en:

```txt
/admin
```

Para ingresar hace falta:

- tener una cuenta creada en Clerk, el sistema de acceso;
- estar habilitado en la tabla interna de usuarios administradores;
- tener un rol activo.

Si una persona inicia sesión pero no está habilitada como administradora, verá una pantalla de acceso denegado. En ese caso debe pedirle a un usuario con rol `superadmin` que la agregue desde el módulo de usuarios.

## Roles

El backoffice usa tres roles:

| Rol          | Para qué se usa                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `superadmin` | Administración completa. Puede gestionar usuarios, solicitudes, proveedores, colecciones, contacto y media. |
| `sales`      | Gestión comercial. Puede trabajar con solicitudes comerciales, proveedores, mensajes de contacto y media.   |
| `editor`     | Gestión de contenido. Puede trabajar con colecciones y media.                                               |

El menú puede mostrar más secciones que las permitidas para cada rol. Si se intenta abrir una sección sin permiso, el sistema bloquea el acceso.

## Resumen del panel

La pantalla principal muestra un resumen rápido:

- usuario actual y rol activo;
- cantidad de solicitudes comerciales;
- cantidad de proveedores;
- cantidad de colecciones;
- cantidad de consultas de contacto;
- conteos de elementos nuevos, aprobados o publicados.

Esta pantalla es solo informativa. No permite editar datos directamente.

## Solicitudes comerciales

Ruta:

```txt
/admin/wholesale-applications
```

Disponible para:

- `superadmin`
- `sales`

Este módulo muestra las solicitudes enviadas desde el formulario comercial público. Se usa como inbox de posibles mayoristas.

### Que se puede hacer

- Ver todas las solicitudes recibidas.
- Filtrar por estado.
- Buscar por comercio, email, ciudad o provincia.
- Abrir el detalle de una solicitud.
- Cambiar el estado de seguimiento.
- Agregar notas internas.
- Convertir una solicitud en proveedor.

### Estados disponibles

| Estado      | Uso recomendado                       |
| ----------- | ------------------------------------- |
| `new`       | Solicitud nueva, todavía no revisada. |
| `reviewing` | Solicitud en evaluación interna.      |
| `contacted` | Ya se contactó al comercio.           |
| `approved`  | Solicitud aprobada.                   |
| `rejected`  | Solicitud rechazada.                  |
| `spam`      | Mensaje irrelevante o no válido.      |

### Como revisar una solicitud

1. Entrar a `Solicitudes`.
2. Usar las pestañas de estado o el buscador para ubicar la solicitud.
3. Abrir `Ver detalle`.
4. Revisar datos del comercio: nombre, email, CUIT, provincia, ciudad, Instagram, sitio web, volumen estimado y mensaje.
5. Cambiar el estado si corresponde.
6. Escribir notas internas si hace falta.
7. Guardar cambios.

### Como convertir una solicitud en proveedor

1. Abrir la solicitud.
2. Confirmar que la solicitud corresponde a un comercio válido.
3. Usar `Convertir a proveedor`.
4. El sistema crea un proveedor de tipo `wholesaler` con estado `approved`.
5. La solicitud queda marcada como `approved`.
6. Luego se abre la ficha del proveedor para completar o corregir datos.

### Que no se puede hacer

- No se puede responder emails desde el backoffice.
- No se pueden enviar mensajes automáticos al comercio.
- No se puede borrar una solicitud desde la interfaz actual.
- No se puede asignar una solicitud a una persona desde la pantalla actual, aunque el modelo de datos lo contempla.
- No hay validación comercial automática: la decisión de aprobar o rechazar la toma el equipo.

## Proveedores

Ruta:

```txt
/admin/providers
```

Disponible para:

- `superadmin`
- `sales`

Este módulo administra la base comercial de proveedores. En este proyecto, `proveedor` es el concepto general. Un proveedor puede ser mayorista o distribuidor.

### Que se puede hacer

- Ver el listado de proveedores.
- Buscar por nombre, email, ciudad o provincia.
- Filtrar por tipo.
- Filtrar por estado.
- Crear un proveedor manualmente.
- Editar los datos de un proveedor existente.
- Asociar una imagen desde la biblioteca de media.
- Guardar notas internas.
- Publicar o despublicar indirectamente usando el estado.

### Tipos disponibles

| Tipo          | Significado                                                       |
| ------------- | ----------------------------------------------------------------- |
| `wholesaler`  | Mayorista. Normalmente viene de una solicitud comercial aprobada. |
| `distributor` | Distribuidor o punto comercial cargado manualmente.               |

### Estados disponibles

| Estado     | Efecto operativo                                                            |
| ---------- | --------------------------------------------------------------------------- |
| `lead`     | Contacto potencial. No se considera aprobado.                               |
| `approved` | Proveedor aprobado. Es el estado que consume el sitio público.              |
| `inactive` | Proveedor desactivado. Sirve para ocultarlo sin rechazarlo definitivamente. |
| `rejected` | Proveedor rechazado.                                                        |

Solo los proveedores con estado `approved` se usan como proveedores públicos.

### Campos principales

- `Nombre`: nombre visible o interno del proveedor.
- `Tipo`: mayorista o distribuidor.
- `Contacto`: persona o nombre de referencia.
- `Asset imagen`: imagen elegida desde la media library.
- `Email`, `Teléfono`, `Dirección`: datos de contacto.
- `Ciudad`, `Provincia`, `País`: ubicación.
- `Estado`: define si queda publicado o no.
- `Instagram`, `Website`: enlaces comerciales.
- `Latitud`, `Longitud`: coordenadas para ubicación.
- `Notas internas`: información privada para el equipo.

### Buenas prácticas

- Completar provincia y ciudad con nombres consistentes.
- Usar `approved` solo cuando el proveedor ya fue validado.
- Usar `inactive` para ocultar temporalmente un proveedor sin perder sus datos.
- Revisar email y website antes de guardar: el sistema valida que tengan formato correcto cuando se completan.
- Si se carga un sitio web, incluir la URL completa, por ejemplo `https://...`.

### Que no se puede hacer

- No se puede borrar un proveedor desde la interfaz actual.
- No se puede editar el identificador interno ni el historial técnico.
- No hay carga masiva de proveedores desde Excel o CSV desde el admin.
- No se puede enviar comunicación al proveedor desde esta pantalla.
- No se puede crear una imagen nueva desde la ficha del proveedor; primero hay que subirla en `Media`.

## Colecciones

Ruta:

```txt
/admin/collections
```

Disponible para:

- `superadmin`
- `editor`

Este módulo gestiona las colecciones de hilados que se muestran en el sitio público.

### Que se puede hacer

- Ver el listado de colecciones.
- Buscar por nombre.
- Filtrar por estado.
- Crear una colección.
- Editar una colección existente.
- Cambiar el orden de aparición.
- Asociar imagen de portada.
- Asociar carta de colores.
- Cargar SEO title y SEO description.
- Crear ítems o colores dentro de la colección.
- Eliminar ítems o colores.
- Publicar, archivar o dejar una colección en borrador.

### Estados disponibles

| Estado      | Uso recomendado                                                       |
| ----------- | --------------------------------------------------------------------- |
| `draft`     | Borrador. Sirve para preparar la colección antes de publicarla.       |
| `published` | Publicada. Queda disponible para el sitio público.                    |
| `archived`  | Archivada. Sirve para retirar la colección sin borrar su información. |

Solo las colecciones con estado `published` se muestran como contenido publicado.

### Campos de una colección

- `Nombre`: nombre de la colección.
- `Estado`: draft, published o archived.
- `Badge corto`: texto breve destacado.
- `Orden`: número que define la posición de la colección.
- `Descripción`: texto descriptivo más largo.
- `Asset portada`: imagen principal subida en `Media`.
- `Asset carta de colores`: imagen de carta de colores subida en `Media`.
- `Fallback portada legacy`: ruta antigua de imagen, usada como respaldo.
- `Fallback carta legacy`: ruta antigua de carta de colores, usada como respaldo.
- `SEO title`: título para buscadores.
- `SEO description`: descripción para buscadores.

### Ítems o colores de una colección

Dentro de una colección se pueden cargar ítems, colores o variantes.

Campos disponibles:

- `Nombre`
- `Color visible`
- `SKU`
- `HEX`
- `Asset imagen`
- `Fallback imagen legacy`
- `Orden`
- `Activo`

El campo `Activo` permite mantener un ítem cargado pero marcar si debe considerarse activo.

### Buenas prácticas

- Crear primero la colección en `draft`.
- Subir las imágenes necesarias en `Media`.
- Asociar portada y carta desde la ficha de la colección.
- Cargar los ítems o colores.
- Revisar orden, textos e imágenes.
- Cambiar el estado a `published` cuando esté lista.
- Usar `archived` para retirar una colección sin eliminarla.

### Que no se puede hacer

- No se puede borrar una colección desde la interfaz actual.
- No se pueden editar ítems existentes desde la interfaz actual: se pueden crear o eliminar.
- No hay previsualización pública completa dentro del backoffice.
- No se pueden recortar, optimizar o editar imágenes dentro del admin.
- No se deben modificar rutas legacy salvo que se sepa exactamente qué imagen pública se está referenciando.

## Media

Ruta:

```txt
/admin/media
```

Disponible para:

- `superadmin`
- `sales`
- `editor`

Este módulo es la biblioteca de imágenes del sitio. Las imágenes se suben a Supabase Storage y luego pueden reutilizarse en proveedores y colecciones.

### Que se puede hacer

- Subir imágenes.
- Elegir el bucket de destino.
- Clasificar el archivo por tipo.
- Agregar título interno.
- Agregar texto alternativo.
- Ver los assets cargados.
- Copiar o consultar el identificador interno del asset.
- Usar assets cargados desde los selectores de colecciones y proveedores.

### Buckets disponibles

| Bucket         | Uso                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------- |
| `site-public`  | Imágenes públicas que puede ver el sitio. Es la opción normal para proveedores y colecciones. |
| `site-private` | Archivos privados. No muestran previsualización pública en la biblioteca.                     |

### Tipos de asset

| Tipo                    | Uso recomendado                                 |
| ----------------------- | ----------------------------------------------- |
| `general`               | Imagen reutilizable o sin categoría específica. |
| `collection-cover`      | Portada de colección.                           |
| `collection-color-card` | Carta de colores de colección.                  |
| `collection-item`       | Imagen de un ítem, color o variante.            |
| `provider-image`        | Imagen de proveedor.                            |

### Buenas prácticas

- Usar `site-public` para imágenes que deban verse en la web.
- Completar `Alt text` con una descripción clara de la imagen.
- Elegir el tipo correcto para que luego sea más fácil encontrarla.
- Usar nombres de archivo simples antes de subirlos. El sistema sanitiza el nombre, pero conviene evitar nombres confusos.

### Que no se puede hacer

- No se pueden borrar assets desde la interfaz actual.
- No se pueden reemplazar archivos existentes: cada subida crea un archivo nuevo.
- No se pueden editar título o alt text de un asset ya subido desde la pantalla actual.
- No se pueden subir archivos que no sean imágenes desde el formulario actual.
- No se pueden recortar, redimensionar o comprimir imágenes desde el admin.

## Contacto

Ruta:

```txt
/admin/contact-messages
```

Disponible para:

- `superadmin`
- `sales`

Este módulo muestra mensajes enviados desde el formulario de contacto del sitio.

### Que se puede hacer

- Ver mensajes recibidos.
- Buscar por nombre, email o asunto.
- Filtrar por estado.
- Leer el mensaje.
- Cambiar el estado.
- Guardar notas internas.

### Estados disponibles

| Estado     | Uso recomendado                       |
| ---------- | ------------------------------------- |
| `new`      | Mensaje nuevo, pendiente de revisión. |
| `reviewed` | Mensaje revisado.                     |
| `resolved` | Consulta resuelta.                    |
| `spam`     | Mensaje no válido o irrelevante.      |

### Que no se puede hacer

- No se puede responder el mensaje desde el backoffice.
- No se puede reenviar el mensaje desde el admin.
- No se puede borrar un mensaje desde la interfaz actual.
- No hay asignación de responsable por mensaje.

## Usuarios

Ruta:

```txt
/admin/users
```

Disponible para:

- `superadmin`

Este módulo administra quién tiene acceso al backoffice.

### Que se puede hacer

- Ver usuarios registrados en Clerk.
- Ver si ya tienen acceso admin.
- Ver el último ingreso.
- Promover un usuario al backoffice.
- Elegir el rol inicial: `sales`, `editor` o `superadmin`.
- Reactivar un usuario admin inactivo al promoverlo nuevamente.

### Como dar acceso a una persona

1. La persona debe registrarse o iniciar sesión al menos una vez.
2. Un `superadmin` entra a `Usuarios`.
3. Busca a la persona en el listado.
4. Elige el rol.
5. Presiona `Promover`.
6. La persona ya puede ingresar al panel con ese rol.

### Que no se puede hacer

- No se puede crear una cuenta de Clerk desde este módulo.
- No se puede eliminar un usuario.
- No se puede desactivar un usuario desde la pantalla actual.
- No se puede cambiar contraseña desde el backoffice.
- No se pueden configurar permisos personalizados por usuario; los permisos dependen del rol.

## Que impacto tiene cada cambio en la web pública

| Acción                                       | Impacto público                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Publicar una colección                       | La colección puede aparecer en el sitio público.                                                       |
| Archivar una colección                       | La colección deja de considerarse publicada.                                                           |
| Cambiar orden de colección                   | Cambia el orden de aparición.                                                                          |
| Agregar ítems a una colección                | Suma colores o variantes a esa colección.                                                              |
| Eliminar ítems de una colección              | Quita esos colores o variantes de la base.                                                             |
| Aprobar un proveedor                         | El proveedor puede aparecer como proveedor público.                                                    |
| Pasar un proveedor a `inactive` o `rejected` | El proveedor deja de aparecer como aprobado.                                                           |
| Subir media pública                          | El archivo queda disponible para usarse en contenido público, pero no aparece solo hasta ser asociado. |
| Cambiar estados de solicitudes o contacto    | Solo afecta la gestión interna.                                                                        |

## Limitaciones generales del backoffice actual

El backoffice actual permite operar las partes principales del sitio, pero no reemplaza todas las tareas técnicas o administrativas.

No permite:

- editar textos generales de la home legacy;
- modificar páginas legales;
- cambiar metadata global del sitio;
- administrar formularios de Web3Forms;
- cambiar integraciones externas;
- editar código, estilos o comportamiento visual;
- gestionar schema de base de datos;
- correr migraciones;
- hacer cargas masivas;
- exportar reportes;
- ver un historial completo de auditoría desde la interfaz;
- recuperar elementos eliminados, como ítems de colección;
- administrar buckets o permisos de Supabase Storage;
- administrar configuración de Clerk.

Estas tareas requieren intervención técnica o cambios de código.

## Recomendaciones operativas

- No usar `published` o `approved` hasta haber revisado contenido, imágenes y datos.
- Usar notas internas para dejar contexto de decisiones comerciales.
- Preferir desactivar o archivar antes que pedir una eliminación definitiva.
- Subir imágenes con nombres claros y elegir el tipo correcto.
- Revisar el sitio público después de publicar colecciones o aprobar proveedores.
- Ante errores de acceso, confirmar primero el rol del usuario.
- Ante errores de carga de imagen, revisar que el archivo sea una imagen válida y que el bucket elegido sea correcto.

## Flujo recomendado para publicar una colección

1. Subir portada, carta de colores e imágenes de ítems en `Media`.
2. Crear la colección en estado `draft`.
3. Completar descripción, badge, orden y SEO.
4. Asociar portada y carta de colores.
5. Cargar ítems o colores.
6. Revisar que la información esté completa.
7. Cambiar estado a `published`.
8. Verificar la web pública.

## Flujo recomendado para aprobar un mayorista

1. Entrar a `Solicitudes`.
2. Revisar solicitudes `new`.
3. Abrir el detalle de la solicitud.
4. Contactar al comercio fuera del sistema si hace falta.
5. Registrar notas internas.
6. Cambiar el estado según corresponda.
7. Si se aprueba, convertir a proveedor.
8. Completar la ficha del proveedor.
9. Verificar que el proveedor quede en estado `approved`.
