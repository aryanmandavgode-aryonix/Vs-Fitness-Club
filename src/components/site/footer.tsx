"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { business, navLinks } from "@/config/business";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * FOOTER — editorial colophon.
 * Structured columns over a poster-scale ghost wordmark cropped at the page
 * edge, closed by the legal bar with the ARYONIX development credit. Sits at
 * the page bottom via mt-auto (owned by page.tsx).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink" aria-label="Site footer">
      <div className="mx-auto w-full max-w-[1500px] px-5 pb-8 pt-16 md:px-10 md:pt-20">
        {/* Columns */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand — the owner's shield mark, sitting directly on the ink */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex outline-none focus-visible:ring-1 focus-visible:ring-signal/70"
              aria-label={`${business.name} — back to top`}
            >
              <Image
                src={business.logo.src}
                alt={business.logo.alt}
                width={business.logo.width}
                height={business.logo.height}
                className="h-24 w-auto md:h-28"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              {business.descriptor} Train with purpose, build strength, become
              your strongest self.
            </p>
            <p className="meta-sm mt-6 text-fog">
              {business.location.city} · {business.location.state} ·{" "}
              {business.location.country}
            </p>
            <div className="mt-7">
              <WhatsAppCta
                message={generalEnquiryMessage()}
                label="WhatsApp enquiry"
                variant="quiet"
              />
            </div>
          </div>

          {/* Index */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <p className="meta-sm text-fog">Index</p>
            <ul className="mt-5 flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href} className="border-t border-line last:border-b">
                  <a
                    href={link.href}
                    className="group flex items-baseline justify-between py-3 outline-none focus-visible:text-signal"
                  >
                    <span className="text-sm text-paper/85 transition-colors duration-300 group-hover:text-signal">
                      {link.label}
                    </span>
                    <span className="meta-sm text-fog transition-colors duration-300 group-hover:text-mute">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact summary */}
          <div className="lg:col-span-4">
            <p className="meta-sm text-fog">Contact</p>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="leading-relaxed text-paper/85">
                {business.address.line1}
                <br />
                <span className="text-mute">{business.address.line2}</span>
              </li>
              <li className="text-mute">
                {business.contact.phone ? (
                  <a
                    href={`tel:+${business.contact.phone.replace(/\D/g, "")}`}
                    className="transition-colors hover:text-signal outline-none focus-visible:text-signal"
                  >
                    {business.contact.phoneDisplay}
                  </a>
                ) : (
                  <span>Phone — coming soon</span>
                )}
              </li>
              <li>
                <a
                  href={business.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-paper/85 transition-colors duration-300 hover:text-signal outline-none focus-visible:text-signal"
                >
                  Google Maps directions
                  <span aria-hidden="true" className="text-signal">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Poster wordmark — cropped at the page edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none overflow-hidden"
        >
          <p className="display translate-y-[10%] whitespace-nowrap text-center text-[clamp(3.2rem,12.5vw,13.5rem)] leading-[0.82] text-white/[0.05]">
            VS Fitness Club
          </p>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
          <p className="meta-sm text-fog">
            © {year} {business.name}
          </p>
          <p className="meta-sm text-fog">
            Design &amp; development —{" "}
            <a
              href="#top"
              className="uppercase tracking-[0.2em] text-paper/85 transition-colors duration-300 hover:text-signal outline-none focus-visible:text-signal"
              aria-label="ARYONIX — development credit"
            >
              ARYONIX
            </a>
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 outline-none focus-visible:text-signal"
            aria-label="Back to top"
          >
            <span className="meta-sm text-mute transition-colors duration-300 group-hover:text-signal">
              Back to top
            </span>
            <ArrowUp
              className="size-3.5 text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-signal"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
