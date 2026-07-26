import * as React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-lvl3/80 border border-border-lvl2/40', className)}
      {...props}
    />
  );
}

export { Skeleton };
