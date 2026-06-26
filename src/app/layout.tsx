import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Success at School | Premium Tutoring Kindergarten to Year 12",
    template: "%s | Success at School",
  },
  description:
    "Premium tutoring from Kindergarten to Year 12. Specialising in OC, NAPLAN, and Selective preparation. Helping students launch ahead.",
  keywords: [
    "tutoring",
    "OC preparation",
    "NAPLAN preparation",
    "selective school tutoring",
    "Sydney tutoring",
    "primary tutoring",
    "high school tutoring",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
