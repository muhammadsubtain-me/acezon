import * as React from "react";
import { cn } from "../../lib/utils";

function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "block text-[13px] font-medium text-[var(--color-text-muted)] mb-1.5",
        className
      )}
      {...props}
    />
  );
}

export { Label };
