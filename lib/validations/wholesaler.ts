import { z } from "zod";

export const providerSchema = z.object({
  name: z.string().trim().min(2),
  providerType: z.enum(["wholesaler", "distributor"]).default("distributor"),
  contactName: z.string().trim().optional().default(""),
  imageAssetId: z.string().trim().uuid().or(z.literal("")).optional().default(""),
  email: z.union([z.email(), z.literal(""), z.null()]).optional(),
  phone: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
  province: z.string().trim().optional().default(""),
  country: z.string().trim().min(2).default("AR"),
  instagram: z.string().trim().optional().default(""),
  website: z.union([z.url(), z.literal(""), z.null()]).optional(),
  latitude: z.string().trim().optional().default(""),
  longitude: z.string().trim().optional().default(""),
  status: z.enum(["lead", "approved", "inactive", "rejected"]),
  internalNotes: z.string().trim().optional().default(""),
});

export const wholesalerSchema = providerSchema;
