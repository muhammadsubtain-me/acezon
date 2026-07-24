-- ============================================================================
-- inquiries — add delivered status + delivery token + feedback columns
-- ============================================================================

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS delivered_by text,
  ADD COLUMN IF NOT EXISTS delivery_token uuid DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS delivery_token_used_at timestamptz,
  ADD COLUMN IF NOT EXISTS feedback_rating smallint,
  ADD COLUMN IF NOT EXISTS feedback_text text,
  ADD COLUMN IF NOT EXISTS feedback_submitted_at timestamptz;

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_feedback_rating_check
  CHECK (feedback_rating IS NULL OR (feedback_rating >= 1 AND feedback_rating <= 5));

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_status_check;

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_status_check
  CHECK (status IN ('new', 'claimed', 'in_progress', 'delivered', 'completed', 'rejected'));

-- Ensure delivery_token is unique
CREATE UNIQUE INDEX IF NOT EXISTS inquiries_delivery_token_idx ON public.inquiries (delivery_token);

COMMENT ON COLUMN public.inquiries.delivered_at        IS 'When admin marked the order as delivered.';
COMMENT ON COLUMN public.inquiries.delivered_by        IS 'Admin display name who marked the order as delivered.';
COMMENT ON COLUMN public.inquiries.delivery_token      IS 'Single-use UUID sent to client for feedback/confirmation.';
COMMENT ON COLUMN public.inquiries.delivery_token_used_at IS 'When the client used the delivery token (burns it).';
COMMENT ON COLUMN public.inquiries.feedback_rating     IS '1–5 star rating submitted by client.';
COMMENT ON COLUMN public.inquiries.feedback_text       IS 'Optional review text submitted by client.';
COMMENT ON COLUMN public.inquiries.feedback_submitted_at IS 'When client submitted feedback.';
