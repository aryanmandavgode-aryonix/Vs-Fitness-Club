import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Facilities } from "@/components/site/facilities";
import { Trainers } from "@/components/site/trainers";
import { Membership } from "@/components/site/membership";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

/**
 * VS Fitness Club — single-page editorial site.
 * Sticky-footer layout: the page column fills the viewport; the footer uses
 * mt-auto so it always sits at the bottom and is pushed naturally on long
 * pages.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Facilities />
        <Trainers />
        <Membership />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
