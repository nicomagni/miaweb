import { auth } from "@clerk/nextjs/server";
import { and, asc, eq, ilike, inArray, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { adminUsers, mediaAssets } from "@/db/schema";
import { getDb } from "@/lib/db/client";

const allowedMediaKinds = new Set([
  "general",
  "collection-cover",
  "collection-color-card",
  "collection-item",
  "provider-image",
]);

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const adminUser = await db.query.adminUsers.findFirst({
    where: and(eq(adminUsers.clerkUserId, userId), eq(adminUsers.isActive, true)),
  });

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const kinds = url.searchParams
    .getAll("kind")
    .map((kind) => kind.trim())
    .filter((kind) => allowedMediaKinds.has(kind));

  if (q.length < 2) {
    return NextResponse.json({ assets: [] });
  }

  const filters = [or(ilike(mediaAssets.title, `%${q}%`), ilike(mediaAssets.fileName, `%${q}%`))];

  if (kinds.length) {
    filters.push(inArray(mediaAssets.kind, kinds as Array<typeof mediaAssets.$inferSelect.kind>));
  }

  const assets = await db
    .select({
      id: mediaAssets.id,
      title: mediaAssets.title,
      fileName: mediaAssets.fileName,
      kind: mediaAssets.kind,
      bucket: mediaAssets.bucket,
      objectPath: mediaAssets.objectPath,
    })
    .from(mediaAssets)
    .where(and(...filters))
    .orderBy(asc(mediaAssets.title), asc(mediaAssets.fileName))
    .limit(30);

  return NextResponse.json({ assets });
}
