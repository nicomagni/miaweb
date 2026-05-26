import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { desc, eq, inArray } from "drizzle-orm";
import { z } from "zod/v4";
import { auditLogs, contactMessages, wholesaleApplications } from "@/db/schema";
import { getDb } from "@/lib/db/client";

const wholesaleApplicationStatusSchema = z.enum([
  "new",
  "reviewing",
  "contacted",
  "approved",
  "rejected",
  "spam",
]);

const contactMessageStatusSchema = z.enum(["new", "reviewed", "resolved", "spam"]);

const wholesaleApplicationListStatusSchema = z
  .union([wholesaleApplicationStatusSchema, z.literal("open"), z.literal("all")])
  .default("open");

const contactMessageListStatusSchema = z
  .union([contactMessageStatusSchema, z.literal("open"), z.literal("all")])
  .default("open");

const uuidSchema = z.string().uuid();
const limitSchema = z.number().int().min(1).max(50).default(25);

type ToolPayload = Record<string, unknown>;

function textResult(payload: ToolPayload) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
}

function serializeDate(value: Date | null) {
  return value ? value.toISOString() : null;
}

async function logMcpWrite(
  action: string,
  entityType: string,
  entityId: string,
  summary: ToolPayload,
) {
  await getDb()
    .insert(auditLogs)
    .values({
      action,
      entityType,
      entityId,
      summary: {
        source: "mcp",
        ...summary,
      },
    });
}

export function createAdminMcpServer() {
  const server = new McpServer({
    name: "mia-hilados-backoffice",
    version: "1.0.0",
  });

  server.registerTool(
    "list_wholesale_applications",
    {
      title: "Listar solicitudes comerciales",
      description:
        "Lista solicitudes del inbox comercial. Por defecto devuelve las solicitudes abiertas: new, reviewing y contacted.",
      inputSchema: {
        status: wholesaleApplicationListStatusSchema.describe(
          "Estado a listar. Usar open para new/reviewing/contacted, all para todas.",
        ),
        limit: limitSchema.describe("Cantidad máxima de solicitudes a devolver, entre 1 y 50."),
      },
    },
    async ({ status, limit }) => {
      const db = getDb();
      const filters =
        status === "all"
          ? undefined
          : status === "open"
            ? inArray(wholesaleApplications.status, ["new", "reviewing", "contacted"])
            : eq(wholesaleApplications.status, status);
      const rows = await db
        .select()
        .from(wholesaleApplications)
        .where(filters)
        .orderBy(desc(wholesaleApplications.updatedAt), desc(wholesaleApplications.submittedAt))
        .limit(limit);

      return textResult({
        count: rows.length,
        applications: rows.map((row) => ({
          id: row.id,
          storeName: row.storeName,
          cuit: row.cuit,
          email: row.email,
          province: row.province,
          city: row.city,
          instagram: row.instagram,
          website: row.website,
          estimatedVolume: row.estimatedVolume,
          status: row.status,
          submittedAt: serializeDate(row.submittedAt),
          updatedAt: serializeDate(row.updatedAt),
        })),
      });
    },
  );

  server.registerTool(
    "get_wholesale_application",
    {
      title: "Ver solicitud comercial",
      description: "Devuelve el detalle completo de una solicitud comercial por ID.",
      inputSchema: {
        id: uuidSchema.describe("ID de la solicitud comercial."),
      },
    },
    async ({ id }) => {
      const row = await getDb().query.wholesaleApplications.findFirst({
        where: eq(wholesaleApplications.id, id),
      });

      if (!row) {
        return textResult({ ok: false, error: "Solicitud comercial no encontrada." });
      }

      return textResult({
        ok: true,
        application: {
          id: row.id,
          storeName: row.storeName,
          cuit: row.cuit,
          email: row.email,
          province: row.province,
          city: row.city,
          instagram: row.instagram,
          website: row.website,
          estimatedVolume: row.estimatedVolume,
          message: row.message,
          status: row.status,
          reviewNotes: row.reviewNotes,
          submittedAt: serializeDate(row.submittedAt),
          createdAt: serializeDate(row.createdAt),
          updatedAt: serializeDate(row.updatedAt),
        },
      });
    },
  );

  server.registerTool(
    "update_wholesale_application_status",
    {
      title: "Actualizar estado de solicitud comercial",
      description:
        "Actualiza solamente el estado y las notas internas de una solicitud comercial. No envía emails ni convierte proveedores.",
      inputSchema: {
        id: uuidSchema.describe("ID de la solicitud comercial."),
        status: wholesaleApplicationStatusSchema.describe("Nuevo estado de la solicitud."),
        reviewNotes: z
          .string()
          .trim()
          .max(4000)
          .optional()
          .describe("Notas internas. Si se omite, conserva las notas existentes."),
      },
    },
    async ({ id, status, reviewNotes }) => {
      const db = getDb();
      const existing = await db.query.wholesaleApplications.findFirst({
        where: eq(wholesaleApplications.id, id),
      });

      if (!existing) {
        return textResult({ ok: false, error: "Solicitud comercial no encontrada." });
      }

      const [updated] = await db
        .update(wholesaleApplications)
        .set({
          status,
          reviewNotes: reviewNotes ?? existing.reviewNotes,
          updatedAt: new Date(),
        })
        .where(eq(wholesaleApplications.id, id))
        .returning();

      await logMcpWrite("mcp.update_wholesale_application_status", "wholesale_application", id, {
        previousStatus: existing.status,
        nextStatus: status,
        changedReviewNotes: reviewNotes !== undefined,
      });

      return textResult({
        ok: true,
        application: {
          id: updated.id,
          storeName: updated.storeName,
          email: updated.email,
          status: updated.status,
          reviewNotes: updated.reviewNotes,
          updatedAt: serializeDate(updated.updatedAt),
        },
      });
    },
  );

  server.registerTool(
    "list_contact_messages",
    {
      title: "Listar mensajes de contacto",
      description:
        "Lista mensajes del formulario de contacto. Por defecto devuelve mensajes abiertos: new y reviewed.",
      inputSchema: {
        status: contactMessageListStatusSchema.describe(
          "Estado a listar. Usar open para new/reviewed, all para todos.",
        ),
        limit: limitSchema.describe("Cantidad máxima de mensajes a devolver, entre 1 y 50."),
      },
    },
    async ({ status, limit }) => {
      const filters =
        status === "all"
          ? undefined
          : status === "open"
            ? inArray(contactMessages.status, ["new", "reviewed"])
            : eq(contactMessages.status, status);
      const rows = await getDb()
        .select()
        .from(contactMessages)
        .where(filters)
        .orderBy(desc(contactMessages.createdAt))
        .limit(limit);

      return textResult({
        count: rows.length,
        messages: rows.map((row) => ({
          id: row.id,
          fullName: row.fullName,
          email: row.email,
          subject: row.subject,
          message: row.message,
          status: row.status,
          createdAt: serializeDate(row.createdAt),
          updatedAt: serializeDate(row.updatedAt),
        })),
      });
    },
  );

  server.registerTool(
    "get_contact_message",
    {
      title: "Ver mensaje de contacto",
      description: "Devuelve el detalle completo de un mensaje de contacto por ID.",
      inputSchema: {
        id: uuidSchema.describe("ID del mensaje de contacto."),
      },
    },
    async ({ id }) => {
      const row = await getDb().query.contactMessages.findFirst({
        where: eq(contactMessages.id, id),
      });

      if (!row) {
        return textResult({ ok: false, error: "Mensaje de contacto no encontrado." });
      }

      return textResult({
        ok: true,
        message: {
          id: row.id,
          fullName: row.fullName,
          email: row.email,
          subject: row.subject,
          message: row.message,
          status: row.status,
          reviewNotes: row.reviewNotes,
          createdAt: serializeDate(row.createdAt),
          updatedAt: serializeDate(row.updatedAt),
        },
      });
    },
  );

  server.registerTool(
    "update_contact_message_status",
    {
      title: "Actualizar estado de mensaje de contacto",
      description:
        "Actualiza solamente el estado y las notas internas de un mensaje de contacto. No envía respuestas.",
      inputSchema: {
        id: uuidSchema.describe("ID del mensaje de contacto."),
        status: contactMessageStatusSchema.describe("Nuevo estado del mensaje."),
        reviewNotes: z
          .string()
          .trim()
          .max(4000)
          .optional()
          .describe("Notas internas. Si se omite, conserva las notas existentes."),
      },
    },
    async ({ id, status, reviewNotes }) => {
      const db = getDb();
      const existing = await db.query.contactMessages.findFirst({
        where: eq(contactMessages.id, id),
      });

      if (!existing) {
        return textResult({ ok: false, error: "Mensaje de contacto no encontrado." });
      }

      const [updated] = await db
        .update(contactMessages)
        .set({
          status,
          reviewNotes: reviewNotes ?? existing.reviewNotes,
          updatedAt: new Date(),
        })
        .where(eq(contactMessages.id, id))
        .returning();

      await logMcpWrite("mcp.update_contact_message_status", "contact_message", id, {
        previousStatus: existing.status,
        nextStatus: status,
        changedReviewNotes: reviewNotes !== undefined,
      });

      return textResult({
        ok: true,
        message: {
          id: updated.id,
          fullName: updated.fullName,
          email: updated.email,
          status: updated.status,
          reviewNotes: updated.reviewNotes,
          updatedAt: serializeDate(updated.updatedAt),
        },
      });
    },
  );

  return server;
}
