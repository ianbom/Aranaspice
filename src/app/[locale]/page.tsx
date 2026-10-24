import { notFound } from "next/navigation";
import { isLocale } from "@/lib/catalog";
import { getCopy } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { Hero, Intro, ProductHighlights, OrderGuide, ExportMap, SustainabilitySection, CompanyDocumentation, FaqSection, ContactCta } from "@/components/sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getCopy(locale);
  return pageMetadata(locale, "", text.heroTitle, text.heroBody);
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main id="main"><Hero locale={locale} /><Intro locale={locale} /><ProductHighlights locale={locale} /><OrderGuide locale={locale} /><ExportMap locale={locale} /><SustainabilitySection locale={locale} /><CompanyDocumentation locale={locale} /><FaqSection locale={locale} /><ContactCta locale={locale} /></main>;
}
