import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Locations | Plumpton, Hassall Grove & Quakers Hill",
  description:
    "Contact Success at School — call 1300 572 428 or visit our Western Sydney tutoring campuses in Plumpton, Hassall Grove and Quakers Hill. Book a free assessment today.",
  path: "/marketing/contact",
  keywords: [
    "tutoring Plumpton",
    "tutoring Hassall Grove",
    "tutoring Quakers Hill",
    "tutoring near me Western Sydney",
    "contact Success at School",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/marketing/contact" },
        ])}
      />
      {children}
    </>
  );
}
