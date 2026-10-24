import assert from "node:assert/strict";
import { products, locales } from "../src/lib/catalog.ts";
import { buildWhatsAppUrl, validateInquiry } from "../src/lib/inquiry.ts";
import { copy } from "../src/lib/dictionary.ts";
import { existsSync, readFileSync } from "node:fs";

const motionCss = readFileSync("src/app/globals.css", "utf8");
const motionRuntime = readFileSync("src/components/scroll-motion.tsx", "utf8");
const motionDelays = [...motionCss.matchAll(/--motion-delay(?:-\d+)?:\s*(\d+)ms/g)].map((match) => Number(match[1]));
assert.ok(motionDelays.length > 0 && Math.max(...motionDelays) <= 250);
assert.match(motionCss, /@media \(prefers-reduced-motion: no-preference\) \{\s*\[data-motion\]/);
assert.match(motionCss, /\[data-motion\], \[data-motion-state="pending"\] \{ opacity: 1 !important;[\s\S]*?transition: none !important; animation: none !important;/);
assert.match(motionRuntime, /if \(typeof window.IntersectionObserver !== "function"\) return;/);
assert.match(motionRuntime, /const revealed = new WeakSet<Element>\(\)/);
assert.match(motionCss, /html\[data-motion-reduced\][^\n]+animation: none !important;/);
assert.match(motionRuntime, /dataset.motionReduced = "true"/);

assert.equal(products.length, 16);
assert.equal(new Set(products.map((product) => product.slug)).size, 16);
assert.deepEqual(locales, ["en", "id", "zh", "ar"]);
for (const entry of Object.values(copy)) for (const locale of locales) assert.ok(entry[locale].trim());
for (const product of products) {
  assert.ok(existsSync(`public/images/${product.slug}.webp`));
  for (const locale of locales) {
    assert.ok(product.name[locale].trim());
    assert.ok(product.description[locale].trim());
    for (const spec of product.specs) assert.ok(spec.value[locale].trim());
  }
}
for (const [category, count] of [["whole", 10], ["ground", 5], ["innovative", 1]] as const) {
  assert.equal(products.filter((product) => product.category === category).length, count);
}
const buyer = { name: "A & B / أحمد 王", email: "buyer@example.com", country: "中国", message: "توريد & spices? #100%", company: "", quantity: "2.5", unit: "kg" };
for (const locale of locales) {
  const url = new URL(buildWhatsAppUrl(locale, buyer, products[0].name[locale]));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/628123381141");
  const message = url.searchParams.get("text")!;
  assert.ok(message.includes(buyer.name));
  assert.ok(message.includes(buyer.message));
  assert.ok(message.includes(products[0].name[locale]));
  assert.deepEqual(validateInquiry(buyer), {});
}
for (const quantity of ["0", "-1", "Infinity", "NaN", "abc"]) {
  assert.equal(validateInquiry({ ...buyer, quantity }).quantity, "quantity");
}
assert.deepEqual(validateInquiry({ ...buyer, quantity: "" }), {});
assert.equal(validateInquiry({ ...buyer, name: " " }).name, "required");
assert.equal(validateInquiry({ ...buyer, email: "bad@" }).email, "email");
console.log("PASS: catalog, locales, validation, Unicode WhatsApp, and motion fallback/stagger checks");
