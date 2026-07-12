'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { site } from '@/lib/site';
import { ArrowRightIcon, PhoneIcon, CheckIcon } from './icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(245,180,0,0.16),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(245,180,0,0.10),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, #fff 0, #fff 1px, transparent 1px, transparent 64px)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container-x relative z-10 pt-16 pb-20 md:pt-28 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Lehigh Valley, Pennsylvania
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tightest sm:text-6xl md:text-7xl"
            >
              Dumpster Rentals
              <br />
              Done <span className="text-yellow-500">Right.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-200 md:text-xl"
            >
              Same-day hooklift delivery, transparent flat-rate pricing, and a dispatcher who
              actually answers. Built for contractors, roofers, and homeowners who can&apos;t
              afford a dumpster company that flakes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link href="/quote" className="btn-primary text-base">
                Get a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} className="btn-outline border-white/25 text-white hover:border-white/60 text-base">
                <PhoneIcon className="h-4 w-4 text-yellow-500" />
                Call Now — {site.phone}
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300"
            >
              {['Same-day delivery', 'Licensed & insured', 'Flat-rate pricing'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-yellow-500" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#2B2B2F,#0A0A0B_75%)]" />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 16px)',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-500">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M1 3h13v13H1z" />
                    <path d="M14 8h4l4 4v4h-8z" />
                    <circle cx="6" cy="18.5" r="1.75" />
                    <circle cx="17.5" cy="18.5" r="1.75" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Hooklift Fleet — Job Site Ready
                </p>
                <p className="max-w-[240px] text-sm text-white/50">
                  Cinematic fleet photography / video placeholder
                </p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-2xl font-bold leading-none">4.9<span className="text-yellow-500">★</span></p>
                    <p className="mt-1 text-[11px] text-white/50">200+ Google Reviews</p>
                  </div>
                  <div className="h-8 w-px bg-white/15" />
                  <div>
                    <p className="text-2xl font-bold leading-none">24hr</p>
                    <p className="mt-1 text-[11px] text-white/50">Avg. Delivery Time</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
