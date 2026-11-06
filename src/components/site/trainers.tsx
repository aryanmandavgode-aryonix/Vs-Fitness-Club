"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { trainers, trainersNote } from "@/config/trainers";
import { trainingEnquiryMessage } from "@/lib/whatsapp";

/**
 * TRAINERS — editorial roster.
 * Instead of a three-column card grid, the team renders as a hairline-ruled
 * index: a sticky editorial column on the left, full-width profile rows on the
 * right. Until the owner supplies verified profiles, rows present an honest
 * "pending" state — never fake names, photos or credentials.
 */
export function Trainers() {
  return (
    <section id="trainers" aria-label="Trainers" className="relative bg-ink">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky editorial column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="meta">
                  <span className="text-fog">03</span>
                  <span aria-hidden="true" className="mx-3 text-fog">/</span>
                  <span className="text-paper">The team</span>
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display mt-6 text-[clamp(2.5rem,5vw,4.25rem)] text-paper">
                  Coaches
                  <span aria-hidden="true" className="block text-fog">
                    &amp; Trainers
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-7 max-w-xs text-sm leading-relaxed text-mute">
                  Profile rows are prepared and awaiting verified details —
                  real names, photographs and specialities publish only after
                  approval by club management.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9">
                  <WhatsAppCta
                    message={trainingEnquiryMessage()}
                    label="Enquire about coaching"
                    variant="outline"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Roster rows */}
          <div className="lg:col-span-8">
            <ul className="flex flex-col">
              {trainers.map((trainer, i) => (
                <Reveal key={trainer.id} delay={0.06 * i}>
                  <li className="group grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-5 border-t border-line py-9 last:border-b sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    {/* Oversized row index */}
                    <span
                      aria-hidden="true"
                      className="display text-5xl leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.14] md:text-6xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Profile fields — pending owner data */}
                    <div>
                      <h3 className="display text-3xl text-paper md:text-4xl">
                        {trainer.name ?? `Trainer profile ${String(i + 1).padStart(2, "0")}`}
                      </h3>
                      <p className="meta-sm mt-3 text-mute">
                        {trainer.role ?? "Name · specialities · biography — pending verification"}
                      </p>
                    </div>

                    {/* Row action */}
                    <div className="col-span-2 sm:col-span-1 sm:justify-self-end">
                      <a
                        href="#contact"
                        className="group/link inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.16em] text-mute outline-none transition-colors duration-300 hover:text-signal focus-visible:text-signal"
                        aria-label="Enquire about training — goes to contact section"
                      >
                        Enquire
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <p className="meta-sm mt-10 border-t border-line pt-5 text-fog">
                {trainersNote}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
