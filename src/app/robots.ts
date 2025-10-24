import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soram.team";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/sr-adm/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
