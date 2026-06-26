"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardUserMenu } from "@/components/dashboard/user-menu";

interface AdminPageLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function AdminPageLayout({ children, title, breadcrumb }: AdminPageLayoutProps) {
  const pathname = usePathname();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-navy-50 flex">
        <Sidebar role="admin" currentPath={pathname} />

        <div className="flex-1 flex flex-col min-w-0 sm:ml-72">
          <header className="h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 text-navy-400">
                <span className="text-sm">Dashboard</span>
                {breadcrumb?.map((cr, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className={cn("text-sm", i === breadcrumb.length - 1 ? "font-medium text-navy-900" : "text-navy-400")}>
                      {cr.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-navy-50 rounded-xl px-3 py-2 text-navy-400 text-sm min-w-[200px]">
                <Search className="h-4 w-4" />
                <span>Search students, tutors...</span>
              </div>
              <button className="relative p-2 rounded-xl hover:bg-navy-50 text-navy-500 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <DashboardUserMenu fallbackName="Admin User" fallbackRole="Super Admin" />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
