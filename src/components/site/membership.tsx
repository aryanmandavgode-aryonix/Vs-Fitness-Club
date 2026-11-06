"use client";

import { Reveal } from "@/components/site/reveal";
import { WhatsAppCta } from "@/components/site/whatsapp-cta";
import { membershipDisclaimer, membershipPlans } from "@/config/membership";
import { membershipPlanEnquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * MEMBERSHIP — typographic pricing comparison.
 * Three plans set as type on a hairline grid: no card boxes, no glow, no
 * badges, no discounts. Prices render as "On request" until the club confirms
 * its rate card; every enquiry routes to WhatsApp with a plan-prefilled
 * message.
 */
export function Membership() {
  return (
    <section
      id="membership"
      aria-label="Membership plans"
      className="relative border-t border-line bg-ink"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        {/* Section marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <p className="meta">
              <span className="text-fog">04</span>
              <span aria-hidden="true" className="mx-3 text-fog">/</span>
              <span className="text-paper">Membership</span>
            </p>
            <p className="meta-sm hidden text-fog md:block">
              Rate card on enquiry
            </p>
          </div>
        </Reveal>

        {/* Oversized editorial title */}
        <Reveal delay={0.08}>
          <h2 className="display mt-12 max-w-5xl text-[clamp(2.75rem,6.5vw,5.75rem)] text-paper">
            Choose your commitment<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">
            Monthly, quarterly and annual plans. Pricing is published as
            &ldquo;on request&rdquo; until the club confirms its rate card —
            each enquiry reaches the club directly.
          </p>
        </Reveal>

        {/* Pricing columns — type on a hairline grid */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 divide-y divide-line border-y border-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {membershipPlans.map((plan, i) => (
              <article
                key={plan.id}
                className="flex flex-col py-10 lg:px-10 lg:py-12 lg:first:pl-0 lg:last:pr-0"
              >
                {/* Plan index + period */}
                <p className="meta-sm">
                  <span
                    className={cn(
                      plan.featured ? "text-signal" : "text-fog"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="mx-2.5 text-fog">—</span>
                  <span className="text-mute">{plan.period}</span>
                </p>

                {/* Plan name */}
                <h3 className="display mt-5 text-4xl text-paper md:text-[2.6rem]">
                  {plan.name}
                </h3>

                {/* Price — honest placeholder until owner confirms */}
                <div className="mt-9 border-t border-line pt-7">
                  {plan.price !== null ? (
                    <p className="display text-[2.9rem] leading-none text-paper">
                      ₹{plan.price.toLocaleString("en-IN")}
                    </p>
                  ) : (
                    <p className="display text-[2.9rem] leading-none text-paper">
                      On request
                    </p>
                  )}
                  <p className="meta-sm mt-4 text-fog">
                    {plan.priceNote}
                  </p>
                </div>

                {/* Positioning line */}
                <p className="mt-7 text-sm leading-relaxed text-mute">
                  {plan.pitch}
                </p>

                {/* Provisional benefits — quiet dash list */}
                <ul
                  className="mt-7 flex flex-col gap-3.5"
                  aria-label={`${plan.name} plan benefits`}
                >
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] h-px w-3.5 shrink-0 bg-white/25"
                      />
                      <span className="text-sm leading-relaxed text-paper/80">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {!plan.benefitsConfirmed ? (
                  <p className="meta-sm mt-6 text-fog">
                    Final inclusions to be confirmed by the club
                  </p>
                ) : null}

                {/* Plan-specific enquiry */}
                <div className="mt-auto pt-9">
                  <WhatsAppCta
                    message={membershipPlanEnquiryMessage(plan.name)}
                    label={`Enquire — ${plan.name}`}
                    variant="quiet"
                    className="text-[13px]"
                  />
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="meta-sm mt-8 text-fog">{membershipDisclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
