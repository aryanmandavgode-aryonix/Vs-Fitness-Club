"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SHARED MOTION PRIMITIVE — reduced-motion aware
 * ─────────────────────────────────────────────────────────────────────────────
 *  `Reveal` is a deliberately quiet entrance: opacity only, no translation,
 *  no scale. Used sparingly — section headers and hero content. Grid imagery
 *  and lists do NOT animate on scroll; interaction is carried by hover states.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to delay the reveal (stagger effect) */
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
