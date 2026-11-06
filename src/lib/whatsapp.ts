/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WHATSAPP CLICK-TO-CHAT UTILITY — VS FITNESS CLUB
 * ─────────────────────────────────────────────────────────────────────────────
 *  Reusable wa.me enquiry helper built on the official club number
 *  (+91 91561 15912 → 919156115912), which lives ONLY in
 *  `src/config/business.ts` (`business.contact.whatsapp`).
 *
 *  How it works:
 *  - Every enquiry opens https://wa.me/919156115912?text=<encoded message>
 *    in a new tab (desktop → WhatsApp Web, mobile → the WhatsApp app).
 *  - Messages are PREFILLED ONLY. Nothing is ever sent automatically —
 *    the visitor always presses Send themselves.
 *  - No API key, no WhatsApp Business API, no server calls.
 *  - When the number is unconfigured, `buildWhatsAppUrl` returns `null`
 *    and UI callers degrade to an honest pending state — never a dead link.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { business } from "@/config/business";

/** Phone digits only (international format, no +, no spaces). */
export type WhatsAppNumber = string;

/** The configured club number, or null while pending owner confirmation. */
export function getWhatsAppNumber(): WhatsAppNumber | null {
  const digits = business.contact.whatsapp.replace(/\D/g, "");
  return digits.length > 0 ? digits : null;
}

/** True when WhatsApp enquiries are live. */
export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber() !== null;
}

/**
 * Build a wa.me deep link with a URI-encoded prefilled message.
 * Returns null when the club number is not yet configured.
 * The visitor always presses Send — nothing is auto-sent.
 */
export function buildWhatsAppUrl(
  message: string,
  number: WhatsAppNumber | null = getWhatsAppNumber()
): string | null {
  if (!number) return null;
  const text = encodeURIComponent(message.trim());
  return text.length > 0
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/${number}`;
}

/* ── Prefilled enquiry templates (owner-approved copy) ───────────────────── */

/** 1 · General contact — footer, floating button, contact section. */
export function generalEnquiryMessage(): string {
  return [
    `Hello ${business.name}!`,
    "",
    "I found your website and would like to know more about your gym, facilities and membership options.",
    "",
    "Please share the details.",
    "",
    "Thank you!",
  ].join("\n");
}

/** 2 · Join now — navbar and hero joining enquiries. */
export function joinNowMessage(): string {
  return [
    `Hello ${business.name}!`,
    "",
    "I am interested in joining your gym.",
    "",
    "Could you please guide me through the joining process and share the available membership options?",
    "",
    "Thank you!",
  ].join("\n");
}

/** 3 · Membership enquiry — generic plans & pricing question. */
export function membershipEnquiryMessage(): string {
  return [
    `Hello ${business.name}!`,
    "",
    "I would like to know about your membership plans and pricing.",
    "",
    "Please share the available options and their benefits.",
    "",
    "Thank you!",
  ].join("\n");
}

/**
 * 4–6 · Plan-specific enquiry — Monthly / Quarterly / Annual.
 * Falls back to the generic membership enquiry for unknown plan names.
 */
export function membershipPlanEnquiryMessage(planName: string): string {
  const key = planName.trim().toLowerCase();

  if (key === "monthly") {
    return [
      `Hello ${business.name}!`,
      "",
      "I am interested in your monthly membership plan.",
      "",
      "Could you please share its pricing, duration and included facilities?",
      "",
      "Thank you!",
    ].join("\n");
  }

  if (key === "quarterly") {
    return [
      `Hello ${business.name}!`,
      "",
      "I am interested in your quarterly membership plan.",
      "",
      "Could you please share the pricing and benefits?",
      "",
      "Thank you!",
    ].join("\n");
  }

  if (key === "annual") {
    return [
      `Hello ${business.name}!`,
      "",
      "I am interested in your annual membership plan.",
      "",
      "Could you please share the pricing and membership benefits?",
      "",
      "Thank you!",
    ].join("\n");
  }

  return membershipEnquiryMessage();
}

/** 7 · Contact trainer — coaching / personal training enquiry. */
export function trainingEnquiryMessage(): string {
  return [
    `Hello ${business.name}!`,
    "",
    "I would like to know more about your personal training and coaching programs.",
    "",
    "Could you please share the available options and charges?",
    "",
    "Thank you!",
  ].join("\n");
}

/* ── Shared anchor props (kept local to avoid repeating target/rel rules) ── */

/** Standard props for opening a WhatsApp conversation in a new tab. */
export const WHATSAPP_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};
