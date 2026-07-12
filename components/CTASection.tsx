import Link from 'next/link';
import { site } from '@/lib/site';
import { ArrowRightIcon, PhoneIcon } from './icons';

export default function CTASection({
  title = 'Ready to book a dumpster?',
  subtitle = 'Get an instant price online, or call and talk to a real dispatcher — not a call center.',
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
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/quote" className="btn-primary text-base">
                Get a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
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
