import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().trim().min(2),
  shortDescription: z.string().trim().optional().default(""),
  longDescription: z.string().trim().optional().default(""),
  status: z.enum(["draft", "published", "archived"]),
  sortOrder: z.coerce.number().int().default(0),
  coverImageAssetId: z.string().trim().uuid().or(z.literal("")).optional().default(""),
  coverImagePath: z.string().trim().optional().default(""),
  colorCardAssetId: z.string().trim().uuid().or(z.literal("")).optional().default(""),
  colorCardPath: z.string().trim().optional().default(""),
  seoTitle: z.string().trim().optional().default(""),
  seoDescription: z.string().trim().optional().default(""),
});

export const collectionItemSchema = z.object({
  name: z.string().trim().min(1),
  sku: z.string().trim().optional().default(""),
  imageAssetId: z.string().trim().uuid().or(z.literal("")).optional().default(""),
  imagePath: z.string().trim().optional().default(""),
  colorName: z.string().trim().optional().default(""),
  colorHex: z.string().trim().optional().default(""),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});
