"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-600/30",
  secondary:
    "bg-white text-navy-900 border-2 border-navy-200 hover:border-primary-400 hover:text-primary-600",
  ghost:
    "bg-transparent text-navy-700 hover:bg-navy-50 hover:text-navy-900",
  outline:
    "bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
  gold:
    "bg-gold-400 text-navy-900 hover:bg-gold-500 shadow-lg shadow-gold-400/25",
  inverse:
    "bg-white/20 text-white hover:bg-white/30 border border-white/20",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
} as const;

const modes = {
  default: "",
  icon: "p-0! aspect-square",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  mode?: keyof typeof modes;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", mode = "default", loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          modes[mode],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
