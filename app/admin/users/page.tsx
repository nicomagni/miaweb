import { clerkClient } from "@clerk/nextjs/server";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { promoteUserToAdminAction } from "./actions";

export const dynamic = "force-dynamic";

function formatDate(timestamp: number | null) {
  if (!timestamp) {
    return "Sin ingreso";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export default async function AdminUsersPage() {
  await requireAdmin({ roles: ["superadmin"] });

  const [clerk, adminRows] = await Promise.all([clerkClient(), getDb().select().from(adminUsers)]);
  const users = await clerk.users.getUserList({
    limit: 100,
    orderBy: "-last_sign_in_at",
  });
  const adminByClerkId = new Map(adminRows.map((adminUser) => [adminUser.clerkUserId, adminUser]));

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <p className="admin-eyebrow">Usuarios</p>
        <h1>Accesos del backoffice</h1>
        <p>
          Listado de usuarios registrados en Clerk. Los superadmin pueden promover usuarios al panel
          interno.
        </p>
      </section>

      <section className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Último ingreso</th>
                <th>Estado admin</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user) => {
                const email =
                  user.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)
                    ?.emailAddress ??
                  user.emailAddresses[0]?.emailAddress ??
                  "Sin email";
                const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
                const adminUser = adminByClerkId.get(user.id);

                return (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user-cell">
                        <strong>{fullName || email}</strong>
                        <span>{email}</span>
                        <code>{user.id}</code>
                      </div>
                    </td>
                    <td>{formatDate(user.lastSignInAt)}</td>
                    <td>
                      {adminUser ? (
                        <span
                          className={`admin-status-badge${
                            adminUser.isActive ? " is-active" : " is-inactive"
                          }`}
                        >
                          {adminUser.isActive ? adminUser.role : "inactivo"}
                        </span>
                      ) : (
                        <span className="admin-status-badge">sin admin</span>
                      )}
                    </td>
                    <td>
                      {adminUser?.isActive ? (
                        <span className="admin-muted">Ya tiene acceso</span>
                      ) : (
                        <form action={promoteUserToAdminAction} className="admin-inline-form">
                          <input type="hidden" name="clerkUserId" value={user.id} />
                          <input type="hidden" name="email" value={email} />
                          <input type="hidden" name="fullName" value={fullName} />
                          <select name="role" aria-label={`Rol para ${email}`} defaultValue="sales">
                            <option value="sales">Sales</option>
                            <option value="editor">Editor</option>
                            <option value="superadmin">Superadmin</option>
                          </select>
                          <button className="admin-action-button" type="submit">
                            Promover
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
              {users.data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-table__message">
                    Todavía no hay usuarios registrados en Clerk.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
