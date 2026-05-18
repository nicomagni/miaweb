import Link from "next/link";
import { eq } from "drizzle-orm";
import { wholesaleApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import {
  convertApplicationToProviderAction,
  updateWholesaleApplicationAction,
} from "../actions";

export default async function WholesaleApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const { id } = await params;
  const application = await getDb().query.wholesaleApplications.findFirst({
    where: eq(wholesaleApplications.id, id),
  });

  if (!application) {
    return (
      <section className="admin-card">
        <h1>Solicitud no encontrada</h1>
      </section>
    );
  }

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Solicitud</p>
        <h1>{application.storeName}</h1>
        <p>
          {application.city}, {application.province}
        </p>
        <div className="admin-data-grid">
          <div>
            <span>Email</span>
            <strong>{application.email}</strong>
          </div>
          <div>
            <span>CUIT</span>
            <strong>{application.cuit || "-"}</strong>
          </div>
          <div>
            <span>Instagram</span>
            <strong>{application.instagram || "-"}</strong>
          </div>
          <div>
            <span>Volumen</span>
            <strong>{application.estimatedVolume || "-"}</strong>
          </div>
        </div>
      </section>
      <section className="admin-card">
        <form action={updateWholesaleApplicationAction} className="admin-form">
          <input type="hidden" name="id" value={application.id} />
          <label className="admin-field">
            <span>Estado</span>
            <select name="status" defaultValue={application.status}>
              <option value="new">new</option>
              <option value="reviewing">reviewing</option>
              <option value="contacted">contacted</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
              <option value="spam">spam</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Notas internas</span>
            <textarea name="reviewNotes" rows={6} defaultValue={application.reviewNotes ?? ""} />
          </label>
          <button className="admin-submit-button" type="submit">
            Guardar cambios
          </button>
        </form>
      </section>
      <section className="admin-card">
        <p className="admin-eyebrow">Conversión</p>
        <h2>Crear proveedor desde la solicitud</h2>
        <p>
          Genera un registro en la base de proveedores con tipo <code>wholesaler</code> y
          estado <code>approved</code>.
        </p>
        <form action={convertApplicationToProviderAction}>
          <input type="hidden" name="id" value={application.id} />
          <button className="admin-submit-button" type="submit">
            Convertir a proveedor
          </button>
        </form>
        <div className="admin-actions">
          <Link href="/admin/wholesale-applications" className="admin-link-button">
            Volver al inbox
          </Link>
        </div>
      </section>
    </div>
  );
}
