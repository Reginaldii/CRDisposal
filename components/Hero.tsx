'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';
import { PhoneIcon, MessageIcon, CalendarIcon, MapPinIcon } from './icons';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink-900 text-white scroll-mt-16">
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

      <div className="container-x relative z-10 flex min-h-[92vh] items-center py-16 md:py-24">
        <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-200"
            >
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <MapPinIcon className="h-4 w-4 text-yellow-500" />
                Serving the Lehigh Valley, PA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tightest sm:text-6xl md:text-7xl"
            >
              Junk Gone <span className="text-yellow-500">Today.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 md:text-xl"
            >
              Fast. Affordable. Locally owned. Point at what needs to go — we do the lifting,
              loading, and disposal. Most estimates take under two minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href={site.phoneHref} className="btn-primary text-base">
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
              <a href={site.smsHref} className="btn-outline border-white/25 text-white hover:border-white/60 text-base">
                <MessageIcon className="h-4 w-4" />
                Text Photos
              </a>
              <a href="#estimate" className="btn bg-white text-ink-900 shadow-soft hover:bg-ink-100 hover:shadow-lift text-base">
                <CalendarIcon className="h-4 w-4" />
                Get Free Estimate
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 text-sm text-ink-300"
            >
              <a href={site.phoneHref} className="font-semibold text-white underline decoration-yellow-500/60 underline-offset-4">
                {site.phone}
              </a>{' '}
              — available every day, most jobs booked same day.
            </motion.p>
          </div>

          {/* Brand mark fills the empty right-hand space on wide screens only —
              there isn't room for it without crowding the copy below xl, and it
              would just repeat the header logo on mobile. The mark's black "C"
              would otherwise disappear against this section's near-black
              background, so it gets a light halo two ways: a soft blurred glow
              behind the whole image, plus a drop-shadow that outlines the mark's
              actual silhouette (a background glow alone isn't tight enough to
              read against black — it just looks washed out). */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden shrink-0 items-center justify-center xl:flex"
          >
            <div className="absolute h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)] blur-2xl 2xl:h-[680px] 2xl:w-[680px]" />
            <Image
              src="/images/logo.png"
              alt="CR Disposal"
              width={1024}
              height={1024}
              className="relative h-auto w-[440px] object-contain 2xl:w-[540px]"
              style={{
                filter:
                  'drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 0 14px rgba(255,255,255,0.45)) drop-shadow(0 0 36px rgba(245,180,0,0.35))',
              }}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
