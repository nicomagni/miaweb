#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });

const databaseUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!databaseUrl || !supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.",
  );
}

const sql = postgres(databaseUrl, { prepare: false });

async function uploadDefaultAsset(objectPath, buffer) {
  const objectUrl = `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/object/site-public/${objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;

  const response = await fetch(objectUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      "x-upsert": "false",
      "content-type": "image/webp",
    },
    body: buffer,
  });

  if (response.ok) return;
  const payload = await response.text();
  if (response.status === 400 && /already exists/i.test(payload)) return;
  throw new Error(`Could not upload provider default image: ${response.status} ${payload}`);
}

async function ensureDefaultProviderAsset() {
  const bucket = "site-public";
  const objectPath = "defaults/provider-default.webp";
  const existing = await sql`
    select id
    from media_assets
    where bucket = ${bucket}
      and object_path = ${objectPath}
    limit 1
  `;

  if (existing.length) return existing[0].id;

  const filePath = path.join(rootDir, "public/images/iso-rojo.webp");
  const buffer = await fs.readFile(filePath);
  await uploadDefaultAsset(objectPath, buffer);

  const [created] = await sql`
    insert into media_assets (
      bucket,
      object_path,
      file_name,
      mime_type,
      size_bytes,
      kind,
      title,
      alt_text,
      is_public
    )
    values (
      ${bucket},
      ${objectPath},
      ${"iso-rojo.webp"},
      ${"image/webp"},
      ${buffer.length},
      ${"provider-image"},
      ${"Proveedor default"},
      ${"Proveedor default"},
      true
    )
    returning id
  `;

  return created.id;
}

async function main() {
  const assetId = await ensureDefaultProviderAsset();
  const updated = await sql`
    update providers
    set
      image_asset_id = ${assetId},
      updated_at = now()
    where image_asset_id is null
    returning id
  `;

  console.log(
    JSON.stringify(
      {
        defaultAssetId: assetId,
        providersUpdated: updated.length,
      },
      null,
      2,
    ),
  );
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sql.end();
  });
