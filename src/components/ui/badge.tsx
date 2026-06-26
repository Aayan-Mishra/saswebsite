"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "gold" | "navy" | "orange" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  primary: "bg-primary-100 text-primary-700 border-primary-200",
  gold: "bg-gold-100 text-gold-800 border-gold-200",
  navy: "bg-navy-100 text-navy-800 border-navy-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  outline: "bg-white text-navy-700 border-navy-200",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3.5 py-1 text-sm",
};

export function Badge({ children, variant = "primary", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-lg border",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
