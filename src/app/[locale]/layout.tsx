import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { company, isLocale, locales, markets } from "@/lib/catalog";
import { Header, BootSplash, FloatingWhatsApp } from "@/components/interactive";
import { Footer } from "@/components/sections";
import { ScrollMotionProvider } from "@/components/scroll-motion";
import "../globals.css";

const body = localFont({ src: "../../../public/fonts/body.ttf", variable: "--font-body", weight: "100 900", display: "swap" });
const heading = localFont({ src: "../../../public/fonts/heading.ttf", variable: "--font-heading", weight: "200 800", display: "swap" });
const arabic = localFont({ src: "../../../public/fonts/arabic.ttf", variable: "--font-arabic", weight: "100 900", display: "swap", preload: false });
const chinese = localFont({ src: "../../../public/fonts/chinese.ttf", variable: "--font-chinese", weight: "100 900", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(company.origin),
  icons: { icon: "/icon.png", apple: "/icon.png" },
};
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const organization = {
    "@context": "https://schema.org", "@type": "Organization", name: company.name, alternateName: "Aranaspice", url: company.origin,
    logo: `${company.origin}/images/aranaspice-logo.webp`, email: company.email, telephone: company.phone,
    address: { "@type": "PostalAddress", streetAddress: "Taman Pinang Indah Blok GV/25", addressLocality: "Sidoarjo", addressRegion: "East Java", addressCountry: "ID" },
    sameAs: ["https://www.instagram.com/saribhuwana/", "https://www.instagram.com/aranaspice.id/"],
    areaServed: markets.map((market) => ({ "@type": "Place", name: market.name.en })),
  };
  return <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${body.variable} ${heading.variable} ${arabic.variable} ${chinese.variable}`}><head><script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('aranaspice-intro'))document.documentElement.dataset.introSeen='true';sessionStorage.setItem('aranaspice-intro','1')}catch{document.documentElement.dataset.introSeen='true'}" }} /></head><body><ScrollMotionProvider><BootSplash /><Header locale={locale} />{children}<Footer locale={locale} /><FloatingWhatsApp locale={locale} /></ScrollMotionProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} /></body></html>;
}
