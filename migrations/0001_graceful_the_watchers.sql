ALTER TABLE "users" ADD COLUMN "display_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "displayName";