// ─── Inquiry predicates & list helpers ─────────────────────────────────────────

export function isActiveWork(inquiry) {
  return inquiry.status === 'claimed' || inquiry.status === 'in_progress';
}

export function isCompletedToday(inquiry) {
  if (inquiry.status !== 'completed' || !inquiry.completed_at) return false;
  return new Date(inquiry.completed_at).toDateString() === new Date().toDateString();
}

export function sortInquiries(rows) {
  return [...rows].sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0));
}

export function mergeRealtimeInquiry(rows, payload) {
  if (payload.eventType === 'DELETE') {
    return rows.filter(i => i.id !== payload.old?.id);
  }
  const incoming = payload.new;
  if (!incoming?.id) return rows;
  const exists = rows.some(i => i.id === incoming.id);
  const nextRows = exists
    ? rows.map(i => i.id === incoming.id ? { ...i, ...incoming } : i)
    : [incoming, ...rows];
  return sortInquiries(nextRows);
}
