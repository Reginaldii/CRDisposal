import LeadForm from './LeadForm';
import { CheckIcon } from './icons';

const points = ['Short request form', 'Photos help us price accurately', 'Every job reviewed personally'];

export default function EstimateSection() {
  return (
    <section id="estimate" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Free Estimate</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Show us the job. Get a real estimate.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500 dark:text-ink-300">Tell us what you need cleared and include photos if you can. We&apos;ll review the size, access, location, and timing before confirming pricing.</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-500 dark:text-ink-300">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-yellow-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
