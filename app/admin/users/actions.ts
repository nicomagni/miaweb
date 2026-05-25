"use server";

import { revalidatePath } from "next/cache";
import { adminUsers } from "@/db/schema";
import type { AdminRole } from "@/lib/auth/admin";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";

const adminRoles = new Set<AdminRole>(["superadmin", "editor", "sales"]);

export async function promoteUserToAdminAction(formData: FormData) {
  await requireAdmin({ roles: ["superadmin"] });

  const clerkUserId = String(formData.get("clerkUserId") ?? "");
  const email = String(formData.get("email") ?? "");
  const fullName = String(formData.get("fullName") ?? "") || null;
  const role = String(formData.get("role") ?? "sales") as AdminRole;

  if (!clerkUserId || !email || !adminRoles.has(role)) {
    throw new Error("Datos inválidos para promover usuario.");
  }

  await getDb()
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
    });

  revalidatePath("/admin/users");
}
