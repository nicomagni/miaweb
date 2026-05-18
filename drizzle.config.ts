import fs from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

for (const file of [".env.local", ".env"]) {
  const fullPath = path.join(process.cwd(), file);

  if (fs.existsSync(fullPath)) {
    loadEnv({ path: fullPath, override: false });
  }
}

const databaseUrl = process.env.DATABASE_URL;
const fallbackDatabaseUrl = "postgres://postgres:postgres@127.0.0.1:5432/postgres";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // `generate` does not need a real connection, but `migrate/pull/studio` do.
    // We keep a deterministic fallback here so schema generation works before
    // each developer has configured a database URL.
    url: databaseUrl ?? fallbackDatabaseUrl,
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  strict: true,
  verbose: true,
});
