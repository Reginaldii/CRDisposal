'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/content';
import { TruckIcon, TagIcon, ClockIcon, ShieldIcon, HomeIcon } from './icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: TruckIcon,
  tag: TagIcon,
  'truck-2': TruckIcon,
  clock: ClockIcon,
  shield: ShieldIcon,
  home: HomeIcon,
};

export default function FeatureGrid() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Why CR Disposal</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Built for people who can&apos;t afford to wait.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-900/8 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon] ?? TruckIcon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group bg-white p-8 transition-colors hover:bg-ink-50 dark:bg-ink-900 dark:hover:bg-ink-800 md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/12 text-yellow-600 dark:text-yellow-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
