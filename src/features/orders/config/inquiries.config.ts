// ─── inquiries table contract ────────────────────────────────────────────────
// Keep in sync with supabase/migrations/*_inquiries_contact_type.sql
// and the CHECK constraint inquiries_contact_type_check in Postgres.

export type InquiryContactType = 'email' | 'whatsapp';

/** Normalize UI / legacy values to the DB contact_type column before INSERT. */
export function toInquiryDbContactType(uiContactType: string): InquiryContactType {
  if (uiContactType === 'email') return 'email';
  return 'whatsapp';
}

export function isEmailContactType(contactType: string): boolean {
  return contactType === 'email';
}
