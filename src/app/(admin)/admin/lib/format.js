import { services, domains } from '@/lib/data';
import { TEAM_AVATARS, EMAIL_TO_NAME } from '@/lib/data/config/team';

// ─── Date / time formatting ────────────────────────────────────────────────────

export function timeAgo(iso) {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function shortId(id) {
  return (id || '').slice(0, 8).toUpperCase();
}

// ─── Label lookups ──────────────────────────────────────────────────────────────

export function getServiceLabel(serviceId, customService) {
  if (serviceId === 'other') return customService || 'Other / Custom';
  return services.find(s => s.id === serviceId)?.name || serviceId || '—';
}

export function getDomainLabel(domainId) {
  if (domainId === 'other') return 'Other';
  return domains.find(d => d.id === domainId)?.name || domainId || '—';
}

// ─── Team identity ────────────────────────────────────────────────────────────

export function getTeamColor(name) {
  return TEAM_AVATARS[name]?.color || 'from-slate-500 to-slate-600';
}

export function getTeamInitials(name) {
  return TEAM_AVATARS[name]?.initials || name?.slice(0, 2).toUpperCase() || '??';
}

export function getDisplayName(email) {
  return EMAIL_TO_NAME[email] || email?.split('@')[0] || 'You';
}
