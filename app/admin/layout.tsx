import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AuthControls } from "@/components/auth-controls";
import { adminUsers } from "@/db/schema";
import { getDb } from "@/lib/db/client";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <ClerkProvider>
        <main className="admin-auth">
          <section className="admin-card admin-card--narrow admin-auth__card">
            <p className="admin-eyebrow">Admin</p>
            <h1>Acceso interno</h1>
            <p>Ingresá con tu cuenta o creá una nueva para solicitar acceso al panel.</p>
            <AuthControls />
          </section>
        </main>
      </ClerkProvider>
    );
  }

  const adminUser = await getDb().query.adminUsers.findFirst({
    where: eq(adminUsers.clerkUserId, userId),
  });

  if (!adminUser || !adminUser.isActive) {
    redirect("/403");
  }

  return (
    <ClerkProvider>
      <div className="admin-shell">
        <AdminSidebar email={adminUser.email} role={adminUser.role} />
        <main className="admin-main">{children}</main>
      </div>
    </ClerkProvider>
  );
}
