# CR Disposal

Single-page, conversion-focused marketing site for CR Disposal — a locally owned junk removal
company running a dump truck across the Lehigh Valley, PA. Built around a short estimate wizard
designed to go from "I have junk" to a booked job in under two minutes.

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

## Getting form submissions by email

`/api/estimate` and `/api/contact` email every submission to `GMAIL_USER` using that same Gmail
account's SMTP, via an App Password (not your regular Gmail password). Without these two
environment variables set, submissions just get logged to Vercel's function logs instead of
emailed — the site still works, you just won't be notified.

To turn email notifications on:

1. On the Gmail account you want notifications sent to, turn on **2-Step Verification**
   (myaccount.google.com → Security).
2. Once that's on, go to myaccount.google.com → Security → **App Passwords**, create one (name
   it anything, e.g. "CR Disposal Website"), and copy the 16-character code it gives you.
3. In the Vercel project → **Settings → Environment Variables**, add:
   - `GMAIL_USER` = the full Gmail address (e.g. `crdisposalservice@gmail.com`)
   - `GMAIL_APP_PASSWORD` = the 16-character App Password from step 2
4. Redeploy (Vercel → Deployments → ⋯ on the latest one → Redeploy) so the new env vars take
   effect.

Every estimate request arrives as an email with the customer's details and any photos attached;
every contact form message arrives the same way.

## Logging submissions to a spreadsheet

`/api/estimate`, `/api/contact`, and `/api/partner` also send every submission's details (not
photos — those stay in the email) to a Google Sheet, if `GOOGLE_SHEET_WEBHOOK_URL` is set. Without
it, this step is just skipped — no error, nothing breaks.

This uses a Google Apps Script Web App instead of the Google Cloud API/service-account route, since
it's set up entirely from within Google Sheets — no separate developer console needed. One Web App
routes to two tabs in the same spreadsheet, based on submission type.

1. Create a new Google Sheet (or use an existing one) with two tabs (right-click a sheet tab at
   the bottom → Duplicate, or the "+" button, to add a second one):
   - A tab named exactly **Submissions** — row 1 headers: `Timestamp, Type, Name, Phone, Email,
     Address, City, ZIP, Property Type, Items, Other Description, Skipped Item List, Unknown Items
     Note, Locations, Conditions, Preferred Date, Notes, Photo Count, Referral Code, Message, Truck
     Fill, Effective Cu Yd, Weight Lbs, Labor Hours, Disposal Fee, Fuel Fee, Price Low, Price High,
     Estimated Profit`
   - A tab named exactly **Partners** — row 1 headers: `Timestamp, Business Name, Contact Name,
     Phone, Email, Website, Business Type, Service Area, Referral Source, Notes`
2. In that sheet, go to **Extensions → Apps Script**.
3. Delete whatever's in the editor and paste the contents of `docs/google-apps-script.gs` from
   this repo.
4. Click **Deploy → New deployment**. For "Select type," choose **Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**, then click **Deploy**.
6. Google will ask you to authorize it (it's your own script, on your own sheet) — click through
   the consent screens.
7. Copy the **Web app URL** it gives you.
8. In the Vercel project → **Settings → Environment Variables**, add:
   - `GOOGLE_SHEET_WEBHOOK_URL` = that Web app URL
9. Redeploy so the new environment variable takes effect.

Every estimate/contact submission becomes a new row in **Submissions**; every partner application
becomes a new row in **Partners**.

**If you ever update `docs/google-apps-script.gs` later** (or already deployed it before these two
tabs existed): don't create another "New deployment," since that generates a different URL and
you'd have to update the Vercel environment variable again. Instead, in the Apps Script editor go
to **Deploy → Manage deployments**, click the pencil/edit icon on the existing deployment, set
**Version: New version**, and click **Deploy** — same URL, updated code.

## Structure

- `app/page.tsx` — the main site: hero, services, why-choose-us, how-it-works, estimate,
  restricted items, about, reviews, gallery, service area, partner teaser, contact — all one
  scrolling page with anchor nav.
- `app/partners/page.tsx` — the Partner Program page (referral partners like realtors, property
  managers, contractors, etc.) — a separate page on purpose, linked from the footer and a
  homepage teaser section rather than primary nav, since it's a different audience than customers.
- `app/api/estimate/`, `app/api/contact/`, `app/api/partner/` — form submission handlers (see
  email setup above).
- `components/estimate/` — the 5-step estimate wizard (items → truck fill → photos/conditions →
  address/timing → contact/submit) and its shared state/types.
- `components/partners/` — the Partner Program page's sections and application form.
- `components/` — shared section components (Header, Footer, Hero, ServicesGrid, Gallery, etc.)
- `lib/` — site content and data (services, estimate wizard options, restricted items, cities,
  partner program content, testimonials).

## Notes / before launch

- Photos in the estimate wizard are compressed client-side (`lib/compressImage.ts`) and sent as
  base64 in the JSON payload to `/api/estimate`, then attached to the notification email — keep
  an eye on Vercel's ~4.5MB default request body limit for API routes if photo count/quality
  increases significantly.
- Photography is represented with styled placeholders (`components/PhotoPlaceholder.tsx`) —
  swap in real truck, job-site, and before/after photography before launch.
- `lib/site.ts` has the real phone, email, and hours. There's no business address yet
  (`site.address` is `null`) — every place that would show it falls back to just the service
  area ("Lehigh Valley, PA") instead of a fake address. Fill in `site.address` once you have one.
- Per-city SEO landing pages were removed when the site consolidated to a single page (per the
  "avoid unnecessary pages" brief) — if local SEO for individual towns matters, that's the main
  trade-off to revisit.
