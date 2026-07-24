-- Drop inquiries.custom_domain (Other domain is stored as domain_id = 'other' only)
ALTER TABLE public.inquiries
  DROP COLUMN IF EXISTS custom_domain;
