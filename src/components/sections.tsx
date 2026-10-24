import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, Download, Sprout, Globe2, MoveUpRight, Mail, Phone, MapPin, AtSign } from "lucide-react";
import { categories, company, markets, products, specLabels, type Locale, type Product } from "@/lib/catalog";
import { getCopy, missions, sdgs, steps, values } from "@/lib/dictionary";
import { Faq, InquiryForm } from "@/components/interactive";

export function DocumentLinks({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <div className="document-links"><a href={company.pdf} download="Aranaspice-Company-Profile-2026.pdf"><Download size={18} aria-hidden="true" />{text.catalog}</a><a href={company.pdf} download="Aranaspice-Company-Profile-2026.pdf"><Download size={18} aria-hidden="true" />{text.profile}</a><p>{text.sameDocument}</p></div>;
}

export function Hero({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="hero dark-section">
    <Image className="hero-background" src="/images/spices-hero.webp" alt="" fill sizes="100vw" priority />
    <div className="wrap hero-inner">
      <div className="hero-content"><p className="eyebrow">{text.heroEyebrow}</p><h1>{text.heroTitle}</h1><p className="hero-description">{text.heroBody}</p><div className="hero-actions"><Link className="button gold" href={`/${locale}/contact`}>{text.quote}<ArrowUpRight size={19} aria-hidden="true" /></Link><a className="hero-download" href={company.pdf} download>{text.profile}<Download size={16} aria-hidden="true" /></a></div></div>
      <div className="hero-foot"><span>{text.scroll}</span><a href="#story" aria-label={text.about}><ArrowDown size={20} /></a><span>PT. SARI BHUWANA NUSAJAYA</span></div>
    </div>
  </section>;
}

export function Intro({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section intro" id="story"><div className="wrap intro-layout"><div className="intro-visual"><div className="photo-frame"><Image src="/images/spices-still-life.webp" alt={text.wholeBody} fill sizes="(max-width: 700px) 90vw, 42vw" /></div><span className="origin-stamp"><Sprout size={27} /><span>INDONESIA<br />ARANASPICE</span></span></div><div className="intro-copy"><p className="eyebrow">{text.introEyebrow}</p><h2>{text.introTitle}</h2><p className="body-copy">{text.introBody}</p><Link href={`/${locale}/about`} className="text-link">{text.storyLink}<ArrowUpRight size={19} aria-hidden="true" /></Link><div className="intro-facts"><span>2018<small>{locale === "en" ? "Our journey began" : locale === "id" ? "Awal perjalanan kami" : locale === "zh" ? "我们的旅程始于" : "بداية رحلتنا"}</small></span><span><Globe2 size={29} /><small>{text.origin}</small></span></div></div></div></section>;
}

export function ProductHighlights({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section product-highlights dark-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">{text.rangeEyebrow}</p><h2>{text.rangeTitle}</h2></div><Link className="button outline-light" href={`/${locale}/products`}>{text.allProducts}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    <div className="category-layout"><Link href={`/${locale}/products#catalog`} className="category-feature"><div className="category-image"><Image src="/images/whole-editorial.webp" alt="" fill sizes="(max-width: 700px) 90vw, 47vw" /></div><div className="category-overlay"><span className="eyebrow">01 / 10 {text.productCount}</span><h3>{categories.whole[locale]}</h3><p>{text.wholeBody}</p><span className="round-arrow"><ArrowUpRight size={24} aria-hidden="true" /></span></div></Link>
    <div className="category-side">{(["ground", "innovative"] as const).map((category, index) => <Link href={`/${locale}/products#catalog`} className={`category-small ${category}`} key={category}><div><span className="eyebrow">0{index + 2} / {index === 0 ? "5" : "1"}</span><h3>{categories[category][locale]}</h3><p>{category === "ground" ? text.groundBody : text.innovativeBody}</p><span className="text-link">{text.viewProducts}<ArrowUpRight size={17} aria-hidden="true" /></span></div><div className="category-small-photo"><Image src={`/images/${category === "ground" ? "turmeric-ground" : "spice-chocolate"}.webp`} alt="" fill sizes="(max-width: 700px) 35vw, 20vw" /></div></Link>)}</div></div>
  </div></section>;
}

export function OrderGuide({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section order-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">{text.processEyebrow}</p><h2>{text.processTitle}</h2></div><p className="section-aside">{text.processNote}</p></div><ol className="order-steps">{steps.map((step, index) => <li key={index}><span className="step-number">0{index + 1}</span><div><h3>{step.title[locale]}</h3><p>{step.body[locale]}</p></div><MoveUpRight size={21} aria-hidden="true" /></li>)}</ol></div></section>;
}

export function ExportMap({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section export-section dark-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">{text.exportEyebrow}</p><h2>{text.exportTitle}</h2></div><p className="section-aside">{text.exportBody}</p></div><div className="world-map" dir="ltr"><svg viewBox="0 0 1000 480" role="img" aria-labelledby="world-title world-desc"><title id="world-title">{text.mapAlt}</title><desc id="world-desc">{markets.map((market, index) => `${index + 1}. ${market.name[locale]}`).join("; ")}</desc><image href="/images/world.svg" width="1000" height="480" />{markets.map((market, index) => {
    const originX = (market.lon + 180) / 360 * 1000;
    const originY = (85 - market.lat) / 145 * 480;
    const offset = index === 2 ? [-12, -44] : index === 5 ? [50, -7] : index === 6 ? [-9, 33] : index === 4 ? [18, -18] : [0, 0];
    const [x, y] = [originX + offset[0], originY + offset[1]];
    return <g key={index}><circle cx={originX} cy={originY} r="3" fill="#D9BD00" />{(offset[0] !== 0 || offset[1] !== 0) && <path d={`M${originX},${originY}L${x},${y}`} stroke="#D9BD00" strokeWidth="1.1" />}<circle cx={x} cy={y} r="11" fill="#D9BD00" stroke="#203B2A" strokeWidth="2" /><text x={x} y={y + 4} textAnchor="middle" fill="#203B2A" fontSize="11" fontWeight="800">{index + 1}</text></g>;
  })}</svg></div><ol className="market-list">{markets.map((market, index) => <li key={index}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{market.name[locale]}</li>)}</ol></div></section>;
}

export function SustainabilitySection({ locale, full = false }: { locale: Locale; full?: boolean }) {
  const text = getCopy(locale);
  return <section className="section sustainability-section"><div className="wrap"><div className="sustainability-intro"><div><p className="eyebrow">{text.sustainEyebrow}</p><h2>{text.sustainTitle}</h2></div><div><p className="body-copy">{text.sustainBody}</p>{!full && <Link href={`/${locale}/sustainability`} className="text-link">{text.commitments}<ArrowUpRight size={19} aria-hidden="true" /></Link>}</div></div>
    {full ? <div className="sdg-grid">{sdgs.map((sdg) => <article className="sdg-item" key={sdg.number}><Image src={`/images/sdg-${sdg.number}.webp`} alt={`SDG ${sdg.number}: ${sdg.title[locale]}`} width={130} height={130} /><div><span className="eyebrow">SDG {sdg.number}</span><h3>{sdg.title[locale]}</h3><p>{sdg.body[locale]}</p></div></article>)}</div> : <div className="sdg-strip">{sdgs.map((sdg) => <Image key={sdg.number} src={`/images/sdg-${sdg.number}.webp`} alt={`SDG ${sdg.number}: ${sdg.title[locale]}`} width={130} height={130} />)}</div>}
    <p className="source-note">{text.sdgNote}</p></div></section>;
}

export function CompanyDocumentation({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section documentation"><div className="wrap"><div className="documentation-layout"><div><p className="eyebrow">{text.qualityEyebrow}</p><h2>{text.qualityTitle}</h2><div className="certifications"><figure><Image src="/images/haccp-mark.webp" alt="HACCP" width={105} height={105} /><figcaption>HACCP</figcaption></figure><figure><Image src="/images/halal-mark.webp" alt="HALAL Indonesia" width={90} height={105} /><figcaption>HALAL</figcaption></figure><div><strong>BPOM / GMP</strong><small>{text.legality}</small></div></div><p className="source-note">{text.certNote}</p><DocumentLinks locale={locale} /></div><div className="exhibition-photos"><figure><div className="exhibition-image"><Image src="/images/company-exhibition.webp" alt={text.exhibition} fill sizes="(max-width: 700px) 45vw, 25vw" /></div><figcaption>{text.exhibition}</figcaption></figure><figure><div className="exhibition-image"><Image src="/images/business-forum.webp" alt={text.forum} fill sizes="(max-width: 700px) 45vw, 24vw" /></div><figcaption>{text.forum}</figcaption></figure></div></div></div></section>;
}

export function FaqSection({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section faq-section"><div className="wrap faq-layout"><div><p className="eyebrow">{text.faqEyebrow}</p><h2>{text.faqTitle}</h2><Link href={`/${locale}/contact`} className="text-link">{text.contact}<ArrowUpRight size={19} aria-hidden="true" /></Link></div><Faq locale={locale} /></div></section>;
}

export function ContactCta({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="cta-section"><div className="wrap cta-layout"><h2>{text.ctaTitle}</h2><div><p>{text.ctaBody}</p><Link className="button forest" href={`/${locale}/contact`}>{text.quote}<ArrowUpRight size={20} aria-hidden="true" /></Link></div><Sprout className="cta-sprout" size={180} strokeWidth={0.8} aria-hidden="true" /></div></section>;
}

export function Footer({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <footer className="site-footer dark-section"><div className="wrap"><div className="footer-layout"><div className="footer-brand"><Link href={`/${locale}`} aria-label="Aranaspice"><Image src="/images/aranaspice-logo.webp" alt="Aranaspice" width={140} height={140} /></Link><p>{text.footerBody}</p><strong>{company.name}</strong></div><div><h2>{text.navigation}</h2><nav aria-label={text.navigation}>{(["", "/about", "/products", "/sustainability", "/contact"] as const).map((route, index) => <Link href={`/${locale}${route}`} key={route}>{[text.home, text.about, text.products, text.sustainability, text.contact][index]}</Link>)}</nav></div><div className="footer-contact"><h2>{text.contact}</h2><a href={`mailto:${company.email}`}><bdi>{company.email}</bdi></a><a href="tel:+628123381141"><bdi>{company.phone}</bdi></a><a href="tel:+6281336542475"><bdi>{company.phoneSecondary}</bdi></a><address>{company.address}</address><div className="social-links"><a href="https://www.instagram.com/saribhuwana/" target="_blank" rel="noopener noreferrer">@saribhuwana</a><a href="https://www.instagram.com/aranaspice.id/" target="_blank" rel="noopener noreferrer">@aranaspice.id</a></div></div></div><div className="footer-documents"><span>{text.downloads}</span><DocumentLinks locale={locale} /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {company.name}. {text.rights}</span><a href={company.origin}><bdi>www.saribhuwana.com</bdi><ArrowUpRight size={14} aria-hidden="true" /></a></div></div></footer>;
}

export function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <section className="page-heading"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{body && <p>{body}</p>}</div></section>;
}

export function AboutContent({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <><section className="section"><div className="wrap about-layout"><div className="about-photo"><Image src="/images/whole-editorial.webp" alt={text.wholeBody} fill sizes="(max-width: 700px) 90vw, 45vw" priority /></div><div><p className="eyebrow">PT. SARI BHUWANA NUSAJAYA / 2018</p><h2>{text.introTitle}</h2><p className="body-copy">{text.introBody}</p><div className="vision"><h3>{text.vision}</h3><p>{text.visionBody}</p></div></div></div></section><section className="section dark-section"><div className="wrap mission-layout"><div><p className="eyebrow">ARANASPICE</p><h2>{text.mission}</h2></div><ol>{missions.map((mission, index) => <li key={index}><span>0{index + 1}</span><p>{mission[locale]}</p></li>)}</ol></div></section><section className="section values-section"><div className="wrap"><h2>{text.values}</h2><div className="values-list">{values.map((value, index) => <div key={index}><span aria-hidden="true">{"SPICE"[index]}</span><h3>{value[locale]}</h3></div>)}</div><div className="advantages"><h3>{text.advantages}</h3><p>{text.advantagesBody}</p></div></div></section></>;
}

export function ProductDetail({ locale, product }: { locale: Locale; product: Product }) {
  const text = getCopy(locale);
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  return <><section className="product-detail section"><div className="wrap"><nav className="breadcrumbs" aria-label={text.navigation}><Link href={`/${locale}`}>{text.home}</Link><span>/</span><Link href={`/${locale}/products`}>{text.products}</Link><span>/</span><span>{product.name[locale]}</span></nav><div className="detail-layout"><div className={`detail-photo ${product.category === "innovative" || product.slug === "spice-mix-powder" ? "editorial-photo" : ""}`}><Image src={`/images/${product.slug}.webp`} alt={product.name[locale]} fill sizes="(max-width: 700px) 90vw, 47vw" priority /></div><div className="detail-copy"><p className="eyebrow">{categories[product.category][locale]}</p><h1>{product.name[locale]}</h1><p className="body-copy">{product.description[locale]}</p><a href="#inquiry" className="button gold">{text.quote}<ArrowUpRight size={19} aria-hidden="true" /></a><div className="specification-box">{product.specs.length ? <><h2>{text.specifications}</h2><dl>{product.specs.map((spec, index) => <div key={index}><dt>{specLabels[spec.label][locale]}</dt><dd dir={/^[0-9\s%–.,/-]+$/.test(spec.value[locale]) ? "ltr" : "auto"}>{spec.value[locale]}</dd></div>)}</dl><p className="source-note">{text.specNote}</p></> : <><h2>{text.requestSpecs}</h2><p>{text.noSpecs}</p></>}</div></div></div></div></section><section className="section inquiry-section" id="inquiry"><div className="wrap inquiry-layout"><div><p className="eyebrow">{text.processEyebrow}</p><h2>{text.processTitle}</h2><p className="body-copy">{text.contactBody}</p><DocumentLinks locale={locale} /></div><InquiryForm locale={locale} product={product.name[locale]} /></div></section>{related.length > 0 && <section className="section related-section"><div className="wrap"><div className="section-heading"><h2>{text.moreProducts}</h2><Link href={`/${locale}/products`} className="text-link">{text.allProducts}<ArrowUpRight size={18} /></Link></div><div className="related-grid">{related.map((item) => <Link key={item.slug} href={`/${locale}/products/${item.slug}`}><div><Image src={`/images/${item.slug}.webp`} alt="" fill sizes="(max-width: 700px) 85vw, 28vw" /></div><h3>{item.name[locale]}<ArrowUpRight size={19} aria-hidden="true" /></h3></Link>)}</div></div></section>}</>;
}

export function ContactContent({ locale }: { locale: Locale }) {
  const text = getCopy(locale);
  return <section className="section contact-section"><div className="wrap contact-layout"><div className="contact-info"><h2>{company.name}</h2><div><MapPin size={21} aria-hidden="true" /><div><h3>{text.address}</h3><address>{company.address}</address></div></div><div><Mail size={21} aria-hidden="true" /><div><h3>{text.email}</h3><a href={`mailto:${company.email}`}><bdi>{company.email}</bdi></a></div></div><div><Phone size={21} aria-hidden="true" /><div><h3>{text.phone}</h3><a href="tel:+628123381141"><bdi>{company.phone}</bdi></a><a href="tel:+6281336542475"><bdi>{company.phoneSecondary}</bdi></a></div></div><div><AtSign size={21} aria-hidden="true" /><div><h3>{text.follow}</h3><a href="https://www.instagram.com/saribhuwana/" target="_blank" rel="noopener noreferrer"><bdi>@saribhuwana</bdi></a><a href="https://www.instagram.com/aranaspice.id/" target="_blank" rel="noopener noreferrer"><bdi>@aranaspice.id</bdi></a></div></div><DocumentLinks locale={locale} /></div><InquiryForm locale={locale} /></div></section>;
}
