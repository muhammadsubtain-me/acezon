-- Remove inquiries.subject (collected via description instead)
-- Run after deploying app changes that no longer read/write this column.

ALTER TABLE public.inquiries
  DROP COLUMN IF EXISTS subject;
