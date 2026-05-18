import { z } from "zod";

export const wholesaleApplicationSchema = z.object({
  storeName: z.string().trim().min(2, "Ingresá el nombre del comercio."),
  cuit: z
    .string()
    .trim()
    .min(11, "El CUIT debe tener 11 dígitos.")
    .transform((value) => value.replace(/\D/g, "")),
  email: z.email("Ingresá un email válido."),
  province: z.string().trim().min(1, "Seleccioná una provincia."),
  city: z.string().trim().min(2, "Ingresá la ciudad."),
  instagram: z.string().trim().min(2, "Ingresá Instagram."),
  website: z.union([z.url("Ingresá una URL válida."), z.literal(""), z.null()]).optional(),
  estimatedVolume: z.string().trim().min(1, "Seleccioná el volumen."),
  message: z.string().trim().optional().default(""),
});
