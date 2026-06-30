import { X, StickyNote } from 'lucide-react';
import { timeAgo, shortId, getServiceLabel, getDomainLabel } from '../lib/format';
import StatusBadge from './StatusBadge';
import MemberAvatar from './MemberAvatar';

export default function InquiryRow({ inquiry, userName, onClaim, onRelease, onStatusChange, onClick, isSelected, readOnly = false, showActions = true }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry && inquiry.status !== 'completed';

  return (
    <tr
      onClick={onClick}
      className={`border-b border-[var(--color-border)] cursor-pointer transition-colors duration-150 ${
        isSelected ? 'bg-white/[0.04] [box-shadow:inset_3px_0_0_0_rgb(167,139,250)]' : 'hover:bg-white/[0.025]'
      }`}
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] shrink-0">
            {inquiry.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--color-text-heading)]">{inquiry.name}</div>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(inquiry.id); }}
              title="Copy full ID"
              className="text-[10px] text-[var(--color-text-faint)] font-mono hover:text-white transition-colors cursor-copy"
            >
              {shortId(inquiry.id)}
            </button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-xs text-[var(--color-text-muted)] font-mono">{inquiry.country_dial} {inquiry.phone}</div>
      </td>
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <div className="text-xs text-[var(--color-text)] font-medium truncate max-w-[180px]">
          {getServiceLabel(inquiry.service_id, inquiry.custom_service)}
        </div>
        <div className="text-[11px] text-[var(--color-text-faint)]">{getDomainLabel(inquiry.domain_id)}</div>
      </td>
      <td className="px-4 py-3.5 hidden md:table-cell">
        <div className="flex items-center gap-1.5">
          <div className="text-xs text-[var(--color-text)] font-medium truncate max-w-[150px]">{inquiry.subject}</div>
          {inquiry.notes && <StickyNote className="w-3 h-3 shrink-0 text-[var(--color-text-faint)]" title="Has notes" />}
        </div>
      </td>
      <td className="px-4 py-3.5 hidden xl:table-cell">
        <div className="text-xs text-[var(--color-text-muted)]">{timeAgo(inquiry.submitted_at)}</div>
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={inquiry.status} />
      </td>
      <td className="px-4 py-3.5 hidden md:table-cell">
        {inquiry.claimed_by ? (
          <div className="flex items-center gap-2">
            <MemberAvatar name={inquiry.claimed_by} size="sm" />
            <span className={`text-xs font-medium ${isMyInquiry ? 'text-[var(--color-text-heading)]' : 'text-[var(--color-text-muted)]'}`}>
              {isMyInquiry ? 'You' : inquiry.claimed_by}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-[var(--color-text-faint)]">Unclaimed</span>
        )}
      </td>
      {showActions && (
        <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            {canClaim && (
              <button onClick={() => onClaim(inquiry.id)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-black hover:opacity-90 active:scale-95 transition-all">
                Claim
              </button>
            )}
            {canAct && inquiry.status === 'claimed' && (
              <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25 transition-all">
                Start
              </button>
            )}
            {canAct && inquiry.status === 'in_progress' && (
              <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all">
                Done
              </button>
            )}
            {!readOnly && isMyInquiry && inquiry.status !== 'completed' && (
              <button onClick={() => onRelease(inquiry.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-red-400 hover:bg-red-400/10 transition-all" title="Release claim">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}
