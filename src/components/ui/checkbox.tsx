import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked = false, indeterminate = false, onCheckedChange, onClick, ...props }, ref) => {
    const active = checked || indeterminate;

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        data-state={active ? 'checked' : 'unchecked'}
        onClick={(e) => {
          onCheckedChange?.(!checked);
          onClick?.(e);
        }}
        className={cn(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
          active
            ? 'border-primary bg-primary text-white'
            : 'border-border-lvl4 bg-surface-lvl2 text-transparent hover:border-primary',
          className,
        )}
        {...props}
      >
        {indeterminate ? <Minus className="h-3 w-3" /> : checked ? <Check className="h-3 w-3" /> : null}
      </button>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
