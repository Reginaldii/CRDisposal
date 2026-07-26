'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '../icons';

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(245,180,0,0.14),transparent_50%)]" />
      <div className="container-x relative z-10 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Partner Program
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl"
        >
          Grow Your Business With CR Disposal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 md:text-xl"
        >
          Earn referral commissions while providing your clients with reliable, professional junk
          removal service.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9"
        >
          <a href="#partner-form" className="btn-primary text-base">
            Become a Partner
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
