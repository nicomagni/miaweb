"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { adminUsers, auditLogs } from "@/db/schema";
import type { AdminRole } from "@/lib/auth/admin";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";

const adminRoles = new Set<AdminRole>(["superadmin", "editor", "sales"]);

export async function saveAdminUserAccessAction(formData: FormData) {
  const actingAdmin = await requireAdmin({ roles: ["superadmin"] });

  const clerkUserId = String(formData.get("clerkUserId") ?? "");
  const email = String(formData.get("email") ?? "");
  const fullName = String(formData.get("fullName") ?? "") || null;
  const role = String(formData.get("role") ?? "sales") as AdminRole;

  if (!clerkUserId || !email || !adminRoles.has(role)) {
    throw new Error("Datos inválidos para guardar el acceso del usuario.");
  }

  if (actingAdmin.clerkUserId === clerkUserId && role !== "superadmin") {
    throw new Error("No podés quitarte tu propio rol de superadmin.");
  }

  await getDb().transaction(async (tx) => {
    const existing = await tx.query.adminUsers.findFirst({
      where: eq(adminUsers.clerkUserId, clerkUserId),
    });
    const [saved] = await tx
      .insert(adminUsers)
      .values({
        clerkUserId,
        email,
        fullName,
        role,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: adminUsers.clerkUserId,
        set: {
          email,
          fullName,
          role,
          isActive: true,
          updatedAt: new Date(),
        },
      })
      .returning({ id: adminUsers.id });

    await tx.insert(auditLogs).values({
      actorAdminUserId: actingAdmin.id,
      action: existing ? "admin_user.update_access" : "admin_user.promote",
      entityType: "admin_user",
      entityId: saved.id,
      summary: {
        email,
        previousRole: existing?.role ?? null,
        nextRole: role,
        previousActive: existing?.isActive ?? false,
        nextActive: true,
      },
    });
  });

  revalidatePath("/admin/users");
}
