"use client";

import { ArrowUpRight, Clock, MapPin, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { business } from "@/config/business";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * CONTACT — the closing spread, inverted to paper white.
 * A stark black-and-white finish: oversized ink headline, one clear WhatsApp
 * action, and a structured information row for visit / call / hours. Every
 * unconfirmed detail renders as a labelled placeholder; the Maps link is the
 * owner-provided, verified action.
 */
export function Contact() {
  const phoneConfigured = business.contact.phone.replace(/\D/g, "").length > 0;
  const hoursPending = business.hours.every((h) => h.time.trim() === "");

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative bg-paper text-ink"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-5">
            <p className="meta">
              <span className="text-ink/40">07</span>
              <span aria-hidden="true" className="mx-3 text-ink/40">/</span>
              <span className="text-ink">Get in touch</span>
            </p>
            <p className="meta-sm hidden text-ink/40 md:block">
              Enquiries go straight to the club
            </p>
          </div>
        </Reveal>

        {/* Letterhead — the owner's shield mark stamped on the paper spread */}
        <Reveal delay={0.05}>
          <Image
            src={business.logo.src}
            alt={business.logo.alt}
            width={business.logo.width}
            height={business.logo.height}
            className="mt-12 h-16 w-auto md:mt-16 md:h-20"
          />
        </Reveal>

        {/* Closing headline */}
        <Reveal delay={0.08}>
          <h2 className="display mt-8 text-[clamp(3rem,8.5vw,7.75rem)] text-ink md:mt-10">
            Start your
            <span aria-hidden="true" className="block">
              Training.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/60">
            Ask about memberships, timings, personal training or a walkthrough
            visit — your message opens in WhatsApp, pre-filled and ready to
            send.
          </p>
        </Reveal>

        {/* Action row */}
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <WhatsAppCta
              message={generalEnquiryMessage()}
              label="Message on WhatsApp"
              variant="ink"
              size="lg"
            />
            <a
              href={business.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2.5 border border-ink px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper outline-none focus-visible:ring-1 focus-visible:ring-ink"
              aria-label="Get directions to VS Fitness Club on Google Maps (opens in a new tab)"
            >
              Get Directions
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        {/* Information columns */}
        <div className="mt-20 grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-3 md:gap-10">
          {/* Visit */}
          <div>
            <p className="meta-sm flex items-center gap-2.5 text-ink/50">
              <MapPin className="size-3.5" aria-hidden="true" />
              Visit
            </p>
            <address className="mt-5 text-[15px] not-italic leading-relaxed text-ink">
              {business.address.line1}
              <br />
              <span className="text-ink/60">{business.address.line2}</span>
            </address>
            <a
              href={business.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink outline-none transition-colors hover:text-ink/60 focus-visible:text-ink/60"
            >
              Open in Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Call — honest pending state */}
          <div>
            <p className="meta-sm flex items-center gap-2.5 text-ink/50">
              {phoneConfigured ? null : <PhoneOff className="size-3.5" aria-hidden="true" />}
              Call
            </p>
            <div className="mt-5">
              {phoneConfigured ? (
                <a
                  href={`tel:+${business.contact.phone.replace(/\D/g, "")}`}
                  className="text-[15px] font-medium tracking-wide text-ink transition-colors hover:text-ink/60 outline-none focus-visible:text-ink/60"
                >
                  {business.contact.phoneDisplay}
                </a>
              ) : (
                <p className="text-[15px] tracking-wide text-ink/40">
                  Phone number — coming soon
                </p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-ink/40">
                WhatsApp is the fastest way to reach the club.
              </p>
            </div>
          </div>

          {/* Hours — placeholders until owner confirms */}
          <div>
            <p className="meta-sm flex items-center gap-2.5 text-ink/50">
              <Clock className="size-3.5" aria-hidden="true" />
              Hours
            </p>
            <ul className="mt-5 flex flex-col">
              {business.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-center justify-between gap-4 border-b border-ink/10 py-2.5 text-sm last:border-b-0"
                >
                  <span className="text-ink">{h.days}</span>
                  <span className={h.time ? "text-ink/60" : "text-ink/40"}>
                    {h.time || "To be confirmed"}
                  </span>
                </li>
              ))}
            </ul>
            {hoursPending ? (
              <p className="mt-3 text-xs leading-relaxed text-ink/40">
                Timings will be published as soon as the club confirms them.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
