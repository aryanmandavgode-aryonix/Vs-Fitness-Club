"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { business } from "@/config/business";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { joinNowMessage } from "@/lib/whatsapp";

/**
 * HERO — split editorial composition.
 * Left: oversized condensed headline with deliberate line breaks, supporting
 * metadata and a minimal CTA row. Right: a full-height vertical athlete
 * photograph bleeding to the viewport edge. No scrim-stacked full-bleed
 * background, no centered hero.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1.1, delay, ease: "easeOut" as const },
        };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative grid min-h-[100svh] grid-cols-1 lg:grid-cols-12"
    >
      {/* ── Left column — editorial content ─────────────────────────── */}
      <div className="order-2 flex flex-col justify-between px-5 pb-8 pt-10 md:px-10 lg:order-1 lg:col-span-7 lg:min-h-[100svh] lg:pb-9 lg:pt-[7.5rem]">
        {/* Top metadata row */}
        <motion.div
          {...fade(0.1)}
          className="hidden items-center justify-between border-b border-line pb-5 lg:flex"
        >
          <p className="meta text-mute">Strength &amp; Conditioning</p>
          <p className="meta text-fog">
            {business.location.city} — 21.1458° N, 79.0882° E
          </p>
        </motion.div>

        {/* Headline block */}
        <div className="pt-12 lg:py-14">
          <motion.h1
            {...fade(0.25)}
            className="display text-[clamp(3.4rem,9.2vw,9rem)] text-paper"
          >
            <span className="block">Built</span>
            <span className="block">Through</span>
            <span className="block">
              Discipline<span className="text-signal">.</span>
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.45)}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-mute md:text-base"
          >
            {business.subheadline}
          </motion.p>

          {/* Minimal CTA row */}
          <motion.div
            {...fade(0.6)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a
              href="#membership"
              className="group inline-flex h-12 items-center gap-2.5 bg-signal px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-paper outline-none focus-visible:ring-1 focus-visible:ring-signal/70"
            >
              Explore Membership
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <WhatsAppCta
              message={joinNowMessage()}
              label="Join the club"
              variant="quiet"
              size="lg"
              className="h-12"
            />
          </motion.div>
        </div>

        {/* Bottom metadata strip */}
        <motion.div
          {...fade(0.8)}
          className="mt-14 hidden items-center justify-between border-t border-line pt-5 lg:flex"
        >
          <p className="meta-sm text-fog">Nagpur · Maharashtra · India</p>
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="group inline-flex items-center gap-2 outline-none focus-visible:text-signal"
          >
            <span className="meta-sm text-mute transition-colors duration-300 group-hover:text-paper">
              Scroll
            </span>
            <ArrowDown
              className="size-3.5 text-fog transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-signal"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      {/* ── Right column — vertical cinematic photograph ────────────── */}
      <motion.div
        {...fade(0.2)}
        className="relative order-1 min-h-[62svh] overflow-hidden border-b border-line lg:order-2 lg:col-span-5 lg:min-h-[100svh] lg:border-b-0 lg:border-l"
      >
        <Image
          src="/images/about-portrait.jpg"
          alt="Athlete gripping a chalked barbell before a lift — temporary development photography"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="photo-grade object-cover object-center"
        />
        {/* Photograph metadata — top edge, clear of the floating action */}
        <p className="meta-sm absolute left-5 top-20 text-paper/85 md:left-6">
          Fig. 01 — The work
        </p>
        <p className="meta-sm absolute right-5 top-20 text-paper/50 md:right-6">
          Temporary imagery
        </p>
      </motion.div>
    </section>
  );
}
