"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mediaAssets } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils/slug";
import { mediaUploadSchema } from "@/lib/validations/media";

function sanitizeFileName(fileName: string) {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";
  const baseName = parts.join(".") || fileName;
  const slug = slugify(baseName) || "archivo";
  return extension ? `${slug}.${extension.toLowerCase()}` : slug;
}

export async function uploadMediaAssetAction(formData: FormData) {
  const adminUser = await requireAdmin({ roles: ["superadmin", "editor", "sales"] });
  const file = formData.get("file");

  if (!(file instanceof File) || !file.size) {
    throw new Error("Seleccioná un archivo para subir.");
  }

  const parsed = mediaUploadSchema.parse({
    bucket: String(formData.get("bucket") ?? "site-public"),
    kind: String(formData.get("kind") ?? "general"),
    title: String(formData.get("title") ?? ""),
    altText: String(formData.get("altText") ?? ""),
  });
  const bucket = parsed.bucket;
  const kind = parsed.kind as typeof mediaAssets.$inferInsert.kind;
  const title = parsed.title;
  const altText = parsed.altText;
  const isPublic = bucket === "site-public";
  const safeName = sanitizeFileName(file.name);
  const objectPath = `${kind}/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.storage.from(bucket).upload(objectPath, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`No se pudo subir el archivo: ${error.message}`);
  }

  await getDb().insert(mediaAssets).values({
    bucket,
    objectPath,
    fileName: file.name,
    mimeType: file.type || null,
    sizeBytes: file.size,
    kind,
    title: title || null,
    altText: altText || null,
    isPublic,
    createdBy: adminUser.id,
  });

  revalidatePath("/admin/media");
  redirect("/admin/media");
}
