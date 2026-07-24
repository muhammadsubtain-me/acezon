import { logError, logWarn } from '@/shared/logger/logger';

export interface WhatsAppCheckResult {
  configured: boolean;
  valid: boolean;
  error?: string;
  serviceError?: boolean;
}

interface CacheEntry {
  result: WhatsAppCheckResult;
  expiresAt: number;
}

const validationCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

function getCachedResult(contact: string): WhatsAppCheckResult | null {
  const hit = validationCache.get(contact);
  if (!hit || Date.now() > hit.expiresAt) {
    validationCache.delete(contact);
    return null;
  }
  return hit.result;
}

function setCachedResult(contact: string, result: WhatsAppCheckResult): void {
  if (result.serviceError) return;
  validationCache.set(contact, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

export function toWhapiContact(dial: string | null | undefined, phone: string | null | undefined): string | null {
  const dialDigits = (dial || '').replace(/\D/g, '');
  const phoneDigits = (phone || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!dialDigits || phoneDigits.length < 6) return null;
  return `${dialDigits}${phoneDigits}`;
}

export async function checkWhatsAppNumber(contact: string): Promise<WhatsAppCheckResult> {
  const apiUrl = process.env.WHATSAPP_API_URL;

  if (!apiUrl) {
    logWarn('whapi', 'WHATSAPP_API_URL not set — skipping WhatsApp check');
    return { configured: false, valid: true };
  }

  if (!contact) {
    return { configured: true, valid: false, error: 'Invalid phone number.' };
  }

  const cached = getCachedResult(contact);
  if (cached) return cached;

  try {
    const res = await fetch(`${apiUrl}/validate`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ phone: contact }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      logError('whapi', `HTTP ${res.status}`, body.slice(0, 200));
      return {
        configured: true,
        valid: false,
        error: 'Could not verify WhatsApp number. Please try again in a moment.',
        serviceError: true,
      };
    }

    const data: { success: boolean; exists?: boolean } = await res.json();

    if (data.success) {
      if (data.exists) {
        const result: WhatsAppCheckResult = { configured: true, valid: true };
        setCachedResult(contact, result);
        return result;
      } else {
        const result: WhatsAppCheckResult = {
          configured: true,
          valid: false,
          error: 'This number is not registered on WhatsApp. Please check the number or use email instead.',
        };
        setCachedResult(contact, result);
        return result;
      }
    }

    logError('whapi', 'Unexpected response', data);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify WhatsApp number. Please try again.',
      serviceError: true,
    };
  } catch (err) {
    logError('whapi', err);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify WhatsApp number. Please try again.',
      serviceError: true,
    };
  }
}
