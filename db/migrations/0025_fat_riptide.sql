ALTER TABLE "releases" ADD COLUMN "artist" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ADD COLUMN "artist" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ADD COLUMN "artwork" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "spotify";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "instagram";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "soundcloud";