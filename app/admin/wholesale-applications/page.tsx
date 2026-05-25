import Link from "next/link";
import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { providers, wholesaleApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { convertApplicationToProviderAction } from "./actions";

const statusTabs = [
  { value: "all", label: "Todas" },
  { value: "new", label: "Nuevas" },
  { value: "reviewing", label: "En revisión" },
  { value: "contacted", label: "Contactadas" },
  { value: "approved", label: "Aprobadas" },
  { value: "rejected", label: "Rechazadas" },
  { value: "spam", label: "Spam" },
] as const;

function buildInboxHref(status: string, q: string) {
  const search = new URLSearchParams();
  if (status && status !== "new") search.set("status", status);
  if (q) search.set("q", q);
  const qs = search.toString();
  return qs ? `/admin/wholesale-applications?${qs}` : "/admin/wholesale-applications";
}

function formatDate(value: Date) {
  return value.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function WholesaleApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const rawStatus = (params.status ?? "new").trim();
  const status = rawStatus === "" ? "new" : rawStatus;
  const filters = [];

  if (q) {
    filters.push(
      or(
        ilike(wholesaleApplications.storeName, `%${q}%`),
        ilike(wholesaleApplications.email, `%${q}%`),
        ilike(wholesaleApplications.city, `%${q}%`),
        ilike(wholesaleApplications.province, `%${q}%`),
      ),
    );
  }

  if (status !== "all") {
    filters.push(
      eq(wholesaleApplications.status, status as typeof wholesaleApplications.$inferSelect.status),
    );
  }

  const db = getDb();
  const [applications, statusRows] = await Promise.all([
    db
      .select()
      .from(wholesaleApplications)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(wholesaleApplications.updatedAt), desc(wholesaleApplications.submittedAt)),
    db
      .select({
        status: wholesaleApplications.status,
        count: sql<number>`count(*)::int`,
      })
      .from(wholesaleApplications)
      .groupBy(wholesaleApplications.status),
  ]);

  const applicationIds = applications.map((application) => application.id);
  const convertedRows = applicationIds.length
    ? await db
        .select({
          sourceApplicationId: providers.sourceApplicationId,
          id: providers.id,
        })
        .from(providers)
        .where(inArray(providers.sourceApplicationId, applicationIds))
    : [];
  const convertedMap = new Map(
    convertedRows
      .filter((row): row is { sourceApplicationId: string; id: string } =>
        Boolean(row.sourceApplicationId),
      )
      .map((row) => [row.sourceApplicationId, row.id]),
  );
  const statusCounts = new Map(statusRows.map((row) => [row.status, row.count]));
  const totalCount = statusRows.reduce((sum, row) => sum + row.count, 0);

  return (
    <section className="admin-card">
      <p className="admin-eyebrow">Solicitudes comerciales</p>
      <h1>Inbox comercial</h1>
      <div className="admin-status-tabs" role="tablist" aria-label="Estados de solicitudes">
        {statusTabs.map((tab) => {
          const isActive = status === tab.value;
          const count = tab.value === "all" ? totalCount : (statusCounts.get(tab.value) ?? 0);
          return (
            <Link
              key={tab.label}
              href={buildInboxHref(tab.value, q)}
              className={`admin-status-tab${isActive ? " is-active" : ""}`}
            >
              <span>{tab.label}</span>
              <strong>{count}</strong>
            </Link>
          );
        })}
      </div>
      <form className="admin-toolbar">
        <input name="q" defaultValue={q} placeholder="Buscar por comercio, email o ubicación" />
        <input type="hidden" name="status" value={status} />
        <button className="admin-link-button" type="submit">
          Filtrar
        </button>
      </form>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Comercio</th>
              <th>Ubicación</th>
              <th>Email</th>
              <th>Volumen</th>
              <th>Estado</th>
              <th>Creada</th>
              <th>Actualizada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.storeName}</td>
                <td>
                  {application.city}, {application.province}
                </td>
                <td>{application.email}</td>
                <td>{application.estimatedVolume || "-"}</td>
                <td>{application.status}</td>
                <td>{formatDate(application.createdAt)}</td>
                <td>{formatDate(application.updatedAt)}</td>
                <td>
                  <div className="admin-row-actions">
                    {convertedMap.has(application.id) ? (
                      <Link
                        href={`/admin/providers/${convertedMap.get(application.id)}`}
                        className="admin-action-button admin-action-button--soft"
                      >
                        <span className="admin-button-icon" aria-hidden="true">
                          <svg viewBox="0 0 20 20" fill="none">
                            <path
                              d="M10 3.5 4 6.5v7l6 3 6-3v-7l-6-3Zm0 0v7m6-4-6 4-6-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Ver proveedor
                      </Link>
                    ) : (
                      <form action={convertApplicationToProviderAction}>
                        <input type="hidden" name="id" value={application.id} />
                        <button className="admin-action-button" type="submit">
                          <span className="admin-button-icon" aria-hidden="true">
                            <svg viewBox="0 0 20 20" fill="none">
                              <path
                                d="M10 4v12m6-6H4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          Transformar a proveedor
                        </button>
                      </form>
                    )}
                    <Link
                      href={`/admin/wholesale-applications/${application.id}`}
                      className="admin-action-button admin-action-button--ghost"
                    >
                      <span className="admin-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path
                            d="M12.5 5.5 16 9m0 0-3.5 3.5M16 9H4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Ver detalle
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
