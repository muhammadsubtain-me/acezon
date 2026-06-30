import { Clock } from 'lucide-react';
import { timeAgo, shortId, getServiceLabel, getDomainLabel } from '../lib/format';
import StatusBadge from './StatusBadge';
import MemberAvatar from './MemberAvatar';

export default function InquiryCard({ inquiry, userName, onClaim, onStatusChange, onClick, readOnly = false }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry && inquiry.status !== 'completed';

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface-2)]" onClick={onClick}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] shrink-0">
            {inquiry.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-[var(--color-text-heading)] truncate">{inquiry.name}</div>
            <div className="text-[11px] text-[var(--color-text-faint)] font-mono">{shortId(inquiry.id)}</div>
          </div>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>
      <div className="mb-3">
        <div className="text-sm text-[var(--color-text)] font-medium truncate mb-0.5">{inquiry.subject}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">
          {getDomainLabel(inquiry.domain_id)} · {getServiceLabel(inquiry.service_id, inquiry.custom_service)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-faint)]">
          <Clock className="w-3 h-3" />
          {timeAgo(inquiry.submitted_at)}
          {inquiry.claimed_by && (
            <>
              <span className="text-[var(--color-border-hover)]">·</span>
              <MemberAvatar name={inquiry.claimed_by} size="sm" />
              <span>{inquiry.claimed_by}</span>
            </>
          )}
        </div>
        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
          {readOnly && <span className="text-[11px] text-[var(--color-text-faint)]">Tracking</span>}
          {canClaim && (
            <button onClick={() => onClaim(inquiry.id)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-black hover:opacity-90 transition-all">
              Claim
            </button>
          )}
          {canAct && inquiry.status === 'in_progress' && (
            <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
