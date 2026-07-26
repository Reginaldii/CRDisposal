import { restrictedItems } from '@/lib/restrictedItems';
import { site } from '@/lib/site';
import { NoEntryIcon } from './icons';

export default function RestrictedItemsSection() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Safety First</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            What we can&apos;t take.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">
            For everyone&apos;s safety and to stay within state and local regulations, there are a
            few things we&apos;re not able to haul.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restrictedItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-ink-900/10 p-6 dark:border-white/10">
              <NoEntryIcon className="h-6 w-6 text-ink-400" />
              <h3 className="mt-4 font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-400">
          Not sure about something? Call or text us at {site.phone} before your appointment and
          we&apos;ll let you know.
        </p>
      </div>
    </section>
  );
}
