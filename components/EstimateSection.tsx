import { Suspense } from 'react';
import EstimateWizard from './estimate/EstimateWizard';

export default function EstimateSection() {
  return (
    <section id="estimate" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Free Estimate</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            From &ldquo;I have junk&rdquo; to booked in under two minutes.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Suspense fallback={<div className="h-[520px] animate-pulse rounded-3xl bg-white/60 dark:bg-ink-900/60" />}>
            <EstimateWizard />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
