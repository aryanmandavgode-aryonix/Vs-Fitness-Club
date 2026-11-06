import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { business } from "@/config/business";
import "./globals.css";

/* ── Typography system ──────────────────────────────────────────────────── */
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/* ── SEO + Open Graph ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Strength & Conditioning Gym in ${business.location.city}`,
    template: `%s | ${business.name}`,
  },
  description:
    "VS Fitness Club is a premium strength and conditioning club in Nagpur, Maharashtra. Train with purpose, build strength, and become your strongest self.",
  keywords: [
    "VS Fitness Club",
    "gym in Nagpur",
    "fitness club Nagpur",
    "strength training Nagpur",
    "personal trainer Nagpur",
    "gym membership Nagpur",
    "fitness centre Maharashtra",
    "VS Fitness Club Nagpur",
  ],
  authors: [{ name: "ARYONIX" }],
  creator: "ARYONIX",
  publisher: business.name,
  openGraph: {
    title: `${business.name} — ${business.headline}`,
    description: business.subheadline,
    url: business.siteUrl,
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} — ${business.descriptor}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — ${business.headline}`,
    description: business.subheadline,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${anton.variable} ${archivo.variable} ${jetbrains.variable} font-sans antialiased bg-ink text-foreground`}
      >
        {/* Keyboard accessibility — skip navigation */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
