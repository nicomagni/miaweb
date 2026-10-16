import fs from "node:fs";
import { config as loadEnv } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

for (const file of [".env.local", ".env"]) {
  if (fs.existsSync(file)) loadEnv({ path: file, override: false, quiet: true });
}

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL;

let client;
let phase = "configuration";
try {
  if (!databaseUrl) throw new Error("Missing DATABASE_URL for this deployment environment.");
  client = postgres(databaseUrl, { max: 1, prepare: false, connect_timeout: 10 });
  phase = "connection";
  await client`select 1`;
  console.log("Database connection OK. Applying Drizzle migrations...");
  phase = "migration";
  await migrate(drizzle(client), {
    migrationsFolder: "./drizzle",
    migrationsSchema: "public",
    migrationsTable: "__drizzle_migrations",
  });
  console.log("Drizzle migrations completed.");
} catch (error) {
  // Report the database cause, without Drizzle's query text/parameters or credentials.
  let cause = error;
  const seen = new Set();
  while (cause?.cause && !seen.has(cause.cause)) {
    seen.add(cause);
    cause = cause.cause;
  }
  let message = String(cause?.message ?? "Unknown database error");
  if (databaseUrl) {
    message = message.replaceAll(databaseUrl, "[redacted database URL]");
    try {
      const password = new URL(databaseUrl).password;
      for (const secret of [password, decodeURIComponent(password)]) {
        if (secret) message = message.replaceAll(secret, "[redacted]");
      }
    } catch {
      // Invalid connection strings must not be printed by diagnostic logging.
      message = "Invalid database configuration.";
    }
  }
  message = message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted database URL]");
  console.error("Drizzle deployment failed:", {
    phase,
    code: cause?.code ?? "unknown",
    message,
  });
  process.exitCode = 1;
} finally {
  if (client) await client.end({ timeout: 5 });
}
