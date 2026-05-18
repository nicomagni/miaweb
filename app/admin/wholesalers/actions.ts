"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { providers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { slugify } from "@/lib/utils/slug";
import { providerSchema } from "@/lib/validations/provider";

export async function createProviderAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "sales"] });
  const db = getDb();
  const parsed = providerSchema.parse({
    name: String(formData.get("name") ?? ""),
    providerType: String(formData.get("providerType") ?? "distributor"),
    contactName: String(formData.get("contactName") ?? ""),
    imageAssetId: String(formData.get("imageAssetId") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    province: String(formData.get("province") ?? ""),
    country: String(formData.get("country") ?? "AR"),
    instagram: String(formData.get("instagram") ?? ""),
    website: String(formData.get("website") ?? ""),
    latitude: String(formData.get("latitude") ?? ""),
    longitude: String(formData.get("longitude") ?? ""),
    status: String(formData.get("status") ?? "lead"),
    internalNotes: String(formData.get("internalNotes") ?? ""),
  });

  const [created] = await db
    .insert(providers)
    .values({
      name: parsed.name,
      slug: slugify(parsed.name),
      providerType: parsed.providerType,
      contactName: parsed.contactName || null,
      imageAssetId: parsed.imageAssetId || null,
      email: parsed.email || null,
      phone: parsed.phone || null,
      address: parsed.address || null,
      city: parsed.city || null,
      province: parsed.province || null,
      country: parsed.country,
      instagram: parsed.instagram || null,
      website: parsed.website || null,
      latitude: parsed.latitude || null,
      longitude: parsed.longitude || null,
      status: parsed.status,
      internalNotes: parsed.internalNotes || null,
      approvedAt: parsed.status === "approved" ? new Date() : null,
      createdBy: adminUser.id,
      updatedBy: adminUser.id,
    })
    .returning({ id: providers.id });

  revalidatePath("/admin/providers");
  redirect(`/admin/providers/${created.id}`);
}

export async function updateProviderAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "sales"] });
  const id = String(formData.get("id") ?? "");
  const parsed = providerSchema.parse({
    name: String(formData.get("name") ?? ""),
    providerType: String(formData.get("providerType") ?? "distributor"),
    contactName: String(formData.get("contactName") ?? ""),
    imageAssetId: String(formData.get("imageAssetId") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    province: String(formData.get("province") ?? ""),
    country: String(formData.get("country") ?? "AR"),
    instagram: String(formData.get("instagram") ?? ""),
    website: String(formData.get("website") ?? ""),
    latitude: String(formData.get("latitude") ?? ""),
    longitude: String(formData.get("longitude") ?? ""),
    status: String(formData.get("status") ?? "lead"),
    internalNotes: String(formData.get("internalNotes") ?? ""),
  });

  await getDb()
    .update(providers)
    .set({
      name: parsed.name,
      slug: slugify(parsed.name),
      providerType: parsed.providerType,
      contactName: parsed.contactName || null,
      imageAssetId: parsed.imageAssetId || null,
      email: parsed.email || null,
      phone: parsed.phone || null,
      address: parsed.address || null,
      city: parsed.city || null,
      province: parsed.province || null,
      country: parsed.country,
      instagram: parsed.instagram || null,
      website: parsed.website || null,
      latitude: parsed.latitude || null,
      longitude: parsed.longitude || null,
      status: parsed.status,
      internalNotes: parsed.internalNotes || null,
      approvedAt: parsed.status === "approved" ? new Date() : null,
      updatedBy: adminUser.id,
      updatedAt: new Date(),
    })
    .where(eq(providers.id, id));

  revalidatePath("/admin/providers");
  revalidatePath(`/admin/providers/${id}`);
}

export const createWholesalerAction = createProviderAction;
export const updateWholesalerAction = updateProviderAction;
