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
function normalizeLegacyPath(value) {
  if (!value) return null;
  return value.replace(/^\/+/, "");
}

function inferKind(relativePath) {
  if (relativePath.startsWith("images/catalogo hilados/")) return "collection-color-card";
  if (relativePath.startsWith("images/hilados/")) return "collection-item";
  return "general";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function detectMimeType(relativePath) {
  if (relativePath.endsWith(".png")) return "image/png";
  if (relativePath.endsWith(".jpg") || relativePath.endsWith(".jpeg")) return "image/jpeg";
  if (relativePath.endsWith(".svg")) return "image/svg+xml";
  if (relativePath.endsWith(".avif")) return "image/avif";
  return "image/webp";
}

function sanitizeStorageSegment(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .replace(/[^a-zA-Z0-9._ -]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function uploadObject({ bucket, objectPath, fileBuffer, contentType, relativePath }) {
  const objectUrl = `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
  let lastError = null;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(objectUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
          "x-upsert": "false",
          "content-type": contentType,
        },
        body: fileBuffer,
        signal: AbortSignal.timeout(30000),
      });

      if (response.ok) return;

      const payload = await response.text();
      if (response.status === 400 && /already exists/i.test(payload)) return;
      lastError = new Error(`Upload failed with ${response.status} for ${relativePath}: ${payload}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < 4) {
      await sleep(1000 * attempt);
    }
  }

  throw lastError ?? new Error(`Unknown upload failure for ${relativePath}`);
}

async function ensureAsset({ relativePath, kind, title }) {
  const bucket = "site-public";
  const objectPath = `legacy/${relativePath
    .replace(/^images\//, "")
    .split("/")
    .map((segment) => sanitizeStorageSegment(segment))
    .join("/")}`;
  const existing = await sql`
    select id
    from media_assets
    where bucket = ${bucket}
      and object_path = ${objectPath}
    limit 1
  `;

  if (existing.length) return existing[0].id;

  const filePath = path.join(rootDir, "public", relativePath.replace(/^images\//, "images/"));
  const fileBuffer = await fs.readFile(filePath);
  await uploadObject({
    bucket,
    objectPath,
    fileBuffer,
    contentType: detectMimeType(relativePath),
    relativePath,
  });

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
      ${path.basename(relativePath)},
      ${detectMimeType(relativePath)},
      ${fileBuffer.length},
      ${kind},
      ${title},
      ${title},
      true
    )
    returning id
  `;

  return created.id;
}

async function main() {
  const collections = await sql`
    select id, name, slug, cover_image_path, color_card_path
    from collections
    order by sort_order, name
  `;

  const items = await sql`
    select id, collection_id, name, image_path
    from collection_items
    order by collection_id, sort_order, name
  `;

  const collectionById = new Map(collections.map((collection) => [collection.id, collection]));
  let uploaded = 0;
  let linkedCollections = 0;
  let linkedItems = 0;
  let processedItems = 0;

  for (const collection of collections) {
    const updates = {};
    const coverRelative = normalizeLegacyPath(collection.cover_image_path);
    const cardRelative = normalizeLegacyPath(collection.color_card_path);

    if (coverRelative) {
      const coverAssetId = await ensureAsset({
        relativePath: coverRelative,
        kind: "collection-cover",
        title: `${collection.name} portada`,
      });
      updates.cover_image_asset_id = coverAssetId;
      uploaded += 1;
    }

    if (cardRelative) {
      const cardAssetId = await ensureAsset({
        relativePath: cardRelative,
        kind: "collection-color-card",
        title: `${collection.name} carta de colores`,
      });
      updates.color_card_asset_id = cardAssetId;
      uploaded += 1;
    }

    if (Object.keys(updates).length) {
      await sql`
        update collections
        set
          cover_image_asset_id = ${updates.cover_image_asset_id ?? null},
          color_card_asset_id = ${updates.color_card_asset_id ?? null},
          updated_at = now()
        where id = ${collection.id}
      `;
      linkedCollections += 1;
    }
  }

  for (const item of items) {
    const relativePath = normalizeLegacyPath(item.image_path);
    if (!relativePath) continue;
    const collection = collectionById.get(item.collection_id);
    const assetId = await ensureAsset({
      relativePath,
      kind: inferKind(relativePath),
      title: collection ? `${collection.name} · ${item.name}` : item.name,
    });
    await sql`
      update collection_items
      set
        image_asset_id = ${assetId},
        updated_at = now()
      where id = ${item.id}
    `;
    uploaded += 1;
    linkedItems += 1;
    processedItems += 1;
    if (processedItems % 25 === 0) {
      console.log(`items linked: ${processedItems}/${items.length}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        collectionsProcessed: collections.length,
        itemsProcessed: items.length,
        collectionRecordsLinked: linkedCollections,
        itemRecordsLinked: linkedItems,
        uploadsOrReuses: uploaded,
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
