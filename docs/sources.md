# Aranaspice: source decisions

## Authority and inspection

Prompt > WEBSITE BRIEF.docx requirements/screenshots > Compro/Compro SBN 2026.pdf > live reference. Read the brief's text and all 11 embedded images, all 16 PDF pages and page JPGs, and all images in Logo/FotoProduk. The live reference was rendered on desktop/mobile on October 24, 2026, including catalog, detail, contact and mobile navigation. Its current light/blue warehouse-based layout differs from the dark/pill/collage screenshots embedded in the brief. The brief is the visual reference; none of the reference company's copy, figures, photos or contacts are used in the site.

## Visual decisions

- Brief image 8: collage hero, navigation pills and split headline/copy composition.
- Images 3 and 6: condensed display headings, dark fields and editorial hierarchy.
- Images 4 and 5: world map plus a permanent readable destination list. Only the brief's 11 Aranaspice destinations are represented.
- Images 10 and 11: real HTML specification boxes, not flattened screenshots.
- Image 9: short logo/colour intro, without its percentage indicator.
- The prompt's six-colour palette overrides brief image 1. The official logo is never recoloured; it sits on ivory for readability.
- The approved hero/navbar revision supersedes the brief collage/pill direction for those components only. Nusa Spice was inspected in desktop/mobile browser rendering on October 24, 2026: full-bleed photography, overlay navigation and left-side hero copy. No Nusa identity, claims or features are imported.
- The user-supplied hero-image.jpg provides the replacement editorial background, optimized to public/images/spices-hero.webp. It does not add catalog products or provenance claims. The original remains unchanged.
- Plus Jakarta Sans headings and Inter body/navigation replace Barlow Condensed/Manrope globally. Noto Sans Arabic and Noto Sans SC retain localized glyph coverage. Fonts are served locally; SIL Open Font License texts are retained.

## Image mapping

Every product slug has a corresponding descriptive image in public/images. Whole Spices map to matching source photos: Turmeric, White Ginger, Dried Galangal, Dried Curcuma, Papua Mace, Nutmeg, Long Pepper, Cubeb, Clove_PT. SBN and Candlenut 1. The user explicitly confirmed that the three Candlenut photos show kemiri. Only one product is created from those angles.

Ground Spices use the labelled Turmeric, Ginger, Red Ginger and White Pepper packages. Ground Spices/1.png is a Ginger Ground composition, not Spice Mix. Spice Mix is cropped from Compro page 7; Spice Chocolate from page 9, without page headings or a whole-page screenshot.

Hero/editorial: DSCF1808OK (spice still life), Ground Spices/1.png, All Spice 2 (mixed editorial composition), and the page-9 chocolate crop. All Spice 2 contains additional ingredients such as vanilla; the image is not treated as an inventory or an additional product. DSCF1823OK, DSCF1787, DSCF1835, DSCF1846 and DSCF7069 are optimized as additional editorial assets. DSCF1800's bottled product is not added to the catalog.

Exhibition/business-discussion photos are cropped from page 13. HACCP and HALAL marks are isolated from page 14 without inventing registration numbers or altering colours. SDG icons 4, 5, 6, 8, 12 and 17 are extracted from brief image 2. World geometry is Natural Earth 1:110m public-domain country geometry; no office map or guessed office coordinates are used.

## Facts and limits

- Profile, vision/mission and SPICE: Compro pages 2-4. Operating since 2018 is presented as a business-history statement, not a verified legal incorporation date.
- Ground specifications: pages 6-7. Ginger/Red Ginger share one source entry for 10 tons/month; individual capacity allocation is explicitly left for confirmation. Capacities are never summed into company-wide capacity.
- Chocolate ingredients, 30/100 g formats, 80-bar master box and 75,000 pcs/year: page 9. Milk is disclosed. Botanical ingredient wording remains as recorded, with no medical claims or inferred identification.
- Dried turmeric/mace: page 11; cubeb/long pepper: page 12. Corrected the clear typo Long Paper to Long Pepper.
- Turmeric loading reads `40'/20' MT`; it is ambiguous, so it is omitted rather than interpreted. Remaining source units and retail/bulk distinctions are retained.
- No numeric specification is invented for ginger slices, galangal, curcuma, nutmeg, clove or candlenut. Their pages explicitly invite confirmation; there are no empty tables.
- Compro prices are not displayed. Current prices, availability, volumes, packing and shipping arrangements must be confirmed with the company.
- Export destinations use all 11 in the brief, even though the PDF lists fewer. Markers identify geographic destinations, not offices, shipping facilities or customers. Macau/Hong Kong use separate callouts.
- HACCP/HALAL are pictured in Compro. BPOM/GMP is mentioned in the brief but supporting IDs, dates and scopes are unavailable. The page differentiates these references; it does not verify current validity or treat product authorization as system certification.
- No exhibition names, award titles or dates are inferred from unclear photo text. Captions identify documentation only; no award claim is made.
- SDGs describe commitment directions, not audited programs, outcomes or beneficiary counts.
- FAQ adapts page 15, with destination/regulatory/logistics confirmation and no universal MOQ or delivery guarantee.
- Company name, address, website, email, two phone numbers and Instagram handles were visually cross-checked against page 16. WhatsApp uses exactly 628123381141, without adding a digit.
- Both download CTAs use the same PDF, explicitly labelled as one document. The downloadable copy is checksum-checked against the source.

## External technology references

- Next.js App Router internationalization: https://nextjs.org/docs/app/guides/internationalization
- Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- shadcn/ui installation: https://ui.shadcn.com/docs/installation/next
- Natural Earth source: https://github.com/nvkelso/natural-earth-vector
- Fonts and licenses: https://github.com/google/fonts

Next.js 16.4.3, React 19.3.1 and Tailwind CSS 4.3.3 were resolved from the package registry; shadcn CLI 4.22.1 generated the UI primitives. The lockfile pins the actual installed dependency tree. The generated `cn` import was replaced with the standard local clsx/tailwind-merge helper.
