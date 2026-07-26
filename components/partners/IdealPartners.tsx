'use client';

import { motion } from 'framer-motion';
import { idealPartners } from '@/lib/partners';
import {
  KeyIcon,
  Building2Icon,
  BuildingIcon,
  WrenchIcon,
  BoltIcon,
  LeafIcon,
  HomeIcon,
  BoxIcon,
  GarageIcon,
  HeartIcon,
  HammerIcon,
  ChartIcon,
} from '../icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  key: KeyIcon,
  building2: Building2Icon,
  building: BuildingIcon,
  wrench: WrenchIcon,
  bolt: BoltIcon,
  leaf: LeafIcon,
  home: HomeIcon,
  box: BoxIcon,
  garage: GarageIcon,
  heart: HeartIcon,
  hammer: HammerIcon,
  chart: ChartIcon,
};

export default function IdealPartners() {
  return (
    <section className="section bg-ink-50 dark:bg-ink-800">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Ideal Partners</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Built for businesses like yours.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {idealPartners.map((p, i) => {
            const Icon = iconMap[p.icon] ?? BuildingIcon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink-900/10 bg-white p-6 text-center dark:border-white/10 dark:bg-ink-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/12 text-yellow-600 dark:text-yellow-400">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold leading-snug">{p.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
