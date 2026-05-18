import { asc, eq, inArray } from "drizzle-orm";
import { mediaAssets, providers } from "@/db/schema";
import { getDb } from "@/lib/db/client";
import { resolvePublicMediaUrl } from "@/lib/media/url";

const DEFAULT_PROVIDER_IMAGE = "/images/iso-rojo.webp";

export type PublicProvider = {
  id: string;
  nombre: string;
  ciudad: string;
  provincia: string;
  dir: string;
  mayorista: boolean;
  lat: number;
  lng: number;
  telefono: string;
  web: string;
  image: string;
};

export async function getPublicProviders(): Promise<PublicProvider[]> {
  const db = getDb();
  const providerRows = await db
    .select()
    .from(providers)
    .where(eq(providers.status, "approved"))
    .orderBy(asc(providers.province), asc(providers.city), asc(providers.name));

  const assetIds = providerRows
    .map((provider) => provider.imageAssetId)
    .filter((value): value is string => Boolean(value));
  const assets = assetIds.length
    ? await db
        .select({
          id: mediaAssets.id,
          bucket: mediaAssets.bucket,
          objectPath: mediaAssets.objectPath,
        })
        .from(mediaAssets)
        .where(inArray(mediaAssets.id, assetIds))
    : [];
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  return providerRows
    .filter((provider) => provider.latitude && provider.longitude)
    .map((provider) => ({
      id: provider.id,
      nombre: provider.name,
      ciudad: provider.city ?? "",
      provincia: provider.province ?? "",
      dir: provider.address ?? "",
      mayorista: provider.providerType === "wholesaler",
      lat: Number(provider.latitude),
      lng: Number(provider.longitude),
      telefono: provider.phone ?? "",
      web: provider.website ?? "",
      image:
        resolvePublicMediaUrl(assetMap.get(provider.imageAssetId ?? "") ?? {}, null) ||
        DEFAULT_PROVIDER_IMAGE,
    }))
    .filter((provider) => Number.isFinite(provider.lat) && Number.isFinite(provider.lng));
}
