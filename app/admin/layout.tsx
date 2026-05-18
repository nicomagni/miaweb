import { AdminHeader } from "@/components/admin/admin-header";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminUser = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminHeader email={adminUser.email} role={adminUser.role} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
