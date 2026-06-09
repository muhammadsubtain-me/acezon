import * as React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-5", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("font-semibold text-[var(--color-text-heading)] leading-snug", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-xs text-[var(--color-text-faint)] leading-relaxed", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
