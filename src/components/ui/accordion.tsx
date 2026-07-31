'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openValues: string[];
  toggleValue: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  collapsible?: boolean;
  children: React.ReactNode;
}

export function Accordion({
  type = 'single',
  defaultValue,
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openValues, setOpenValues] = React.useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleValue = React.useCallback(
    (value: string) => {
      setOpenValues((prev) => {
        const isOpen = prev.includes(value);
        if (type === 'single') {
          if (isOpen) return collapsible ? [] : prev;
          return [value];
        } else {
          if (isOpen) return prev.filter((v) => v !== value);
          return [...prev, value];
        }
      });
    },
    [type, collapsible]
  );

  return (
    <AccordionContext.Provider value={{ openValues, toggleValue }}>
      <div className={cn('space-y-3', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined);

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={cn(
          'rounded-xl bg-surface-lvl2 border border-border-lvl2 overflow-hidden transition-colors hover:border-border-lvl3',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);

  if (!accordionCtx || !itemCtx) {
    throw new Error('AccordionTrigger must be used within AccordionItem and Accordion');
  }

  const isOpen = accordionCtx.openValues.includes(itemCtx.value);

  return (
    <button
      type="button"
      onClick={() => accordionCtx.toggleValue(itemCtx.value)}
      aria-expanded={isOpen}
      className={cn(
        'flex items-center justify-between w-full text-left p-5 font-bold text-text-main text-sm cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
      {...props}
    >
      <span className="pr-4">{children}</span>
      <ChevronDown
        className={cn(
          'w-5 h-5 text-text-muted shrink-0 transition-transform duration-300',
          isOpen && 'rotate-180 text-primary'
        )}
      />
    </button>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);

  if (!accordionCtx || !itemCtx) {
    throw new Error('AccordionContent must be used within AccordionItem and Accordion');
  }

  const isOpen = accordionCtx.openValues.includes(itemCtx.value);

  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn('px-5 pb-5 text-sm text-text-muted leading-relaxed', className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
