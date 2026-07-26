import { partnerSteps } from '@/lib/partners';

export default function PartnerHowItWorks() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Three simple steps.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {partnerSteps.map((s) => (
            <div key={s.step}>
              <p className="font-display text-6xl font-extrabold text-yellow-500/40">{s.step}</p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
