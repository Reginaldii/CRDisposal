import { ShieldIcon, ClockIcon, HomeIcon } from './icons';

const values = [
  { icon: ShieldIcon, title: 'Clear estimates', desc: 'We review the actual job before confirming the price.' },
  { icon: ClockIcon, title: 'Direct communication', desc: 'Call or text the local business handling your job.' },
  { icon: HomeIcon, title: 'Stay local', desc: 'Based in the Lehigh Valley, not a call center.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x">
        <div className="mx-auto max-w-4xl rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-ink-900 md:p-12">
          <p className="eyebrow">About CR Disposal</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Local service. Direct communication.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-600 dark:text-ink-200">
            CR Disposal is a locally owned hauling and cleanout business serving the Lehigh Valley.
            We work directly with homeowners, landlords, property managers, contractors, and local
            businesses to clear spaces and move projects forward.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-3.5">
                <v.icon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <div>
                  <p className="font-semibold">{v.title}</p>
                  <p className="text-sm text-ink-500 dark:text-ink-300">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
