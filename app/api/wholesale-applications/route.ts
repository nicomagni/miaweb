import { NextResponse } from "next/server";
import { wholesaleApplications } from "@/db/schema";
import { getDb } from "@/lib/db/client";
import { wholesaleApplicationSchema } from "@/lib/validations/wholesale-application";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    storeName: String(formData.get("comercio") ?? ""),
    cuit: String(formData.get("cuit") ?? ""),
    email: String(formData.get("email") ?? formData.get("mayoristaEmail") ?? ""),
    province: String(formData.get("provincia") ?? ""),
    city: String(formData.get("ciudad") ?? ""),
    instagram: String(formData.get("instagram") ?? ""),
    website: String(formData.get("web") ?? ""),
    estimatedVolume: String(formData.get("volumen") ?? ""),
    message: String(formData.get("mensaje") ?? ""),
  };

  const parsed = wholesaleApplicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  await getDb().insert(wholesaleApplications).values({
    storeName: parsed.data.storeName,
    cuit: parsed.data.cuit,
    email: parsed.data.email,
    province: parsed.data.province,
    city: parsed.data.city,
    instagram: parsed.data.instagram,
    website: parsed.data.website || null,
    estimatedVolume: parsed.data.estimatedVolume,
    message: parsed.data.message || null,
  });

  return NextResponse.json({ ok: true });
}
