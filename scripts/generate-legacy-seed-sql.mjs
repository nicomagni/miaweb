#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const providersCsvUrl =
  "https://docs.google.com/spreadsheets/d/1GdNRXLbg47r0ILCDar3Va2wg05Lph9qnm3nps3iK0sM/gviz/tq?tqx=out:csv&gid=158831744";

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlNullable(value) {
  if (value === null || value === undefined || value === "") return "null";
  return sqlString(value);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function uniqueSlug(base, seen) {
  let slug = base || "registro";
  let attempt = slug;
  let index = 2;
  while (seen.has(attempt)) {
    attempt = `${slug}-${index}`;
    index += 1;
  }
  seen.add(attempt);
  return attempt;
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      current.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      current.push(cell);
      cell = "";
      if (current.some((value) => value.length > 0)) rows.push(current);
      current = [];
      continue;
    }

    cell += char;
  }

  if (cell.length || current.length) {
    current.push(cell);
    if (current.some((value) => value.length > 0)) rows.push(current);
  }

  if (!rows.length) return [];
  const [headers, ...dataRows] = rows;
  return dataRows.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])),
  );
}

function toPublicPath(value) {
  if (!value) return null;
  return value.startsWith("/") ? value : `/${value}`;
}

async function getLegacyCollections() {
  const source = await fs.readFile(path.join(rootDir, "public/js/main.js"), "utf8");
  const match = source.match(
    /var e="images\/hilados\/",i=(\[[\s\S]*?\]),c="images\/catalogo hilados\/",n=(\{[\s\S]*?\});/,
  );

  if (!match) {
    throw new Error("No se pudo extraer el dataset legacy de colecciones.");
  }

  const collections = Function("e", `"use strict"; return (${match[1]});`)("images/hilados/");
  const cards = Function("c", `"use strict"; return (${match[2]});`)("images/catalogo hilados/");

  return { collections, cards };
}

async function generateProvidersSql() {
  const response = await fetch(providersCsvUrl);
  if (!response.ok) {
    throw new Error(`No se pudo descargar el CSV de proveedores: ${response.status}`);
  }

  const rows = parseCsv(await response.text());
  const slugSet = new Set();
  const values = rows.map((row) => {
    const slug = uniqueSlug(
      slugify([row.nombre, row.ciudad, row.provincia].filter(Boolean).join("-")),
      slugSet,
    );
    const providerType = row.mayorista?.toUpperCase() === "TRUE" ? "wholesaler" : "distributor";

    return `(
  ${sqlString(row.nombre)},
  ${sqlString(slug)},
  ${sqlString(providerType)},
  null,
  ${sqlNullable(row.web)},
  ${sqlNullable(row.telefono)},
  ${sqlNullable(row.dir)},
  ${sqlNullable(row.ciudad)},
  ${sqlNullable(row.provincia)},
  'AR',
  null,
  ${sqlNullable(row.web)},
  ${sqlNullable(row.lat)},
  ${sqlNullable(row.lng)},
  'approved',
  null,
  now()
)`;
  });

  return `-- Seed legacy providers from the public map CSV
insert into wholesalers (
  name,
  slug,
  provider_type,
  contact_name,
  email,
  phone,
  address,
  city,
  province,
  country,
  instagram,
  website,
  latitude,
  longitude,
  status,
  internal_notes,
  approved_at
)
values
${values.join(",\n")}
on conflict (slug) do update
set
  provider_type = excluded.provider_type,
  phone = excluded.phone,
  address = excluded.address,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  website = excluded.website,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  status = excluded.status,
  approved_at = excluded.approved_at;`;
}

async function generateCollectionsSql() {
  const { collections, cards } = await getLegacyCollections();
  const slugList = collections.map((collection) => sqlString(collection.id)).join(", ");
  const collectionValues = collections.map((collection, index) => {
    const coverImagePath = toPublicPath(collection.colores?.[0]?.img ?? null);
    const colorCardPath = toPublicPath(cards[collection.id] ?? null);
    return `(
  ${sqlString(collection.nombre)},
  ${sqlString(collection.id)},
  ${sqlNullable(collection.badge)},
  ${sqlNullable(collection.desc)},
  'published',
  ${index},
  ${sqlNullable(coverImagePath)},
  ${sqlNullable(colorCardPath)},
  now()
)`;
  });

  const itemValues = [];
  collections.forEach((collection) => {
    collection.colores.forEach((color, index) => {
      itemValues.push(`(
  (select id from collections where slug = ${sqlString(collection.id)}),
  ${sqlString(color.n)},
  null,
  ${sqlNullable(toPublicPath(color.img))},
  ${sqlString(color.n)},
  ${sqlNullable(color.c)},
  ${index},
  true
)`);
    });
  });

  return `-- Seed legacy collections and their items from the public catalog
insert into collections (
  name,
  slug,
  short_description,
  long_description,
  status,
  sort_order,
  cover_image_path,
  color_card_path,
  published_at
)
values
${collectionValues.join(",\n")}
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  status = excluded.status,
  sort_order = excluded.sort_order,
  cover_image_path = excluded.cover_image_path,
  color_card_path = excluded.color_card_path,
  published_at = excluded.published_at;

delete from collection_items
where collection_id in (
  select id from collections where slug in (${slugList})
);

insert into collection_items (
  collection_id,
  name,
  sku,
  image_path,
  color_name,
  color_hex,
  sort_order,
  is_active
)
values
${itemValues.join(",\n")};`;
}

async function main() {
  const mode = process.argv[2];
  if (mode === "providers") {
    process.stdout.write(await generateProvidersSql());
    return;
  }

  if (mode === "collections") {
    process.stdout.write(await generateCollectionsSql());
    return;
  }

  throw new Error("Modo inválido. Usá `providers` o `collections`.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
