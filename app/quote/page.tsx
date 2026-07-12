import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import InstantQuoteCalculator from '@/components/InstantQuoteCalculator';

export const metadata: Metadata = {
  title: 'Instant Quote — CR Disposal',
  description:
    'Get an instant dumpster rental price for your Lehigh Valley project. Choose your size, rental length, and delivery ZIP for a real-time estimate.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant Quote"
        title="Get your price in under a minute."
        subtitle="Answer a few quick questions and see a real number instantly — no waiting on a callback to find out what it costs."
      >
        <></>
      </PageHero>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x">
          <Suspense fallback={<div className="h-[520px] animate-pulse rounded-3xl bg-white/50 dark:bg-ink-900/50" />}>
            <InstantQuoteCalculator />
          </Suspense>
        </div>
      </section>
    </>
  );
}
