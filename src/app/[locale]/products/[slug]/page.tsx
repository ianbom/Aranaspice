import { notFound } from "next/navigation";
import { isLocale, products } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
import { ProductDetail } from "@/components/sections";

export const dynamicParams = false;
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!isLocale(locale) || !product) return {};
  return pageMetadata(locale, `/products/${slug}`, product.name[locale], product.description[locale]);
}
export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!isLocale(locale) || !product) notFound();
  return <main id="main"><ProductDetail locale={locale} product={product} /></main>;
}
