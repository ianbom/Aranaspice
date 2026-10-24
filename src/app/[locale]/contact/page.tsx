import { notFound } from "next/navigation";
import { isLocale } from "@/lib/catalog";
import { getCopy } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { Hero, ContactContent } from "@/components/sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getCopy(locale);
  return pageMetadata(locale, "/contact", text.contact, text.contactBody);
}
export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <main id="main"><Hero locale={locale} page="contact" /><ContactContent locale={locale} /></main>;
}
