import { site } from '@/lib/site';
import { ArrowRightIcon, PhoneIcon, CheckIcon } from './icons';

const points = ['Free Estimates', 'Upfront Pricing', 'No Hidden Fees', 'Pay Only For What We Remove'];

export default function CTASection({
  title = 'Free estimates. Upfront pricing.',
  subtitle = 'Every job is different, so we don’t post fake fixed prices. Tell us what needs to go and get a real number in under two minutes.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-900 px-8 py-16 text-center md:px-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,180,0,0.14),transparent_55%)]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg text-ink-300">{subtitle}</p>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-200">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-yellow-500" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#estimate" className="btn-primary text-base">
                Get Free Estimate
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a href={site.phoneHref} className="btn-outline border-white/25 text-white hover:border-white/60 text-base">
                <PhoneIcon className="h-4 w-4 text-yellow-500" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
