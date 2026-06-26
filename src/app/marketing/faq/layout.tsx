import type { Metadata } from "next";
import { pageMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = pageMetadata({
  title: "Tutoring FAQ | Fees, Programs & Enrolment Questions",
  description:
    "Answers to common questions about Success at School tutoring — fees, class formats, OC/NAPLAN/Selective programs, the parent portal, and how to enrol in Western Sydney.",
  path: "/marketing/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/marketing/faq" },
        ])}
      />
      {children}
    </>
  );
}
