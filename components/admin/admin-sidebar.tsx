"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminRole } from "@/lib/auth/admin";

type AdminSidebarProps = {
  email: string;
  role: AdminRole;
};

const adminLinks = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/wholesale-applications", label: "Solicitudes" },
  { href: "/admin/contact-messages", label: "Contacto" },
  { href: "/admin/providers", label: "Proveedores" },
  { href: "/admin/collections", label: "Colecciones" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/users", label: "Usuarios" },
];

export function AdminSidebar({ email, role }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <Link href="/admin" className="admin-sidebar__title">
          Mía Hilados
        </Link>
        <span>Backoffice</span>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Navegación del admin">
        {adminLinks.map((link) => {
          const isActive =
            link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className={`admin-sidebar__link${isActive ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar__user">
        <div className="admin-sidebar__meta">
          <span>{email}</span>
          <strong>{role}</strong>
        </div>
        <UserButton />
      </div>
    </aside>
  );
}
