-- ============================================================================
-- inquiries — add rejected status (reject from inbox without claiming)
-- ============================================================================
-- Allowed statuses: new | claimed | in_progress | completed | rejected
-- Rejected orders leave Inbox; visible in Team Activity.
-- ============================================================================

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS rejected_by text,
  ADD COLUMN IF NOT EXISTS rejected_at timestamptz;

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_status_check;

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_status_check
  CHECK (status IN ('new', 'claimed', 'in_progress', 'completed', 'rejected'));

COMMENT ON COLUMN public.inquiries.rejected_by IS
  'Admin display name who rejected the inquiry from inbox.';

COMMENT ON COLUMN public.inquiries.rejected_at IS
  'When the inquiry was rejected.';
