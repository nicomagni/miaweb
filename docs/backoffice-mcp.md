# MCP del backoffice

## Objetivo

El MCP del backoffice expone herramientas controladas para que un agente externo pueda consultar y actualizar la gestión interna de formularios.

Esta V1 no envía emails, no genera alertas y no modifica proveedores, colecciones, media ni usuarios.

## Endpoint

```txt
/api/mcp
```

En producción, la URL completa va a ser:

```txt
https://<dominio>/api/mcp
```

## Autenticación OAuth

El endpoint publica metadata OAuth para que clientes como Claude o MCP Inspector puedan descubrir el flujo de autorización.

Metadata:

```txt
/.well-known/oauth-protected-resource/api/mcp
/.well-known/oauth-authorization-server
```

Endpoints OAuth:

```txt
/api/mcp/oauth/register
/api/mcp/oauth/authorize
/api/mcp/oauth/token
/api/mcp/oauth/revoke
```

Variables necesarias:

```txt
MIA_MCP_BASE_URL=
MIA_MCP_OAUTH_ADMIN_SECRET=
```

`MIA_MCP_BASE_URL` debe ser la URL pública del sitio, por ejemplo:

```txt
https://www.miahilados.com.ar
```

`MIA_MCP_OAUTH_ADMIN_SECRET` es la clave humana que se ingresa en la pantalla de autorización cuando Claude, OpenAI o MCP Inspector conectan el servidor.

Si no hay un Bearer token OAuth válido, `/api/mcp` responde `401` con `WWW-Authenticate` apuntando a la metadata OAuth.

## Cómo conectar con Claude

1. Configurar en Vercel:
   - `MIA_MCP_BASE_URL`
   - `MIA_MCP_OAUTH_ADMIN_SECRET`
   - `DATABASE_URL`
2. Aplicar migraciones con `npm run db:migrate:deploy`.
3. Deployar.
4. En Claude, ir a `Settings` / `Customize` / `Connectors`.
5. Agregar un custom connector con:

```txt
https://<dominio>/api/mcp
```

6. Claude va a abrir el flujo OAuth.
7. Ingresar la clave `MIA_MCP_OAUTH_ADMIN_SECRET`.
8. Autorizar.

Después de eso, Claude debería poder listar y usar las herramientas del MCP.

## Herramientas disponibles

### Solicitudes comerciales

#### `list_wholesale_applications`

Lista solicitudes del inbox comercial.

Parámetros:

- `status`: `open`, `all`, `new`, `reviewing`, `contacted`, `approved`, `rejected`, `spam`
- `limit`: entre 1 y 50

Por defecto, `status = open`, que incluye:

- `new`
- `reviewing`
- `contacted`

#### `get_wholesale_application`

Devuelve el detalle completo de una solicitud comercial.

Parámetros:

- `id`: ID de la solicitud

#### `update_wholesale_application_status`

Actualiza solo estado y notas internas.

Parámetros:

- `id`: ID de la solicitud
- `status`: `new`, `reviewing`, `contacted`, `approved`, `rejected`, `spam`
- `reviewNotes`: notas internas opcionales

No convierte la solicitud en proveedor y no envía emails.

### Mensajes de contacto

#### `list_contact_messages`

Lista mensajes del formulario de contacto.

Parámetros:

- `status`: `open`, `all`, `new`, `reviewed`, `resolved`, `spam`
- `limit`: entre 1 y 50

Por defecto, `status = open`, que incluye:

- `new`
- `reviewed`

#### `get_contact_message`

Devuelve el detalle completo de un mensaje de contacto.

Parámetros:

- `id`: ID del mensaje

#### `update_contact_message_status`

Actualiza solo estado y notas internas.

Parámetros:

- `id`: ID del mensaje
- `status`: `new`, `reviewed`, `resolved`, `spam`
- `reviewNotes`: notas internas opcionales

No responde emails.

## Auditoría

Las escrituras hechas por MCP se registran en `audit_logs`.

Acciones auditadas:

- `mcp.update_wholesale_application_status`
- `mcp.update_contact_message_status`

El registro incluye:

- origen `mcp`;
- entidad modificada;
- estado anterior;
- estado nuevo;
- si se cambiaron notas internas.

## Límites de V1

El MCP no puede:

- enviar emails;
- crear borradores de email;
- convertir solicitudes en proveedores;
- borrar registros;
- editar datos originales de contacto;
- modificar proveedores;
- modificar colecciones;
- subir o editar media;
- administrar usuarios;
- emitir alertas.

## Evolución prevista

V2 puede sumar respuestas por email con flujo de borrador y confirmación.

V3 puede sumar alertas por canal externo cuando entren nuevas solicitudes o mensajes.
