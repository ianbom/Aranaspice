import type { MetadataRoute } from "next";
import { company, locales, products } from "@/lib/catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/products", "/sustainability", "/contact", ...products.map((product) => `/products/${product.slug}`)];
  return locales.flatMap((locale) => paths.map((path) => ({ url: `${company.origin}/${locale}${path}`, alternates: { languages: Object.fromEntries([...locales.map((language) => [language, `${company.origin}/${language}${path}`]), ["x-default", `${company.origin}/en${path}`]]) } })));
}
