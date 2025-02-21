CREATE TABLE "users" (
	"uid" varchar(255) PRIMARY KEY NOT NULL,
	"displayName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
