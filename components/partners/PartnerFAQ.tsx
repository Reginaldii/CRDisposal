'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerFaqs } from '@/lib/partners';
import { ChevronDownIcon } from '../icons';

export default function PartnerFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x max-w-3xl">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-10 divide-y divide-ink-900/8 rounded-3xl border border-ink-900/8 dark:divide-white/10 dark:border-white/10">
          {partnerFaqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold tracking-tight md:text-lg">{item.q}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-yellow-500' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300 md:px-8">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
