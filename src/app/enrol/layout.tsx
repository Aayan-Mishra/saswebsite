import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Enrol Now | Book a Free Tutoring Assessment",
  description:
    "Enrol your child with Success at School in minutes. Book a free, no-obligation assessment for OC, NAPLAN, Selective or subject tutoring across Western Sydney.",
  path: "/enrol",
  keywords: [
    "enrol tutoring",
    "free tutoring assessment",
    "book tutoring Western Sydney",
    "tutoring enrolment",
  ],
});

export default function EnrolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Enrol", path: "/enrol" },
        ])}
      />
      {children}
    </>
  );
}
