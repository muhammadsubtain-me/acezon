import { mergeCountryHints, resolveContact, type CountryHintContext } from '@/features/orders/services/resolve-contact';
import type { NextRequest } from 'next/server';

interface OrderBody {
  contact_raw?: string;
  country_hints?: string[] | string;
  timezone?: string;
  [key: string]: unknown;
}

interface ResolvedContactEmail {
  isEmail: true;
  contact_type: 'email';
  contact: string;
  phone: string;
  country_dial: string;
  country_iso: string;
  country_name: string;
  rateLimitBody: { contact_type: 'email'; contact: string };
}

interface ResolvedContactPhone {
  isEmail: false;
  contact_type: 'whatsapp';
  contact: null;
  phone: string;
  country_dial: string;
  country_iso: string | undefined;
  country_name: string;
  e164Digits: string;
  rateLimitBody: { contact_type: 'whatsapp'; phone: string; country_dial: string };
}

interface ResolvedContactError {
  error: string;
}

export type ResolveSubmitContactResult = ResolvedContactEmail | ResolvedContactPhone | ResolvedContactError;

function contactContextFromRequest(request: NextRequest, body: OrderBody): CountryHintContext {
  return {
    countryHints: mergeCountryHints({
      countryHints: body.country_hints,
      timezone: body.timezone,
      acceptLanguage: request.headers.get('accept-language') ?? undefined,
    }),
    timezone: body.timezone,
    acceptLanguage: request.headers.get('accept-language') ?? undefined,
  };
}

export function resolveSubmitContact(body: OrderBody, request: NextRequest): ResolveSubmitContactResult {
  const raw = body.contact_raw?.trim();
  if (!raw) {
    return { error: 'Please enter your email address or WhatsApp number.' };
  }

  const resolved = resolveContact(raw, contactContextFromRequest(request, body));
  if (!resolved.ok) return { error: resolved.error };

  if (resolved.kind === 'email') {
    return {
      isEmail: true,
      contact_type: 'email',
      contact: resolved.email,
      phone: '',
      country_dial: '',
      country_iso: '',
      country_name: '',
      rateLimitBody: { contact_type: 'email', contact: resolved.email },
    };
  }

  return {
    isEmail: false,
    contact_type: 'whatsapp',
    contact: null,
    phone: resolved.phone,
    country_dial: resolved.country_dial,
    country_iso: resolved.country_iso,
    country_name: resolved.country_name,
    e164Digits: resolved.e164Digits,
    rateLimitBody: {
      contact_type: 'whatsapp',
      phone: resolved.phone,
      country_dial: resolved.country_dial,
    },
  };
}
