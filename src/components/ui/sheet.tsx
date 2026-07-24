import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      {/* Right Drawer Content Panel */}
      {children}
    </div>
  );
};

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative z-50 w-full max-w-sm sm:max-w-md h-full bg-surface-lvl4 shadow-2xl border-l border-border-lvl4 flex flex-col animate-in slide-in-from-right duration-300 ease-out overflow-hidden',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SheetContent.displayName = 'SheetContent';

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const SheetHeader = ({ className, children, onClose, ...props }: SheetHeaderProps) => (
  <div className={cn('flex items-start justify-between p-5 sm:p-6 border-b border-border-lvl2 bg-surface-lvl0 shrink-0', className)} {...props}>
    <div className="space-y-1 pr-4">{children}</div>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1.5 text-text-subtle hover:text-text-main hover:bg-surface-lvl1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        aria-label="Close panel"
      >
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-xl font-bold leading-tight text-text-main', className)}
      {...props}
    />
  )
);
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xs text-text-muted', className)}
      {...props}
    />
  )
);
SheetDescription.displayName = 'SheetDescription';

const SheetBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto p-5 sm:p-6 space-y-6', className)} {...props} />
);
SheetBody.displayName = 'SheetBody';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4 sm:p-6 border-t border-border-lvl2 bg-surface-lvl0 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 shrink-0 gap-2 sm:gap-0', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter };
