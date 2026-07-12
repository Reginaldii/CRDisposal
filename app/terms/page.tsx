import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service">
        <></>
      </PageHero>
      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x max-w-3xl space-y-6 text-[15px] leading-relaxed text-ink-600 dark:text-ink-300">
          <p>
            By requesting a quote or booking service with CR Disposal, you agree to provide
            accurate delivery and contact information and to keep the rented container accessible
            for delivery, exchange, and pickup for the duration of your rental period.
          </p>
          <p>
            Rental pricing includes delivery, pickup, and disposal up to the tonnage allowance
            listed for your container size. Additional charges may apply for excess weight,
            extended rental periods, or prohibited materials placed in the container.
          </p>
          <p>
            Prohibited items include hazardous waste, tires, batteries, paint, chemicals,
            refrigerants, and asbestos. CR Disposal reserves the right to refuse pickup or apply
            additional fees if prohibited materials are found in a container.
          </p>
          <p>
            Quotes provided through our online calculator are estimates and may be adjusted based
            on actual weight, material type, and site conditions confirmed at booking.
          </p>
        </div>
      </section>
    </>
  );
}
