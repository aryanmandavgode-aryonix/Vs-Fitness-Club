/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VS FITNESS CLUB — CENTRALIZED BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Single source of truth for every owner-editable detail on the website.
 *
 *  OWNER ACTION REQUIRED: every field marked with `TODO(owner)` below is an
 *  intentionally empty placeholder. Nothing on the site invents data — UI
 *  components degrade gracefully (e.g. WhatsApp links stay disabled) until
 *  these values are confirmed by the club owner.
 *
 *  Edited by: ARYONIX
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const business = {
  /** Legal / display name */
  name: "VS Fitness Club",
  /** Wordmark shorthand used in the logo lockup */
  shortName: "VS",
  /** Hero headline */
  headline: "BUILT THROUGH DISCIPLINE.",
  /** Hero subheadline */
  subheadline: "Train with purpose. Build strength. Become your strongest self.",
  /** Short editorial descriptor used in meta + footer */
  descriptor: "Strength & conditioning club — Nagpur, Maharashtra.",

  /**
   * Brand assets. The master logo is the owner-supplied mark with the outer
   * black field removed (transparent PNG) so it sits directly on any surface.
   */
  logo: {
    src: "/images/logo.png",
    alt: "VS Fitness Club — shield mark with athlete silhouettes",
    /** intrinsic size of the master asset, for next/image */
    width: 691,
    height: 720,
  },

  location: {
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
  },

  /**
   * Street address — confirmed by the owner.
   * `line1` carries the building identity; `line2` the locality, city,
   * state and PIN. Rendered in the Contact section and footer.
   */
  address: {
    line1: "4th & 5th Floor, VS Building, Agrasen Road",
    line2: "Giripeth, Dharampeth, Nagpur, Maharashtra 440010",
    /**
     * Google Maps place link supplied by the owner.
     * Used for the "Get Directions" action.
     */
    mapUrl: "https://maps.app.goo.gl/c6FFQbtWRQLXqLm69",
  },

  contact: {
    /**
     * Official club number — confirmed by the owner (+91 91561 15912).
     * International format without "+" or spaces; drives tel: links.
     */
    phone: "919156115912" as string,
    /**
     * Official WhatsApp number — confirmed by the owner. Same digits as the
     * phone line. Drives every wa.me click-to-chat enquiry link on the site.
     */
    whatsapp: "919156115912" as string,
    /** Human-formatted number used for display (contact section, footer). */
    phoneDisplay: "+91 91561 15912",
    /** TODO(owner): club email address. */
    email: "" as string,
  },

  /**
   * Operating hours — confirmed by the owner.
   * `time` is rendered in the Contact section; `short` is the compact label
   * used where space is tight (About facts strip).
   */
  hours: [
    { days: "Monday — Saturday", short: "Mon–Sat", time: "06:00 – 22:00" },
    { days: "Sunday", short: "Sun", time: "06:00 – 14:00" },
  ],

  /** TODO(owner): social profiles. Empty entries are hidden, never faked. */
  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  /** TODO(owner): founding year, shown in about/footer once confirmed. */
  establishedYear: null as number | null,

  /**
   * Production domain used for canonical URLs + Open Graph metadata.
   * TODO(owner/aryonix): update after the domain goes live.
   */
  siteUrl: "https://vsfitnessclub.in",
} as const;

/** Primary navigation — order defines both desktop menu and mobile drawer. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
