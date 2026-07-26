'use client';

import React from 'react';
import {
  Check, X, Copy, MessageSquare, Mail, CheckSquare, Square,
  Cog, Send,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/ui/tooltip';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import type { AdminInquiryRecord } from '@/features/orders/services/admin-orders';
import { parseDeadlineUrgency } from '@/shared/utils/deadline-urgency';

type StatusBadgeVariant = 'new' | 'claimed' | 'progress' | 'delivered' | 'completed' | 'destructive' | 'outline';

function getStatusBadgeVariant(status: string): StatusBadgeVariant {
  switch (status) {
    case 'new': return 'new';
    case 'claimed': return 'claimed';
    case 'in_progress': return 'progress';
    case 'delivered': return 'delivered';
    case 'completed': return 'completed';
    case 'rejected': return 'destructive';
    default: return 'outline';
  }
}

interface OrdersTableProps {
  inquiries: AdminInquiryRecord[];
  loading: boolean;
  statusFilter: string;
  selectedIds: string[];
  onSelectAll: () => void;
  onToggleSelect: (e: React.MouseEvent, id: string) => void;
  onOpenDetail: (inquiry: AdminInquiryRecord) => void;
  onCopyId: (e: React.MouseEvent, id: string) => void;
  onClaim: (id: string) => void;
  onReject: (id: string) => void;
  onStart: (id: string) => void;
  onDeliver: (id: string) => void;
  onUnclaim: (id: string) => void;
}

export function OrdersTable({
  inquiries,
  loading,
  statusFilter,
  selectedIds,
  onSelectAll,
  onToggleSelect,
  onOpenDetail,
  onCopyId,
  onClaim,
  onReject,
  onStart,
  onDeliver,
  onUnclaim,
}: OrdersTableProps) {
  const hasActionsColumn = statusFilter === 'new' || statusFilter === 'my_work';
  const colSpan = hasActionsColumn ? 8 : 7;

  return (
    <Card className="border-border-lvl2 bg-surface-lvl2 overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] text-center">
              <button
                type="button"
                onClick={onSelectAll}
                className="text-text-muted hover:text-primary p-1 cursor-pointer"
              >
                {selectedIds.length > 0 && selectedIds.length === inquiries.length ? (
                  <CheckSquare className="w-4 h-4 text-primary" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
            </TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[15%]' : 'w-[17%]'}`}>Submitted / ID</TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[15%]' : 'w-[17%]'}`}>Service</TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[18%]' : 'w-[20%]'}`}>Contact Info</TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[15%]' : 'w-[16%]'}`}>Deadline (SLA)</TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[12%]' : 'w-[14%]'}`}>Status</TableHead>
            <TableHead className={`text-center ${hasActionsColumn ? 'w-[12%]' : 'w-[14%]'}`}>Claimed By</TableHead>
            {hasActionsColumn && <TableHead className="w-[11%] text-center">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell colSpan={colSpan} className="py-4 px-4 text-center">
                  <Skeleton className="h-6 w-full rounded-md" />
                </TableCell>
              </TableRow>
            ))
          ) : inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} className="h-32 text-center text-text-muted">
                No inquiries found matching your filter criteria.
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              const isWhatsApp = item.contact_type === 'whatsapp';
              const urgency = parseDeadlineUrgency(item.deadline);
              const formattedDate = new Date(item.submitted_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <TableRow
                  key={item.id}
                  onClick={() => onOpenDetail(item)}
                  className={`cursor-pointer hover:bg-surface-lvl1/80 transition-colors group ${isSelected ? 'bg-primary-light/50' : ''}`}
                >
                  {/* Checkbox */}
                  <TableCell className="text-center" onClick={(e) => onToggleSelect(e, item.id)}>
                    <button type="button" className="text-text-muted hover:text-primary p-1 cursor-pointer">
                      {isSelected ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4" />}
                    </button>
                  </TableCell>

                  {/* Date & ID */}
                  <TableCell className="font-medium text-xs text-center">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                      <div className="font-bold text-text-main group-hover:text-primary transition-colors text-center">{formattedDate}</div>
                      <div className="flex items-center justify-center gap-1.5 mt-0.5 text-center">
                        <span className="text-[10px] font-mono text-text-subtle truncate max-w-[100px]">
                          ID: {item.id.substring(0, 8)}
                        </span>
                        <Tooltip content="Copy Full ID">
                          <button
                            type="button"
                            onClick={(e) => onCopyId(e, item.id)}
                            className="text-text-subtle hover:text-primary transition-colors p-0.5 cursor-pointer opacity-0 group-hover:opacity-100"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>

                  {/* Service */}
                  <TableCell className="text-xs text-center">
                    <div className="flex items-center justify-center text-center w-full">
                      <span className="font-semibold text-text-main capitalize truncate text-center">
                        {item.service_id === 'other' ? item.custom_service || 'Custom Service' : item.service_id}
                      </span>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="text-xs text-center">
                    <div className="flex items-center justify-center text-center w-full">
                      {isWhatsApp && item.phone ? (
                        <Tooltip content="Chat on WhatsApp">
                          <a
                            href={`https://wa.me/${(item.country_dial || '').replace(/\D/g, '')}${(item.phone || '').replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1.5 text-primary-hover font-semibold bg-primary-light border border-primary/20 px-2.5 py-1 rounded-md hover:bg-primary/20 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{item.country_dial} {item.phone}</span>
                          </a>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Send Email">
                          <a
                            href={`mailto:${item.contact}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1 text-text-main hover:text-primary underline font-medium truncate"
                          >
                            <Mail className="w-3.5 h-3.5 text-text-subtle shrink-0" />
                            <span className="truncate">{item.contact}</span>
                          </a>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>

                  {/* Deadline */}
                  <TableCell className="text-xs text-center">
                    <div className="flex flex-col items-center justify-center text-center w-full gap-1">
                      <span className="font-semibold text-text-main text-center">{item.deadline}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${urgency.badgeClass}`}>
                        {urgency.label}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center text-center w-full">
                      <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize">
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Claimed By */}
                  <TableCell className="text-xs text-text-muted font-medium text-center">
                    <div className="flex items-center justify-center text-center w-full">
                      <span className="truncate text-center">{item.claimed_by || '—'}</span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  {hasActionsColumn && (
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 text-center w-full">
                        {statusFilter === 'new' && (
                          <>
                            <Tooltip content="Claim inquiry & move to Active Tasks" side="left">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={(e) => { e.stopPropagation(); onClaim(item.id); }}
                                className="text-xs h-8 px-3"
                              >
                                <Check className="w-3.5 h-3.5 mr-1" />
                                Claim
                              </Button>
                            </Tooltip>
                            <Tooltip content="Reject inquiry" side="left">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => { e.stopPropagation(); onReject(item.id); }}
                                className="text-xs h-8 px-2.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-200"
                              >
                                <X className="w-3.5 h-3.5 mr-1" />
                                Reject
                              </Button>
                            </Tooltip>
                          </>
                        )}

                        {statusFilter === 'my_work' && (
                          <>
                            {item.status === 'claimed' && (
                              <Tooltip content="Set order status to In Progress" side="left">
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={(e) => { e.stopPropagation(); onStart(item.id); }}
                                  className="text-xs h-8 px-3"
                                >
                                  <Cog className="w-3.5 h-3.5 mr-1" />
                                  Start
                                </Button>
                              </Tooltip>
                            )}
                            {item.status === 'in_progress' && (
                              <Tooltip content="Mark order as delivered" side="left">
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={(e) => { e.stopPropagation(); onDeliver(item.id); }}
                                  className="text-xs h-8 px-3 bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                  <Send className="w-3.5 h-3.5 mr-1" />
                                  Deliver
                                </Button>
                              </Tooltip>
                            )}
                            <Tooltip content="Release claim & return order to Inbox" side="left">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => { e.stopPropagation(); onUnclaim(item.id); }}
                                className="text-xs h-8 w-8 p-0 text-text-muted hover:text-red-500 hover:bg-red-500/10 border-border-lvl2 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
