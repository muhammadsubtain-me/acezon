import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-surface-lvl3 px-3 py-2 text-sm text-text-main shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-border-lvl3 placeholder:text-text-subtle hover:border-border-lvl4 focus:border-primary focus:ring-primary/20',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
