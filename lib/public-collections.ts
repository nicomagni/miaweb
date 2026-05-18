import { and, asc, eq, inArray } from "drizzle-orm";
import { collectionItems, collections, mediaAssets } from "@/db/schema";
import { getDb } from "@/lib/db/client";
import { resolvePublicMediaUrl } from "@/lib/media/url";
export type PublicCollection = {
  id: string;
  nombre: string;
  badge: string;
  desc: string;
  carta?: string | null;
  colores: Array<{
    n: string;
    c: string;
    img: string;
  }>;
};

export async function getPublishedCollectionsForPublic(): Promise<PublicCollection[]> {
  const db = getDb();
  const publishedCollections = await db
    .select()
    .from(collections)
    .where(eq(collections.status, "published"))
    .orderBy(asc(collections.sortOrder), asc(collections.name));

  const results: PublicCollection[] = [];
  const assetIds = new Set<string>();

  for (const collection of publishedCollections) {
    if (collection.coverImageAssetId) assetIds.add(collection.coverImageAssetId);
    if (collection.colorCardAssetId) assetIds.add(collection.colorCardAssetId);
  }

  const allItems = [];
  for (const collection of publishedCollections) {
    const items = await db
      .select()
      .from(collectionItems)
      .where(
        and(eq(collectionItems.collectionId, collection.id), eq(collectionItems.isActive, true)),
      )
      .orderBy(asc(collectionItems.sortOrder), asc(collectionItems.name));
    items.forEach((item) => {
      if (item.imageAssetId) assetIds.add(item.imageAssetId);
    });
    allItems.push({ collectionId: collection.id, items });
  }

  const assets = assetIds.size
    ? await db
        .select({
          id: mediaAssets.id,
          bucket: mediaAssets.bucket,
          objectPath: mediaAssets.objectPath,
        })
        .from(mediaAssets)
        .where(inArray(mediaAssets.id, [...assetIds]))
    : [];
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  for (const collection of publishedCollections) {
    const items = allItems.find((entry) => entry.collectionId === collection.id)?.items ?? [];
    if (!items.length) continue;

    results.push({
      id: collection.slug,
      nombre: collection.name,
      badge: collection.shortDescription ?? "",
      desc: collection.longDescription ?? "",
      carta: resolvePublicMediaUrl(
        assetMap.get(collection.colorCardAssetId ?? "") ?? {},
        collection.colorCardPath,
      ),
      colores: items.map((item) => ({
        n: item.colorName || item.name,
        c: item.colorHex || "#d4d4d4",
        img: resolvePublicMediaUrl(assetMap.get(item.imageAssetId ?? "") ?? {}, item.imagePath),
      })),
    });
  }

  return results;
}
