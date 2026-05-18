import { collections, contactMessages, providers, wholesaleApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";

export default async function AdminHomePage() {
  const adminUser = await requireAdmin();
  const db = getDb();
  const [applications, providerRows, collectionRows, contactRows] = await Promise.all([
    db.select().from(wholesaleApplications),
    db.select().from(providers),
    db.select().from(collections),
    db.select().from(contactMessages),
  ]);

  return (
    <section className="admin-grid">
      <article className="admin-card">
        <p className="admin-eyebrow">Sesión</p>
        <h1>Panel listo</h1>
        <p>
          El acceso al admin ya depende de Clerk y de la tabla <code>admin_users</code>.
        </p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Usuario actual</p>
        <h2>{adminUser.fullName ?? adminUser.email}</h2>
        <p>
          Rol activo: <strong>{adminUser.role}</strong>
        </p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Embudo comercial</p>
        <h2>{applications.length} solicitudes</h2>
        <p>{applications.filter((row) => row.status === "new").length} nuevas por revisar.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Base comercial</p>
        <h2>{providerRows.length} proveedores</h2>
        <p>{providerRows.filter((row) => row.status === "approved").length} aprobados.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Contenido</p>
        <h2>{collectionRows.length} colecciones</h2>
        <p>{collectionRows.filter((row) => row.status === "published").length} publicadas.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Contacto</p>
        <h2>{contactRows.length} consultas</h2>
        <p>{contactRows.filter((row) => row.status === "new").length} nuevas por revisar.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Ruta siguiente</p>
        <ul className="admin-list">
          <li>Gestionar inbox de solicitudes</li>
          <li>Convertir solicitudes en proveedores</li>
          <li>Publicar colecciones con items reales</li>
        </ul>
      </article>
    </section>
  );
}
