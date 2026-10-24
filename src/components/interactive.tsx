"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { MotionRefreshContext } from "@/components/scroll-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { ArrowUpRight, Menu, X, Globe2, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { categories, company, isLocale, locales, products, type Category, type Locale } from "@/lib/catalog";
import { faqs, getCopy } from "@/lib/dictionary";
import { buildWhatsAppUrl, validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";

export const navigation = ["", "/about", "/products", "/sustainability", "/contact"] as const;
const languageNames = { en: "English", id: "Indonesia", zh: "中文", ar: "العربية" };

export function Header({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = navigation.some((route) => pathname === `/${locale}${route}`);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, [pathname]);
  const titles = [text.home, text.about, text.products, text.sustainability, text.contact];
  return <header className={`site-header${overlay ? " header-home" : ""}${scrolled ? " header-scrolled" : ""}`}>
    <a className="skip-link" href="#main">{text.skip}</a>
    <div className="header-inner">
      <Link href={`/${locale}`} className="brand" aria-label={`Aranaspice — ${text.home}`}><Image src="/images/aranaspice-logo.webp" alt="Aranaspice" width={96} height={96} priority /></Link>
      <nav className="desktop-nav" aria-label={text.navigation}>{navigation.map((route, index) => <Link key={route} href={`/${locale}${route}`} aria-current={pathname === `/${locale}${route}` ? "page" : undefined}>{titles[index]}</Link>)}</nav>
      <div className="header-actions">
        <label className="locale-control"><Globe2 size={15} aria-hidden="true" /><span className="sr-only">{text.language}</span><select aria-label={text.language} value={locale} onChange={(event) => { window.location.assign(pathname.replace(/^\/(en|id|zh|ar)(?=\/|$)/, `/${event.target.value}`)); }}>{locales.map((language) => <option key={language} value={language} lang={language}>{languageNames[language]}</option>)}</select></label>
        <Link className="button gold header-quote" href={`/${locale}/contact`}>{text.quote}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" className="mobile-trigger" aria-label={text.menu}><Menu size={22} /><span>{text.menu}</span></Button></SheetTrigger><SheetContent side={locale === "ar" ? "left" : "right"} showCloseButton={false} className="mobile-sheet" dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="sheet-top"><SheetTitle>{text.menu}</SheetTitle><SheetClose asChild><Button variant="ghost" size="icon" aria-label={text.closeMenu}><X /></Button></SheetClose></div>
          <SheetDescription className="sr-only">{text.navigation}</SheetDescription>
          <nav aria-label={text.navigation}>{navigation.map((route, index) => <Link key={route} href={`/${locale}${route}`} onClick={() => setOpen(false)} aria-current={pathname === `/${locale}${route}` ? "page" : undefined}>{titles[index]}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav>
          <Link className="button gold" href={`/${locale}/contact`} onClick={() => setOpen(false)}>{text.quote}<ArrowUpRight size={18} /></Link>
        </SheetContent></Sheet>
      </div>
    </div>
  </header>;
}

export function BootSplash() {
  return <div className="boot-splash" aria-hidden="true"><Image src="/images/aranaspice-logo.webp" alt="" width={180} height={180} /></div>;
}

export function Faq({ locale }: { locale: Locale }) {
  return <Accordion type="single" collapsible className="faq-accordion">{faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={index} data-motion="faq-item"><AccordionTrigger>{faq.question[locale]}</AccordionTrigger><AccordionContent>{faq.answer[locale]}</AccordionContent></AccordionItem>)}</Accordion>;
}

export function Catalog({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  const refreshMotion = useContext(MotionRefreshContext);
  const [category, setCategory] = useState<Category | "all">("all");
  const shown = products.filter((product) => category === "all" || product.category === category);
  useLayoutEffect(() => { refreshMotion(true); }, [category, refreshMotion]);
  return <><div className="filter-bar" role="group" aria-label={text.filter}>{(["all", "whole", "ground", "innovative"] as const).map((value) => <button type="button" aria-pressed={category === value} key={value} onClick={() => setCategory(value)}>{value === "all" ? text.allProducts : categories[value][locale]}<span>{value === "all" ? 16 : products.filter((product) => product.category === value).length}</span></button>)}</div>
    <p className="result-count" aria-live="polite">{shown.length} {text.productCount}</p>
    <div className="product-grid">{shown.map((product, index) => <article className="product-card" data-motion="card" key={product.slug}>
      <Link className={`product-photo ${product.category === "innovative" || product.slug === "spice-mix-powder" ? "editorial-photo" : ""}`} href={`/${locale}/products/${product.slug}`} tabIndex={-1} aria-hidden="true"><Image src={`/images/${product.slug}.webp`} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 44vw, 29vw" priority={index < 3} /><span className="round-arrow"><ArrowUpRight size={22} /></span></Link>
      <p className="eyebrow">{categories[product.category][locale]}</p><h2><Link href={`/${locale}/products/${product.slug}`}>{product.name[locale]}</Link></h2><p>{product.description[locale]}</p><Link className="text-link" href={`/${locale}/products/${product.slug}`}>{text.details}<ArrowUpRight size={17} aria-hidden="true" /></Link>
    </article>)}</div></>;
}

const emptyInquiry: Inquiry = { name: "", email: "", country: "", message: "", company: "", quantity: "", unit: "" };

export function InquiryForm({ locale, product }: { locale: Locale; product?: string }) {
  const text = getCopy(locale);
  const [values, setValues] = useState<Inquiry>(emptyInquiry);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [url, setUrl] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const prefix = product ? "product-inquiry" : "general-inquiry";
  function change(field: keyof Inquiry, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setUrl("");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }
    const link = buildWhatsAppUrl(locale, values, product);
    setUrl(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }
  function error(field: keyof Inquiry) {
    if (!errors[field]) return null;
    return <p className="field-error" id={`${prefix}-${field}-error`} role="alert">{errors[field] === "email" ? text.invalidEmail : errors[field] === "quantity" ? text.invalidQuantity : text.required}</p>;
  }
  return <form ref={form} className="inquiry-form" noValidate onSubmit={submit}>
    <p className="eyebrow">{text.quote}</p><h2 className="form-title">{text.inquiryTitle}</h2><p className="form-note">{text.inquiryNote}</p>
    {product && <p className="inquiry-product"><span>{text.product}</span><strong>{product}</strong></p>}
    <p className="required-hint">{text.requiredHint}</p>
    <div className="form-grid">{(["name", "email", "company", "country", "quantity", "unit"] as const).map((field) => <div className="field" key={field}>
      <Label htmlFor={`${prefix}-${field}`}>{text[field]} {["name", "email", "country"].includes(field) ? "*" : <span>({text.optional})</span>}</Label>
      <Input id={`${prefix}-${field}`} name={field} type={field === "email" ? "email" : "text"} inputMode={field === "quantity" ? "decimal" : field === "email" ? "email" : undefined} autoComplete={field === "name" ? "name" : field === "email" ? "email" : field === "company" ? "organization" : field === "country" ? "country-name" : "off"} maxLength={field === "email" ? 254 : 150} required={["name", "email", "country"].includes(field)} value={values[field]} onChange={(event) => change(field, event.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${prefix}-${field}-error` : undefined} dir={field === "email" || field === "quantity" ? "ltr" : "auto"} />{error(field)}
    </div>)}<div className="field full"><Label htmlFor={`${prefix}-message`}>{text.message} *</Label><Textarea id={`${prefix}-message`} name="message" maxLength={4000} rows={5} required dir="auto" value={values.message} onChange={(event) => change("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${prefix}-message-error` : undefined} />{error("message")}</div></div>
    <Button type="submit" className="button gold form-submit"><MessageCircle size={19} aria-hidden="true" />{text.continueWa}<ArrowUpRight size={18} aria-hidden="true" /></Button>
    {url && <div className="wa-ready" role="status"><Check size={20} aria-hidden="true" /><div><p>{text.waReady}</p><a href={url} target="_blank" rel="noopener noreferrer">{text.openWa}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>}
  </form>;
}

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  const pathname = usePathname();
  const [formState, setFormState] = useState({ pathname: "", visible: false });
  useEffect(() => {
    const visible = new Set<Element>();
    if (typeof window.IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
      setFormState({ pathname, visible: visible.size > 0 });
    }, { rootMargin: "80px" });
    document.querySelectorAll(".inquiry-form").forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, [pathname]);
  if (formState.pathname === pathname && formState.visible) return null;
  return <a className="floating-whatsapp" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text.inquiryGreeting)}`} target="_blank" rel="noopener noreferrer" aria-label={text.whatsapp}><MessageCircle size={26} aria-hidden="true" /></a>;
}

export function LocalizedNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "en";
  const text = getCopy(locale);
  return <main id="main" className="not-found wrap"><p className="eyebrow">404</p><h1>{text.notFound}</h1><Link className="button gold" href={`/${locale}`}>{text.home}<ArrowUpRight size={18} /></Link></main>;
}
