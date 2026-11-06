"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { galleryImages, galleryNote, type GalleryImage } from "@/config/gallery";

/**
 * GALLERY — editorial masonry composition.
 * Large imagery in mixed proportions flowing in columns with controlled
 * whitespace. Minimal mono labels sit beneath each frame; hover is a
 * restrained scale only.
 */
const ASPECT: Record<GalleryImage["span"], string> = {
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative border-t border-line bg-ink"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <p className="meta">
              <span className="text-fog">05</span>
              <span aria-hidden="true" className="mx-3 text-fog">/</span>
              <span className="text-paper">Gallery</span>
            </p>
            <p className="meta-sm hidden text-fog md:block">Fig. 03 — 08</p>
          </div>
        </Reveal>

        {/* Editorial title */}
        <Reveal delay={0.08}>
          <h2 className="display mt-12 text-[clamp(2.75rem,6.5vw,5.75rem)] text-paper">
            The club in frames<span className="text-signal">.</span>
          </h2>
        </Reveal>

        {/* Masonry flow */}
        <Reveal delay={0.12}>
          <div className="mt-16 columns-1 gap-8 sm:columns-2 xl:columns-3 [column-fill:_balance]">
            {galleryImages.map((image, i) => (
              <figure
                key={image.id}
                className="group mb-12 break-inside-avoid last:mb-0"
              >
                <div className={`relative ${ASPECT[image.span]} overflow-hidden`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 32vw"
                    className="photo-grade object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="meta-sm text-paper">
                    <span className="text-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="mx-2.5 text-fog">—</span>
                    {image.caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="meta-sm mt-14 border-t border-line pt-5 text-fog">
            {galleryNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
