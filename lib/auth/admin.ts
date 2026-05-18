import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { adminUsers } from "@/db/schema";
import { getDb } from "@/lib/db/client";

export type AdminRole = "superadmin" | "editor" | "sales";

type RequireAdminOptions = {
  roles?: AdminRole[];
};

export async function requireAdmin(options: RequireAdminOptions = {}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const db = getDb();
  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.clerkUserId, userId),
  });

  if (!adminUser || !adminUser.isActive) {
    redirect("/403");
  }

  if (options.roles && !options.roles.includes(adminUser.role)) {
    redirect("/403");
  }

  return adminUser;
}
