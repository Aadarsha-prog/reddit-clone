ALTER TABLE "post" ADD COLUMN "total_upvotes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "total_downvotes" integer DEFAULT 0 NOT NULL;