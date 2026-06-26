import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials & Results | Parent & Student Reviews",
  description:
    "Real results from Success at School families — read parent and student reviews of our OC, NAPLAN and Selective preparation tutoring across Western Sydney.",
  path: "/marketing/testimonials",
  keywords: [
    "Success at School reviews",
    "tutoring testimonials",
    "OC tutoring results",
    "selective school results",
  ],
});

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/marketing/testimonials" },
        ])}
      />
      {children}
    </>
  );
}
