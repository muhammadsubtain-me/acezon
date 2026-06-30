'use client';

import { useState, useEffect } from 'react';
import {
  X, Clock, User, BookOpen, FileText, Paperclip, Users, StickyNote,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { timeAgo, formatDate, shortId, getServiceLabel, getDomainLabel } from '../lib/format';
import StatusBadge from './StatusBadge';
import MemberAvatar from './MemberAvatar';
import AttachmentItem from './AttachmentItem';

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)]">{label}</span>
    </div>
  );
}

function DetailRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-[var(--color-text-faint)] shrink-0">{label}</span>
      <span className={`text-xs text-[var(--color-text)] text-right ${mono ? 'font-mono' : 'font-medium'}`}>{value || '—'}</span>
    </div>
  );
}

export default function DetailDrawer({ inquiry, userName, onClose, onClaim, onRelease, onStatusChange, onSaveNotes, readOnly = false }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry;
  const [notes, setNotes] = useState(inquiry.notes || '');

  useEffect(() => { setNotes(inquiry.notes || ''); }, [inquiry.id, inquiry.notes]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#0e0e0e] border-l border-[var(--color-border)] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div>
            <div className="font-semibold text-[var(--color-text-heading)] text-sm">Inquiry Details</div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inquiry.id)}
              title="Copy full ID"
              className="text-[11px] text-[var(--color-text-faint)] font-mono mt-0.5 hover:text-white transition-colors cursor-copy text-left"
            >
              {shortId(inquiry.id)}
            </button>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <StatusBadge status={inquiry.status} />
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
              <Clock className="w-3 h-3" />
              {formatDate(inquiry.submitted_at)}
            </div>
          </div>

          <section>
            <SectionLabel icon={User} label="Client" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <DetailRow label="Name"    value={inquiry.name} />
              <DetailRow label="Phone"   value={`${inquiry.country_dial || ''} ${inquiry.phone || ''}`} mono />
              <DetailRow label="Country" value={inquiry.country_name || '—'} />
              {inquiry.phone && (
                <a
                  href={`https://wa.me/${(inquiry.country_dial || '').replace(/\D/g, '')}${inquiry.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Message on WhatsApp
                </a>
              )}
            </div>
          </section>

          <section>
            <SectionLabel icon={BookOpen} label="Assignment" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <DetailRow label="Subject" value={inquiry.subject} />
              <DetailRow label="Domain"  value={getDomainLabel(inquiry.domain_id)} />
              <DetailRow label="Service" value={getServiceLabel(inquiry.service_id, inquiry.custom_service)} />
            </div>
          </section>

          <section>
            <SectionLabel icon={FileText} label="Description" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
                {inquiry.description || '—'}
              </p>
            </div>
          </section>

          {inquiry.attachments?.length > 0 && (
            <section>
              <SectionLabel icon={Paperclip} label={`Attachments (${inquiry.attachments.length})`} />
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
                {inquiry.attachments.map((value) => (
                  <AttachmentItem key={value} value={value} supabaseClient={supabase} />
                ))}
              </div>
            </section>
          )}

          {inquiry.claimed_by && (
            <section>
              <SectionLabel icon={Users} label="Assigned" />
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <MemberAvatar name={inquiry.claimed_by} size="md" />
                  <div>
                    <div className="font-semibold text-sm text-[var(--color-text-heading)]">
                      {inquiry.claimed_by === userName ? `${inquiry.claimed_by} (You)` : inquiry.claimed_by}
                    </div>
                    <div className="text-xs text-[var(--color-text-faint)]">Claimed {timeAgo(inquiry.claimed_at)}</div>
                  </div>
                </div>
                {inquiry.completed_at && <DetailRow label="Completed" value={formatDate(inquiry.completed_at)} />}
              </div>
            </section>
          )}

          <section>
            <SectionLabel icon={StickyNote} label="Internal Notes" />
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={() => { if (!readOnly) onSaveNotes(inquiry.id, notes); }}
              placeholder="Add internal notes about this inquiry..."
              rows={3}
              readOnly={readOnly}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all resize-none read-only:cursor-default read-only:text-[var(--color-text-muted)]"
            />
          </section>
        </div>

        <div className="px-6 py-4 border-t border-[var(--color-border)] shrink-0 flex flex-col gap-2">
          {readOnly && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-xs text-[var(--color-text-faint)]">
              {inquiry.claimed_by && <MemberAvatar name={inquiry.claimed_by} size="sm" />}
              Tracking only{inquiry.claimed_by ? ` - handled by ${inquiry.claimed_by}` : ''}
            </div>
          )}
          {canClaim && (
            <button onClick={() => onClaim(inquiry.id)} className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
              Claim This Inquiry
            </button>
          )}
          {canAct && inquiry.status === 'claimed' && (
            <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="w-full py-2.5 rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/20 text-sm font-semibold hover:bg-violet-500/25 active:scale-[0.98] transition-all">
              Mark as In Progress
            </button>
          )}
          {canAct && inquiry.status === 'in_progress' && (
            <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="w-full py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-sm font-semibold hover:bg-emerald-500/25 active:scale-[0.98] transition-all">
              Mark as Completed ✓
            </button>
          )}
          {!readOnly && isMyInquiry && inquiry.status === 'completed' && (
            <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="w-full py-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)] text-sm font-semibold hover:text-white transition-all">
              Reopen
            </button>
          )}
          {!readOnly && isMyInquiry && inquiry.status !== 'completed' && (
            <button onClick={() => { onRelease(inquiry.id); onClose(); }} className="w-full py-2.5 rounded-xl text-red-400 bg-red-400/[0.06] border border-red-400/15 text-sm font-medium hover:bg-red-400/10 active:scale-[0.98] transition-all">
              Release Claim
            </button>
          )}
          {!readOnly && !canClaim && !isMyInquiry && inquiry.status !== 'completed' && inquiry.claimed_by && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-xs text-[var(--color-text-faint)]">
              <MemberAvatar name={inquiry.claimed_by} size="sm" />
              Handled by {inquiry.claimed_by}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
