import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Tutoring Programs | OC, NAPLAN, Selective & Subject Support",
  description:
    "Explore Success at School's K–12 tutoring programs across Western Sydney — general tutoring, OC and Selective preparation, NAPLAN coaching and targeted subject support.",
  path: "/marketing/programs",
  keywords: [
    "tutoring programs",
    "OC preparation",
    "selective preparation",
    "NAPLAN tutoring",
    "subject support tutoring",
    "K-12 tutoring Western Sydney",
  ],
});

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/marketing/programs" },
        ])}
      />
      {children}
    </>
  );
}
