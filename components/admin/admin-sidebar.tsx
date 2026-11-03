"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminRole } from "@/lib/auth/admin";

type AdminSidebarProps = {
  email: string;
  role: AdminRole;
};

const allRoles: AdminRole[] = ["superadmin", "editor", "sales"];

const adminLinks: Array<{
  href: string;
  label: string;
  roles: AdminRole[];
}> = [
  { href: "/admin", label: "Resumen", roles: allRoles },
  {
    href: "/admin/wholesale-applications",
    label: "Solicitudes",
    roles: ["superadmin", "sales"],
  },
  { href: "/admin/contact-messages", label: "Contacto", roles: ["superadmin", "sales"] },
  { href: "/admin/providers", label: "Proveedores", roles: ["superadmin", "sales"] },
  { href: "/admin/collections", label: "Colecciones", roles: ["superadmin", "editor"] },
  { href: "/admin/media", label: "Media", roles: allRoles },
  { href: "/admin/users", label: "Usuarios", roles: ["superadmin"] },
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
        {adminLinks
          .filter((link) => link.roles.includes(role))
          .map((link) => {
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
