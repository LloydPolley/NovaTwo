ALTER TABLE "tracks" RENAME COLUMN "uid" TO "user_uid";--> statement-breakpoint
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;