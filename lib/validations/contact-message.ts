import { z } from "zod";

export const contactMessageSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresá tu nombre."),
  email: z.email("Ingresá un email válido."),
  subject: z.string().trim().min(1).default("Consulta general"),
  message: z.string().trim().min(5, "Ingresá un mensaje."),
});
