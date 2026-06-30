-- Backfill legacy rows that used contact_type 'phone' before the whatsapp rename.
-- Order matters: drop the old constraint BEFORE updating rows to 'whatsapp'.

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_contact_type_check;

UPDATE public.inquiries
SET contact_type = 'whatsapp'
WHERE contact_type = 'phone';

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_contact_type_check
  CHECK (contact_type IN ('email', 'whatsapp'));

COMMENT ON COLUMN public.inquiries.contact_type IS
  'Allowed: email, whatsapp.';
