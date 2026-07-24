-- ============================================================================
-- Add inquiries.custom_domain and inquiries.deadline
-- ============================================================================
--   custom_domain — free-text domain when domain_id = 'other' (mirrors the
--                   existing custom_service column). Empty string otherwise.
--   deadline       — client's requested due date (date-only). Collected on the
--                   order form; nullable so pre-existing rows stay valid.
-- ============================================================================

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS custom_domain text NOT NULL DEFAULT '';

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS deadline date;

COMMENT ON COLUMN public.inquiries.custom_domain IS
  'Free-text academic domain used when domain_id = ''other''; empty otherwise.';

COMMENT ON COLUMN public.inquiries.deadline IS
  'Client-requested due date (date-only).';
