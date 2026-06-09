import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:opacity-90 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.28)] hover:-translate-y-px",
        outline:
          "border border-[var(--color-border-hover)] bg-transparent text-[var(--color-text)] hover:border-[#888] hover:text-white",
        ghost:
          "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-heading)]",
        link: "text-[var(--color-accent-muted)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-3",
        sm: "h-9 px-5 py-2 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
