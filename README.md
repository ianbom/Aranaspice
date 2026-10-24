# Aranaspice

Company-profile website for PT. Sari Bhuwana Nusajaya. Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui. Static company/catalog content; WhatsApp inquiries only. No database, lead storage, email API, checkout, or credentials.

## Run (PowerShell)

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`. Root redirects to `/en`; available locales: `en`, `id`, `zh`, `ar`.

Production:

```powershell
npm run build
npm start
```

Node.js 24 LTS was used for verification. Next.js requires Node >=20.9; the check scripts require Node >=22.18 for native TypeScript execution.

## Verify

```powershell
npm run lint
npm run typecheck
npm run check
npm run build
# With npm start running in another terminal:
npm run smoke
# Optional: installed browser-harness + its local Chrome connection:
$env:PYTHONUTF8 = "1"
Get-Content scripts/browser-qa.py -Encoding utf8 -Raw | browser-harness
```

`QA_ORIGIN` overrides the HTTP smoke-test origin. Browser QA uses localhost:3000 and writes evidence beneath the current working directory. It intercepts `window.open` while testing inquiries: no actual WhatsApp inquiry is sent. Form test values exist only in the test page's memory.

## Content and evidence

- Catalog, contacts, specs: `src/lib/catalog.ts`.
- Four-language copy: `src/lib/dictionary.ts`.
- WhatsApp validation/encoding: `src/lib/inquiry.ts`.
- Source decisions and limitations: `docs/sources.md`.
- Browser screenshots and verification output: `artifacts/qa/`.

Canonical domain is `https://www.saribhuwana.com`; this is a local build, not a production deployment. Both download labels use the same original 2026 company-profile PDF. Contact digits are preserved exactly from page 16.

All source documents and images remain unchanged. Optimized images, logo, fonts and PDF are included in `public`; regenerating them is not necessary to run the website. Optional preparation scripts require Python, Pillow and fontTools. Font subsets include the current website's characters: rerun font preparation when extending translations. Open font licenses are included in `public/fonts/`.
