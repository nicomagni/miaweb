import Link from "next/link";

type LegalPageProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <Link href="/" aria-label="Volver al inicio">
          <img src="/images/mia-logo.webp" alt="Mia Hilados" width="50" height="50" />
        </Link>
      </div>
      <main className="legal-container">
        <h1>{title}</h1>
        <p className="legal-date">Ultima actualizacion: {updatedAt}</p>
        {children}
        <Link href="/" className="legal-back">
          Volver al inicio
        </Link>
      </main>
      <footer className="legal-footer">
        <p>&copy; 2026 Mia Hilados — XAUMAX S.A. · Industria Argentina</p>
      </footer>
    </div>
  );
}
