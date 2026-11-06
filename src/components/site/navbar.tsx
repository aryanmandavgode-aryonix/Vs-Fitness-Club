"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { business, navLinks } from "@/config/business";
import {
  buildWhatsAppUrl,
  joinNowMessage,
  WHATSAPP_LINK_PROPS,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Fixed editorial navigation — a thin Swiss masthead.
 * Transparent over the hero; gains an ink surface + hairline once scrolled.
 * The mobile menu is a full-bleed editorial index with oversized entries.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /** Join Now — wa.me deep link with the prefilled joining enquiry. */
  const joinUrl = buildWhatsAppUrl(joinNowMessage());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-line bg-ink/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-5 md:h-[4.5rem] md:px-10"
        >
          {/* Brand — the owner's shield mark, straight on the ink */}
          <a
            href="#top"
            className="group flex items-end gap-2.5 outline-none focus-visible:ring-1 focus-visible:ring-signal/70"
            aria-label={`${business.name} — back to top`}
            onClick={closeMenu}
          >
            <Image
              src={business.logo.src}
              alt={business.logo.alt}
              width={business.logo.width}
              height={business.logo.height}
              priority
              className="h-10 w-auto md:h-11"
            />
            <span
              aria-hidden="true"
              className="meta-sm hidden pb-1 text-fog transition-colors duration-300 group-hover:text-mute lg:inline"
            >
              / NAGPUR
            </span>
          </a>

          {/* Desktop index links — mono, numbered */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative flex items-baseline gap-1.5 py-2 outline-none focus-visible:text-signal"
                >
                  <span className="meta-sm text-fog transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-mute transition-colors duration-300 group-hover:text-paper">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop join action — opens WhatsApp with the joining enquiry */}
          <div className="hidden lg:block">
            <a
              href={joinUrl ?? "#contact"}
              {...(joinUrl ? WHATSAPP_LINK_PROPS : {})}
              className="group inline-flex items-center gap-1.5 py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-paper outline-none transition-colors duration-300 hover:text-signal focus-visible:text-signal"
              aria-label="Join now — opens WhatsApp with a prefilled joining enquiry in a new tab"
            >
              Join Now
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Mobile trigger — plus/cross toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center text-paper outline-none focus-visible:ring-1 focus-visible:ring-signal/70 lg:hidden"
          >
            <Plus
              className={cn(
                "size-6 transition-transform duration-300",
                menuOpen && "rotate-45"
              )}
              aria-hidden="true"
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen index — sibling of <header> so the header's
          backdrop-blur never becomes its containing block */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-baseline justify-between gap-4 py-4 outline-none focus-visible:text-signal"
                  >
                    <span className="display text-4xl text-paper transition-colors group-hover:text-signal sm:text-5xl">
                      {link.label}
                    </span>
                    <span className="meta-sm shrink-0 text-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-5">
              <a
                href={joinUrl ?? "#contact"}
                onClick={closeMenu}
                {...(joinUrl ? WHATSAPP_LINK_PROPS : {})}
                className="group flex h-13 w-full items-center justify-between bg-paper px-6 text-[14px] font-semibold uppercase tracking-[0.16em] text-ink outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-signal/70 hover:bg-signal"
                aria-label="Join now — opens WhatsApp with a prefilled joining enquiry in a new tab"
              >
                Join Now
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="meta-sm text-fog">
                {business.location.city} · {business.location.state}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
