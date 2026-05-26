import Link from "next/link";
import { and, asc, desc, ilike, or, sql } from "drizzle-orm";
import { mediaAssets } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { getStoragePublicUrl } from "@/lib/media/url";
import { uploadMediaAssetAction } from "./actions";

const pageSize = 24;

function buildMediaHref(page: number, q: string) {
  const search = new URLSearchParams();
  if (q) search.set("q", q);
  if (page > 1) search.set("page", String(page));
  const qs = search.toString();
  return qs ? `/admin/media?${qs}` : "/admin/media";
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "editor", "sales"] });
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const filters = [];

  if (q) {
    filters.push(
      or(
        ilike(mediaAssets.title, `%${q}%`),
        ilike(mediaAssets.fileName, `%${q}%`),
        ilike(mediaAssets.objectPath, `%${q}%`),
      ),
    );
  }

  const where = filters.length ? and(...filters) : undefined;
  const db = getDb();
  const [assets, countRows] = await Promise.all([
    db
      .select()
      .from(mediaAssets)
      .where(where)
      .orderBy(desc(mediaAssets.createdAt), asc(mediaAssets.fileName))
      .limit(pageSize)
      .offset((currentPage - 1) * pageSize),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(mediaAssets)
      .where(where),
  ]);
  const totalCount = countRows[0]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const visibleStart = totalCount ? (currentPage - 1) * pageSize + 1 : 0;
  const visibleEnd = Math.min(currentPage * pageSize, totalCount);

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
        <form className="admin-toolbar">
          <input name="q" defaultValue={q} placeholder="Buscar por nombre o ruta" />
          <button className="admin-link-button" type="submit">
            Buscar
          </button>
          {q ? (
            <Link href="/admin/media" className="admin-link-inline">
              Limpiar
            </Link>
          ) : null}
        </form>
        <p className="admin-muted">
          Mostrando {visibleStart}-{visibleEnd} de {totalCount} assets
        </p>
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
        {assets.length === 0 ? (
          <p className="admin-table__message">No hay assets para esta búsqueda.</p>
        ) : null}
        {totalPages > 1 ? (
          <nav className="admin-pagination" aria-label="Paginación de media">
            <Link
              href={buildMediaHref(Math.max(1, currentPage - 1), q)}
              className={`admin-link-button${currentPage === 1 ? " is-disabled" : ""}`}
              aria-disabled={currentPage === 1}
            >
              Anterior
            </Link>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Link
              href={buildMediaHref(Math.min(totalPages, currentPage + 1), q)}
              className={`admin-link-button${currentPage >= totalPages ? " is-disabled" : ""}`}
              aria-disabled={currentPage >= totalPages}
            >
              Siguiente
            </Link>
          </nav>
        ) : null}
      </section>
    </div>
  );
}
