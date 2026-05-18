"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { collectionItems, collections } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { slugify } from "@/lib/utils/slug";
import { collectionItemSchema, collectionSchema } from "@/lib/validations/collection";

export async function createCollectionAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "editor"] });
  const db = getDb();
  const parsed = collectionSchema.parse({
    name: String(formData.get("name") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    longDescription: String(formData.get("longDescription") ?? ""),
    status: String(formData.get("status") ?? "draft"),
    sortOrder: String(formData.get("sortOrder") ?? "0"),
    coverImageAssetId: String(formData.get("coverImageAssetId") ?? ""),
    coverImagePath: String(formData.get("coverImagePath") ?? ""),
    colorCardAssetId: String(formData.get("colorCardAssetId") ?? ""),
    colorCardPath: String(formData.get("colorCardPath") ?? ""),
    seoTitle: String(formData.get("seoTitle") ?? ""),
    seoDescription: String(formData.get("seoDescription") ?? ""),
  });

  const [created] = await db
    .insert(collections)
    .values({
      name: parsed.name,
      slug: slugify(parsed.name),
      shortDescription: parsed.shortDescription || null,
      longDescription: parsed.longDescription || null,
      status: parsed.status,
      sortOrder: parsed.sortOrder,
      coverImageAssetId: parsed.coverImageAssetId || null,
      coverImagePath: parsed.coverImagePath || null,
      colorCardAssetId: parsed.colorCardAssetId || null,
      colorCardPath: parsed.colorCardPath || null,
      seoTitle: parsed.seoTitle || null,
      seoDescription: parsed.seoDescription || null,
      publishedAt: parsed.status === "published" ? new Date() : null,
      createdBy: adminUser.id,
      updatedBy: adminUser.id,
    })
    .returning({ id: collections.id });

  revalidatePath("/admin/collections");
  revalidatePath("/");
  redirect(`/admin/collections/${created.id}`);
}

export async function updateCollectionAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "editor"] });
  const id = String(formData.get("id") ?? "");
  const parsed = collectionSchema.parse({
    name: String(formData.get("name") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    longDescription: String(formData.get("longDescription") ?? ""),
    status: String(formData.get("status") ?? "draft"),
    sortOrder: String(formData.get("sortOrder") ?? "0"),
    coverImageAssetId: String(formData.get("coverImageAssetId") ?? ""),
    coverImagePath: String(formData.get("coverImagePath") ?? ""),
    colorCardAssetId: String(formData.get("colorCardAssetId") ?? ""),
    colorCardPath: String(formData.get("colorCardPath") ?? ""),
    seoTitle: String(formData.get("seoTitle") ?? ""),
    seoDescription: String(formData.get("seoDescription") ?? ""),
  });

  await getDb()
    .update(collections)
    .set({
      name: parsed.name,
      slug: slugify(parsed.name),
      shortDescription: parsed.shortDescription || null,
      longDescription: parsed.longDescription || null,
      status: parsed.status,
      sortOrder: parsed.sortOrder,
      coverImageAssetId: parsed.coverImageAssetId || null,
      coverImagePath: parsed.coverImagePath || null,
      colorCardAssetId: parsed.colorCardAssetId || null,
      colorCardPath: parsed.colorCardPath || null,
      seoTitle: parsed.seoTitle || null,
      seoDescription: parsed.seoDescription || null,
      publishedAt: parsed.status === "published" ? new Date() : null,
      updatedBy: adminUser.id,
      updatedAt: new Date(),
    })
    .where(eq(collections.id, id));

  revalidatePath("/admin/collections");
  revalidatePath(`/admin/collections/${id}`);
  revalidatePath("/");
}

export async function createCollectionItemAction(formData: FormData) {
  await requireAdmin({ roles: ["superadmin", "editor"] });
  const collectionId = String(formData.get("collectionId") ?? "");
  const parsed = collectionItemSchema.parse({
    name: String(formData.get("name") ?? ""),
    sku: String(formData.get("sku") ?? ""),
    imageAssetId: String(formData.get("imageAssetId") ?? ""),
    imagePath: String(formData.get("imagePath") ?? ""),
    colorName: String(formData.get("colorName") ?? ""),
    colorHex: String(formData.get("colorHex") ?? ""),
    sortOrder: String(formData.get("sortOrder") ?? "0"),
    isActive: formData.get("isActive") === "on",
  });

  await getDb().insert(collectionItems).values({
    collectionId,
    name: parsed.name,
    sku: parsed.sku || null,
    imageAssetId: parsed.imageAssetId || null,
    imagePath: parsed.imagePath || null,
    colorName: parsed.colorName || null,
    colorHex: parsed.colorHex || null,
    sortOrder: parsed.sortOrder,
    isActive: parsed.isActive,
  });

  revalidatePath(`/admin/collections/${collectionId}`);
  revalidatePath("/");
}

export async function deleteCollectionItemAction(formData: FormData) {
  await requireAdmin({ roles: ["superadmin", "editor"] });
  const id = String(formData.get("id") ?? "");
  const collectionId = String(formData.get("collectionId") ?? "");

  await getDb()
    .delete(collectionItems)
    .where(and(eq(collectionItems.id, id), eq(collectionItems.collectionId, collectionId)));

  revalidatePath(`/admin/collections/${collectionId}`);
  revalidatePath("/");
}
