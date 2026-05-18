# Drizzle Workflow

## Objetivo

Usar `Drizzle` como fuente de verdad del schema y como sistema para generar y aplicar migraciones SQL.
El runtime usa `postgres-js`, alineado con la recomendación de Supabase para Drizzle cuando se conecta vía pooler.

## Scripts

```bash
npm run db:generate
npm run db:migrate:deploy
npm run db:check
npm run db:studio
npm run db:pull
```

## Variables de entorno

### Única variable de base de datos

- `DATABASE_URL`

Regla:

- la app usa `DATABASE_URL`
- Drizzle usa `DATABASE_URL`
- el `.env` se mantiene intencionalmente mínimo

Formato recomendado:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-1-us-west-2.pooler.supabase.com:6543/postgres"
```

Nota:

- el runtime de `postgres-js` usa `prepare: false`
- eso evita problemas con el modo `transaction` del pooler de Supabase

## Flujo local

### 1. Editar schema

Modificar `db/schema/index.ts`.

### 2. Generar migración

```bash
npm run db:generate
```

### 3. Aplicar migración al entorno activo

```bash
npm run db:migrate:deploy
```

### 4. Levantar app

```bash
npm run dev
```

## Flujo para staging o production

Aplicás la misma migración al entorno que indiquen las variables disponibles al momento de correr el comando.

Ejemplo:

```bash
DATABASE_URL="postgresql://..." npm run db:migrate:deploy
```

## Vercel

Recomendación:

- Vercel deploya la app
- las migraciones se aplican fuera de Vercel, de forma manual o por CI

No recomendaría depender del build de Vercel para correr migraciones de esquema.

## Convención recomendada

### En desarrollo

```bash
npm run db:generate
npm run db:migrate:deploy
npm run dev
```

### Antes de mergear

- commitear `db/schema/*`
- commitear `drizzle/*`

### En otros entornos

```bash
npm run build
DATABASE_URL="postgresql://..." npm run db:migrate:deploy
```

## Supabase

Seguimos usando Supabase como Postgres gestionado, storage y APIs.

La diferencia es que la fuente de verdad del schema pasa a ser Drizzle.

Para cosas como:

- RLS
- policies
- triggers
- functions

vamos a mantener migraciones SQL editables dentro del flujo generado por Drizzle.
