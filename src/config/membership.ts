/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MEMBERSHIP PLANS — PLACEHOLDER DATA AWAITING OWNER CONFIRMATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Prices are intentionally `null` → rendered as "On request".
 *  Benefits are provisional copy awaiting owner approval; each entry carries
 *  `confirmed: false` so the UI can label unverified line-items.
 *  Never invent real prices — fill `price` (in INR) once the owner confirms.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface MembershipPlan {
  id: "monthly" | "quarterly" | "annual";
  name: string;
  /** Billing period descriptor */
  period: string;
  /** Monthly/total price in INR — null = awaiting owner confirmation */
  price: number | null;
  /** Optional note e.g. "per month" or "save X%" */
  priceNote: string;
  /** Editorial positioning line */
  pitch: string;
  /** Provisional benefits — owner to confirm before launch */
  benefits: string[];
  /** Whether the owner has verified every line item above */
  benefitsConfirmed: boolean;
  /**
   * Featured plan receives a quiet accent on its index number only.
   * No badges, no glow — the accent is purely typographic.
   */
  featured?: boolean;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    period: "1 month",
    price: null,
    priceNote: "Price on request",
    pitch: "Start your training without a long commitment.",
    benefits: [
      "Full access to the club floor",
      "All available training zones",
      "Orientation session for new members",
      "Flexible month-to-month renewal",
    ],
    benefitsConfirmed: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    period: "3 months",
    price: null,
    priceNote: "Price on request",
    pitch: "A focused block to build real, measurable progress.",
    benefits: [
      "Everything in the Monthly plan",
      "Longer training block for steady progress",
      "Progress review at the end of the term",
      "Priority support from the front desk",
    ],
    benefitsConfirmed: false,
    featured: true,
  },
  {
    id: "annual",
    name: "Annual",
    period: "12 months",
    price: null,
    priceNote: "Price on request",
    pitch: "The disciplined choice — a full year of consistent training.",
    benefits: [
      "Everything in the Quarterly plan",
      "Best value for long-term members",
      "Locked-in rate for the full year",
      "Member-only updates and events",
    ],
    benefitsConfirmed: false,
  },
];

/** Disclaimer rendered under the pricing grid. */
export const membershipDisclaimer =
  "Plan benefits and pricing shown are provisional and await confirmation by VS Fitness Club management.";
