"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/marketing/programs",
    children: [
      { label: "OC Preparation", href: "/marketing/oc-preparation" },
      { label: "NAPLAN Preparation", href: "/marketing/naplan-preparation" },
      { label: "Selective Preparation", href: "/marketing/selective-preparation" },
      { label: "All Programs", href: "/marketing/programs" },
    ],
  },
  { label: "About", href: "/marketing/about" },
  { label: "Testimonials", href: "/marketing/testimonials" },
  { label: "FAQ", href: "/marketing/faq" },
  { label: "Contact", href: "/marketing/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="Success at School"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-xl font-bold text-navy-900 hidden sm:block tracking-tight">
              Success at School
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium text-navy-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200 inline-flex items-center gap-1"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )} />
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-white border border-border shadow-xl shadow-navy-900/5 p-2 animate-scale-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 rounded-xl text-sm text-navy-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LoginLink>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex hidden">
                Log In
              </Button>
            </LoginLink>
            <Link href="/enrol">
              <Button size="sm" className="hidden sm:inline-flex">
                Enrol Now
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-navy-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-6 pt-2 animate-fade-in">
          <div className="space-y-1">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-navy-700 hover:bg-primary-50/50 hover:text-primary-600 transition-all duration-200"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 rounded-xl text-sm text-text-secondary hover:bg-primary-50/50 hover:text-primary-600 transition-all duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 px-4">
            <LoginLink>
              <Button variant="secondary" className="w-full hidden">
                Log In
              </Button>
            </LoginLink>
            <Link href="/enrol">
              <Button className="w-full">Enrol Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
