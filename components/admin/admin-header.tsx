import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import type { AdminRole } from "@/lib/auth/admin";

type AdminHeaderProps = {
  email: string;
  role: AdminRole;
};

const adminLinks = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/wholesale-applications", label: "Solicitudes" },
  { href: "/admin/contact-messages", label: "Contacto" },
  { href: "/admin/providers", label: "Proveedores" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/collections", label: "Colecciones" },
];

export function AdminHeader({ email, role }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header__brand">
        <Link href="/admin" className="admin-header__title">
          Mía Hilados Admin
        </Link>
        <p className="admin-header__subtitle">Panel interno sobre Next.js + Clerk + Supabase</p>
      </div>

      <nav className="admin-header__nav" aria-label="Navegación del admin">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href} className="admin-header__link">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="admin-header__user">
        <div className="admin-header__meta">
          <span>{email}</span>
          <strong>{role}</strong>
        </div>
        <UserButton />
      </div>
    </header>
  );
}
