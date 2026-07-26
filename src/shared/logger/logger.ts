import * as Sentry from '@sentry/nextjs';

function sentryEnabled(): boolean {
  return Boolean(
    process.env.SENTRY_DSN ||
    process.env.NEXT_PUBLIC_SENTRY_DSN
  );
}

function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const obj = error as Record<string, unknown>;
    const err = new Error(String(obj.message));
    err.name = obj.code ? ('SupabaseError:' + String(obj.code)) : 'LoggedError';
    err.cause = error;
    return err;
  }
  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
}

function reportToSentry(scope: string, error: unknown, meta?: unknown): void {
  if (!sentryEnabled()) return;

  Sentry.withScope((sentryScope) => {
    sentryScope.setTag('scope', scope);
    if (meta !== undefined) {
      sentryScope.setContext('meta', typeof meta === 'object' && meta !== null ? meta as Record<string, unknown> : { value: meta });
    }
    Sentry.captureException(toError(error));
  });
}

export function logError(scope: string, error: unknown, meta?: unknown): void {
  if (meta !== undefined) {
    console.error('[' + scope + ']', error, meta);
  } else {
    console.error('[' + scope + ']', error);
  }
  reportToSentry(scope, error, meta);
}

export function logWarn(scope: string, ...args: unknown[]): void {
  console.warn('[' + scope + ']', ...args);
}
