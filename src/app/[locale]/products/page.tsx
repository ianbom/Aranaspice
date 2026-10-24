import { notFound } from "next/navigation";
import { isLocale } from "@/lib/catalog";
import { getCopy } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { Catalog } from "@/components/interactive";
import { PageHeading, ContactCta, DocumentLinks } from "@/components/sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = getCopy(locale);
  return pageMetadata(locale, "/products", text.products, text.catalogBody);
}
export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = getCopy(locale);
  return <main id="main"><PageHeading eyebrow={text.rangeEyebrow} title={text.catalogTitle} body={text.catalogBody} /><section className="section catalog-section" id="catalog"><div className="wrap"><Catalog locale={locale} /><div className="catalog-download"><DocumentLinks locale={locale} /></div></div></section><ContactCta locale={locale} /></main>;
}
