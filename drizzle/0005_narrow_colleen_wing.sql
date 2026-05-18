CREATE TYPE "public"."media_asset_kind" AS ENUM('general', 'collection-cover', 'collection-color-card', 'collection-item', 'provider-image');--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bucket" text NOT NULL,
	"object_path" text NOT NULL,
	"file_name" text NOT NULL,
	"mime_type" text,
	"size_bytes" integer,
	"width" integer,
	"height" integer,
	"kind" "media_asset_kind" DEFAULT 'general' NOT NULL,
	"title" text,
	"alt_text" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collection_items" ADD COLUMN "image_asset_id" uuid;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "cover_image_asset_id" uuid;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "color_card_asset_id" uuid;--> statement-breakpoint
ALTER TABLE "wholesalers" ADD COLUMN "image_asset_id" uuid;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_created_by_admin_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_image_asset_id_media_assets_id_fk" FOREIGN KEY ("image_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_cover_image_asset_id_media_assets_id_fk" FOREIGN KEY ("cover_image_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_color_card_asset_id_media_assets_id_fk" FOREIGN KEY ("color_card_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wholesalers" ADD CONSTRAINT "wholesalers_image_asset_id_media_assets_id_fk" FOREIGN KEY ("image_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;