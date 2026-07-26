export interface DeadlineUrgency {
  level: 'overdue' | 'urgent' | 'ontrack' | 'unknown';
  label: string;
  badgeClass: string;
}

export function parseDeadlineUrgency(deadlineStr: string | undefined | null): DeadlineUrgency {
  if (!deadlineStr || !deadlineStr.trim()) {
    return { level: 'unknown', label: 'No Deadline', badgeClass: 'bg-surface-lvl1 text-text-subtle border-border-lvl2' };
  }

  const parsedDate = new Date(deadlineStr);
  if (isNaN(parsedDate.getTime())) {
    // If it's a descriptive string (e.g., "3 days", "24 hours", "ASAP")
    const lower = deadlineStr.toLowerCase();
    if (lower.includes('asap') || lower.includes('12 h') || lower.includes('today') || lower.includes('urgent')) {
      return { level: 'urgent', label: 'Urgent (< 24h)', badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/30 font-bold' };
    }
    return { level: 'ontrack', label: deadlineStr, badgeClass: 'bg-surface-lvl1 text-text-muted border-border-lvl2' };
  }

  const now = new Date();
  const diffMs = parsedDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffMs < 0) {
    return { level: 'overdue', label: 'Overdue', badgeClass: 'bg-red-500/15 text-red-500 border-red-500/30 font-extrabold animate-pulse' };
  } else if (diffHours <= 24) {
    const hrsLeft = Math.max(1, Math.round(diffHours));
    return { level: 'urgent', label: `Due in ${hrsLeft}h`, badgeClass: 'bg-amber-500/15 text-amber-500 border-amber-500/30 font-bold' };
  } else {
    const daysLeft = Math.round(diffHours / 24);
    return { level: 'ontrack', label: `${daysLeft} days left`, badgeClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
  }
}
