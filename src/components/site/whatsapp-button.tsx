"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, WHATSAPP_LINK_PROPS, generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * Floating WhatsApp enquiry button — always reachable from any scroll depth.
 * Square editorial treatment, no glow. Pending state (owner number
 * unconfigured) explains the status via toast instead of faking a submission.
 */
export function WhatsAppButton() {
  const [notified, setNotified] = useState(false);
  const url = buildWhatsAppUrl(generalEnquiryMessage());

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (url) return;
    e.preventDefault();
    setNotified(true);
    toast.info("WhatsApp number coming soon", {
      description:
        "The club's WhatsApp number is being confirmed. Please use the contact options in the Contact section.",
    });
  };

  return (
    <a
      href={url ?? "#contact"}
      onClick={handleClick}
      {...(url ? WHATSAPP_LINK_PROPS : {})}
      aria-label={
        url
          ? "Enquire on WhatsApp (opens in a new tab)"
          : "WhatsApp enquiry — number pending confirmation"
      }
      className="group fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center bg-signal text-ink transition-colors duration-300 hover:bg-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:bottom-7 md:right-7"
    >
      <MessageCircle
        className="size-5 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
      {notified ? (
        <span id="whatsapp-pending-note" className="sr-only">
          WhatsApp number pending confirmation by the club owner
        </span>
      ) : null}
    </a>
  );
}
