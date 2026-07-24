-- Domain is inferred from description at claim time; no longer collected on the order form.
ALTER TABLE public.inquiries
  DROP COLUMN IF EXISTS domain_id;
