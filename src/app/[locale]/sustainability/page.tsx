import { notFound } from "next/navigation";
import { isLocale } from "@/lib/catalog";
import { getCopy } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { PageHeading, SustainabilitySection, ContactCta } from "@/components/sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getCopy(locale);
  return pageMetadata(locale, "/sustainability", text.sustainability, text.sustainBody);
}
export default async function Sustainability({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = getCopy(locale);
  return <main id="main"><PageHeading eyebrow={text.sustainability} title={text.sustainTitle} body={text.sustainBody} /><SustainabilitySection locale={locale} full /><ContactCta locale={locale} /></main>;
}
