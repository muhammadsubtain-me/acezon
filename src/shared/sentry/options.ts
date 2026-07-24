export interface SentryOptions {
  dsn: string | undefined;
  enabled: boolean;
  environment: string;
  tracesSampleRate: number;
}

export function getSentryOptions(): SentryOptions {
  const dsn =
    process.env.SENTRY_DSN ||
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    '';

  return {
    dsn: dsn || undefined,
    enabled: Boolean(dsn),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  };
}
