import {
  parsePhoneNumberFromString,
  getCountries,
  isSupportedCountry,
  type PhoneNumber,
} from 'libphonenumber-js';
import { countryCodes } from '@/shared/data/countries';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIMEZONE_TO_ISO: Record<string, string> = {
  'Asia/Karachi': 'pk', 'Asia/Kolkata': 'in', 'Asia/Dubai': 'ae',
  'Asia/Riyadh': 'sa', 'Asia/Doha': 'qa', 'Asia/Kuwait': 'kw',
  'Asia/Bahrain': 'bh', 'Asia/Muscat': 'om', 'Asia/Amman': 'jo',
  'Asia/Beirut': 'lb', 'Asia/Baghdad': 'iq', 'Asia/Tehran': 'ir',
  'Asia/Jerusalem': 'il', 'Asia/Dhaka': 'bd', 'Asia/Colombo': 'lk',
  'Asia/Kathmandu': 'np', 'Asia/Kabul': 'af', 'Asia/Tashkent': 'uz',
  'Asia/Almaty': 'kz', 'Asia/Singapore': 'sg', 'Asia/Kuala_Lumpur': 'my',
  'Asia/Jakarta': 'id', 'Asia/Manila': 'ph', 'Asia/Bangkok': 'th',
  'Asia/Ho_Chi_Minh': 'vn', 'Asia/Hong_Kong': 'hk', 'Asia/Taipei': 'tw',
  'Asia/Shanghai': 'cn', 'Asia/Tokyo': 'jp', 'Asia/Seoul': 'kr',
  'Europe/London': 'gb', 'Europe/Dublin': 'ie', 'Europe/Paris': 'fr',
  'Europe/Berlin': 'de', 'Europe/Amsterdam': 'nl', 'Europe/Brussels': 'be',
  'Europe/Zurich': 'ch', 'Europe/Vienna': 'at', 'Europe/Rome': 'it',
  'Europe/Madrid': 'es', 'Europe/Lisbon': 'pt', 'Europe/Stockholm': 'se',
  'Europe/Oslo': 'no', 'Europe/Copenhagen': 'dk', 'Europe/Helsinki': 'fi',
  'Europe/Warsaw': 'pl', 'Europe/Prague': 'cz', 'Europe/Bucharest': 'ro',
  'Europe/Budapest': 'hu', 'Europe/Athens': 'gr', 'Europe/Istanbul': 'tr',
  'Europe/Moscow': 'ru', 'Europe/Kyiv': 'ua',
  'Africa/Cairo': 'eg', 'Africa/Johannesburg': 'za', 'Africa/Lagos': 'ng',
  'Africa/Nairobi': 'ke', 'Africa/Accra': 'gh',
  'America/New_York': 'us', 'America/Chicago': 'us', 'America/Denver': 'us',
  'America/Los_Angeles': 'us', 'America/Phoenix': 'us', 'America/Toronto': 'ca',
  'America/Vancouver': 'ca', 'America/Mexico_City': 'mx', 'America/Sao_Paulo': 'br',
  'America/Buenos_Aires': 'ar', 'America/Bogota': 'co', 'America/Santiago': 'cl',
  'America/Lima': 'pe', 'Australia/Sydney': 'au', 'Australia/Melbourne': 'au',
  'Pacific/Auckland': 'nz',
};

interface CountryEntry {
  iso: string;
  name: string;
}

function lookupCountryName(iso: string | undefined): CountryEntry | null {
  if (!iso) return null;
  return countryCodes.find((c) => c.iso === iso.toLowerCase()) ?? null;
}

function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

function pushHint(hints: string[], iso: string | null | undefined): void {
  if (!iso) return;
  const lower = iso.toLowerCase();
  if (isSupportedCountry(lower.toUpperCase()) && !hints.includes(lower)) {
    hints.push(lower);
  }
}

function regionFromLocale(locale: string | undefined): string | null {
  if (!locale) return null;
  const part = String(locale).split('-').pop()?.toLowerCase();
  return part && part.length === 2 ? part : null;
}

function countryFromTimezone(tz: string | undefined): string | null {
  if (!tz) return null;
  if (TIMEZONE_TO_ISO[tz]) return TIMEZONE_TO_ISO[tz];
  if (tz.startsWith('Asia/Karachi') || tz.startsWith('Asia/Islamabad')) return 'pk';
  return null;
}

export function getClientCountryHints(): string[] {
  const hints: string[] = [];

  if (typeof Intl !== 'undefined') {
    try {
      pushHint(hints, countryFromTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone));
    } catch { /* ignore */ }
  }

  if (typeof navigator !== 'undefined') {
    pushHint(hints, regionFromLocale(navigator.language));
    for (const lang of navigator.languages || []) {
      pushHint(hints, regionFromLocale(lang));
    }
  }

  return hints;
}

export interface CountryHintContext {
  countryHints?: string[] | string;
  timezone?: string;
  acceptLanguage?: string;
}

export function mergeCountryHints({ countryHints, timezone, acceptLanguage }: CountryHintContext = {}): string[] {
  const hints: string[] = [];

  if (Array.isArray(countryHints)) {
    for (const h of countryHints) pushHint(hints, h);
  } else if (countryHints) {
    pushHint(hints, countryHints);
  }

  pushHint(hints, countryFromTimezone(timezone));

  if (acceptLanguage) {
    const primary = acceptLanguage.split(',')[0]?.trim();
    pushHint(hints, regionFromLocale(primary));
  }

  return hints;
}

const EMAIL_INVALID = 'Please enter a valid email address.';

function looksLikeEmailInput(trimmed: string): boolean {
  return /[a-zA-Z]/.test(trimmed);
}

export function inferContactKind(raw: string): 'email' | 'phone' | null {
  const trimmed = (raw || '').trim();
  if (!trimmed) return null;
  if (trimmed.includes('@')) return 'email';
  if (looksLikeEmailInput(trimmed)) return 'email';
  if (/^[\d+\s().-]+$/.test(trimmed)) return 'phone';
  return 'phone';
}

export interface PhoneContactResult {
  ok: true;
  kind: 'phone';
  contactType: 'whatsapp';
  phone: string;
  country_dial: string;
  country_iso: string | undefined;
  country_name: string;
  international: string;
  e164Digits: string;
}

export interface EmailContactResult {
  ok: true;
  kind: 'email';
  contactType: 'email';
  email: string;
}

export interface ContactError {
  ok: false;
  kind?: 'email' | 'phone';
  error: string;
}

export type ResolveContactResult = PhoneContactResult | EmailContactResult | ContactError;

function phoneResult(parsed: PhoneNumber): PhoneContactResult {
  const iso = parsed.country?.toLowerCase();
  const entry = lookupCountryName(iso);
  return {
    ok: true,
    kind: 'phone',
    contactType: 'whatsapp',
    phone: parsed.nationalNumber as string,
    country_dial: `+${parsed.countryCallingCode}`,
    country_iso: iso,
    country_name: entry?.name || iso?.toUpperCase() || '',
    international: parsed.formatInternational(),
    e164Digits: parsed.number.replace('+', ''),
  };
}

function allValidParses(trimmed: string): PhoneNumber[] {
  const matches: PhoneNumber[] = [];
  for (const iso of getCountries()) {
    const parsed = parsePhoneNumberFromString(trimmed, iso);
    if (parsed?.isValid()) matches.push(parsed);
  }
  return matches;
}

type ParseLocalResult =
  | { status: 'ok'; parsed: PhoneNumber }
  | { status: 'invalid' | 'ambiguous' };

function parseLocalPhone(trimmed: string, preferredIsos: string[]): ParseLocalResult {
  const all = allValidParses(trimmed);
  if (all.length === 0) return { status: 'invalid' };

  const uniqueE164 = [...new Set(all.map((p) => p.number))];
  if (uniqueE164.length > 1) {
    const preferred = preferredIsos.map((iso) => iso.toUpperCase());
    for (const iso of preferred) {
      const hit = all.find((p) => p.country === iso);
      if (hit) return { status: 'ok', parsed: hit };
    }
    return { status: 'ambiguous' };
  }

  return { status: 'ok', parsed: all[0] };
}

const PHONE_INVALID = 'Please enter a valid phone / WhatsApp number.';
const PHONE_AMBIGUOUS =
  'This number matches more than one country. Please start with + and your country code (e.g. +92, +1, +44).';

export function resolveContact(raw: string, context: CountryHintContext = {}): ResolveContactResult {
  const trimmed = (raw || '').trim();
  if (!trimmed) {
    return { ok: false, error: 'Please enter your email address or WhatsApp number.' };
  }

  if (trimmed.includes('@')) {
    const email = normalizeEmail(trimmed);
    if (!EMAIL_REGEX.test(email)) {
      return { ok: false, kind: 'email', error: EMAIL_INVALID };
    }
    return { ok: true, kind: 'email', contactType: 'email', email };
  }

  if (trimmed.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(trimmed);
    if (!parsed?.isValid()) {
      return { ok: false, kind: 'phone', error: PHONE_INVALID };
    }
    return phoneResult(parsed);
  }

  if (looksLikeEmailInput(trimmed)) {
    return { ok: false, kind: 'email', error: EMAIL_INVALID };
  }

  const hints = mergeCountryHints(context);
  const local = parseLocalPhone(trimmed, hints);

  if (local.status === 'ok') return phoneResult(local.parsed);
  if (local.status === 'ambiguous') {
    return { ok: false, kind: 'phone', error: PHONE_AMBIGUOUS };
  }
  return { ok: false, kind: 'phone', error: PHONE_INVALID };
}

const CONTACT_FORMAT_ERROR_MESSAGES = new Set([EMAIL_INVALID, PHONE_INVALID]);

export function isContactFormatError(message: string): boolean {
  return CONTACT_FORMAT_ERROR_MESSAGES.has(message);
}

export function getContactFormatError(raw: string, context: CountryHintContext = {}): string | null {
  const trimmed = (raw || '').trim();
  if (!trimmed) return null;

  const resolved = resolveContact(trimmed, context);
  if (resolved.ok) return null;
  if (isContactFormatError(resolved.error)) return resolved.error;
  return null;
}

export interface InquiryRecord {
  phone?: string;
  country_dial?: string;
}

export function formatPhoneInternational(inquiry: InquiryRecord): string {
  if (!inquiry?.phone) return '—';
  const dialDigits = (inquiry.country_dial || '').replace(/\D/g, '');
  const nationalDigits = (inquiry.phone || '').replace(/\D/g, '');
  if (!dialDigits || !nationalDigits) {
    return `${inquiry.country_dial || ''} ${inquiry.phone || ''}`.trim() || '—';
  }
  const parsed = parsePhoneNumberFromString(`+${dialDigits}${nationalDigits}`);
  if (parsed?.isValid()) return parsed.formatInternational();
  return `${inquiry.country_dial} ${inquiry.phone}`.trim();
}

export function phoneToE164Digits(inquiry: InquiryRecord): string | null {
  const dialDigits = (inquiry.country_dial || '').replace(/\D/g, '');
  const nationalDigits = (inquiry.phone || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!dialDigits || nationalDigits.length < 6) return null;
  return `${dialDigits}${nationalDigits}`;
}
