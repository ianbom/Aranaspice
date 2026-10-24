# Interior hero and navbar QA

Date: 2026-10-24. Local production server: http://localhost:3110.

## Changes

- Shared Home hero reused for About, Products, Sustainability and Contact.
- Images: hero-1.png to About; hero-2.png to Products; hero-3.png to Sustainability; hero-4.png to Contact. Originals unchanged; WebP copies are 174-313 KB.
- Transparent fixed navbar on the five exact top-level routes; solid after 32px scroll. Product-detail navbar unchanged.
- Existing headings/descriptions, translations, section order and interactions retained. Interior heroes add no new sales CTA. Bottom scroll links point to existing content sections.
- Mobile crops retain the subjects. Portrait heroes request sufficient image resolution for object-fit cover; Home image behavior stays unchanged.

## Files

- src/components/sections.tsx: shared Hero variant and content anchor IDs.
- src/components/interactive.tsx: exact-route overlay navbar selection.
- src/app/globals.css: scoped wrapping and four mobile image positions.
- src/app/[locale]/{about,products,sustainability,contact}/page.tsx: use shared Hero.
- public/images/{about,products,sustainability,contact}-hero.webp: optimized copies.
- scripts/smoke.ts: image mapping, overlay header and anchor regression checks; product-detail header preservation.

## Verification

- npm run check, npm run lint, npm run typecheck and npm run build: passed. Build output: build.log.
- QA_ORIGIN=http://localhost:3110 npm run smoke: passed; 84 pages, 42 rendered resources, 91 internal links, invalid-route 404s, PDF checksum, sitemap and robots. Details also in ../http-smoke.json.
- browser-matrix.json: 40 hero checks; EN/AR at 1440, 768, 390 and 320px, ID/ZH at 390px. Checks include correct assets, loaded images, transparent logo/header, solid scrolled header, heading wrapping, hero dimensions, content/foot separation and valid anchor targets. Browser version: browser-version.json.
- interactions.json: EN/AR anchor and mobile menu with Escape/focus return; 10/5/1/16 category filters; locale switcher preserving four routes; EN/AR required-field validation and Unicode WhatsApp messages intercepted without sending; reduced motion; JS-disabled SSR screenshot. No runtime/console errors during the instrumented menu and inquiry checks.
- Baseline screenshots are in baseline/. Final screenshots are named by locale, viewport and page. Desktop EN/AR Home and product-detail screenshots match the baseline pixel-for-pixel. Mobile comparisons can differ in responsive image resource selection; source layout and Home image settings remain unchanged. Raw comparison: baseline-comparison.json.

## Limits

- Existing English About body content still overflows at 320px (370px document width). Its grid/content styles were not changed; hero and navbar fit the viewport.
- No JavaScript: hero and static content remain readable; interactive menu, locale selector, filters and inquiry submission require JavaScript, as before.
- Browser QA uses local Chromium emulation, not physical devices or Safari/Firefox. No frame-rate claim.
