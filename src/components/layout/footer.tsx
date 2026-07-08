"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const footerLinks = {
  Programs: [
    { label: "OC Preparation", href: "/marketing/oc-preparation" },
    { label: "NAPLAN Preparation", href: "/marketing/naplan-preparation" },
    { label: "Selective Preparation", href: "/marketing/selective-preparation" },
    { label: "Primary Tutoring", href: "/marketing/programs" },
    { label: "High School Tutoring", href: "/marketing/programs" },
  ],
  Company: [
    { label: "About Us", href: "/marketing/about" },
    { label: "Testimonials", href: "/marketing/testimonials" },
    { label: "FAQ", href: "/marketing/faq" },
    { label: "Contact", href: "/marketing/contact" },
  ],
  Support: [
    { label: "Enrol Now", href: "/enrol" },
    { label: "Book a Consultation", href: "/marketing/contact" },
    { label: "Parent Portal", href: "/dashboard/parent" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Success at School"
                width={40}
                height={40}
                className="rounded-lg brightness-0 invert"
              />
              <span className="text-xl font-bold text-white">Success at School</span>
            </Link>
            <p className="text-navy-200 text-sm leading-relaxed max-w-xs">
              Helping students launch ahead. Premium tutoring from Kindergarten to Year 12.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-navy-300 hover:text-primary-300 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">
            &copy; {new Date().getFullYear()} Success at School. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-navy-400 hover:text-primary-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-navy-400 hover:text-primary-300 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
