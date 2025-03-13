ALTER TABLE "tracks" RENAME COLUMN "user_uid" TO "uid";--> statement-breakpoint
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "tracks" ADD COLUMN "mix" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ADD COLUMN "duration" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_uid_users_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;