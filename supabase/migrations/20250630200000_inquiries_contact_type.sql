-- ============================================================================
-- inquiries.contact_type — application contract
-- ============================================================================
-- Keep in sync with src/lib/config/inquiries.js
--
-- DB values:
--   email     — client chose email on the order form
--   whatsapp  — client chose WhatsApp / phone on the order form
--
-- attachments: optional json/jsonb array of flat Storage object paths.
-- An empty array [] is valid (no files attached).
-- ============================================================================

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_contact_type_check;

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_contact_type_check
  CHECK (contact_type IN ('email', 'whatsapp'));

COMMENT ON COLUMN public.inquiries.contact_type IS
  'Allowed: email, whatsapp.';

COMMENT ON COLUMN public.inquiries.attachments IS
  'Optional array of flat inquiry-files Storage paths; empty array is valid.';
