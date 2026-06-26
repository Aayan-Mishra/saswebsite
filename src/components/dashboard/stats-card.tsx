"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
  className?: string;
}

export function StatsCard({ icon, label, value, trend, className }: StatsCardProps) {
  return (
    <Card padding="md" className={cn("", className)}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600 shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-sm text-navy-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-navy-900 mt-0.5">{value}</p>
            </div>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
                trend.direction === "up"
                  ? "bg-primary-50 text-primary-700"
                  : "bg-red-50 text-red-600"
              )}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
