'use client';

import { motion } from 'framer-motion';
import { whyChooseUs } from '@/lib/services';
import { ClockIcon, TagIcon, MuscleIcon, LeafIcon, ShieldIcon, HomeIcon } from './icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: ClockIcon,
  tag: TagIcon,
  muscle: MuscleIcon,
  leaf: LeafIcon,
  shield: ShieldIcon,
  home: HomeIcon,
};

export default function WhyChooseUs() {
  return (
    <section className="section bg-ink-50 dark:bg-ink-800">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldIcon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <Icon className="h-8 w-8 text-yellow-500" />
                <span className="text-sm font-semibold leading-snug">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
