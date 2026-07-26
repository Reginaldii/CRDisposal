import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-600 dark:text-ink-300">
          <p>
            By requesting an estimate or booking service with CR Disposal, you agree to provide
            accurate contact and address information and to ensure reasonable access to the items
            being removed for the scheduled appointment window.
          </p>
          <p>
            Estimates provided online, by phone, or by text are non-binding and may be adjusted
            once our crew sees the job in person, based on actual volume, weight, access, and
            site conditions.
          </p>
          <p>
            CR Disposal does not accept hazardous waste, chemicals, paint, or other regulated
            materials without prior arrangement, and reserves the right to decline items that
            cannot be legally or safely disposed of.
          </p>
          <p>
            Final pricing is confirmed with the customer before any work begins — you will never
            be charged for removal you haven&apos;t approved.
          </p>
        </div>
      </div>
    </section>
  );
}
