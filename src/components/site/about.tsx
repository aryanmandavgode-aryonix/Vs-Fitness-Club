"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { business } from "@/config/business";

const PRINCIPLES = [
  {
    title: "Train with purpose",
    copy: "Every session has an intent — no wandering workouts, no wasted sets.",
  },
  {
    title: "Build strength that lasts",
    copy: "Progressive, coached training that compounds week after week.",
  },
  {
    title: "Discipline over motivation",
    copy: "Motivation fades. The discipline you build here does not.",
  },
] as const;

/**
 * ABOUT — two-column magazine spread.
 * A large lede and short copy on the left, a strong photograph on the right,
 * closed by a structured facts strip. No content cards.
 */
export function About() {
  return (
    <section id="about" aria-label="About VS Fitness Club" className="relative bg-ink">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <p className="meta">
              <span className="text-fog">01</span>
              <span aria-hidden="true" className="mx-3 text-fog">/</span>
              <span className="text-paper">About the club</span>
            </p>
            <p className="meta-sm hidden text-fog md:block">
              {business.name} — {business.location.city}
            </p>
          </div>
        </Reveal>

        {/* Magazine spread */}
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — editorial column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-lg text-[1.55rem] font-normal leading-[1.28] tracking-[-0.01em] text-paper md:text-[1.8rem]">
                VS Fitness Club is a strength and conditioning club in{" "}
                {business.location.city} — built for people who take training
                seriously.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-mute">
                No gimmicks. No shortcuts. A serious training environment where
                members show up, put in the work, and get stronger — session by
                session, week by week.
              </p>
            </Reveal>

            {/* Principles — numbered hairline rows */}
            <ul className="mt-12 flex flex-col">
              {PRINCIPLES.map((p, i) => (
                <li
                  key={p.title}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-5 last:border-b"
                >
                  <span className="meta-sm pt-1 text-fog transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold uppercase tracking-[0.14em] text-paper">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-mute">
                      {p.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Reveal delay={0.12}>
              <p className="mt-8 text-xs leading-relaxed text-fog">
                Narrative copy is provisional and awaits approval by VS Fitness
                Club management.
              </p>
            </Reveal>
          </div>

          {/* Right — strong photograph, offset down for editorial rhythm */}
          <div className="lg:col-span-7 lg:pt-12">
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/about-main-bw.jpg"
                  alt="Athlete walking across a dark gym floor toward a loaded barbell, seen from behind — temporary development photography"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="photo-grade object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.025]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="meta-sm text-mute">Fig. 02 — The floor</span>
                <span className="meta-sm text-fog">Temporary imagery</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Facts strip — structured, honest placeholders */}
        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            <div className="bg-ink p-5 md:p-6">
              <dt className="meta-sm text-fog">Location</dt>
              <dd className="mt-3 text-sm font-medium tracking-wide text-paper">
                Nagpur, Maharashtra
              </dd>
            </div>
            <div className="bg-ink p-5 md:p-6">
              <dt className="meta-sm text-fog">Discipline</dt>
              <dd className="mt-3 text-sm font-medium tracking-wide text-paper">
                Strength &amp; conditioning
              </dd>
            </div>
            <div className="bg-ink p-5 md:p-6">
              <dt className="meta-sm text-fog">Coaching team</dt>
              <dd className="mt-3 text-sm font-medium tracking-wide text-mute">
                Profiles pending verification
              </dd>
            </div>
            <div className="bg-ink p-5 md:p-6">
              <dt className="meta-sm text-fog">Club hours</dt>
              <dd className="mt-3 text-sm font-medium leading-relaxed tracking-wide text-mute">
                {business.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.short} · {h.time}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
