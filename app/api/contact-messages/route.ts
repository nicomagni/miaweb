import { NextResponse } from "next/server";
import { contactMessages } from "@/db/schema";
import { getDb } from "@/lib/db/client";
import { contactMessageSchema } from "@/lib/validations/contact-message";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    fullName: String(formData.get("contactNombre") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("contactAsunto") ?? "Consulta general"),
    message: String(formData.get("contactMensaje") ?? ""),
  };

  const parsed = contactMessageSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  await getDb().insert(contactMessages).values({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  return NextResponse.json({ ok: true });
}
