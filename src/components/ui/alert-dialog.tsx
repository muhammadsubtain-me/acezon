'use client';

import * as React from 'react';
import { Button } from './button';

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  actionText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  actionText = 'Continue',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
  isLoading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={() => !isLoading && onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-md bg-surface-lvl2 border border-border-lvl2 rounded-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-text-main leading-tight">{title}</h2>
          {description && <div className="text-xs text-text-muted leading-relaxed">{description}</div>}
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant}
            size="sm"
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AlertDialog };
