import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { isEmailContactType } from '@/features/orders/config/inquiries.config';
import { normalizeEmail } from '@/features/verification/services/reoon';
import { toWhapiContact } from '@/features/verification/services/whapi';

const SESSION_COOKIE_NAME = 'acezon_sid';

let redisInstance: Redis | null = null;
let submitContactLimit: Ratelimit | null = null;
let submitIpLimit: Ratelimit | null = null;
let uploadIpLimit: Ratelimit | null = null;
let uploadSessionLimit: Ratelimit | null = null;
let confirmDeliveryLimit: Ratelimit | null = null;

function isRateLimitDisabled(): boolean {
  return process.env.DISABLE_RATE_LIMIT === 'true';
}

function getRedis(): Redis | null {
  if (isRateLimitDisabled()) return null;
  if (!redisInstance) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return null;
    }
    try {
      redisInstance = Redis.fromEnv();
    } catch {
      return null;
    }
  }
  return redisInstance;
}

function getLimiters() {
  const r = getRedis();
  if (!r) return null;
  if (!submitContactLimit || !submitIpLimit || !uploadIpLimit || !uploadSessionLimit || !confirmDeliveryLimit) {
    submitContactLimit = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
      prefix: 'acezon:order:contact',
    });
    submitIpLimit = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: true,
      prefix: 'acezon:order:ip',
    });
    uploadIpLimit = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(30, '1 h'),
      analytics: true,
      prefix: 'acezon:upload:ip',
    });
    uploadSessionLimit = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(15, '1 h'),
      analytics: true,
      prefix: 'acezon:upload:session',
    });
    confirmDeliveryLimit = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      analytics: true,
      prefix: 'acezon:confirm-delivery:ip',
    });
  }
  return {
    submitContactLimit,
    submitIpLimit,
    uploadIpLimit,
    uploadSessionLimit,
    confirmDeliveryLimit,
  };
}

const SESSION_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getClientIp(request: NextRequest): string {
  return (request as { ip?: string }).ip
    || request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';
}

function resolveSession(request: NextRequest): { sessionId: string; isNew: boolean } {
  const existing = request.cookies.get(SESSION_COOKIE_NAME)?.value?.trim();
  if (existing && SESSION_ID_REGEX.test(existing)) {
    return { sessionId: existing, isNew: false };
  }
  return { sessionId: crypto.randomUUID(), isNew: true };
}

export function withSessionCookie(
  response: NextResponse,
  sessionId: string,
  isNew: boolean
): NextResponse {
  if (isNew && sessionId) {
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }
  return response;
}

interface RatelimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

function buildRateLimitResponse(result: RatelimitResult, message: string): NextResponse {
  const minutesLeft = Math.ceil((result.reset - Date.now()) / 60000);
  return NextResponse.json(
    {
      error: message.replace('{minutes}', String(minutesLeft)),
      retryAfter: result.reset,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(result.reset),
        'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
      },
    }
  );
}

export interface RateLimitBody {
  contact_type?: string;
  contact?: string;
  phone?: string;
  country_dial?: string;
}

export function buildSubmitContactKey(body: RateLimitBody | null): string | null {
  if (!body) return null;
  const { contact_type, contact, phone, country_dial } = body;

  if (isEmailContactType(contact_type || '')) {
    const normalized = normalizeEmail(contact || '');
    return normalized ? `email:${normalized}` : null;
  }

  const whapiContact = toWhapiContact(country_dial, phone);
  return whapiContact ? `phone:${whapiContact}` : null;
}

export async function enforceSubmitRateLimits(
  request: NextRequest,
  contactKey: string | null
): Promise<NextResponse | null> {
  const limiters = getLimiters();
  if (!limiters) return null;

  if (contactKey) {
    const contactResult = await limiters.submitContactLimit.limit(contactKey);
    if (!contactResult.success) {
      return buildRateLimitResponse(
        contactResult,
        'You have already submitted recently with this email or number. Please try again in {minutes} minute(s).'
      );
    }
  }

  const ipResult = await limiters.submitIpLimit.limit(getClientIp(request));
  if (!ipResult.success) {
    return buildRateLimitResponse(
      ipResult,
      'Too many submissions from this network. Please try again in {minutes} minute(s).'
    );
  }

  return null;
}

export interface UploadRateLimitResult {
  blocked: NextResponse | null;
  sessionId: string;
  isNew: boolean;
}

export async function enforceUploadRateLimits(request: NextRequest): Promise<UploadRateLimitResult> {
  const { sessionId, isNew } = resolveSession(request);
  const limiters = getLimiters();
  if (!limiters) {
    return { blocked: null, sessionId, isNew };
  }

  const ipResult = await limiters.uploadIpLimit.limit(getClientIp(request));
  if (!ipResult.success) {
    return {
      blocked: buildRateLimitResponse(
        ipResult,
        'Too many upload attempts from this network. Please try again in {minutes} minute(s).'
      ),
      sessionId,
      isNew,
    };
  }

  const sessionResult = await limiters.uploadSessionLimit.limit(sessionId);
  if (!sessionResult.success) {
    return {
      blocked: buildRateLimitResponse(
        sessionResult,
        'Too many upload attempts. Please try again in {minutes} minute(s).'
      ),
      sessionId,
      isNew,
    };
  }

  return { blocked: null, sessionId, isNew };
}

export async function enforceConfirmDeliveryRateLimits(request: NextRequest): Promise<NextResponse | null> {
  const limiters = getLimiters();
  if (!limiters) return null;

  const ipResult = await limiters.confirmDeliveryLimit.limit(getClientIp(request));
  if (!ipResult.success) {
    return buildRateLimitResponse(
      ipResult,
      'Too many delivery confirmation attempts. Please try again in {minutes} minute(s).'
    );
  }

  return null;
}
