'use client';

import { Share2, RotateCcw, Paperclip, Download, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter } from '@/components/ui/sheet';
import type { AdminInquiryRecord } from '@/features/orders/services/admin-orders';
import { getStatusBadgeVariant } from '@/components/admin/status-badge';

function getPreviousStatus(status: string): string | null {
  switch (status) {
    case 'claimed':     return 'new';
    case 'in_progress': return 'claimed';
    case 'delivered':   return 'in_progress';
    case 'completed':   return 'delivered';
    case 'rejected':    return 'new';
    default:            return null;
  }
}

interface OrderDetailSheetProps {
  inquiry: AdminInquiryRecord | null;
  hasActionsColumn: boolean;
  successMsg: string | null;
  adminNotesInput: string;
  onNotesChange: (value: string) => void;
  onClose: () => void;
  onSaveNotes: () => void;
  onReassignOpen: () => void;
  onRevertStatus: (prevStatus: string) => void;
}

export function OrderDetailSheet({
  inquiry,
  hasActionsColumn,
  successMsg,
  adminNotesInput,
  onNotesChange,
  onClose,
  onSaveNotes,
  onReassignOpen,
  onRevertStatus,
}: OrderDetailSheetProps) {
  return (
    <Sheet open={!!inquiry} onOpenChange={(open) => !open && onClose()}>
      {inquiry && (
        <SheetContent>
          <SheetHeader onClose={onClose}>
            <div className="flex items-center gap-3">
              <SheetTitle className="text-xl font-extrabold text-text-main">
                Order #{inquiry.id.substring(0, 8)}
              </SheetTitle>
              <Badge variant={getStatusBadgeVariant(inquiry.status)} className="capitalize px-3 py-1 text-xs">
                {inquiry.status.replace('_', ' ')}
              </Badge>
            </div>
            <SheetDescription className="mt-1">
              Submitted on {new Date(inquiry.submitted_at).toLocaleString()}
            </SheetDescription>
          </SheetHeader>

          <SheetBody>
            {/* Read-only tracking banner */}
            {!hasActionsColumn && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-lvl1 border border-border-lvl2 text-xs text-text-muted mb-4">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Tracking View (Read-Only)</strong> — Currently claimed by:{' '}
                  <strong className="text-text-main font-semibold">{inquiry.claimed_by || 'Unassigned'}</strong>
                </span>
              </div>
            )}

            {successMsg && (
              <Alert variant="success" className="mb-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}

            {/* Inquiry Information */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle">Inquiry Information</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-surface-lvl1 rounded-xl border border-border-lvl2">
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase block">Contact Type</span>
                  <span className="font-bold text-text-main capitalize text-sm">{inquiry.contact_type}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase block">Contact Detail</span>
                  <span className="font-bold text-text-main text-sm">
                    {inquiry.contact_type === 'whatsapp'
                      ? `${inquiry.country_dial} ${inquiry.phone}`
                      : inquiry.contact}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase block">Service Requested</span>
                  <span className="font-bold text-primary capitalize text-sm">{inquiry.service_id}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase block">Deadline</span>
                  <span className="font-bold text-text-main text-sm">{inquiry.deadline}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Assignment Description */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle">Assignment Description</h3>
              <div className="p-4 bg-surface-lvl1 border border-border-lvl2 rounded-xl text-text-main text-xs whitespace-pre-wrap leading-relaxed min-h-[120px]">
                {inquiry.description}
              </div>
            </div>

            {/* File Attachments */}
            {inquiry.attachments && inquiry.attachments.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle">
                    Attachments ({inquiry.attachments.length})
                  </h3>
                  <div className="space-y-2">
                    {inquiry.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-surface-lvl1 border border-border-lvl2 hover:bg-primary-light hover:border-primary/40 rounded-xl text-xs font-semibold text-primary transition-all group"
                      >
                        <span className="truncate max-w-xs flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-primary shrink-0" />
                          <span className="group-hover:underline truncate">{file.name}</span>
                        </span>
                        <span className="text-[11px] text-text-muted uppercase flex items-center gap-1 shrink-0 font-medium">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Internal Admin Notes */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle">Internal Admin Notes</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add internal notes for this order..."
                  value={adminNotesInput}
                  onChange={(e) => onNotesChange(e.target.value)}
                  className="text-xs h-10"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onSaveNotes}
                  className="text-xs h-10 shrink-0 px-4"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          </SheetBody>

          {/* Sheet Footer — Reassign & Revert */}
          {(inquiry.status !== 'new' || getPreviousStatus(inquiry.status)) && (
            <SheetFooter>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {(inquiry.status === 'claimed' || inquiry.status === 'in_progress') && (
                  <Button onClick={onReassignOpen} className="w-full sm:w-auto h-10 px-5">
                    <Share2 className="w-4 h-4 mr-1.5" />
                    Reassign Order
                  </Button>
                )}

                {getPreviousStatus(inquiry.status) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const prevStatus = getPreviousStatus(inquiry.status);
                      if (prevStatus) onRevertStatus(prevStatus);
                    }}
                    className="w-full sm:w-auto h-10 px-4 text-text-muted hover:text-amber-500 hover:bg-amber-500/10 border-border-lvl2"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    Revert Status ({getPreviousStatus(inquiry.status)?.replace('_', ' ')})
                  </Button>
                )}
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
}
