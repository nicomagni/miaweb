ALTER TYPE "public"."wholesaler_status" RENAME TO "provider_status";--> statement-breakpoint
ALTER TABLE "wholesalers" RENAME TO "providers";--> statement-breakpoint
ALTER TABLE "providers" DROP CONSTRAINT "wholesalers_slug_unique";--> statement-breakpoint
ALTER TABLE "providers" DROP CONSTRAINT "wholesalers_image_asset_id_media_assets_id_fk";
--> statement-breakpoint
ALTER TABLE "providers" DROP CONSTRAINT "wholesalers_source_application_id_wholesale_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "providers" DROP CONSTRAINT "wholesalers_created_by_admin_users_id_fk";
--> statement-breakpoint
ALTER TABLE "providers" DROP CONSTRAINT "wholesalers_updated_by_admin_users_id_fk";
--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_image_asset_id_media_assets_id_fk" FOREIGN KEY ("image_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_source_application_id_wholesale_applications_id_fk" FOREIGN KEY ("source_application_id") REFERENCES "public"."wholesale_applications"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_created_by_admin_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_updated_by_admin_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_slug_unique" UNIQUE("slug");