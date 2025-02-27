CREATE TABLE "tracks" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"uid" varchar(255) NOT NULL,
	"release_id" varchar(255) NOT NULL,
	"artwork" varchar(255) NOT NULL,
	"audio" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "releases" RENAME COLUMN "id" TO "release_id";--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_uid_users_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_release_id_releases_release_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("release_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_artwork_releases_artwork_fk" FOREIGN KEY ("artwork") REFERENCES "public"."releases"("artwork") ON DELETE no action ON UPDATE no action;