"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { ProviderActionState } from "@/lib/validations/provider";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { providers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { slugify } from "@/lib/utils/slug";
import { providerSchema } from "@/lib/validations/provider";

export async function createProviderAction(
  _state: ProviderActionState,
  formData: FormData,
): Promise<ProviderActionState> {
  const adminUser = await requireAdmin({ roles: ["superadmin", "sales"] });
  const result = providerSchema.safeParse({
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
  if (!result.success) return validationError(result.error);
  const parsed = result.data;

  let created;
  try {
    [created] = await getDb()
      .insert(providers)
      .values({
        name: parsed.name,
        slug: `${slugify(parsed.name) || "proveedor"}-${randomUUID()}`,
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
  } catch (error) {
    return mutationError(error);
  }

  revalidatePath("/");
  revalidatePath("/admin/providers");
  redirect(`/admin/providers/${created.id}`);
}

export async function updateProviderAction(
  _state: ProviderActionState,
  formData: FormData,
): Promise<ProviderActionState> {
  const adminUser = await requireAdmin({ roles: ["superadmin", "sales"] });
  const id = String(formData.get("id") ?? "");
  if (!z.uuid().safeParse(id).success) return { error: "El proveedor no es válido." };
  const result = providerSchema.safeParse({
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
  if (!result.success) return validationError(result.error);
  const parsed = result.data;

  try {
    const updated = await getDb()
      .update(providers)
      .set({
        name: parsed.name,
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
      .where(eq(providers.id, id))
      .returning({ id: providers.id });
    if (!updated.length) return { error: "El proveedor ya no existe." };
  } catch (error) {
    return mutationError(error);
  }

  revalidatePath("/");
  revalidatePath("/admin/providers");
  revalidatePath(`/admin/providers/${id}`);
  return { success: "Proveedor guardado." };
}

export async function deleteProviderAction(
  _state: ProviderActionState,
  formData: FormData,
): Promise<ProviderActionState> {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const id = String(formData.get("id") ?? "");
  if (!z.uuid().safeParse(id).success) return { error: "El proveedor no es válido." };
  try {
    const deleted = await getDb()
      .delete(providers)
      .where(eq(providers.id, id))
      .returning({ id: providers.id });
    if (!deleted.length) return { error: "El proveedor ya no existe." };
  } catch (error) {
    return mutationError(error);
  }
  revalidatePath("/");
  revalidatePath("/admin/providers");
  revalidatePath(`/admin/providers/${id}`);
  redirect("/admin/providers");
}

function validationError(error: z.ZodError): ProviderActionState {
  const labels: Record<string, string> = {
    name: "Nombre: ingresá al menos 2 caracteres.",
    email: "Email: ingresá una dirección válida, por ejemplo nombre@dominio.com, o dejalo vacío.",
    website: "Website: ingresá una URL completa, por ejemplo https://ejemplo.com, o dejalo vacío.",
    country: "País: ingresá al menos 2 caracteres.",
    imageAssetId: "Imagen: seleccioná un asset válido de la biblioteca.",
    latitude: "Latitud: ingresá un número entre -90 y 90.",
    longitude: "Longitud: ingresá un número entre -180 y 180.",
  };
  return {
    error: "Revisá los datos del formulario.",
    issues: [
      ...new Set(
        error.issues.map(
          (issue) => labels[String(issue.path[0])] || "Seleccioná un tipo y estado válidos.",
        ),
      ),
    ],
  };
}

function mutationError(error: unknown): ProviderActionState {
  const cause = error instanceof Error && error.cause ? error.cause : error;
  const code =
    cause && typeof cause === "object" && "code" in cause ? String(cause.code) : "unknown";
  console.error("Provider mutation failed", { code });
  return {
    error:
      code === "23505"
        ? "Ya existe un proveedor con ese identificador. Volvé a intentarlo."
        : "No se pudo guardar el cambio. Intentá nuevamente.",
  };
}
