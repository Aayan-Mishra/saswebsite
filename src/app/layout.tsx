import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, siteGraph } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Success at School | OC, NAPLAN & Selective Tutoring in Western Sydney",
    template: "%s | Success at School",
  },
  description:
    "Premium K–12 tutoring in Western Sydney — Plumpton, Hassall Grove & Quakers Hill. OC, NAPLAN & Selective School prep. Book a free assessment.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: { canonical: "/" },
  keywords: [
    "tutoring Western Sydney",
    "OC preparation",
    "OC test tutoring",
    "NAPLAN preparation",
    "selective school tutoring",
    "selective school test preparation",
    "Plumpton tutoring",
    "Hassall Grove tutoring",
    "Quakers Hill tutoring",
    "primary school tutoring",
    "high school tutoring",
    "maths and English tutoring",
  ],
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Success at School | OC, NAPLAN & Selective Tutoring in Western Sydney",
    description:
      "Premium K–12 tutoring across Western Sydney. Specialists in OC, NAPLAN and Selective School preparation.",
    images: [
      { url: "/logo.png", width: 1200, height: 630, alt: "Success at School" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Success at School | OC, NAPLAN & Selective Tutoring",
    description:
      "Premium K–12 tutoring across Western Sydney. OC, NAPLAN & Selective specialists.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  // Verification tokens are read from env so they can be set per-deploy without
  // a code change. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Search Console) and
  // NEXT_PUBLIC_BING_SITE_VERIFICATION (Bing Webmaster Tools).
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={siteGraph()} />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
