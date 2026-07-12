# CR Disposal

Production-ready marketing website for CR Disposal — dumpster rentals, hooklift service,
construction debris hauling, and junk removal in the Lehigh Valley, PA.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Fully static-generated, including per-city service-area pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes (home, dumpster-rentals, construction-debris, contractors, residential,
  pricing, about, faq, service-areas + dynamic city pages, contact, quote, API routes)
- `components/` — shared UI (header, footer, hero, calculators, forms, gallery, testimonials, etc.)
- `lib/` — site content and data (pricing, cities, FAQs, testimonials)

## Notes

- Photography/video is represented with styled placeholders (`components/PhotoPlaceholder.tsx`,
  the hero media panel) — swap in real fleet, job-site, and before/after photography before launch.
- `/api/quote` and `/api/contact` currently log submissions server-side; wire them up to a
  CRM/email/SMS provider before going live.
- Update `lib/site.ts` with the real phone number, email, and address before launch.
