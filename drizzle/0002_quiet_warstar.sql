CREATE TYPE "public"."provider_type" AS ENUM('wholesaler', 'distributor');--> statement-breakpoint
ALTER TABLE "wholesalers" ADD COLUMN "provider_type" "provider_type" DEFAULT 'distributor' NOT NULL;--> statement-breakpoint
ALTER TABLE "wholesalers" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "wholesalers" ADD COLUMN "latitude" text;--> statement-breakpoint
ALTER TABLE "wholesalers" ADD COLUMN "longitude" text;