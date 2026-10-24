import type { Metadata } from "next";
import { company, locales, type Locale } from "./catalog";

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const cleanTitle = title.replace(/\n/g, " ");
  const url = `${company.origin}/${locale}${path}`;
  return {
    title: `${cleanTitle} | Aranaspice`,
    description,
    alternates: { canonical: url, languages: Object.fromEntries([...locales.map((language) => [language, `${company.origin}/${language}${path}`]), ["x-default", `${company.origin}/en${path}`]]) },
    openGraph: { type: "website", url, title: `${cleanTitle} | Aranaspice`, description, siteName: "Aranaspice", locale: { en: "en_US", id: "id_ID", zh: "zh_CN", ar: "ar_SA" }[locale], images: [{ url: `${company.origin}/images/spices-editorial.webp`, alt: `Aranaspice — ${cleanTitle}`, width: 1040, height: 1300 }] },
    twitter: { card: "summary_large_image", title: `${cleanTitle} | Aranaspice`, description },
  };
}
