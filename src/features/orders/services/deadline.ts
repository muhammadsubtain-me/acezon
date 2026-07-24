/**
 * ISO date (YYYY-MM-DD) for "today" in the given IANA timezone.
 * Falls back to the runtime local calendar day when timezone is missing or invalid.
 */
export function todayISODate(timezone?: string): string {
  if (timezone) {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date());
    } catch {
      /* invalid timezone — fall through */
    }
  }
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function isValidISODate(deadline: string): boolean {
  if (typeof deadline !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return false;
  const [y, m, d] = deadline.split('-').map(Number);
  const test = new Date(Date.UTC(y, m - 1, d));
  return test.getUTCFullYear() === y && test.getUTCMonth() === m - 1 && test.getUTCDate() === d;
}

/** Deadline must be YYYY-MM-DD, a real calendar date, and not before today in the user's timezone. */
export function isValidDeadline(deadline: string, timezone?: string): boolean {
  if (!isValidISODate(deadline)) return false;
  return deadline >= todayISODate(timezone);
}
