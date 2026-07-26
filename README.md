# CR Disposal

Single-page, conversion-focused marketing site for CR Disposal — a locally owned junk removal
company running a 2011 Ford F350 4x4 mason dump truck across the Lehigh Valley, PA. Built around
a 9-step estimate wizard designed to go from "I have junk" to a booked job in under two minutes.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Server-rendered — deploy on Vercel (or any Next.js host); no longer a static export

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

This project needs a real server (API routes handle the estimate/contact form submissions), so
it's built for Vercel:

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In Vercel, "Add New Project" → import this repo → Deploy. No config needed, Vercel
   auto-detects Next.js.

## Structure

- `app/page.tsx` — the entire site: hero, services, why-choose-us, how-it-works, estimate,
  about, reviews, gallery, service area, contact — all one scrolling page with anchor nav.
- `app/api/estimate/` and `app/api/contact/` — form submission handlers.
- `components/estimate/` — the 9-step estimate wizard (contact → address → photos → items →
  conditions → truck fill → date → notes → review/submit) and its shared state/types.
- `components/` — shared section components (Header, Footer, Hero, ServicesGrid, Gallery, etc.)
- `lib/` — site content and data (services, estimate wizard options, cities, testimonials).

## Notes / before launch

- Photos in the estimate wizard are compressed client-side (`lib/compressImage.ts`) and sent as
  base64 in the JSON payload to `/api/estimate`, which currently just logs the submission. For
  production, forward this to a CRM/email/SMS provider and move photos to persistent storage
  (e.g. Vercel Blob) instead of logging base64 data — keep an eye on Vercel's ~4.5MB default
  request body limit for API routes if photo count/quality increases.
- Photography is otherwise represented with styled placeholders (`components/PhotoPlaceholder.tsx`)
  — swap in real truck, job-site, and before/after photography before launch.
- Update `lib/site.ts` with the real phone number, email, and address before launch.
- Per-city SEO landing pages were removed when the site consolidated to a single page (per the
  "avoid unnecessary pages" brief) — if local SEO for individual towns matters, that's the main
  trade-off to revisit.
