CREATE TYPE "vote_type" AS ENUM('upvote', 'downvote');--> statement-breakpoint
CREATE TABLE "post_user_votes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_user_votes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"post_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"vote_type" "vote_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "post_user_vote_unique" UNIQUE("post_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "post_user_votes" ADD CONSTRAINT "post_user_votes_post_id_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id");--> statement-breakpoint
ALTER TABLE "post_user_votes" ADD CONSTRAINT "post_user_votes_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");