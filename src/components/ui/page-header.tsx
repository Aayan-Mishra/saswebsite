"use client";

import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "compact";
}

export function PageHeader({ title, description, children, className, variant = "default" }: PageHeaderProps) {
  return (
    <Section className={cn("pt-24 md:pt-32 pb-12 md:pb-16", variant === "compact" && "pb-8", className)}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 tracking-tight text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg md:text-xl text-text-secondary leading-relaxed text-balance">
            {description}
          </p>
        )}
        {children}
      </div>
    </Section>
  );
}
