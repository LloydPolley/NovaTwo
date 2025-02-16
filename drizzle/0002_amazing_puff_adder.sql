ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "followers" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "followers" ALTER COLUMN "follower_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "followers" ALTER COLUMN "following_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "user_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "track_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "releases" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "releases" ALTER COLUMN "artist_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "artist_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "release_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE integer;