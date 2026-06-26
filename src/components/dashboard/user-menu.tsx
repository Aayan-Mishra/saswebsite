"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";

interface DashboardUserMenuProps {
  fallbackName?: string;
  fallbackRole?: string;
}

export function DashboardUserMenu({
  fallbackName = "User",
  fallbackRole = "",
}: DashboardUserMenuProps) {
  const { user, isLoading } = useKindeBrowserClient();

  const displayName = !isLoading && user
    ? `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim() || fallbackName
    : fallbackName;

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarColors = [
    "bg-primary-500 text-white",
    "bg-gold-400 text-navy-900",
    "bg-orange-500 text-white",
    "bg-secondary-500 text-white",
    "bg-navy-600 text-white",
  ];
  const colorIndex = displayName.length % avatarColors.length;

  return (
    <Dropdown>
      <DropdownTrigger className="flex items-center gap-3 pl-4 border-l border-navy-100 cursor-pointer group">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-navy-900">{displayName}</p>
          {fallbackRole && (
            <p className="text-xs text-navy-400">{fallbackRole}</p>
          )}
        </div>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-transform duration-200 group-hover:scale-105 ${avatarColors[colorIndex]}`}
        >
          {initials}
        </div>
        <ChevronDown className="h-4 w-4 text-navy-400 hidden sm:block transition-transform duration-200 group-hover:rotate-180" />
      </DropdownTrigger>

      <DropdownContent align="end" side="right" placement="bottom">
        <div className="px-3 py-2 border-b border-navy-100 mb-1">
          <p className="text-sm font-medium text-navy-900 truncate">{displayName}</p>
          {user?.email && (
            <p className="text-xs text-navy-400 truncate">{user.email}</p>
          )}
        </div>

        <Link href="/dashboard/admin">
          <DropdownItem>
            <User className="h-4 w-4 mr-3" />
            Profile
          </DropdownItem>
        </Link>
        <Link href="#">
          <DropdownItem>
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </DropdownItem>
        </Link>
        <Link href="#">
          <DropdownItem>
            <HelpCircle className="h-4 w-4 mr-3" />
            Help & Support
          </DropdownItem>
        </Link>

        <DropdownSeparator />

        <LogoutLink className="w-full">
          <DropdownItem destructive>
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </DropdownItem>
        </LogoutLink>
      </DropdownContent>
    </Dropdown>
  );
}
