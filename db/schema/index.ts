import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const adminRoleEnum = pgEnum("admin_role", ["superadmin", "editor", "sales"]);

export const collectionStatusEnum = pgEnum("collection_status", ["draft", "published", "archived"]);

export const providerStatusEnum = pgEnum("provider_status", [
  "lead",
  "approved",
  "inactive",
  "rejected",
]);
export const wholesalerStatusEnum = providerStatusEnum;

export const providerTypeEnum = pgEnum("provider_type", ["wholesaler", "distributor"]);

export const wholesaleApplicationStatusEnum = pgEnum("wholesale_application_status", [
  "new",
  "reviewing",
  "contacted",
  "approved",
  "rejected",
  "spam",
]);

export const contactMessageStatusEnum = pgEnum("contact_message_status", [
  "new",
  "reviewed",
  "resolved",
  "spam",
]);

export const mediaAssetKindEnum = pgEnum("media_asset_kind", [
  "general",
  "collection-cover",
  "collection-color-card",
  "collection-item",
  "provider-image",
]);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: adminRoleEnum("role").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  bucket: text("bucket").notNull(),
  objectPath: text("object_path").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type"),
  sizeBytes: integer("size_bytes"),
  width: integer("width"),
  height: integer("height"),
  kind: mediaAssetKindEnum("kind").notNull().default("general"),
  title: text("title"),
  altText: text("alt_text"),
  isPublic: boolean("is_public").notNull().default(true),
  createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description"),
  longDescription: text("long_description"),
  status: collectionStatusEnum("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  coverImageAssetId: uuid("cover_image_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  coverImagePath: text("cover_image_path"),
  colorCardAssetId: uuid("color_card_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  colorCardPath: text("color_card_path"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
  updatedBy: uuid("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const collectionItems = pgTable("collection_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sku: text("sku"),
  imageAssetId: uuid("image_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  imagePath: text("image_path"),
  colorName: text("color_name"),
  colorHex: text("color_hex"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const wholesaleApplications = pgTable("wholesale_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeName: text("store_name").notNull(),
  cuit: text("cuit"),
  email: text("email").notNull(),
  province: text("province"),
  city: text("city"),
  instagram: text("instagram"),
  website: text("website"),
  estimatedVolume: text("estimated_volume"),
  message: text("message"),
  status: wholesaleApplicationStatusEnum("status").notNull().default("new"),
  assignedTo: uuid("assigned_to").references(() => adminUsers.id, { onDelete: "set null" }),
  reviewNotes: text("review_notes"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: contactMessageStatusEnum("status").notNull().default("new"),
  reviewNotes: text("review_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const providers = pgTable("providers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  providerType: providerTypeEnum("provider_type").notNull().default("distributor"),
  contactName: text("contact_name"),
  imageAssetId: uuid("image_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  province: text("province"),
  country: text("country").notNull().default("AR"),
  instagram: text("instagram"),
  website: text("website"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  status: providerStatusEnum("status").notNull().default("lead"),
  sourceApplicationId: uuid("source_application_id").references(() => wholesaleApplications.id, {
    onDelete: "set null",
  }),
  internalNotes: text("internal_notes"),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
  updatedBy: uuid("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const wholesalers = providers;

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorAdminUserId: uuid("actor_admin_user_id").references(() => adminUsers.id, {
    onDelete: "set null",
  }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id"),
  summary: jsonb("summary").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
