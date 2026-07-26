import PhotoPlaceholder from './PhotoPlaceholder';
import { ShieldIcon, ClockIcon, HomeIcon } from './icons';

const values = [
  { icon: ShieldIcon, title: 'Licensed & insured', desc: 'Every job, every time — no exceptions.' },
  { icon: ClockIcon, title: 'Show up on time', desc: 'If we say a window, we hit it.' },
  { icon: HomeIcon, title: 'Stay local', desc: 'Based in the Lehigh Valley, not a call center.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <PhotoPlaceholder label="CR Disposal Crew On The Job" variant="dark" ratio="aspect-[4/3]" />
        <div>
          <p className="eyebrow">About CR Disposal</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            No runaround.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-600 dark:text-ink-200">
            CR Disposal is a locally owned junk removal company serving the Lehigh Valley. No call
            centers, no vague pricing, no waiting around — just a crew that shows up, does the
            heavy lifting, and leaves the space clean.
          </p>
          <div className="mt-8 space-y-5">
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
