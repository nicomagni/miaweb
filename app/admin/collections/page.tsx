import Link from "next/link";
import { and, asc, eq, ilike } from "drizzle-orm";
import { MediaPicker } from "@/components/admin/media-picker";
import { collections, mediaAssets } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { createCollectionAction } from "./actions";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "editor"] });
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const status = (params.status ?? "").trim();
  const filters = [];

  if (q) filters.push(ilike(collections.name, `%${q}%`));
  if (status) filters.push(eq(collections.status, status as typeof collections.$inferSelect.status));

  const rows = await getDb()
    .select()
    .from(collections)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(asc(collections.sortOrder), asc(collections.name));
  const assetOptions = await getDb()
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

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Nueva colección</p>
        <form action={createCollectionAction} className="admin-form admin-form--two-col">
          <label className="admin-field">
            <span>Nombre</span>
            <input name="name" />
          </label>
          <label className="admin-field">
            <span>Estado</span>
            <select name="status" defaultValue="draft">
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Badge corto</span>
            <input name="shortDescription" />
          </label>
          <label className="admin-field">
            <span>Orden</span>
            <input name="sortOrder" type="number" defaultValue={0} />
          </label>
          <label className="admin-field admin-field--full">
            <span>Descripción</span>
            <textarea name="longDescription" rows={4} />
          </label>
          <label className="admin-field">
            <span>Asset portada</span>
            <MediaPicker
              name="coverImageAssetId"
              assets={assetOptions}
              allowedKinds={["general", "collection-cover"]}
            />
          </label>
          <label className="admin-field">
            <span>Asset carta de colores</span>
            <MediaPicker
              name="colorCardAssetId"
              assets={assetOptions}
              allowedKinds={["general", "collection-color-card"]}
            />
          </label>
          <label className="admin-field">
            <span>Fallback portada legacy</span>
            <input name="coverImagePath" placeholder="/images/..." />
          </label>
          <label className="admin-field">
            <span>Fallback carta legacy</span>
            <input name="colorCardPath" placeholder="/images/..." />
          </label>
          <button className="admin-submit-button" type="submit">
            Crear colección
          </button>
        </form>
      </section>
      <section className="admin-card">
        <p className="admin-eyebrow">Colecciones</p>
        <form className="admin-toolbar">
          <input name="q" defaultValue={q} placeholder="Buscar por nombre" />
          <select name="status" defaultValue={status}>
            <option value="">Todos los estados</option>
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
          <button className="admin-link-button" type="submit">
            Filtrar
          </button>
        </form>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Badge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.sortOrder}</td>
                  <td>{row.name}</td>
                  <td>{row.status}</td>
                  <td>{row.shortDescription ?? "-"}</td>
                  <td>
                    <Link href={`/admin/collections/${row.id}`} className="admin-link-inline">
                      Editar
                    </Link>
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
