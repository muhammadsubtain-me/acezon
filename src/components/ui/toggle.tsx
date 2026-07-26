import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant = 'outline', size = 'sm', pressed, onPressedChange, onClick, ...props }, ref) => {
    const isPressed = Boolean(pressed);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPressedChange?.(!isPressed);
      onClick?.(e);
    };

    const baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none';

    const variants = {
      default: 'bg-transparent text-text-muted hover:bg-surface-lvl3 hover:text-text-main data-[state=on]:bg-surface-lvl3 data-[state=on]:text-text-main',
      outline: 'border border-border-lvl2 bg-surface-lvl2 hover:bg-surface-lvl3 text-text-muted hover:text-text-main shadow-xs data-[state=on]:bg-surface-lvl3 data-[state=on]:border-border-lvl3 data-[state=on]:text-text-main',
    };

    const sizes = {
      default: 'h-9 w-9 p-0',
      sm: 'h-8 w-8 p-0',
      lg: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle };
