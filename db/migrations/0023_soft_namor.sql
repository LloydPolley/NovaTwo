DROP INDEX "unique_like";--> statement-breakpoint
ALTER TABLE "releases" DROP COLUMN "artist";--> statement-breakpoint
ALTER TABLE "tracks" DROP COLUMN "artist";--> statement-breakpoint
ALTER TABLE "tracks" DROP COLUMN "artwork";--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_uid_track_id_unique" UNIQUE("uid","track_id");