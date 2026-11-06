"use client";

import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import {
  testimonials,
  testimonialsCollectNote,
  testimonialsNote,
} from "@/config/testimonials";

/**
 * TESTIMONIALS — a typographic statement, not a card grid.
 * Reserved exclusively for verified member reviews: the empty state is an
 * honest, oversized editorial declaration. Once owner-verified reviews exist,
 * they render as hairline-ruled quote rows.
 */
export function Testimonials() {
  const verified = testimonials.filter((t) => t.verified);

  return (
    <section
      id="testimonials"
      aria-label="Member testimonials"
      className="relative border-t border-line bg-ink"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <p className="meta">
              <span className="text-fog">06</span>
              <span aria-hidden="true" className="mx-3 text-fog">/</span>
              <span className="text-paper">Member voices</span>
            </p>
            <p className="meta-sm hidden text-fog md:block">Verified only</p>
          </div>
        </Reveal>

        {/* Oversized declaration */}
        <Reveal delay={0.08}>
          <h2 className="display mt-12 text-[clamp(2.75rem,7vw,6.5rem)] text-paper">
            Real reviews<span className="text-signal">.</span>
            <span aria-hidden="true" className="block text-white/[0.16]">
              Never invented.
            </span>
          </h2>
        </Reveal>

        {verified.length > 0 ? (
          /* Verified reviews — hairline quote rows */
          <ul className="mt-16 flex flex-col border-t border-line">
            {verified.map((t) => (
              <li
                key={t.id}
                className="grid gap-6 border-b border-line py-10 lg:grid-cols-12"
              >
                <blockquote className="lg:col-span-8">
                  <p className="text-xl leading-relaxed text-paper/90 md:text-2xl md:leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="flex items-end gap-3 lg:col-span-4 lg:justify-end">
                  <span className="flex items-center gap-2 text-sm font-semibold text-paper">
                    {t.name}
                    <BadgeCheck
                      className="size-4 text-signal"
                      aria-label="Verified review"
                    />
                  </span>
                  {t.memberSince ? (
                    <span className="meta-sm text-fog">{t.memberSince}</span>
                  ) : null}
                </figcaption>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty state — structured notes, no fabricated content */
          <Reveal delay={0.14}>
            <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
              <p className="max-w-md text-[15px] leading-relaxed text-mute">
                {testimonialsNote}
              </p>
              <div className="flex flex-col gap-5 lg:items-end lg:text-right">
                <p className="max-w-sm text-sm leading-relaxed text-fog">
                  {testimonialsCollectNote}
                </p>
                <p className="meta-sm inline-flex items-center gap-2 text-mute">
                  <BadgeCheck className="size-3.5 text-signal" aria-hidden="true" />
                  Verification required before publishing
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
