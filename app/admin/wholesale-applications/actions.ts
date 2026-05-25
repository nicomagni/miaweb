"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { providers, wholesaleApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { slugify } from "@/lib/utils/slug";
import { providerSchema } from "@/lib/validations/provider";

export async function updateWholesaleApplicationAction(formData: FormData) {
  await requireAdmin({ roles: ["superadmin", "sales"] });

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const reviewNotes = String(formData.get("reviewNotes") ?? "");

  await getDb()
    .update(wholesaleApplications)
    .set({
      status: status as typeof wholesaleApplications.$inferInsert.status,
      reviewNotes,
      updatedAt: new Date(),
    })
    .where(eq(wholesaleApplications.id, id));

  revalidatePath("/admin/wholesale-applications");
  revalidatePath(`/admin/wholesale-applications/${id}`);
  redirect("/admin/wholesale-applications");
}

export async function convertApplicationToProviderAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "sales"] });
  const db = getDb();
  const id = String(formData.get("id") ?? "");

  const application = await db.query.wholesaleApplications.findFirst({
    where: eq(wholesaleApplications.id, id),
  });

  if (!application) throw new Error("Solicitud no encontrada.");

  const parsed = providerSchema.parse({
    name: application.storeName,
    providerType: "wholesaler",
    contactName: application.storeName,
    email: application.email,
    city: application.city ?? "",
    province: application.province ?? "",
    instagram: application.instagram ?? "",
    website: application.website ?? "",
    status: "approved",
    internalNotes: application.reviewNotes ?? "",
  });

  const [created] = await db
    .insert(providers)
    .values({
      name: parsed.name,
      slug: slugify(parsed.name),
      providerType: parsed.providerType,
      contactName: parsed.contactName || null,
      email: parsed.email || null,
      city: parsed.city || null,
      province: parsed.province || null,
      instagram: parsed.instagram || null,
      website: parsed.website || null,
      status: "approved",
      internalNotes: parsed.internalNotes || null,
      sourceApplicationId: application.id,
      approvedAt: new Date(),
      createdBy: adminUser.id,
      updatedBy: adminUser.id,
    })
    .returning({ id: providers.id });

  await db
    .update(wholesaleApplications)
    .set({
      status: "approved",
      updatedAt: new Date(),
    })
    .where(eq(wholesaleApplications.id, id));

  revalidatePath("/admin/wholesale-applications");
  revalidatePath("/admin/providers");
  redirect(`/admin/providers/${created.id}`);
}

export const convertApplicationToWholesalerAction = convertApplicationToProviderAction;
