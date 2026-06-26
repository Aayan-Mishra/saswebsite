import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/enrol", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketing/programs", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketing/oc-preparation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketing/selective-preparation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketing/naplan-preparation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketing/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/marketing/testimonials", priority: 0.7, changeFrequency: "monthly" },
    { path: "/marketing/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/marketing/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
