import { eq, sql } from "drizzle-orm";
import { collections, contactMessages, providers, wholesaleApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";

export default async function AdminHomePage() {
  const adminUser = await requireAdmin();
  const db = getDb();
  const [
    [applications],
    [newApplications],
    [providerRows],
    [approvedProviders],
    [collectionRows],
    [publishedCollections],
    [contactRows],
    [newContactRows],
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(wholesaleApplications),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(wholesaleApplications)
      .where(eq(wholesaleApplications.status, "new")),
    db.select({ count: sql<number>`count(*)::int` }).from(providers),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(providers)
      .where(eq(providers.status, "approved")),
    db.select({ count: sql<number>`count(*)::int` }).from(collections),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(collections)
      .where(eq(collections.status, "published")),
    db.select({ count: sql<number>`count(*)::int` }).from(contactMessages),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(contactMessages)
      .where(eq(contactMessages.status, "new")),
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
        <h2>{applications.count} solicitudes</h2>
        <p>{newApplications.count} nuevas por revisar.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Base comercial</p>
        <h2>{providerRows.count} proveedores</h2>
        <p>{approvedProviders.count} aprobados.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Contenido</p>
        <h2>{collectionRows.count} colecciones</h2>
        <p>{publishedCollections.count} publicadas.</p>
      </article>

      <article className="admin-card">
        <p className="admin-eyebrow">Contacto</p>
        <h2>{contactRows.count} consultas</h2>
        <p>{newContactRows.count} nuevas por revisar.</p>
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
