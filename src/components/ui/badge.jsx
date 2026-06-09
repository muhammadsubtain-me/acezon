import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] bg-[var(--color-accent-bg)] border-[var(--color-border)] px-4 py-1.5",
        secondary:
          "text-[11px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface-3)] border-transparent px-2.5 py-1",
        grade:
          "text-xs font-bold text-[#4ade80] bg-[rgba(74,222,128,0.1)] border-[rgba(74,222,128,0.2)] px-3 py-1",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
