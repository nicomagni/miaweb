import { asc, desc } from "drizzle-orm";
import { mediaAssets } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { getStoragePublicUrl } from "@/lib/media/url";
import { uploadMediaAssetAction } from "./actions";

export default async function MediaPage() {
  await requireAdmin({ roles: ["superadmin", "editor", "sales"] });
  const assets = await getDb()
    .select()
    .from(mediaAssets)
    .orderBy(desc(mediaAssets.createdAt), asc(mediaAssets.fileName));

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Media Library</p>
        <h1>Assets</h1>
        <form action={uploadMediaAssetAction} className="admin-form admin-form--two-col">
          <label className="admin-field admin-field--full">
            <span>Archivo</span>
            <input name="file" type="file" accept="image/*" required />
          </label>
          <label className="admin-field">
            <span>Bucket</span>
            <select name="bucket" defaultValue="site-public">
              <option value="site-public">site-public</option>
              <option value="site-private">site-private</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Tipo</span>
            <select name="kind" defaultValue="general">
              <option value="general">general</option>
              <option value="collection-cover">collection-cover</option>
              <option value="collection-color-card">collection-color-card</option>
              <option value="collection-item">collection-item</option>
              <option value="provider-image">provider-image</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Título interno</span>
            <input name="title" />
          </label>
          <label className="admin-field">
            <span>Alt text</span>
            <input name="altText" />
          </label>
          <button className="admin-submit-button" type="submit">
            Subir asset
          </button>
        </form>
      </section>

      <section className="admin-card">
        <p className="admin-eyebrow">Biblioteca</p>
        <div className="admin-media-grid">
          {assets.map((asset) => {
            const publicUrl = asset.isPublic
              ? getStoragePublicUrl({ bucket: asset.bucket, objectPath: asset.objectPath })
              : "";

            return (
              <article key={asset.id} className="admin-media-card">
                {publicUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={publicUrl}
                    alt={asset.altText || asset.title || asset.fileName}
                    className="admin-media-card__preview"
                  />
                ) : (
                  <div className="admin-media-card__placeholder">Privado</div>
                )}
                <div className="admin-media-card__body">
                  <strong>{asset.title || asset.fileName}</strong>
                  <span>{asset.kind}</span>
                  <code>{asset.id}</code>
                  <p>{asset.bucket + "/" + asset.objectPath}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
