'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { services, domains } from '@/lib/data';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';
import {
  Search, X, LogOut, Clock, User, Phone,
  BookOpen, FileText, CheckCircle2,
  Loader2, Inbox, Shield,
  AlertCircle, Zap, Users, ClipboardList,
  StickyNote, ArrowRight, Eye, EyeOff,
  Paperclip, Image, Download,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_AVATARS = {
  Zain:    { initials: 'Z', color: 'from-violet-500 to-purple-600', img: '/avatars/zain.jpg' },
  Hasnain: { initials: 'H', color: 'from-blue-500 to-cyan-600',    img: '/avatars/hasnain.jpg' },
  Sibtain: { initials: 'S', color: 'from-emerald-500 to-teal-600', img: '/Avatar/Sibtain.jpg' },
};

const EMAIL_TO_NAME = {
  'admsibtain@acezon.app': 'Sibtain',
  'admzain@acezon.app':    'Zain',
  'admhasnain@acezon.app': 'Hasnain',
};

const STATUS_META = {
  new:         { label: 'New',         dot: 'bg-blue-400 animate-pulse',   badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20'   },
  claimed:     { label: 'Claimed',     dot: 'bg-amber-400',                badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20'   },
  in_progress: { label: 'In Progress', dot: 'bg-violet-400',               badge: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  completed:   { label: 'Completed',   dot: 'bg-emerald-400',              badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};

const FILTER_TABS = [
  { key: 'all',         label: 'All'         },
  { key: 'new',         label: 'New'         },
  { key: 'mine',        label: 'My Claims'   },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed',   label: 'Completed'   },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso) {
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

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function shortId(id) {
  return (id || '').slice(0, 8).toUpperCase();
}

function getServiceLabel(serviceId, customService) {
  if (serviceId === 'other') return customService || 'Other / Custom';
  return services.find(s => s.id === serviceId)?.name || serviceId || '—';
}

function getDomainLabel(domainId) {
  if (domainId === 'other') return 'Other';
  return domains.find(d => d.id === domainId)?.name || domainId || '—';
}

function getTeamColor(name) {
  return TEAM_AVATARS[name]?.color || 'from-slate-500 to-slate-600';
}

function getTeamInitials(name) {
  return TEAM_AVATARS[name]?.initials || name?.slice(0, 2).toUpperCase() || '??';
}

function getDisplayName(email) {
  return EMAIL_TO_NAME[email] || email?.split('@')[0] || 'You';
}

// ─── Download helper (blob fetch — works cross-origin with Supabase Storage) ──

async function downloadAttachment(url, fileName, setDownloading) {
  try {
    setDownloading(true);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error('Download failed:', err);
    alert('Download failed. Please try again.');
  } finally {
    setDownloading(false);
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MemberAvatar({ name, size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  const avatar = TEAM_AVATARS[name];

  if (avatar?.img) {
    return (
      <img
        src={avatar.img}
        alt={name}
        className={`${sz} rounded-xl object-cover shrink-0`}
      />
    );
  }

  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${avatar?.color} flex items-center justify-center font-bold text-white shrink-0`}>
      {getTeamInitials(name)}
    </div>
  );
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

// ─── Attachment Item ──────────────────────────────────────────────────────────

function AttachmentItem({ url }) {
  const [downloading, setDownloading] = useState(false);
  const fileName = decodeURIComponent(url.split('/').pop());
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

  return (
    <button
      type="button"
      disabled={downloading}
      onClick={() => downloadAttachment(url, fileName, setDownloading)}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] active:scale-[0.98] transition-all group disabled:opacity-60 disabled:cursor-not-allowed text-left"
    >
      {isImage
        ? <Image className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
        : <FileText className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
      }
      <span className="text-xs text-[var(--color-text)] truncate flex-1">{fileName}</span>
      {downloading
        ? <Loader2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] animate-spin" />
        : <Download className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    onLogin(data.user);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Logo className="w-9 h-9" />
          <div>
            <div className="text-white font-bold text-xl tracking-[-0.02em]">Acezon</div>
            <div className="text-[var(--color-text-muted)] text-xs font-medium tracking-wide uppercase">Admin Panel</div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
          <div className="flex items-center justify-center w-14 h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl mx-auto mb-6">
            <Shield className="w-6 h-6 text-[var(--color-text-muted)]" />
          </div>

          <h1 className="font-display text-2xl font-bold text-center text-[var(--color-text-heading)] mb-2">
            Team Login
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm text-center mb-8">
            Sign in with your Acezon team account.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
            />

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 pr-11 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[11px] text-[var(--color-text-faint)] mt-6">
            Only Acezon team members can access this panel.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ userName, inquiries, onLogout }) {
  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-[20px] border-b border-white/[0.07]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <Logo className="w-7 h-7" />
          <span className="font-bold text-white text-base tracking-[-0.02em] hidden sm:block">Acezon</span>
          <span className="text-[var(--color-border-hover)] text-sm hidden sm:block">/</span>
          <span className="text-[var(--color-text-muted)] text-sm font-medium hidden sm:block">Admin</span>
        </div>

        {newCount > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {newCount} new
          </span>
        )}

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            <MemberAvatar name={userName} size="sm" />
            <span className="text-sm font-medium text-[var(--color-text)] hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

function StatsRow({ stats }) {
  const cards = [
    { label: 'Total Inquiries', value: stats.total,     icon: ClipboardList, color: 'text-[var(--color-text-muted)]', bg: 'bg-white/[0.04]' },
    { label: 'Unclaimed',       value: stats.unclaimed, icon: AlertCircle,   color: 'text-amber-400',                  bg: 'bg-amber-400/[0.06]' },
    { label: 'My Claims',       value: stats.mine,      icon: Zap,           color: 'text-violet-400',                 bg: 'bg-violet-400/[0.06]' },
    { label: 'Completed',       value: stats.completed, icon: CheckCircle2,  color: 'text-emerald-400',                bg: 'bg-emerald-400/[0.06]' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--color-text-muted)] text-xs font-medium">{c.label}</span>
              <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${c.color}`} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[var(--color-text-heading)]">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Filters Bar ──────────────────────────────────────────────────────────────

function FiltersBar({ search, setSearch, activeTab, setActiveTab, counts }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)] pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, subject, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-x-auto shrink-0">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              activeTab === tab.key ? 'bg-white text-black' : 'text-[var(--color-text-muted)] hover:text-white'
            }`}
          >
            {tab.label}
            {counts[tab.key] > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.key ? 'bg-black/20' : 'bg-white/10'}`}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Inquiry Table Row (desktop) ──────────────────────────────────────────────

function InquiryRow({ inquiry, userName, onClaim, onRelease, onStatusChange, onClick, isSelected }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = inquiry.status === 'new';
  const canAct = isMyInquiry && inquiry.status !== 'completed';

  return (
    <tr
      onClick={onClick}
      className={`border-b border-[var(--color-border)] cursor-pointer transition-colors duration-150 ${
        isSelected ? 'bg-white/[0.04]' : 'hover:bg-white/[0.025]'
      }`}
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] shrink-0">
            {inquiry.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--color-text-heading)]">{inquiry.name}</div>
            <div className="text-[10px] text-[var(--color-text-faint)] font-mono">{shortId(inquiry.id)}</div>
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
        <div className="text-xs text-[var(--color-text)] font-medium truncate max-w-[160px]">{inquiry.subject}</div>
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
          {isMyInquiry && inquiry.status !== 'completed' && (
            <button onClick={() => onRelease(inquiry.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-red-400 hover:bg-red-400/10 transition-all" title="Release claim">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function InquiryCard({ inquiry, userName, onClaim, onRelease, onStatusChange, onClick }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = inquiry.status === 'new';
  const canAct = isMyInquiry && inquiry.status !== 'completed';

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

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ activeTab, search }) {
  const isFiltered = activeTab !== 'all' || search;
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center mb-5">
        <Inbox className="w-7 h-7 text-[var(--color-text-faint)]" />
      </div>
      <h3 className="font-semibold text-[var(--color-text-heading)] mb-2">
        {isFiltered ? 'No results found' : 'No inquiries yet'}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
        {isFiltered
          ? "Try adjusting your search or filter."
          : 'When clients submit the Hire Expert form, inquiries will appear here.'}
      </p>
    </div>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)]">{label}</span>
    </div>
  );
}

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-[var(--color-text-faint)] shrink-0">{label}</span>
      <span className={`text-xs text-[var(--color-text)] text-right ${mono ? 'font-mono' : 'font-medium'}`}>{value || '—'}</span>
    </div>
  );
}

function DetailDrawer({ inquiry, userName, onClose, onClaim, onRelease, onStatusChange }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = inquiry.status === 'new';
  const canAct = isMyInquiry;
  const [notes, setNotes] = useState(inquiry.notes || '');

  useEffect(() => { setNotes(inquiry.notes || ''); }, [inquiry.id, inquiry.notes]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#0e0e0e] border-l border-[var(--color-border)] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div>
            <div className="font-semibold text-[var(--color-text-heading)] text-sm">Inquiry Details</div>
            <div className="text-[11px] text-[var(--color-text-faint)] font-mono mt-0.5">{shortId(inquiry.id)}</div>
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

          {/* Client */}
          <section>
            <SectionLabel icon={User} label="Client" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <Row label="Name" value={inquiry.name} />
              <Row label="Phone" value={`${inquiry.country_dial || ''} ${inquiry.phone || ''}`} mono />
              <Row label="Country" value={inquiry.country_name || '—'} />
            </div>
          </section>

          {/* Assignment */}
          <section>
            <SectionLabel icon={BookOpen} label="Assignment" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <Row label="Subject" value={inquiry.subject} />
              <Row label="Domain" value={getDomainLabel(inquiry.domain_id)} />
              <Row label="Service" value={getServiceLabel(inquiry.service_id, inquiry.custom_service)} />
            </div>
          </section>

          {/* Description */}
          <section>
            <SectionLabel icon={FileText} label="Description" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
                {inquiry.description || '—'}
              </p>
            </div>
          </section>

          {/* Attachments */}
          {inquiry.attachments?.length > 0 && (
            <section>
              <SectionLabel icon={Paperclip} label={`Attachments (${inquiry.attachments.length})`} />
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
                {inquiry.attachments.map((url, idx) => (
                  <AttachmentItem key={idx} url={url} />
                ))}
              </div>
            </section>
          )}

          {/* Assigned */}
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
                {inquiry.completed_at && <Row label="Completed" value={formatDate(inquiry.completed_at)} />}
              </div>
            </section>
          )}

          {/* Internal Notes */}
          <section>
            <SectionLabel icon={StickyNote} label="Internal Notes" />
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={() => onStatusChange(inquiry.id, inquiry.status, notes)}
              placeholder="Add internal notes about this inquiry..."
              rows={3}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all resize-none"
            />
          </section>
        </div>

        <div className="px-6 py-4 border-t border-[var(--color-border)] shrink-0 flex flex-col gap-2">
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
          {inquiry.status === 'completed' && (
            <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="w-full py-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)] text-sm font-semibold hover:text-white transition-all">
              Reopen
            </button>
          )}
          {isMyInquiry && inquiry.status !== 'completed' && (
            <button onClick={() => { onRelease(inquiry.id); onClose(); }} className="w-full py-2.5 rounded-xl text-red-400 bg-red-400/[0.06] border border-red-400/15 text-sm font-medium hover:bg-red-400/10 active:scale-[0.98] transition-all">
              Release Claim
            </button>
          )}
          {!canClaim && !isMyInquiry && inquiry.status !== 'completed' && inquiry.claimed_by && (
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session,     setSession]     = useState(null);
  const [userName,    setUserName]    = useState('');
  const [inquiries,   setInquiries]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [fetchError,  setFetchError]  = useState('');
  const [actionError, setActionError] = useState('');
  const [search,      setSearch]      = useState('');
  const [activeTab,   setActiveTab]   = useState('all');
  const [selected,    setSelected]    = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setFetchError('Failed to restore session. Please refresh the page.');
        setLoading(false);
        return;
      }
      setSession(session);
      if (session) {
        const name = getDisplayName(session.user.email);
        setUserName(name);
        fetchInquiries();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        const name = getDisplayName(session.user.email);
        setUserName(name);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      setInquiries(data ?? []);
    } catch (err) {
      console.error('fetchInquiries:', err);
      setFetchError('Failed to load inquiries. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchInquiries();

    const channel = supabase
      .channel('inquiries-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        fetchInquiries();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [session, fetchInquiries]);

  const handleLogin = useCallback((user) => {
    setSession({ user });
    setUserName(getDisplayName(user.email));
    fetchInquiries();
  }, [fetchInquiries]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('signOut error:', err);
    }
    setSession(null);
    setUserName('');
    setInquiries([]);
    setFetchError('');
    setActionError('');
  }, []);

  const handleClaim = useCallback(async (id) => {
    setActionError('');
    try {
      const { error } = await supabase.from('inquiries').update({
        status: 'claimed',
        claimed_by: userName,
        claimed_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleClaim:', err);
      setActionError('Failed to claim inquiry. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const handleRelease = useCallback(async (id) => {
    setActionError('');
    try {
      const { error } = await supabase.from('inquiries').update({
        status: 'new',
        claimed_by: null,
        claimed_at: null,
      }).eq('id', id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleRelease:', err);
      setActionError('Failed to release inquiry. Please try again.');
    }
  }, [fetchInquiries]);

  const handleStatusChange = useCallback(async (id, newStatus, newNotes) => {
    setActionError('');
    try {
      const updates = { status: newStatus };
      if (newNotes !== undefined) updates.notes = newNotes;
      if (newStatus === 'completed') updates.completed_at = new Date().toISOString();
      const { error } = await supabase.from('inquiries').update(updates).eq('id', id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleStatusChange:', err);
      setActionError('Failed to update inquiry status. Please try again.');
    }
  }, [fetchInquiries]);

  const filtered = useMemo(() => {
    return inquiries
      .filter(inq => {
        if (activeTab === 'mine') return inq.claimed_by === userName;
        if (activeTab !== 'all') return inq.status === activeTab;
        return true;
      })
      .filter(inq => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          inq.name?.toLowerCase().includes(q) ||
          inq.subject?.toLowerCase().includes(q) ||
          inq.phone?.includes(q) ||
          inq.description?.toLowerCase().includes(q)
        );
      });
  }, [inquiries, activeTab, search, userName]);

  const stats = useMemo(() => ({
    total:     inquiries.length,
    unclaimed: inquiries.filter(i => i.status === 'new').length,
    mine:      inquiries.filter(i => i.claimed_by === userName).length,
    completed: inquiries.filter(i => i.status === 'completed').length,
  }), [inquiries, userName]);

  const counts = useMemo(() => ({
    all:         inquiries.length,
    new:         inquiries.filter(i => i.status === 'new').length,
    mine:        inquiries.filter(i => i.claimed_by === userName).length,
    in_progress: inquiries.filter(i => i.status === 'in_progress').length,
    completed:   inquiries.filter(i => i.status === 'completed').length,
  }), [inquiries, userName]);

  if (!session) return <LoginGate onLogin={handleLogin} />;

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-[var(--color-text-muted)]" />
    </div>
  );

  if (fetchError && inquiries.length === 0) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center gap-4 px-4">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-sm text-red-400 text-center max-w-sm">{fetchError}</p>
      <button
        onClick={fetchInquiries}
        className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 transition-all"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopBar userName={userName} inquiries={inquiries} onLogout={handleLogout} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-heading)]">Inquiries</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage and track all client inquiries in real-time.</p>
        </div>

        {actionError && (
          <div className="flex items-center gap-2.5 mb-4 px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {actionError}
            <button onClick={() => setActionError('')} className="ml-auto text-red-400/60 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {fetchError && (
          <div className="flex items-center gap-2.5 mb-4 px-4 py-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-sm text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {fetchError} Showing last loaded data.
          </div>
        )}

        <StatsRow stats={stats} />

        <FiltersBar
          search={search} setSearch={setSearch}
          activeTab={activeTab} setActiveTab={setActiveTab}
          counts={counts}
        />

        {filtered.length === 0 ? (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
            <EmptyState activeTab={activeTab} search={search} />
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {['Client', 'Contact', 'Service', 'Subject', 'Time', 'Status', 'Assigned', 'Actions'].map((h) => (
                      <th key={h} className={`px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)] ${
                        h === 'Service'  ? 'hidden lg:table-cell' :
                        h === 'Subject'  ? 'hidden md:table-cell' :
                        h === 'Time'     ? 'hidden xl:table-cell' :
                        h === 'Assigned' ? 'hidden md:table-cell' : ''
                      }`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(inq => (
                    <InquiryRow
                      key={inq.id}
                      inquiry={inq}
                      userName={userName}
                      onClaim={handleClaim}
                      onRelease={handleRelease}
                      onStatusChange={handleStatusChange}
                      onClick={() => setSelected(inq)}
                      isSelected={selected?.id === inq.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 md:hidden">
              {filtered.map(inq => (
                <InquiryCard
                  key={inq.id}
                  inquiry={inq}
                  userName={userName}
                  onClaim={handleClaim}
                  onRelease={handleRelease}
                  onStatusChange={handleStatusChange}
                  onClick={() => setSelected(inq)}
                />
              ))}
            </div>

            <p className="text-center text-xs text-[var(--color-text-faint)] mt-4">
              {filtered.length} of {inquiries.length} inquiries · Live from Supabase
            </p>
          </>
        )}
      </div>

      {selected && (
        <DetailDrawer
          inquiry={selected}
          userName={userName}
          onClose={() => setSelected(null)}
          onClaim={handleClaim}
          onRelease={handleRelease}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}