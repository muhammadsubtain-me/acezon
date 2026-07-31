'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, LogOut, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/sonner';
import { MetricCards } from '@/components/admin/metric-cards';
import { FilterBar } from '@/components/admin/filter-bar';
import { OrdersTable } from '@/components/admin/orders-table';
import { OrderDetailSheet } from '@/components/admin/order-detail-sheet';
import { BatchActionBar } from '@/components/admin/batch-action-bar';
import { createSupabaseBrowserClient } from '@/shared/supabase/browser';
import type { AdminInquiryRecord, AdminInquiryStats } from '@/features/orders/services/admin-orders';
import { parseDeadlineUrgency } from '@/shared/utils/deadline-urgency';
import { playNewOrderChime } from '@/shared/utils/audio-alert';
import { siteInfo } from '@/shared/config/site';

const DEFAULT_STATS: AdminInquiryStats = {
  total: 0,
  newCount: 0,
  claimedCount: 0,
  inProgressCount: 0,
  deliveredCount: 0,
  completedCount: 0,
  avgRating: 5.0,
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  // ── Auth ──────────────────────────────────────────────────────────────────
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // ── Data ──────────────────────────────────────────────────────────────────
  const [inquiries, setInquiries] = useState<AdminInquiryRecord[]>([]);
  const [stats, setStats] = useState<AdminInquiryStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [contactFilter, setContactFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // ── Selection ─────────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ── Detail Drawer ─────────────────────────────────────────────────────────
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiryRecord | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ── Reassign Modal ────────────────────────────────────────────────────────
  const [reassignInquiryId, setReassignInquiryId] = useState<string | null>(null);
  const [reassignAdminInput, setReassignAdminInput] = useState('');

  const hasActionsColumn = statusFilter === 'new' || statusFilter === 'my_work';

  // ── Auth Check ────────────────────────────────────────────────────────────
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      } else {
        setUserEmail(user.email || 'Admin');
      }
    }
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fetch Inquiries ───────────────────────────────────────────────────────
  const fetchInquiries = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) { router.push('/admin/login'); return; }
        throw new Error('Failed to load inquiries');
      }

      const data = await res.json();
      setInquiries(data.inquiries || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setErrorMsg((err as Error).message || 'Connection error.');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [statusFilter, searchQuery, router]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  // ── Real-Time Sync ────────────────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('admin-inquiries-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          playNewOrderChime();
          toast({ type: 'success', title: '🔔 New Order Received', description: 'A new order inquiry has just arrived in the Inbox!' });
        }
        fetchInquiries(true);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInquiries]);

  // ── Admin Action ──────────────────────────────────────────────────────────
  const handleAdminAction = useCallback(async (
    action: 'claim' | 'reject' | 'unclaim' | 'reassign' | 'update_status' | 'update_notes',
    inquiryId: string,
    extraData?: { status?: string; notes?: string; assigned_to?: string },
  ) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/admin/inquiries/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, inquiry_id: inquiryId, ...extraData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');

      await fetchInquiries(true);
      if (selectedInquiry?.id === inquiryId && data.inquiry) setSelectedInquiry(data.inquiry);

      const shortId = inquiryId.substring(0, 8);
      const toastMap: Record<string, { type: 'success' | 'error' | 'info'; title: string; description: string }> = {
        claim:          { type: 'success', title: 'Inquiry Claimed', description: `Order #${shortId} moved to Active Tasks.` },
        reject:         { type: 'error',   title: 'Inquiry Rejected', description: `Order #${shortId} marked as rejected.` },
        unclaim:        { type: 'info',    title: 'Claim Released', description: `Order #${shortId} returned to Inbox.` },
        reassign:       { type: 'success', title: 'Order Reassigned', description: `Order #${shortId} reassigned to ${extraData?.assigned_to || 'team member'}.` },
        update_notes:   { type: 'success', title: 'Notes Saved', description: 'Internal admin notes updated.' },
        update_status:  { type: 'success', title: 'Status Updated', description: `Order #${shortId} status updated.` },
      };
      toast(toastMap[action]);
    } catch (err) {
      const msg = (err as Error).message;
      setErrorMsg(msg);
      toast({ type: 'error', title: 'Action Failed', description: msg });
    }
  }, [fetchInquiries, selectedInquiry, toast]);

  // ── Mark Delivered ────────────────────────────────────────────────────────
  const handleMarkDelivered = useCallback(async (inquiryId: string) => {
    const adminName = userEmail ? userEmail.split('@')[0] : 'Admin';
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/mark-delivered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id: inquiryId, admin_name: adminName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to mark as delivered');

      setSuccessMsg('Order successfully marked as delivered!');
      await fetchInquiries(true);
      if (selectedInquiry?.id === inquiryId) setSelectedInquiry({ ...selectedInquiry, status: 'delivered' });
      toast({ type: 'success', title: 'Order Delivered', description: `Order #${inquiryId.substring(0, 8)} marked as delivered.` });
    } catch (err) {
      const msg = (err as Error).message;
      setErrorMsg(msg);
      toast({ type: 'error', title: 'Delivery Failed', description: msg });
    }
  }, [fetchInquiries, selectedInquiry, userEmail, toast]);

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredInquiries = inquiries.filter((item) => {
    if (serviceFilter !== 'all') {
      if (serviceFilter === 'other') {
        if (item.service_id !== 'other' && !item.custom_service) return false;
      } else if (!item.service_id.toLowerCase().includes(serviceFilter)) {
        return false;
      }
    }
    if (contactFilter !== 'all') {
      if (contactFilter === 'whatsapp' && item.contact_type !== 'whatsapp') return false;
      if (contactFilter === 'email' && item.contact_type !== 'email') return false;
    }
    if (urgencyFilter !== 'all') {
      const urgency = parseDeadlineUrgency(item.deadline);
      if (urgencyFilter === 'overdue' && urgency.level !== 'overdue') return false;
      if (urgencyFilter === 'urgent' && urgency.level !== 'urgent') return false;
      if (urgencyFilter === 'ontrack' && urgency.level !== 'ontrack') return false;
    }
    return true;
  });

  // ── Selection Handlers ────────────────────────────────────────────────────
  const handleToggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === filteredInquiries.length && filteredInquiries.length > 0
        ? []
        : filteredInquiries.map((i) => i.id),
    );
  };

  const handleToggleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleBatchAction = async (action: 'claim' | 'unclaim') => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => handleAdminAction(action, id)));
      setSelectedIds([]);
      toast({ type: 'success', title: 'Batch Action Complete', description: `Processed ${selectedIds.length} orders successfully.` });
    } catch {
      toast({ type: 'error', title: 'Batch Action Failed', description: 'Failed to process some orders.' });
    }
  };

  // ── CSV Export ────────────────────────────────────────────────────────────
  const handleExportCSV = () => {
    const targetList = selectedIds.length > 0
      ? inquiries.filter((i) => selectedIds.includes(i.id))
      : filteredInquiries;

    if (targetList.length === 0) {
      toast({ type: 'error', title: 'Export Empty', description: 'No orders available to export.' });
      return;
    }

    const headers = ['Order ID', 'Submitted At', 'Contact Type', 'Contact Detail', 'Service', 'Deadline', 'Status', 'Claimed By', 'Notes'];
    const rows = targetList.map((i) => [
      i.id,
      i.submitted_at,
      i.contact_type,
      i.contact_type === 'whatsapp' ? `${i.country_dial || ''} ${i.phone || ''}` : i.contact || '',
      i.service_id === 'other' ? i.custom_service || 'Other' : i.service_id,
      `"${i.deadline}"`,
      i.status,
      i.claimed_by || 'Unassigned',
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `acezon_orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ type: 'success', title: 'Export Successful', description: `Exported ${targetList.length} orders to CSV.` });
  };

  // ── Misc Handlers ─────────────────────────────────────────────────────────
  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast({ type: 'info', title: 'ID Copied', description: `Order ID ${id} copied to clipboard.` });
  };

  const handleOpenDetail = (inquiry: AdminInquiryRecord) => {
    setSelectedInquiry(inquiry);
    setAdminNotesInput(inquiry.notes || '');
    setSuccessMsg(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface-lvl0 text-text-main flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-surface-lvl2 border-b border-border-lvl2 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-text-main text-lg tracking-tight">{siteInfo.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 text-xs text-text-muted bg-surface-lvl1 px-3 py-1.5 rounded-lg border border-border-lvl2">
              <Avatar className="w-5 h-5">
                <AvatarFallback>{(userEmail || 'A')[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>Logged in as <strong className="text-text-main font-semibold">{userEmail}</strong></span>
            </div>
            <Tooltip content="Sign Out of Dashboard" side="bottom">
              <Button variant="outline" size="sm" onClick={() => setShowLogoutDialog(true)} className="text-xs">
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Sign out
              </Button>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {errorMsg && (
          <Alert variant="destructive" className="animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <div>
              <AlertTitle>Notice</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </div>
          </Alert>
        )}

        <MetricCards stats={stats} />

        <FilterBar
          stats={stats}
          statusFilter={statusFilter}
          onStatusFilterChange={(val) => { setStatusFilter(val); setSelectedIds([]); }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          serviceFilter={serviceFilter}
          onServiceFilterChange={setServiceFilter}
          contactFilter={contactFilter}
          onContactFilterChange={setContactFilter}
          urgencyFilter={urgencyFilter}
          onUrgencyFilterChange={setUrgencyFilter}
          onExportCSV={handleExportCSV}
        />

        <OrdersTable
          inquiries={filteredInquiries}
          loading={loading}
          statusFilter={statusFilter}
          selectedIds={selectedIds}
          onSelectAll={handleToggleSelectAll}
          onToggleSelect={handleToggleSelect}
          onOpenDetail={handleOpenDetail}
          onCopyId={handleCopyId}
          onClaim={(id) => handleAdminAction('claim', id)}
          onReject={(id) => handleAdminAction('reject', id)}
          onStart={(id) => handleAdminAction('update_status', id, { status: 'in_progress' })}
          onDeliver={handleMarkDelivered}
          onUnclaim={(id) => handleAdminAction('unclaim', id)}
        />

        <OrderDetailSheet
          inquiry={selectedInquiry}
          hasActionsColumn={hasActionsColumn}
          successMsg={successMsg}
          adminNotesInput={adminNotesInput}
          onNotesChange={setAdminNotesInput}
          onClose={() => setSelectedInquiry(null)}
          onSaveNotes={() => handleAdminAction('update_notes', selectedInquiry!.id, { notes: adminNotesInput })}
          onReassignOpen={() => setReassignInquiryId(selectedInquiry!.id)}
          onRevertStatus={(prevStatus) => handleAdminAction('update_status', selectedInquiry!.id, { status: prevStatus })}
        />

        <BatchActionBar
          selectedCount={selectedIds.length}
          statusFilter={statusFilter}
          onBatchClaim={() => handleBatchAction('claim')}
          onBatchUnclaim={() => handleBatchAction('unclaim')}
          onExportCSV={handleExportCSV}
          onClearSelection={() => setSelectedIds([])}
        />

        {/* Reassign Modal */}
        <AlertDialog
          open={!!reassignInquiryId}
          onOpenChange={(open) => !open && setReassignInquiryId(null)}
          title="Reassign Order to Team Member"
          description={
            <div className="space-y-3 pt-2">
              <p className="text-xs text-text-muted">Enter the name or email of the team member to reassign this order to:</p>
              <Input
                placeholder="e.g. Sarah, Alex, john@acezon.com..."
                value={reassignAdminInput}
                onChange={(e) => setReassignAdminInput(e.target.value)}
                className="text-xs h-10"
              />
            </div>
          }
          actionText="Reassign Order"
          cancelText="Cancel"
          onConfirm={() => {
            if (reassignInquiryId && reassignAdminInput.trim()) {
              handleAdminAction('reassign', reassignInquiryId, { assigned_to: reassignAdminInput.trim() });
              setReassignInquiryId(null);
              setReassignAdminInput('');
            }
          }}
        />

        {/* Sign Out Confirmation */}
        <AlertDialog
          open={showLogoutDialog}
          onOpenChange={setShowLogoutDialog}
          title="Sign Out of Admin Control Panel?"
          description="Are you sure you want to log out? Your session will end and you will be redirected to the login page."
          actionText="Sign Out"
          cancelText="Cancel"
          variant="destructive"
          onConfirm={handleLogout}
        />
      </main>
    </div>
  );
}
