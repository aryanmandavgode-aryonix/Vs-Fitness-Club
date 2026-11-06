# VS FITNESS CLUB — Official Website

**Premium dark-luxury marketing site for VS Fitness Club, Nagpur (Maharashtra, India).**

A single-page, editorial-style website built as a permanent dark "ink & paper" brand
world: oversized condensed typography, cinematic black-and-white photography, a
restrained shield-red accent taken directly from the official logo, and
WhatsApp-first enquiry flows. The site ships with honest placeholder states —
nothing is invented: unconfirmed business details render as labelled
"to be confirmed" entries until the club supplies them.

Delivered by **ARYONIX**.

---

## 1. Project overview

| Section        | Anchor         | Notes                                                            |
| -------------- | -------------- | ---------------------------------------------------------------- |
| Navigation     | fixed masthead | Official logo mark, numbered index, **Join Now** → WhatsApp      |
| Hero           | `#top`         | Split editorial composition — "BUILT THROUGH DISCIPLINE."        |
| About          | `#about`       | Magazine spread + facts strip (location, hours)                  |
| Facilities     | `#facilities`  | Mixed-ratio photography grid, simple typographic labels          |
| Trainers       | `#trainers`    | Editorial roster (profiles pending owner verification)           |
| Membership     | `#membership`  | Pure-typography pricing — Monthly / Quarterly / Annual, "On request" |
| Gallery        | `#gallery`     | Editorial image grid                                             |
| Testimonials   | —              | Honest pending state — no invented reviews                       |
| Contact        | `#contact`     | Inverted paper section — WhatsApp, phone, hours, Google Maps     |
| Footer         | —              | Brand column, index, contact summary, ARYONIX credit             |
| Floating CTA   | —              | Always-reachable WhatsApp button                                 |

Business identity lives in **one file** — `src/config/business.ts` (name, address,
phone/WhatsApp, hours, logo asset, Maps link). Section content lives in
`src/config/*.ts`. No database is required for the website itself; the Prisma
files are part of the project scaffold.

---

## 2. Technology stack

- **Next.js 16** (App Router, standalone output) + **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS 4** (CSS-first tokens in `src/app/globals.css`) + **shadcn/ui** components (New York style)
- **Framer Motion** — subtle reveals/hover transitions with `prefers-reduced-motion` support
- **Lucide React** icons
- **Prisma ORM** (SQLite scaffold — not used by the marketing site)
- Package managers: **Bun** (`bun.lock`, primary) and **npm** (`package-lock.json`, generated — both work)

---

## 3. Installation

Requirements: **Node.js 20+** and npm (or Bun 1.2+).

```bash
# npm
npm install

# …or Bun
bun install
```

Environment variables: none are required for the website. A scaffold
`.env.example` is included (`DATABASE_URL="file:./db/custom.db"`) for the Prisma
tooling; copy it to `.env` only if you intend to use the database:

```bash
cp .env.example .env
```

---

## 4. Development server

```bash
npm run dev        # or: bun run dev
```

Open <http://localhost:3000>. The site hot-reloads as you edit files under
`src/`.

Useful checks:

```bash
npm run lint       # ESLint (clean as of delivery)
npx tsc --noEmit   # TypeScript check for src/ (clean as of delivery)
```

---

## 5. Production build

```bash
npm run build      # or: bun run build
npm run start      # serves the standalone production server
```

`next.config.ts` uses `output: "standalone"`; the `build` script additionally
copies `.next/static` and `public/` into `.next/standalone/` so the standalone
server is fully self-contained. `npm run start` then runs
`.next/standalone/server.js`.

---

## 6. WhatsApp click-to-chat integration

- **Official number:** `+91 91561 15912` → international digits `919156115912`,
  configured **only** in `src/config/business.ts` (`business.contact.whatsapp`).
- Utility: `src/lib/whatsapp.ts`
  - `buildWhatsAppUrl(message)` → `https://wa.me/919156115912?text=<encodeURIComponent(message)>`
  - Owner-approved templates: `generalEnquiryMessage`, `joinNowMessage`,
    `membershipEnquiryMessage`, `membershipPlanEnquiryMessage(planName)`
    (Monthly / Quarterly / Annual), `trainingEnquiryMessage`.
- Every enquiry opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
  Desktop → WhatsApp Web, mobile → the WhatsApp app.
- **Messages are prefilled only — nothing is ever sent automatically.** The
  visitor always presses Send themselves. No WhatsApp Business API, no API key,
  no server calls.
- CTA map:

| Site CTA                            | Template            |
| ----------------------------------- | ------------------- |
| Navbar **Join Now** (+ mobile menu) | Join now            |
| Hero **Join the club**              | Join now            |
| Hero **Explore Membership**         | scrolls to `#membership` |
| Trainers **Enquire about coaching** | Trainer / coaching  |
| Membership **Enquire — Monthly/Quarterly/Annual** | respective plan template |
| Contact **Message on WhatsApp**     | General contact     |
| Footer **WhatsApp enquiry**         | General contact     |
| Floating WhatsApp button            | General contact     |

To change the number or a message, edit `src/config/business.ts` /
`src/lib/whatsapp.ts` — every CTA updates from those two files.

---

## 7. Logo & image replacement

- **Official logo:** `public/images/logo.png` (transparent master, 691×720).
  Replace this file (keep the same path) to swap the logo everywhere — navbar,
  footer, contact letterhead, favicon (`src/app/icon.png`,
  `src/app/apple-icon.png`) reference it or are generated from it.
  `scripts/process_logo.py` documents how the master was produced from the
  owner's original JPG (edge flood-fill transparency, trim, icon/OG export).
- **Site photography:** `public/images/*.jpg`. Current imagery is temporary
  development photography with a unified black-and-white grade
  (`.photo-grade` in `globals.css`). Replace the files with the club's real
  photography using the same filenames; remove the `.photo-grade` class from
  images if the final photos ship with their own consistent grade.
- **Social card:** `public/images/og-image.jpg` (1200×630) — referenced in
  `src/app/layout.tsx` metadata.

---

## 8. Business details still requiring owner confirmation

The following render as honest placeholders until confirmed (all in
`src/config/`):

- [ ] Membership prices & final plan inclusions (`src/config/membership.ts`)
- [ ] Trainer names, roles, photos, specialities (`src/config/trainers.ts`)
- [ ] Club social profiles — Instagram / Facebook / YouTube
- [ ] Club email address
- [ ] Founding year
- [ ] Verified member testimonials
- [ ] Production domain (`business.siteUrl` → update before going live)

Already confirmed and live: official address (4th & 5th Floor, VS Building,
Agrasen Road, Giripeth, Dharampeth, Nagpur, Maharashtra 440010), phone /
WhatsApp (+91 91561 15912), opening hours (Mon–Sat 06:00–22:00, Sun
06:00–14:00), Google Maps link, official logo.

---

## 9. Vercel deployment

1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Build command and output are
   picked up from `package.json` / `next.config.ts` automatically.
4. Environment variables: none required.
5. **Deploy.** After the first deploy, update `business.siteUrl` in
   `src/config/business.ts` to the live domain (and add the real domain in
   Vercel → Settings → Domains) so canonical/OG metadata is correct, then
   redeploy.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

---

## 10. Project structure

```
├── public/
│   ├── images/            # logo, photography, OG card
│   └── robots.txt
├── src/
│   ├── app/               # layout, page, favicon/apple-icon, global styles
│   ├── components/site/   # navbar, hero, about, facilities, trainers,
│   │                      # membership, gallery, testimonials, contact,
│   │                      # footer, whatsapp-cta, whatsapp-button, reveal
│   ├── components/ui/     # shadcn/ui primitives
│   ├── config/            # business.ts + per-section content config
│   ├── hooks/             # use-mobile, use-toast
│   └── lib/               # whatsapp.ts (click-to-chat), db.ts, utils.ts
├── scripts/               # asset pipeline utilities (logo, image optimization)
├── prisma/schema.prisma   # scaffold (unused by the marketing site)
├── db/custom.db           # scaffold SQLite file
└── package.json / package-lock.json / bun.lock
```

---

© VS Fitness Club. Design & development — **ARYONIX**.
