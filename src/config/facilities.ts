/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FACILITIES — TEMPLATE DATA AWAITING OWNER VERIFICATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  The brief confirms VS Fitness Club is a gym; specific facility claims are
 *  NOT verified yet. Each card is rendered with an explicit
 *  "Awaiting owner confirmation" tag so nothing is presented as a verified
 *  claim. Photography is temporary replaceable imagery.
 *  Remove entries the owner confirms do not exist; add confirmed ones freely.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Facility {
  id: string;
  name: string;
  /** Provisional one-line description — awaiting owner approval */
  description: string;
  /** Temporary imagery path under /public */
  image: string;
  /** Image alt text (describes the placeholder imagery honestly) */
  imageAlt: string;
  /** false → renders an explicit "to be confirmed" tag in the UI */
  confirmed: boolean;
  /** Layout span hint for the editorial grid */
  layout: "wide" | "tall" | "standard";
}

export const facilities: Facility[] = [
  {
    id: "strength",
    name: "Strength Zone",
    description:
      "Provisional copy — dedicated strength floor with racks, machines and plate-loaded equipment for progressive resistance training.",
    image: "/images/facility-strength.jpg",
    imageAlt:
      "Temporary placeholder photo of a dark strength-training zone with racks and plates",
    confirmed: false,
    layout: "wide",
  },
  {
    id: "cardio",
    name: "Cardio Deck",
    description:
      "Provisional copy — cardio section for warm-ups, endurance work and conditioning sessions.",
    image: "/images/facility-cardio-bw.jpg",
    imageAlt:
      "Black-and-white documentary photo of a row of treadmills beside large windows — temporary placeholder photo of a cardio zone",
    confirmed: false,
    layout: "standard",
  },
  {
    id: "freeweights",
    name: "Free Weights",
    description:
      "Provisional copy — dumbbell and barbell area covering the full range of free-weight movement patterns.",
    image: "/images/facility-freeweights.jpg",
    imageAlt:
      "Temporary placeholder photo of a dumbbell rack in a dark free-weights area",
    confirmed: false,
    layout: "tall",
  },
  {
    id: "functional",
    name: "Functional Area",
    description:
      "Provisional copy — open turf or open-floor space for functional drills, mobility and finisher circuits.",
    image: "/images/facility-functional-bw.jpg",
    imageAlt:
      "Black-and-white documentary photo of kettlebells and battle ropes on rubber flooring — temporary placeholder photo of a functional zone",
    confirmed: false,
    layout: "wide",
  },
];

/** Editorial note rendered above the facilities grid. */
export const facilitiesNote =
  "Facility list shown is a design template. Final descriptions will be published only after verification by VS Fitness Club management.";
