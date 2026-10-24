import { company, type Locale } from "./catalog.ts";
import { getCopy } from "./dictionary.ts";

export type Inquiry = { name: string; email: string; country: string; message: string; company: string; quantity: string; unit: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, "required" | "email" | "quantity">>;

export function validateInquiry(values: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of ["name", "email", "country", "message"] as const) {
    if (!values[field].trim()) errors[field] = "required";
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "email";
  if (values.quantity.trim() && (!Number.isFinite(Number(values.quantity)) || Number(values.quantity) <= 0)) errors.quantity = "quantity";
  return errors;
}

export function buildWhatsAppUrl(locale: Locale, values: Inquiry, product?: string) {
  const text = getCopy(locale);
  const lines = [text.inquiryGreeting];
  if (product) lines.push(`${text.product}: ${product}`);
  for (const field of ["name", "email", "company", "country", "quantity", "unit", "message"] as const) {
    const value = values[field].trim();
    if (value) lines.push(`${text[field]}: ${value}`);
  }
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
