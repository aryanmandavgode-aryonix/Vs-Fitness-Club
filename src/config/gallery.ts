/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GALLERY — TEMPORARY REPLACEABLE IMAGERY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Editorial gallery grid with mixed aspect ratios. Current photos are
 *  AI-generated placeholders standing in for the club's real photography —
 *  swap `src` entries once the owner supplies genuine shots of VS Fitness Club.
 *  Captions are neutral/structural and make no facility claims.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Neutral editorial caption (not a facility claim) */
  caption: string;
  /** Grid span hint — drives the asymmetrical editorial layout */
  span: "wide" | "tall" | "square";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g-1",
    src: "/images/gallery-1-bw.jpg",
    alt: "Black-and-white documentary photo of an empty strength training floor with squat racks — temporary placeholder",
    caption: "The training floor",
    span: "wide",
  },
  {
    id: "g-2",
    src: "/images/gallery-2-bw.jpg",
    alt: "Black-and-white documentary photo of a lifter setting up for a deadlift, side profile — temporary placeholder",
    caption: "Discipline in motion",
    span: "tall",
  },
  {
    id: "g-3",
    src: "/images/gallery-3.jpg",
    alt: "Temporary placeholder close-up of chalked hands gripping a barbell",
    caption: "Grip. Set. Lift.",
    span: "square",
  },
  {
    id: "g-4",
    src: "/images/gallery-4-bw.jpg",
    alt: "Black-and-white documentary photo of an athlete resting on a bench between sets — temporary placeholder",
    caption: "Rest is training too",
    span: "tall",
  },
  {
    id: "g-5",
    src: "/images/gallery-5-bw.jpg",
    alt: "Black-and-white documentary photo of an athlete doing push-ups on a gym floor — temporary placeholder",
    caption: "Put in the work",
    span: "wide",
  },
  {
    id: "g-6",
    src: "/images/gallery-6-bw.jpg",
    alt: "Black-and-white still life photo of iron plates and a kettlebell on rubber flooring — temporary placeholder",
    caption: "Iron details",
    span: "square",
  },
];

/** Editorial note rendered under the gallery grid. */
export const galleryNote =
  "Placeholder photography shown during development. Genuine VS Fitness Club photographs will replace these images after the owner's photo shoot.";
