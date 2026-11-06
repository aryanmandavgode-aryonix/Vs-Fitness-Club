/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TESTIMONIALS — STRUCTURE ONLY, NO FABRICATED REVIEWS
 * ─────────────────────────────────────────────────────────────────────────────
 *  The brief forbids inventing reviews or names. This file therefore contains
 *  NO testimonial data — only the presentation rules. The Testimonials section
 *  renders an honest "verified reviews coming soon" state built from the
 *  layout below. When the owner collects real member reviews, append them to
 *  `testimonials` with `verified: true` and the grid renders automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Testimonial {
  id: string;
  /** Display name — must come from a real, consenting member */
  name: string;
  /** Optional context e.g. "Member since 2024" */
  memberSince: string | null;
  /** The review text exactly as approved by the member */
  quote: string;
  /** true only after the owner has verified the review is genuine */
  verified: boolean;
}

/**
 * Empty by design — populated exclusively with owner-verified reviews.
 */
export const testimonials: Testimonial[] = [];

export const testimonialsNote =
  "We publish only real, verified reviews from VS Fitness Club members. This space is reserved — no placeholder reviews, no invented names.";

export const testimonialsCollectNote =
  "Are you a member? Share your experience with the front desk and your verified review could be featured here.";
