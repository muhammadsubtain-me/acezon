import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'new' | 'claimed' | 'progress' | 'delivered' | 'completed';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border';

  const variants = {
    default: 'bg-primary-light text-primary-hover border-primary-light',
    secondary: 'bg-surface-lvl1 text-text-muted border-border-lvl2',
    outline: 'bg-surface-lvl2 text-text-main border-border-lvl3',
    destructive: 'bg-status-rejected-bg text-status-rejected-text border-red-200',
    new: 'bg-status-new-bg text-status-new-text border-blue-200',
    claimed: 'bg-status-claimed-bg text-status-claimed-text border-amber-200',
    progress: 'bg-status-progress-bg text-status-progress-text border-sky-200',
    delivered: 'bg-status-delivered-bg text-status-delivered-text border-purple-200',
    completed: 'bg-status-completed-bg text-status-completed-text border-emerald-200',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
