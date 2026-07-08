"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MenuItem = { name: string; href: string; icon?: ReactNode | string };

function Menu({ children, items }: { children: React.ReactNode; items: MenuItem[] }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
        onClick={() => setIsOpened((v) => !v)}
        aria-expanded={isOpened}
        aria-controls="submenu"
      >
        <div className="flex items-center gap-x-2">{children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-150 ${isOpened ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpened && (
        <ul id="submenu" className="mx-4 px-2 border-l text-sm font-medium">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
              >
                {item.icon ? <div className="text-gray-500">{item.icon}</div> : null}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OverviewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

const roleNav: Record<string, MenuItem[]> = {
  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: <OverviewIcon /> },
    { name: "Students", href: "/dashboard/admin/students", icon: <UsersIcon /> },
    { name: "Enrolments", href: "/dashboard/admin/enrolments", icon: <ClipboardIcon /> },
    { name: "Sessions", href: "/dashboard/admin/sessions", icon: <CalendarIcon /> },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: <ChartIcon /> },
    { name: "Messages", href: "/dashboard/admin/messages", icon: <MessageIcon /> },
    { name: "Settings", href: "/dashboard/admin/settings", icon: <SettingsIcon /> },
  ],
  tutor: [
    { name: "Overview", href: "/dashboard/tutor", icon: <OverviewIcon /> },
    { name: "Students", href: "/dashboard/tutor/students", icon: <UsersIcon /> },
    { name: "Sessions", href: "/dashboard/tutor/sessions", icon: <CalendarIcon /> },
    { name: "Messages", href: "/dashboard/tutor/messages", icon: <MessageIcon /> },
    { name: "Settings", href: "/dashboard/tutor/settings", icon: <SettingsIcon /> },
  ],
  parent: [
    { name: "Overview", href: "/dashboard/parent", icon: <OverviewIcon /> },
    { name: "Progress", href: "/dashboard/parent/progress", icon: <ChartIcon /> },
    { name: "Schedule", href: "/dashboard/parent/schedule", icon: <CalendarIcon /> },
    { name: "Homework", href: "/dashboard/parent/homework", icon: <ClipboardIcon /> },
    { name: "Messages", href: "/dashboard/parent/messages", icon: <MessageIcon /> },
    { name: "Settings", href: "/dashboard/parent/settings", icon: <SettingsIcon /> },
  ],
};

const roleUser: Record<string, { name: string; email: string }> = {
  admin: { name: "Admin User", email: "admin@successatschool.com.au" },
  tutor: { name: "Lisa Mitchell", email: "lisa@successatschool.com.au" },
  parent: { name: "Parent", email: "parent@email.com" },
};

interface SidebarProps {
  role: "admin" | "tutor" | "parent";
  currentPath: string;
}

export function Sidebar({ role, currentPath }: SidebarProps) {
  const navigation = roleNav[role] || roleNav.admin;
  const user = roleUser[role] || roleUser.admin;
  const [isProfileActive, setIsProfileActive] = useState(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleProfile = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileActive(false);
      }
    };
    document.addEventListener("click", handleProfile);
    return () => document.removeEventListener("click", handleProfile);
  }, []);

  const isActive = (href: string) => currentPath === href;

  return (
    <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-72 z-50 overflow-y-auto">
      <div className="flex flex-col h-full px-4">
        {/* Profile header */}
        <div className="h-20 flex items-center pl-2 shrink-0 border-b border-gray-100">
          <div className="w-full flex items-center gap-x-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Success at School"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-sm font-bold text-navy-900 tracking-tight">SAS</span>
            </Link>
            <div className="relative flex-1 text-right">
              <button
                ref={profileRef}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => setIsProfileActive((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={isProfileActive}
                aria-controls="profile-menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {isProfileActive && (
                <div
                  id="profile-menu"
                  role="menu"
                  className="absolute z-10 top-12 right-0 w-56 rounded-lg bg-white shadow-md border text-sm text-gray-600"
                >
                  <div className="p-2 text-left space-y-1">
                    <span className="block text-gray-500/80 p-2 text-xs">{user.email}</span>
                    <Link
                      href="/dashboard/admin/settings"
                      className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150 text-sm"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/api/auth/logout"
                      className="flex items-center gap-2 w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150 text-sm text-red-600"
                      role="menuitem"
                    >
                      <LogoutIcon />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex items-center gap-3 px-2 pb-4 mb-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700 shrink-0">
              {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>

          <ul className="text-sm font-medium space-y-0.5">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-2 p-2 rounded-lg duration-150",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                  )}
                >
                  <div className={cn(isActive(item.href) ? "text-primary-500" : "text-gray-500")}>
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer links */}
        <div className="pt-2 pb-4 border-t border-gray-100 shrink-0">
          <ul className="text-sm font-medium space-y-0.5">
            <li>
              <Link
                href="/"
                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
              >
                <HelpIcon />
                Back to Site
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
