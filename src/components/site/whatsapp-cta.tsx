"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildWhatsAppUrl,
  WHATSAPP_LINK_PROPS,
} from "@/lib/whatsapp";

interface WhatsAppCtaProps {
  /** Full prefilled enquiry message */
  message: string;
  /** Button label */
  label: string;
  /**
   * solid  — signal block (dark sections)
   * ink    — black block for the inverted paper closing section
   * outline — hairline block
   * quiet  — typographic text link with underline
   */
  variant?: "solid" | "outline" | "quiet" | "ink";
  className?: string;
  /** Render a full-width button */
  fullWidth?: boolean;
  /** Optional size override */
  size?: "md" | "lg";
}

/**
 * Reusable WhatsApp enquiry CTA.
 *
 * - Live state: opens wa.me in a new tab with the prefilled message.
 * - Pending state (owner number unconfigured): renders an honest pending
 *   control that explains the status via toast — never fakes a submission.
 */
export function WhatsAppCta({
  message,
  label,
  variant = "solid",
  className,
  fullWidth,
  size = "md",
}: WhatsAppCtaProps) {
  const [notified, setNotified] = useState(false);
  const url = buildWhatsAppUrl(message);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (url) return; // real link proceeds
    e.preventDefault();
    if (!notified) {
      setNotified(true);
    }
    toast.info("WhatsApp number coming soon", {
      description:
        "The club's WhatsApp number is being confirmed. Please use the phone or visit details in the Contact section.",
    });
  };

  const base =
    "group inline-flex items-center justify-center gap-2.5 font-medium transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-signal/70 select-none";
  const sizes = size === "lg" ? "h-12 px-6 text-[13px]" : "h-11 px-5 text-[13px]";
  const styles: Record<NonNullable<WhatsAppCtaProps["variant"]>, string> = {
    solid: "bg-signal text-ink uppercase tracking-[0.16em] font-semibold hover:bg-paper",
    ink: "bg-ink text-paper uppercase tracking-[0.16em] font-semibold hover:bg-transparent hover:text-ink border border-ink",
    outline:
      "border border-white/25 text-paper uppercase tracking-[0.16em] hover:border-signal/80 hover:text-signal",
    quiet:
      "text-paper uppercase tracking-[0.16em] border-b border-white/30 pb-1 h-auto px-0 rounded-none hover:border-signal hover:text-signal",
  };

  if (url) {
    return (
      <a
        href={url}
        {...WHATSAPP_LINK_PROPS}
        onClick={handleClick}
        aria-label={`${label} — opens WhatsApp in a new tab`}
        className={cn(base, sizes, styles[variant], fullWidth && "w-full", className)}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <a
      href="#contact"
      onClick={handleClick}
      aria-label={`${label} — WhatsApp number pending confirmation`}
      className={cn(base, sizes, styles[variant], fullWidth && "w-full", className)}
    >
      <MessageCircle className="size-4 opacity-70" aria-hidden="true" />
      {label}
      {variant === "quiet" ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}
