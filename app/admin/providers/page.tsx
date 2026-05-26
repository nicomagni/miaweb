import Link from "next/link";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { providers } from "@/db/schema";
import { MediaPicker } from "@/components/admin/media-picker";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { createProviderAction } from "./actions";

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const status = (params.status ?? "").trim();
  const type = (params.type ?? "").trim();
  const filters = [];

  if (q) {
    filters.push(
      or(
        ilike(providers.name, `%${q}%`),
        ilike(providers.email, `%${q}%`),
        ilike(providers.city, `%${q}%`),
        ilike(providers.province, `%${q}%`),
      ),
    );
  }

  if (status) {
    filters.push(eq(providers.status, status as typeof providers.$inferSelect.status));
  }

  if (type) {
    filters.push(eq(providers.providerType, type as typeof providers.$inferSelect.providerType));
  }

  const rows = await getDb()
    .select()
    .from(providers)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(providers.createdAt));

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Nuevo proveedor</p>
        <form action={createProviderAction} className="admin-form admin-form--two-col">
          <label className="admin-field">
            <span>Nombre</span>
            <input name="name" />
          </label>
          <label className="admin-field">
            <span>Tipo</span>
            <select name="providerType" defaultValue="distributor">
              <option value="distributor">Distribuidor</option>
              <option value="wholesaler">Mayorista</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Contacto</span>
            <input name="contactName" />
          </label>
          <label className="admin-field">
            <span>Asset imagen</span>
            <MediaPicker name="imageAssetId" allowedKinds={["general", "provider-image"]} />
            <Link href="/admin/media" className="admin-link-inline">
              Abrir media library
            </Link>
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input name="email" />
          </label>
          <label className="admin-field">
            <span>Teléfono</span>
            <input name="phone" />
          </label>
          <label className="admin-field admin-field--full">
            <span>Dirección</span>
            <input name="address" />
          </label>
          <label className="admin-field">
            <span>Ciudad</span>
            <input name="city" />
          </label>
          <label className="admin-field">
            <span>Provincia</span>
            <input name="province" />
          </label>
          <label className="admin-field">
            <span>País</span>
            <input name="country" defaultValue="AR" />
          </label>
          <label className="admin-field">
            <span>Estado</span>
            <select name="status" defaultValue="lead">
              <option value="lead">lead</option>
              <option value="approved">approved</option>
              <option value="inactive">inactive</option>
              <option value="rejected">rejected</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Instagram</span>
            <input name="instagram" />
          </label>
          <label className="admin-field">
            <span>Website</span>
            <input name="website" />
          </label>
          <label className="admin-field">
            <span>Latitud</span>
            <input name="latitude" />
          </label>
          <label className="admin-field">
            <span>Longitud</span>
            <input name="longitude" />
          </label>
          <label className="admin-field admin-field--full">
            <span>Notas internas</span>
            <textarea name="internalNotes" rows={4} />
          </label>
          <button className="admin-submit-button" type="submit">
            Crear proveedor
          </button>
        </form>
      </section>
      <section className="admin-card">
        <p className="admin-eyebrow">Base de proveedores</p>
        <form className="admin-toolbar">
          <input name="q" defaultValue={q} placeholder="Buscar por nombre, email o ubicación" />
          <select name="type" defaultValue={type}>
            <option value="">Todos los tipos</option>
            <option value="distributor">Distribuidor</option>
            <option value="wholesaler">Mayorista</option>
          </select>
          <select name="status" defaultValue={status}>
            <option value="">Todos los estados</option>
            <option value="lead">lead</option>
            <option value="approved">approved</option>
            <option value="inactive">inactive</option>
            <option value="rejected">rejected</option>
          </select>
          <button className="admin-link-button" type="submit">
            Filtrar
          </button>
        </form>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.providerType === "wholesaler" ? "Mayorista" : "Distribuidor"}</td>
                  <td>{row.status}</td>
                  <td>
                    {row.city}, {row.province}
                  </td>
                  <td>{row.email ?? "-"}</td>
                  <td>
                    <Link href={`/admin/providers/${row.id}`} className="admin-link-inline">
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
