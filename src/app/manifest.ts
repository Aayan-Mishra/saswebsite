import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Tutoring Western Sydney`,
    short_name: SITE_NAME,
    description:
      "Premium K–12 tutoring across Western Sydney. OC, NAPLAN and Selective School specialists.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f97316",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png" },
    ],
  };
}
