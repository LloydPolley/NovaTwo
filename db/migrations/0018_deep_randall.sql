ALTER TABLE "followers" RENAME COLUMN "follower_id" TO "uid";--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_uid_users_id_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;