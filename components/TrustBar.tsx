const stats = [
  { value: '4.9★', label: '200+ Google Reviews' },
  { value: '<2 min', label: 'To Book an Estimate' },
  { value: '12+', label: 'Cities Served' },
  { value: '100%', label: 'Licensed & Insured' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-ink-900/8 bg-ink-50 dark:border-white/10 dark:bg-ink-800">
      <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
