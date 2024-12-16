CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"artist" varchar(255) NOT NULL,
	"album" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"releaseDate" varchar(255) NOT NULL
);
