import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const globalForDb = globalThis as typeof globalThis & {
  miaClient?: postgres.Sql;
  miaDb?: ReturnType<typeof drizzle<typeof schema>>;
};

function createClient() {
  const connectionString =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    throw new Error(
      "Missing database URL. Add DATABASE_URL or POSTGRES_URL to the environment before using the database runtime.",
    );
  }

  return postgres(connectionString, {
    max: 1,
    prepare: false,
  });
}

export function getClient() {
  if (!globalForDb.miaClient) {
    globalForDb.miaClient = createClient();
  }

  return globalForDb.miaClient;
}

export function getDb() {
  if (!globalForDb.miaDb) {
    globalForDb.miaDb = drizzle(getClient(), { schema });
  }

  return globalForDb.miaDb;
}
