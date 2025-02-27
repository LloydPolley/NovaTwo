ALTER TABLE "releases" RENAME COLUMN "release_id" TO "id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "releases" DROP CONSTRAINT "releases_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_release_id_releases_release_id_fk";
--> statement-breakpoint
ALTER TABLE "releases" ADD CONSTRAINT "releases_uid_users_id_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;