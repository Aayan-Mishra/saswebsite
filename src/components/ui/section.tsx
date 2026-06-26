import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "muted" | "primary" | "navy";
}

const backgrounds = {
  white: "bg-white",
  muted: "bg-surface-secondary",
  primary: "bg-primary-50",
  navy: "bg-navy-900 text-white",
};

export function Section({ children, className, id, background = "white" }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", backgrounds[background], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight text-balance", className)}>
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-3 text-lg md:text-xl text-text-secondary max-w-2xl text-balance", className)}>
      {children}
    </p>
  );
}
