ALTER TABLE "users" ADD COLUMN "spotify" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "instagram" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "soundcloud" varchar(255);--> statement-breakpoint
ALTER TABLE "releases" DROP COLUMN "artist";--> statement-breakpoint
ALTER TABLE "tracks" DROP COLUMN "artist";--> statement-breakpoint
ALTER TABLE "tracks" DROP COLUMN "artwork";