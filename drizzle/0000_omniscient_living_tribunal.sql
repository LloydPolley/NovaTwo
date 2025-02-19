CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY DEFAULT '929397b6-84b2-44c6-8850-1ba387d56460' NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
