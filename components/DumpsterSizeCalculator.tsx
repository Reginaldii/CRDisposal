'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projectTypes, dumpsterSizes } from '@/lib/dumpsters';
import { ArrowRightIcon, CheckIcon } from './icons';

export default function DumpsterSizeCalculator() {
  const [selected, setSelected] = useState<string>(projectTypes[0].id);

  const project = useMemo(() => projectTypes.find((p) => p.id === selected)!, [selected]);
  const size = useMemo(
    () => dumpsterSizes.find((s) => s.id === project.recommendedSizeId)!,
    [project]
  );

  return (
    <section className="section bg-ink-50 dark:bg-ink-800" id="size-calculator">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Dumpster Size Calculator</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Not sure what size you need?
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-300">
            Tell us about your project and we&apos;ll recommend the right dumpster — no guesswork,
            no overpaying for space you don&apos;t use.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {projectTypes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${
                    selected === p.id
                      ? 'border-yellow-500 bg-yellow-500/10 text-ink-900 dark:text-white'
                      : 'border-ink-900/10 bg-white text-ink-700 hover:border-ink-900/25 dark:border-white/10 dark:bg-ink-900 dark:text-ink-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={size.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-ink-900"
              >
                <p className="eyebrow">Recommended</p>
                <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
                  {size.size}
                </p>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{size.dims} · up to {size.capacityTons} tons</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-200">{project.note}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-600 dark:text-ink-200">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-yellow-500" /> {size.bestFor}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-yellow-500" /> Starting at ${size.basePrice}
                  </li>
                </ul>
                <Link
                  href={`/quote?size=${size.id}`}
                  className="btn-primary mt-7 w-full"
                >
                  Get Price for {size.size}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
