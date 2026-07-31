import * as React from 'react';
import { Calendar } from 'lucide-react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface DatePickerProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, value, onValueChange, ...props }, ref) => (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-subtle">
        <Calendar className="h-4 w-4" />
      </div>
      <Input
        ref={ref}
        type="date"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn('pl-10', className)}
        {...props}
      />
    </div>
  ),
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
