// ─── inquiries table contract ────────────────────────────────────────────────
// Keep in sync with supabase/migrations/*_inquiries_contact_type.sql
// and the CHECK constraint inquiries_contact_type_check in Postgres.

/** Values allowed by inquiries.contact_type in Postgres. */
export const INQUIRY_DB_CONTACT_TYPES = Object.freeze(['email', 'whatsapp']);

/** Contact picker values on the /order form UI (same as DB for non-legacy rows). */
export const INQUIRY_UI_CONTACT_TYPES = Object.freeze(['whatsapp', 'email']);

/** Normalize UI / legacy values to the DB contact_type column before INSERT. */
export function toInquiryDbContactType(uiContactType) {
  if (uiContactType === 'email') return 'email';
  return 'whatsapp';
}

export function isEmailContactType(contactType) {
  return contactType === 'email';
}

export function isWhatsAppContactType(contactType) {
  return contactType === 'whatsapp' || contactType === 'phone';
}
