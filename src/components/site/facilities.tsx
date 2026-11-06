"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { facilities, facilitiesNote } from "@/config/facilities";

/**
 * FACILITIES — photographic collage with varied proportions.
 * Wide horizontal frames on the left, narrower vertical frames offset on the
 * right. Simple mono labels — no cards, no badges, no repeated module grid.
 * Facility claims remain unverified until the owner confirms them; the single
 * footnote below the grid carries that disclosure once, cleanly.
 */
export function Facilities() {
  const [strength, cardio, freeweights, functional] = facilities;

  return (
    <section
      id="facilities"
      aria-label="Facilities"
      className="relative border-t border-line bg-ink"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section header — title left, note right */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-baseline gap-6">
              <p className="meta">
                <span className="text-fog">02</span>
                <span aria-hidden="true" className="mx-3 text-fog">/</span>
                <span className="text-paper">Inside the club</span>
              </p>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-fog">
              Facility list is provisional — descriptions publish only after
              verification by club management.
            </p>
          </div>
        </Reveal>

        {/* Collage — asymmetric two-column composition */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — wide horizontal frames */}
          <div className="flex flex-col gap-16 lg:col-span-7">
            <FacilityFigure
              facility={strength}
              index="01"
              aspect="aspect-[16/11]"
              sizes="(max-width: 1024px) 100vw, 56vw"
            />
            <FacilityFigure
              facility={functional}
              index="04"
              aspect="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 56vw"
            />
          </div>

          {/* Right — narrower vertical frames, pushed down for rhythm */}
          <div className="flex flex-col gap-16 lg:col-span-4 lg:col-start-9 lg:pt-24">
            <FacilityFigure
              facility={freeweights}
              index="03"
              aspect="aspect-[3/4]"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
            <FacilityFigure
              facility={cardio}
              index="02"
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>
        </div>

        <Reveal delay={0.08}>
          <p className="meta-sm mt-16 border-t border-line pt-5 text-fog">
            {facilitiesNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Single photographic entry — image + simple mono label ─────────────── */
function FacilityFigure({
  facility,
  index,
  aspect,
  sizes,
}: {
  facility: (typeof facilities)[number];
  index: string;
  aspect: string;
  sizes: string;
}) {
  return (
    <figure className="group">
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={facility.image}
          alt={facility.imageAlt}
          fill
          sizes={sizes}
          className="photo-grade object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-6">
        <span className="meta-sm text-paper">
          <span className="text-fog">{index}</span>
          <span aria-hidden="true" className="mx-2.5 text-fog">—</span>
          {facility.name}
        </span>
      </figcaption>
      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-mute">
        {facility.description}
      </p>
    </figure>
  );
}
