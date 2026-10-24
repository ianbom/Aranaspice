# Verification - October 24, 2026

## Result

- Production build: PASS, 84 localized content pages (5 core routes + 16 product details, in 4 locales).
- ESLint: PASS, no warnings/errors. TypeScript: PASS. Runnable catalog/inquiry checks: PASS.
- Production dependency audit: 0 reported vulnerabilities.
- HTTP smoke: 84 pages, 40 rendered resources, 91 internal link targets. Root redirects to English. Invalid products/pages/locales return HTTP 404.
- Downloadable PDF: SHA-256 matches the original Compro. Both download labels use this same document.
- Canonicals, 84-entry sitemap, hreflang and robots: PASS.
- Core text colour combinations: 9 tested pairs meet WCAG AA normal-text contrast; see contrast.json. Official logo/SDG/certification artwork retains its source colours.

## Browser evidence

23 scenarios passed in local Chrome via browser-harness. Test stdin explicitly used UTF-8, with a Unicode guard. Real Arabic/Mandarin test characters, ampersands, question marks, percent signs and hash characters survive WhatsApp URL encoding.

- Home and Turmeric Ground detail: English/Arabic, each at 1440, 768 and 390 pixels. No horizontal overflow or broken loaded images.
- Catalog filters: 10 Whole / 5 Ground / 1 Innovative / 16 All.
- English/Arabic mobile menu: keyboard focus stays in the modal, Escape closes, focus returns to the menu trigger. Arabic contact values retain LTR isolation.
- FAQ: pointer activation and keyboard toggle.
- Product inquiry: English/Arabic/Mandarin required-field validation, positive quantity validation, correct destination/product/message, blocked-window fallback, retained inputs and unchanged localStorage. Floating WhatsApp is hidden while the form is in view.
- General contact inquiry: required fields, invalid email, optional fields empty, fallback link and no automatically added product.
- Language switch: retains the Long Pepper detail context from English to Indonesian.
- Indonesian/Mandarin browser smoke: home, products, chocolate detail, about, sustainability and contact.
- Reduced motion: intro hidden and smooth scrolling disabled.

No WhatsApp inquiry was actually sent. window.open was intercepted in form tests. The website never reports successful delivery or lead storage.

## Screenshots

25 JPG evidence files: 12 viewport screenshots, 8 full-page screenshots, 4 form screenshots and 1 source/render comparison.

- en-home-1440.jpg / en-home-390.jpg
- ar-home-1440.jpg / ar-home-390.jpg
- en-product-1440.jpg / en-product-390.jpg
- ar-product-1440.jpg / ar-product-390.jpg
- Corresponding *-768.jpg and *-full.jpg files
- en-inquiry-390.jpg / ar-inquiry-390.jpg / zh-inquiry-390.jpg
- en-contact-inquiry-390.jpg
- hero-reference-comparison.jpg

The brief screenshots are retained outside public in ../reference. Visual review uses the brief's pill navigation, product collage, strong display headings, dark fields, editorial composition, spacing, export map and specification boxes. This is an Aranaspice adaptation, not a claim of pixel-identical reproduction. The current live reference's warehouse hero, palette and company facts are not used.

## Source limits

See ../../docs/sources.md. Ambiguous turmeric loading is omitted; document prices are not published. Undocumented product figures, minimum quantities and lead times are not invented. Certificate scope/IDs/dates/current validity and unclear event/award details are not asserted. The user confirmed the Candlenut photo identity. No production deployment or live WhatsApp account verification is claimed.
