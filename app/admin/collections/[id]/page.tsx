import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { collectionItems, collections, mediaAssets } from "@/db/schema";
import { MediaPicker } from "@/components/admin/media-picker";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { getStoragePublicUrl } from "@/lib/media/url";
import {
  createCollectionItemAction,
  deleteCollectionItemAction,
  updateCollectionAction,
} from "../actions";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "editor"] });
  const { id } = await params;
  const db = getDb();
  const collection = await db.query.collections.findFirst({
    where: eq(collections.id, id),
  });

  if (!collection) {
    return (
      <section className="admin-card">
        <h1>Colección no encontrada</h1>
      </section>
    );
  }

  const items = await db
    .select()
    .from(collectionItems)
    .where(eq(collectionItems.collectionId, collection.id))
    .orderBy(asc(collectionItems.sortOrder), asc(collectionItems.name));
  const assetOptions = await db
    .select({
      id: mediaAssets.id,
      title: mediaAssets.title,
      fileName: mediaAssets.fileName,
      kind: mediaAssets.kind,
      bucket: mediaAssets.bucket,
      objectPath: mediaAssets.objectPath,
    })
    .from(mediaAssets)
    .orderBy(asc(mediaAssets.kind), asc(mediaAssets.fileName));
  const assetMap = new Map(assetOptions.map((asset) => [asset.id, asset]));
  const coverAsset = assetMap.get(collection.coverImageAssetId ?? "");
  const colorCardAsset = assetMap.get(collection.colorCardAssetId ?? "");
  const coverPreviewUrl = coverAsset
    ? getStoragePublicUrl({ bucket: coverAsset.bucket, objectPath: coverAsset.objectPath })
    : "";
  const colorCardPreviewUrl = colorCardAsset
    ? getStoragePublicUrl({ bucket: colorCardAsset.bucket, objectPath: colorCardAsset.objectPath })
    : "";

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Colección</p>
        <h1>{collection.name}</h1>
        {(coverPreviewUrl || colorCardPreviewUrl) && (
          <div className="admin-asset-preview-grid">
            {coverPreviewUrl ? (
              <div className="admin-asset-preview">
                <img
                  src={coverPreviewUrl}
                  alt={`${collection.name} portada`}
                  className="admin-asset-preview__image"
                />
                <div className="admin-asset-preview__meta">
                  <strong>Portada actual</strong>
                  <span>{coverAsset?.title || coverAsset?.fileName}</span>
                </div>
              </div>
            ) : null}
            {colorCardPreviewUrl ? (
              <div className="admin-asset-preview">
                <img
                  src={colorCardPreviewUrl}
                  alt={`${collection.name} carta de colores`}
                  className="admin-asset-preview__image"
                />
                <div className="admin-asset-preview__meta">
                  <strong>Carta actual</strong>
                  <span>{colorCardAsset?.title || colorCardAsset?.fileName}</span>
                </div>
              </div>
            ) : null}
          </div>
        )}
        <form action={updateCollectionAction} className="admin-form admin-form--two-col">
          <input type="hidden" name="id" value={collection.id} />
          <label className="admin-field">
            <span>Nombre</span>
            <input name="name" defaultValue={collection.name} />
          </label>
          <label className="admin-field">
            <span>Estado</span>
            <select name="status" defaultValue={collection.status}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Badge corto</span>
            <input name="shortDescription" defaultValue={collection.shortDescription ?? ""} />
          </label>
          <label className="admin-field">
            <span>Orden</span>
            <input name="sortOrder" type="number" defaultValue={collection.sortOrder} />
          </label>
          <label className="admin-field admin-field--full">
            <span>Descripción</span>
            <textarea name="longDescription" rows={4} defaultValue={collection.longDescription ?? ""} />
          </label>
          <label className="admin-field">
            <span>Asset portada</span>
            <MediaPicker
              name="coverImageAssetId"
              assets={assetOptions}
              defaultValue={collection.coverImageAssetId}
              allowedKinds={["general", "collection-cover"]}
            />
            <Link href="/admin/media" className="admin-link-inline">
              Abrir media library
            </Link>
          </label>
          <label className="admin-field">
            <span>Asset carta de colores</span>
            <MediaPicker
              name="colorCardAssetId"
              assets={assetOptions}
              defaultValue={collection.colorCardAssetId}
              allowedKinds={["general", "collection-color-card"]}
            />
            <Link href="/admin/media" className="admin-link-inline">
              Abrir media library
            </Link>
          </label>
          <label className="admin-field">
            <span>Fallback portada legacy</span>
            <input name="coverImagePath" defaultValue={collection.coverImagePath ?? ""} />
          </label>
          <label className="admin-field">
            <span>Fallback carta legacy</span>
            <input name="colorCardPath" defaultValue={collection.colorCardPath ?? ""} />
          </label>
          <label className="admin-field">
            <span>SEO title</span>
            <input name="seoTitle" defaultValue={collection.seoTitle ?? ""} />
          </label>
          <label className="admin-field">
            <span>SEO description</span>
            <input name="seoDescription" defaultValue={collection.seoDescription ?? ""} />
          </label>
          <div className="admin-actions">
            <button className="admin-submit-button" type="submit">
              Guardar colección
            </button>
            <Link href="/admin/collections" className="admin-link-button">
              Volver al listado
            </Link>
          </div>
        </form>
      </section>
      <section className="admin-card">
        <p className="admin-eyebrow">Nuevo ítem/color</p>
        <form action={createCollectionItemAction} className="admin-form admin-form--two-col">
          <input type="hidden" name="collectionId" value={collection.id} />
          <label className="admin-field">
            <span>Nombre</span>
            <input name="name" />
          </label>
          <label className="admin-field">
            <span>Color visible</span>
            <input name="colorName" />
          </label>
          <label className="admin-field">
            <span>SKU</span>
            <input name="sku" />
          </label>
          <label className="admin-field">
            <span>HEX</span>
            <input name="colorHex" placeholder="#d4d4d4" />
          </label>
          <label className="admin-field admin-field--full">
            <span>Asset imagen</span>
            <MediaPicker
              name="imageAssetId"
              assets={assetOptions}
              allowedKinds={["general", "collection-item"]}
            />
            <Link href="/admin/media" className="admin-link-inline">
              Abrir media library
            </Link>
          </label>
          <label className="admin-field admin-field--full">
            <span>Fallback imagen legacy</span>
            <input name="imagePath" placeholder="/images/hilados/..." />
          </label>
          <label className="admin-field">
            <span>Orden</span>
            <input name="sortOrder" type="number" defaultValue={0} />
          </label>
          <label className="admin-field admin-field--checkbox">
            <input name="isActive" type="checkbox" defaultChecked />
            <span>Activo</span>
          </label>
          <button className="admin-submit-button" type="submit">
            Agregar ítem
          </button>
        </form>
      </section>
      <section className="admin-card">
        <p className="admin-eyebrow">Ítems actuales</p>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Orden</th>
                <th>Activo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.colorName || item.colorHex || "-"}</td>
                  <td>{item.sortOrder}</td>
                  <td>{item.isActive ? "sí" : "no"}</td>
                  <td>
                    <form action={deleteCollectionItemAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="collectionId" value={collection.id} />
                      <button className="admin-link-inline admin-link-inline--danger" type="submit">
                        Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
