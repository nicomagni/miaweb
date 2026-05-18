"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { contactMessages } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";

export async function updateContactMessageAction(formData: FormData) {
  await requireAdmin({ roles: ["superadmin", "sales"] });

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const reviewNotes = String(formData.get("reviewNotes") ?? "");

  await getDb()
    .update(contactMessages)
    .set({
      status: status as typeof contactMessages.$inferInsert.status,
      reviewNotes,
      updatedAt: new Date(),
    })
    .where(eq(contactMessages.id, id));

  revalidatePath("/admin/contact-messages");
}
