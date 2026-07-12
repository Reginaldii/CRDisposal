import Link from 'next/link';
import { cities } from '@/lib/cities';
import { ArrowRightIcon, MapPinIcon } from './icons';

export default function ServiceAreasStrip() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Service Areas</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Serving the entire Lehigh Valley.
            </h2>
          </div>
          <Link href="/service-areas" className="btn-outline shrink-0">
            View All Cities
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-ink-900/10 px-5 py-4 transition-colors hover:border-yellow-500 hover:bg-yellow-500/5 dark:border-white/10"
            >
              <span className="flex items-center gap-2.5 text-sm font-semibold">
                <MapPinIcon className="h-4 w-4 text-yellow-500" />
                {c.name}
              </span>
              <ArrowRightIcon className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-yellow-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
