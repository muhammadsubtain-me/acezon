
-- Backfill legacy inquiries and prevent feedback links from being created with
-- a missing delivery token.
UPDATE public.inquiries
SET delivery_token = gen_random_uuid()
WHERE delivery_token IS NULL;

ALTER TABLE public.inquiries
  ALTER COLUMN delivery_token SET NOT NULL;
