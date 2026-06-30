'use client';

import { useState, useMemo } from 'react';
import { Loader2, AlertCircle, X } from 'lucide-react';

import { getDisplayName } from './lib/format';
import { isActiveWork, isCompletedToday } from './lib/inquiries';
import {
  TABLE_HEADERS, TABLE_HEADERS_TEAM, HEADER_HIDDEN_CLASS,
} from './lib/constants';

import { useInquiries } from './hooks/useInquiries';
import { useFcmNotifications } from './hooks/useFcmNotifications';

import TopBar from './components/TopBar';
import StatsRow from './components/StatsRow';
import FiltersBar from './components/FiltersBar';
import InquiryRow from './components/InquiryRow';
import InquiryCard from './components/InquiryCard';
import EmptyState from './components/EmptyState';
import DetailDrawer from './components/DetailDrawer';

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard({ initialEmail }) {
  const userName = getDisplayName(initialEmail);

  const {
    inquiries, loading, fetchError, actionError, setActionError,
    fetchInquiries, handleLogout, handleClaim, handleRelease,
    handleStatusChange, handleSaveNotes,
  } = useInquiries(userName);

  useFcmNotifications(initialEmail);

  const [search,     setSearch]     = useState('');
  const [activeTab,  setActiveTab]  = useState('inbox');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => inquiries
    .filter(inq => {
      if (activeTab === 'inbox') return inq.status === 'new' && !inq.claimed_by;
      if (activeTab === 'work')  return isActiveWork(inq) && inq.claimed_by === userName;
      if (activeTab === 'team')  return Boolean(inq.claimed_by) || inq.status === 'completed';
      if (activeTab === 'done')  return inq.status === 'completed' && inq.claimed_by === userName;
      return false;
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
    }),
  [inquiries, activeTab, search, userName]);

  const stats = useMemo(() => ({
    unclaimed:      inquiries.filter(i => i.status === 'new' && !i.claimed_by).length,
    myActive:       inquiries.filter(i => isActiveWork(i) && i.claimed_by === userName).length,
    completedToday: inquiries.filter(isCompletedToday).length,
  }), [inquiries, userName]);

  const counts = useMemo(() => ({
    inbox: inquiries.filter(i => i.status === 'new' && !i.claimed_by).length,
    work:  inquiries.filter(i => isActiveWork(i) && i.claimed_by === userName).length,
    team:  inquiries.filter(i => Boolean(i.claimed_by)).length,
    done:  inquiries.filter(i => i.status === 'completed' && i.claimed_by === userName).length,
  }), [inquiries, userName]);

  const selectedInquiry = useMemo(
    () => inquiries.find(i => i.id === selectedId) || null,
    [inquiries, selectedId]
  );

  const isTeamView = activeTab === 'team';

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-[var(--color-text-muted)]" />
    </div>
  );

  if (fetchError && inquiries.length === 0) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center gap-4 px-4">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-sm text-red-400 text-center max-w-sm">{fetchError}</p>
      <button onClick={fetchInquiries} className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 transition-all">
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopBar
        userName={userName}
        inquiries={inquiries}
        onLogout={handleLogout}
      />

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
        <FiltersBar search={search} setSearch={setSearch} activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

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
                    {(isTeamView || activeTab === 'done' ? TABLE_HEADERS_TEAM : TABLE_HEADERS).map(h => (
                      <th key={h} className={`px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)] ${HEADER_HIDDEN_CLASS[h] || ''}`}>
                        {h}
                      </th>
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
                      onClick={() => setSelectedId(inq.id)}
                      isSelected={selectedId === inq.id}
                      readOnly={isTeamView}
                      showActions={!isTeamView && activeTab !== 'done'}
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
                  onStatusChange={handleStatusChange}
                  onClick={() => setSelectedId(inq.id)}
                  readOnly={isTeamView}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedInquiry && (
        <DetailDrawer
          inquiry={selectedInquiry}
          userName={userName}
          onClose={() => setSelectedId(null)}
          onClaim={handleClaim}
          onRelease={handleRelease}
          onStatusChange={handleStatusChange}
          onSaveNotes={handleSaveNotes}
          readOnly={isTeamView}
        />
      )}
    </div>
  );
}
