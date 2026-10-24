import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { company, locales, products } from "../src/lib/catalog.ts";

const origin = process.env.QA_ORIGIN || "http://localhost:3000";
const paths = ["", "/about", "/products", "/sustainability", "/contact", ...products.map((product) => `/products/${product.slug}`)];
const root = await fetch(origin, { redirect: "manual" });
assert.ok([307, 308].includes(root.status));
assert.equal(new URL(root.headers.get("location")!, origin).pathname, "/en");
const images = new Set<string>();
const internalLinks = new Set<string>();
const results: { path: string; status: number }[] = [];
for (const locale of locales) {
  for (const path of paths) {
    const route = `/${locale}${path}`;
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
    assert.match(html, new RegExp(`dir="${locale === "ar" ? "rtl" : "ltr"}"`));
    assert.ok(html.includes(`${company.origin}${route}`), `canonical ${route}`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `one h1: ${route}`);
    assert.doesNotMatch(html, /Pratama|lorem ipsum|dummy copy|placeholder page/i);
    if (["/about", "/products", "/sustainability", "/contact"].includes(path)) {
      const page = path.slice(1);
      const anchor = page === "products" ? "catalog" : `${page}-content`;
      assert.match(html, new RegExp(`${page}-hero(?:\\.|%2E)webp`), `hero image: ${route}`);
      assert.match(html, /<header class="site-header header-home"/, `overlay navbar: ${route}`);
      assert.ok(html.includes(`href="#${anchor}"`) && html.includes(`id="${anchor}"`), `hero anchor: ${route}`);
    } else if (path.startsWith("/products/")) {
      assert.doesNotMatch(html, /<header class="site-header header-home/, `detail navbar unchanged: ${route}`);
    }
    for (const match of html.matchAll(/src="(\/[^"\s]+)"/g)) images.add(match[1].replaceAll("&amp;", "&"));
    for (const match of html.matchAll(/href="(\/[^"\s]+)"/g)) internalLinks.add(match[1].replaceAll("&amp;", "&").split("#")[0]);
    results.push({ path: route, status: response.status });
  }
  assert.equal((await fetch(`${origin}/${locale}/products/not-a-product`)).status, 404);
  assert.equal((await fetch(`${origin}/${locale}/not-a-page`)).status, 404);
}
assert.equal((await fetch(`${origin}/fr`)).status, 404);
for (const resource of new Set([...images, ...internalLinks])) {
  const response = await fetch(origin + resource);
  assert.equal(response.status, 200, `resource ${resource}`);
}
const pdf = await fetch(origin + company.pdf);
assert.match(pdf.headers.get("content-type") || "", /application\/pdf/);
const hash = (buffer: Buffer) => createHash("sha256").update(buffer).digest("hex");
assert.equal(hash(Buffer.from(await pdf.arrayBuffer())), hash(await readFile("Compro/Compro SBN 2026.pdf")));
const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 84);
assert.ok((await (await fetch(origin + "/robots.txt")).text()).includes(company.origin + "/sitemap.xml"));
await mkdir("artifacts/qa", { recursive: true });
await writeFile("artifacts/qa/http-smoke.json", JSON.stringify({ origin, pages: results, resources: [...new Set([...images, ...internalLinks])].length, pdf: "SHA-256 matches original", invalidRoutes: "404", sitemap: 84 }, null, 2));
console.log(`PASS: ${results.length} pages, ${images.size} rendered resources, ${internalLinks.size} internal links, 404s, PDF checksum, sitemap, robots`);
