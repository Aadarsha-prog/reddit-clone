ALTER TABLE "post"
ADD COLUMN "slug" text NOT NULL DEFAULT gen_random_uuid ()::text;

ALTER TABLE "post" ADD CONSTRAINT "post_slug_key" UNIQUE ("slug");