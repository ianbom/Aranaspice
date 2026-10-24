import { notFound } from "next/navigation";
import { isLocale } from "@/lib/catalog";
import { getCopy } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { PageHeading, AboutContent, CompanyDocumentation, ContactCta } from "@/components/sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getCopy(locale);
  return pageMetadata(locale, "/about", text.about, text.introBody);
}
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = getCopy(locale);
  return <main id="main"><PageHeading eyebrow={text.about} title={text.aboutTitle} /><AboutContent locale={locale} /><CompanyDocumentation locale={locale} /><ContactCta locale={locale} /></main>;
}
