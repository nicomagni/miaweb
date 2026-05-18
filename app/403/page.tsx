import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="admin-shell admin-shell--centered">
      <section className="admin-card admin-card--narrow">
        <p className="admin-eyebrow">403</p>
        <h1>Acceso restringido</h1>
        <p>
          Tu usuario está autenticado, pero no figura como admin activo en la base de datos de
          este proyecto.
        </p>
        <div className="admin-actions">
          <Link href="/" className="admin-link-button">
            Volver al sitio
          </Link>
        </div>
      </section>
    </main>
  );
}
