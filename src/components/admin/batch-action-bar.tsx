'use client';

import React from 'react';
import { Check, X, UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BatchActionBarProps {
  selectedCount: number;
  statusFilter: string;
  onBatchClaim: () => void;
  onBatchUnclaim: () => void;
  onExportCSV: () => void;
  onClearSelection: () => void;
}

export function BatchActionBar({
  selectedCount,
  statusFilter,
  onBatchClaim,
  onBatchUnclaim,
  onExportCSV,
  onClearSelection,
}: BatchActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-surface-lvl2 border border-primary/40 shadow-2xl rounded-2xl px-5 py-3 animate-in slide-in-from-bottom-5 duration-300">
      <span className="text-xs font-bold text-text-main flex items-center gap-1.5 border-r border-border-lvl2 pr-3">
        <Check className="w-4 h-4 text-primary" />
        <span>{selectedCount} Selected</span>
      </span>

      <div className="flex items-center gap-2">
        {statusFilter === 'new' && (
          <Button size="sm" onClick={onBatchClaim} className="h-8 text-xs px-3">
            <UserPlus className="w-3.5 h-3.5 mr-1" />
            Batch Claim
          </Button>
        )}

        {statusFilter === 'my_work' && (
          <Button
            size="sm"
            variant="outline"
            onClick={onBatchUnclaim}
            className="h-8 text-xs px-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-200"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Batch Release
          </Button>
        )}

        <Button size="sm" variant="secondary" onClick={onExportCSV} className="h-8 text-xs px-3">
          <Download className="w-3.5 h-3.5 mr-1" />
          Export Selected CSV
        </Button>

        <Button size="sm" variant="ghost" onClick={onClearSelection} className="h-8 text-xs px-2 text-text-muted">
          Clear Selection
        </Button>
      </div>
    </div>
  );
}
