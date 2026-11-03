import Link from "next/link";

export default async function ForbiddenPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const isRoleRestriction = reason === "role";

  return (
    <main className="admin-shell admin-shell--centered">
      <section className="admin-card admin-card--narrow">
        <p className="admin-eyebrow">403</p>
        <h1>Acceso restringido</h1>
        <p>
          {isRoleRestriction
            ? "Tu usuario está activo, pero el rol asignado no permite entrar en esta sección."
            : "Tu usuario está autenticado, pero no figura como admin activo en la base de datos de este proyecto."}
        </p>
        <div className="admin-actions">
          <Link href={isRoleRestriction ? "/admin" : "/"} className="admin-link-button">
            {isRoleRestriction ? "Volver al backoffice" : "Volver al sitio"}
          </Link>
        </div>
      </section>
    </main>
  );
}
