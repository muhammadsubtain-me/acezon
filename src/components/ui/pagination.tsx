import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalLabel?: string;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  totalLabel,
}: PaginationProps) {
  if (pageCount <= 1 && !totalLabel) return null;

  return (
    <div className={cn('flex flex-col gap-3 border-t border-border-lvl2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between', className)}>
      {totalLabel && <p className="text-xs font-medium text-text-muted">{totalLabel}</p>}
      {pageCount > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>
          <span className="min-w-20 text-center text-xs font-semibold text-text-muted">
            Page {page} of {pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
