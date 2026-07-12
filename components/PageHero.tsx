import Link from 'next/link';
import { ReactNode } from 'react';
import { site } from '@/lib/site';
import { ArrowRightIcon, PhoneIcon } from './icons';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(245,180,0,0.14),transparent_50%)]" />
      <div className="container-x relative z-10 py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 md:text-xl">
            {subtitle}
          </p>
        )}
        {children ?? (
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary text-base">
              Get a Quote
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn-outline border-white/25 text-white hover:border-white/60 text-base">
              <PhoneIcon className="h-4 w-4 text-yellow-500" />
              {site.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
