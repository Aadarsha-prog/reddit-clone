ALTER TABLE "post" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");