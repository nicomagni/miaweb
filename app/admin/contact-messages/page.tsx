import { and, desc, eq, ilike, or } from "drizzle-orm";
import { contactMessages } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { updateContactMessageAction } from "./actions";

export default async function ContactMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const status = (params.status ?? "").trim();

  const filters = [];

  if (q) {
    filters.push(
      or(
        ilike(contactMessages.fullName, `%${q}%`),
        ilike(contactMessages.email, `%${q}%`),
        ilike(contactMessages.subject, `%${q}%`),
      ),
    );
  }

  if (status) {
    filters.push(eq(contactMessages.status, status as typeof contactMessages.$inferSelect.status));
  }

  const rows = await getDb()
    .select()
    .from(contactMessages)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Consultas de contacto</p>
        <form className="admin-toolbar">
          <input name="q" defaultValue={q} placeholder="Buscar por nombre, email o asunto" />
          <select name="status" defaultValue={status}>
            <option value="">Todos los estados</option>
            <option value="new">new</option>
            <option value="reviewed">reviewed</option>
            <option value="resolved">resolved</option>
            <option value="spam">spam</option>
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
                <th>Email</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Gestión</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.fullName}</td>
                  <td>{row.email}</td>
                  <td>{row.subject ?? "-"}</td>
                  <td className="admin-table__message">{row.message}</td>
                  <td>{row.status}</td>
                  <td>
                    <form action={updateContactMessageAction} className="admin-inline-form">
                      <input type="hidden" name="id" value={row.id} />
                      <select name="status" defaultValue={row.status}>
                        <option value="new">new</option>
                        <option value="reviewed">reviewed</option>
                        <option value="resolved">resolved</option>
                        <option value="spam">spam</option>
                      </select>
                      <input
                        name="reviewNotes"
                        defaultValue={row.reviewNotes ?? ""}
                        placeholder="Notas"
                      />
                      <button className="admin-link-inline" type="submit">
                        Guardar
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
