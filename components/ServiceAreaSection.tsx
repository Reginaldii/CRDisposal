import { cities } from '@/lib/cities';
import { MapPinIcon } from './icons';

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="section bg-white dark:bg-ink-900 scroll-mt-16">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Service Area</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Serving the entire Lehigh Valley.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cities.map((c) => (
              <div
                key={c.slug}
                className="flex items-center gap-2 rounded-xl border border-ink-900/10 px-4 py-3 text-sm font-semibold dark:border-white/10"
              >
                <MapPinIcon className="h-4 w-4 shrink-0 text-yellow-500" />
                {c.name}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-400">Don&apos;t see your town? Call us — we probably still cover it.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10">
          <iframe
            title="CR Disposal Service Map"
            src="https://www.google.com/maps?q=Lehigh+Valley,PA&output=embed"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
