import { z } from "zod";

export const mediaUploadSchema = z.object({
  bucket: z.enum(["site-public", "site-private"]).default("site-public"),
  kind: z.enum([
    "general",
    "collection-cover",
    "collection-color-card",
    "collection-item",
    "provider-image",
  ]),
  title: z.string().trim().optional().default(""),
  altText: z.string().trim().optional().default(""),
});
