-- ============================================================================
-- Remove inquiries.name (privacy)
-- ============================================================================
-- Client names are no longer collected — the contact (email / WhatsApp) is
-- sufficient to identify a client. Drop the column so we stop storing PII we
-- don't need. This is destructive: existing name values are discarded.
-- ============================================================================

ALTER TABLE public.inquiries
  DROP COLUMN IF EXISTS name;
