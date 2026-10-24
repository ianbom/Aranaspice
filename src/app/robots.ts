import type { MetadataRoute } from "next";
import { company } from "@/lib/catalog";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${company.origin}/sitemap.xml`, host: company.origin };
}
