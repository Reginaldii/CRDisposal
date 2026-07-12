'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/content';
import { StarIcon } from './icons';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Contractors and homeowners trust CR Disposal.
          </h2>
          <div className="mt-6 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
            ))}
            <span className="ml-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
              4.9 out of 5 · 200+ Google Reviews
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-ink-900/10 bg-ink-50 p-10 text-center dark:border-white/10 dark:bg-ink-800 md:p-14"
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                ))}
              </div>
              <blockquote className="mt-6 text-xl font-medium leading-relaxed tracking-tight text-ink-800 dark:text-white md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-ink-500 dark:text-ink-300">{t.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-yellow-500' : 'w-1.5 bg-ink-900/15 dark:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
