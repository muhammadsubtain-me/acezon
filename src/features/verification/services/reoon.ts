import { logError, logWarn } from '@/shared/logger/logger';

const REOON_VERIFY_URL = 'https://emailverifier.reoon.com/api/v1/verify';
const REOON_MODE = 'power';
const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNVERIFIED_ERROR =
  'This email address could not be verified. Please check it or use WhatsApp instead.';
const ACCEPTED_STATUSES = new Set(['valid', 'safe', 'role_account', 'catch_all', 'inbox_full']);

export interface EmailCheckResult {
  configured: boolean;
  valid: boolean;
  error?: string;
  serviceError?: boolean;
}

interface CacheEntry {
  result: EmailCheckResult;
  expiresAt: number;
}

const validationCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

function getApiKey(): string | undefined {
  return process.env.REOON_EMAIL_VERIFIER_KEY?.trim();
}

function getCachedResult(email: string): EmailCheckResult | null {
  const hit = validationCache.get(email);
  if (!hit || Date.now() > hit.expiresAt) {
    validationCache.delete(email);
    return null;
  }
  return hit.result;
}

function setCachedResult(email: string, result: EmailCheckResult): void {
  if (result.serviceError) return;
  validationCache.set(email, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

export function normalizeEmail(email: string): string | null {
  const trimmed = (email || '').trim().toLowerCase();
  if (!trimmed || !EMAIL_FORMAT_REGEX.test(trimmed)) return null;
  return trimmed;
}

interface ReoonResponse {
  status?: string;
  is_disposable?: boolean;
  is_spamtrap?: boolean;
  is_safe_to_send?: boolean;
}

function evaluateReoonResponse(data: ReoonResponse): Omit<EmailCheckResult, 'configured'> {
  const status = (data.status || '').toLowerCase();

  if (!status) {
    return {
      valid: false,
      error: 'Could not verify email address. Please try again in a moment.',
      serviceError: true,
    };
  }

  if (status === 'disposable' || data.is_disposable === true) {
    return {
      valid: false,
      error: 'Disposable email addresses are not accepted. Please use a permanent email.',
    };
  }

  if (status === 'invalid' || status === 'disabled' || status === 'spamtrap' || data.is_spamtrap === true) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (ACCEPTED_STATUSES.has(status) || data.is_safe_to_send === true) {
    return { valid: true };
  }

  return { valid: false, error: UNVERIFIED_ERROR };
}

export async function checkEmailAddress(email: string): Promise<EmailCheckResult> {
  const apiKey = getApiKey();

  if (!apiKey) {
    logWarn('reoon', 'REOON_EMAIL_VERIFIER_KEY not set — skipping email check');
    return { configured: false, valid: true };
  }

  const normalized = normalizeEmail(email);
  if (!normalized) {
    return { configured: true, valid: false, error: 'Please enter a valid email address.' };
  }

  const cached = getCachedResult(normalized);
  if (cached) return cached;

  try {
    const url = new URL(REOON_VERIFY_URL);
    url.searchParams.set('email', normalized);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('mode', REOON_MODE);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    const data: ReoonResponse = await res.json().catch(() => ({}));

    if (!res.ok) {
      logError('reoon', `HTTP ${res.status}`, JSON.stringify(data).slice(0, 200));
      return {
        configured: true,
        valid: false,
        error: 'Could not verify email address. Please try again in a moment.',
        serviceError: true,
      };
    }

    const evaluated = evaluateReoonResponse(data);
    const result: EmailCheckResult = evaluated.serviceError
      ? { configured: true, ...evaluated }
      : evaluated.valid
        ? { configured: true, valid: true }
        : { configured: true, valid: false, error: evaluated.error };

    setCachedResult(normalized, result);
    return result;
  } catch (err) {
    logError('reoon', err);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify email address. Please try again.',
      serviceError: true,
    };
  }
}
