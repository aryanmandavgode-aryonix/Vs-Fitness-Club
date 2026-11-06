/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TRAINERS — EMPTY PROFILE SLOTS AWAITING OWNER INFORMATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  No trainer names, photos, certifications or specialities have been provided
 *  by the owner yet. The layout ships with structural placeholders that render
 *  as elegant "profile pending" cards. When real profiles arrive, replace the
 *  placeholder entries below — name, role, specialities, photo and bio.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Trainer {
  id: string;
  /** Real name — null renders "Name pending" */
  name: string | null;
  /** e.g. "Head Coach", "Strength & Conditioning" — null renders "Role pending" */
  role: string | null;
  /** 2–4 short speciality tags — empty renders placeholder pill */
  specialities: string[];
  /** Portrait path under /public — null renders silhouette placeholder */
  photo: string | null;
  /** Short bio — null renders a provisional copy note */
  bio: string | null;
}

export const trainers: Trainer[] = [
  { id: "trainer-1", name: null, role: null, specialities: [], photo: null, bio: null },
  { id: "trainer-2", name: null, role: null, specialities: [], photo: null, bio: null },
  { id: "trainer-3", name: null, role: null, specialities: [], photo: null, bio: null },
];

/** Editorial note rendered under the trainer grid. */
export const trainersNote =
  "Trainer profiles will be published once details are verified and approved by VS Fitness Club management.";
