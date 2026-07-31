import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, value, onValueChange, options, placeholder, error, disabled, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        value={value}
        disabled={disabled}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          'h-10 w-full appearance-none rounded-lg border bg-surface-lvl3 px-3 py-2 pr-9 text-sm text-text-main shadow-none transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-border-lvl3 hover:border-border-lvl4 focus:border-primary focus:ring-primary/20',
          !value && placeholder && 'text-text-subtle',
          className,
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
    </div>
  ),
);
Select.displayName = 'Select';

export { Select };
