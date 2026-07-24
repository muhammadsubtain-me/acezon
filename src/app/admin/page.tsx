'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import {
  GraduationCap,
  LogOut,
  AlertCircle,
  FileText,
  Clock,
  Cog,
  Search,
  MessageSquare,
  Mail,
  Paperclip,
  Download,
  Loader2,
  Users,
  Inbox,
  Briefcase,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter } from '@/components/ui/sheet';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { AdminInquiryRecord, AdminInquiryStats } from '@/features/orders/services/admin-orders';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<AdminInquiryRecord[]>([]);
  const [stats, setStats] = useState<AdminInquiryStats>({
    total: 0,
    newCount: 0,
    claimedCount: 0,
    inProgressCount: 0,
    deliveredCount: 0,
    completedCount: 0,
    avgRating: 5.0,
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiryRecord | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  // Authenticate Admin User
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
  }, [router, supabase.auth]);

  // Fetch Inquiries Data from API
  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to load inquiries');
      }

      const data = await res.json();
      setInquiries(data.inquiries || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setErrorMsg((err as Error).message || 'Connection error.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, router]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Admin Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Perform Admin Action (Claim, Status Update, Notes Update)
  const handleAdminAction = async (
    action: 'claim' | 'update_status' | 'update_notes',
    inquiryId: string,
    extraData?: { status?: string; notes?: string }
  ) => {
    setActionLoading(inquiryId);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/inquiries/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          inquiry_id: inquiryId,
          ...extraData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Action failed');
      }

      // Refresh list
      await fetchInquiries();

      if (selectedInquiry && selectedInquiry.id === inquiryId && data.inquiry) {
        setSelectedInquiry(data.inquiry);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  // Mark Order as Delivered
  const handleMarkDelivered = async (inquiryId: string) => {
    const adminName = userEmail ? userEmail.split('@')[0] : 'Admin';
    setActionLoading(inquiryId);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/mark-delivered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry_id: inquiryId,
          admin_name: adminName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to mark as delivered');
      }

      setSuccessMsg('Order successfully marked as delivered!');
      await fetchInquiries();

      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: 'delivered' });
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  // Open Inquiry Detail Drawer
  const handleOpenDetail = (inquiry: AdminInquiryRecord) => {
    setSelectedInquiry(inquiry);
    setAdminNotesInput(inquiry.notes || '');
    setSuccessMsg(null);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'new';
      case 'claimed': return 'claimed';
      case 'in_progress': return 'progress';
      case 'delivered': return 'delivered';
      case 'completed': return 'completed';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-surface-lvl0 text-text-main flex flex-col font-sans">
      {/* ────────────────── TOP NAVBAR ────────────────── */}
      <header className="sticky top-0 z-40 bg-surface-lvl2 border-b border-border-lvl2 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-text-main text-lg tracking-tight">Acezon</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted bg-surface-lvl1 px-3 py-1.5 rounded-lg border border-border-lvl2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>LoggedIn as <strong className="text-text-main font-semibold">{userEmail}</strong></span>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs">
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* ────────────────── MAIN DASHBOARD CONTAINER ────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Error Alert */}
        {errorMsg && (
          <Alert variant="destructive" className="animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <div>
              <AlertTitle>Notice</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </div>
          </Alert>
        )}

        {/* ────────────────── METRICS SUMMARY CARDS (3 CARDS) ────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Inbox */}
          <Card className="border-slate-200 bg-white">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inbox</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-extrabold text-amber-600">{stats.newCount}</div>
              <p className="text-xs text-slate-500 mt-1">Pending new orders</p>
            </CardContent>
          </Card>

          {/* Card 2: My Work */}
          <Card className="border-slate-200 bg-white">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Work</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cog className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-extrabold text-blue-600">{stats.myWorkCount ?? 0}</div>
              <p className="text-xs text-slate-500 mt-1">Assigned to you</p>
            </CardContent>
          </Card>

          {/* Card 3: Delivered */}
          <Card className="border-slate-200 bg-white">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delivered</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-extrabold text-purple-600">{stats.deliveredCount}</div>
              <p className="text-xs text-slate-500 mt-1">Delivered orders</p>
            </CardContent>
          </Card>
        </div>

        {/* ────────────────── FILTER TABS & SEARCH BAR ────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar (Stretches from Left to Right Queue Start) */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <Input
              type="text"
              placeholder="Search by contact or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-xs w-full"
            />
          </div>

          {/* Queues Tabs (Right Side) */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto shrink-0">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="new" className="flex items-center gap-1.5">
                <Inbox className="w-3.5 h-3.5 text-amber-500" />
                <span>Inbox ({stats.newCount})</span>
              </TabsTrigger>
              <TabsTrigger value="my_work" className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span>My Work ({stats.myWorkCount ?? 0})</span>
              </TabsTrigger>
              <TabsTrigger value="delivered" className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-purple-500" />
                <span>Delivered ({stats.deliveredCount})</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Complete ({stats.completedCount})</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Team ({stats.teamCount ?? (stats.claimedCount + stats.inProgressCount)})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* ────────────────── ORDER QUEUE DATA TABLE ────────────────── */}
        <Card className="border-slate-200 bg-white overflow-hidden shadow-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Submitted / ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Claimed By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                      <span>Loading order queue...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                    No inquiries found matching your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((item) => {
                  const isWhatsApp = item.contact_type === 'whatsapp';
                  const formattedDate = new Date(item.submitted_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <TableRow key={item.id}>
                      {/* Column 1: Date & ID */}
                      <TableCell className="font-medium text-xs">
                        <div className="font-bold text-slate-900">{formattedDate}</div>
                        <div className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                          ID: {item.id.substring(0, 8)}
                        </div>
                      </TableCell>

                      {/* Column 2: Service */}
                      <TableCell className="text-xs">
                        <span className="font-semibold text-slate-800 capitalize">
                          {item.service_id === 'other' ? item.custom_service || 'Custom Service' : item.service_id}
                        </span>
                      </TableCell>

                      {/* Column 3: Contact */}
                      <TableCell className="text-xs">
                        {isWhatsApp && item.phone ? (
                          <a
                            href={`https://wa.me/${(item.country_dial || '').replace(/\D/g, '')}${(item.phone || '').replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold bg-blue-50 border border-blue-200/80 px-2 py-1 rounded-md"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                            <span>{item.country_dial} {item.phone}</span>
                          </a>
                        ) : (
                          <a
                            href={`mailto:${item.contact}`}
                            className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 underline font-medium"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.contact}</span>
                          </a>
                        )}
                      </TableCell>

                      {/* Column 4: Deadline */}
                      <TableCell className="text-xs font-semibold text-slate-700">
                        {item.deadline}
                      </TableCell>

                      {/* Column 5: Status Badge */}
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize">
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>

                      {/* Column 6: Claimed By */}
                      <TableCell className="text-xs text-slate-500 font-medium">
                        {item.claimed_by || '—'}
                      </TableCell>

                      {/* Column 7: Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.status === 'new' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleAdminAction('claim', item.id)}
                              isLoading={actionLoading === item.id}
                              className="text-xs h-8"
                            >
                              Claim
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDetail(item)}
                            className="text-xs h-8"
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* ────────────────── ORDER DETAIL SLIDE-OVER DRAWER ────────────────── */}
        <Sheet open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
          {selectedInquiry && (
            <SheetContent>
              <SheetHeader onClose={() => setSelectedInquiry(null)}>
                <div className="flex items-center gap-3">
                  <SheetTitle className="text-xl font-extrabold text-slate-900">
                    Order #{selectedInquiry.id.substring(0, 8)}
                  </SheetTitle>
                  <Badge variant={getStatusBadgeVariant(selectedInquiry.status)} className="capitalize px-3 py-1 text-xs">
                    {selectedInquiry.status.replace('_', ' ')}
                  </Badge>
                </div>
                <SheetDescription className="mt-1">
                  Submitted on {new Date(selectedInquiry.submitted_at).toLocaleString()}
                </SheetDescription>
              </SheetHeader>

              <SheetBody>
                {successMsg && (
                  <Alert variant="success" className="mb-4">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMsg}</AlertDescription>
                  </Alert>
                )}

                {/* Inquiry Information Grid */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Inquiry Information</h3>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase block">Contact Type</span>
                      <span className="font-bold text-slate-900 capitalize text-sm">{selectedInquiry.contact_type}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase block">Contact Detail</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {selectedInquiry.contact_type === 'whatsapp'
                          ? `${selectedInquiry.country_dial} ${selectedInquiry.phone}`
                          : selectedInquiry.contact}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase block">Service Requested</span>
                      <span className="font-bold text-blue-700 capitalize text-sm">{selectedInquiry.service_id}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase block">Deadline</span>
                      <span className="font-bold text-slate-900 text-sm">{selectedInquiry.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Assignment Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assignment Description</h3>
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-xs whitespace-pre-wrap leading-relaxed min-h-[120px]">
                    {selectedInquiry.description}
                  </div>
                </div>

                {/* File Attachments */}
                {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Attachments ({selectedInquiry.attachments.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedInquiry.attachments.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 rounded-xl text-xs font-semibold text-blue-700 transition-all group"
                        >
                          <span className="truncate max-w-xs flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="group-hover:underline truncate">{file.name}</span>
                          </span>
                          <span className="text-[11px] text-slate-500 uppercase flex items-center gap-1 shrink-0 font-medium">
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Admin Notes */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Internal Admin Notes</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add internal notes for this order..."
                      value={adminNotesInput}
                      onChange={(e) => setAdminNotesInput(e.target.value)}
                      className="text-xs h-10"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAdminAction('update_notes', selectedInquiry.id, { notes: adminNotesInput })}
                      isLoading={actionLoading === selectedInquiry.id}
                      className="text-xs h-10 shrink-0 px-4"
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
              </SheetBody>

              <SheetFooter>
                {selectedInquiry.status === 'new' && (
                  <Button
                    onClick={() => handleAdminAction('claim', selectedInquiry.id)}
                    isLoading={actionLoading === selectedInquiry.id}
                    className="w-full sm:w-auto h-10 px-6"
                  >
                    Claim Inquiry
                  </Button>
                )}

                {selectedInquiry.status === 'claimed' && (
                  <Button
                    onClick={() => handleAdminAction('update_status', selectedInquiry.id, { status: 'in_progress' })}
                    isLoading={actionLoading === selectedInquiry.id}
                    className="w-full sm:w-auto h-10 px-6"
                  >
                    Start Order (In Progress)
                  </Button>
                )}

                {selectedInquiry.status === 'in_progress' && (
                  <Button
                    onClick={() => handleMarkDelivered(selectedInquiry.id)}
                    isLoading={actionLoading === selectedInquiry.id}
                    className="w-full sm:w-auto h-10 px-6 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Mark as Delivered
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          )}
        </Sheet>
      </main>
    </div>
  );
}
