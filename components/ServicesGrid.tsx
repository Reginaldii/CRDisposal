'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/services';
import {
  SofaIcon,
  ApplianceIcon,
  GarageIcon,
  HomeIcon,
  BuildingIcon,
  LeafIcon,
  HotTubIcon,
  ShedIcon,
  BriefcaseIcon,
  Building2Icon,
  BoxIcon,
  KeyIcon,
} from './icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sofa: SofaIcon,
  appliance: ApplianceIcon,
  garage: GarageIcon,
  home: HomeIcon,
  building: BuildingIcon,
  leaf: LeafIcon,
  hottub: HotTubIcon,
  shed: ShedIcon,
  briefcase: BriefcaseIcon,
  building2: Building2Icon,
  box: BoxIcon,
  key: KeyIcon,
};

export default function ServicesGrid() {
  return (
    <section id="services" className="section bg-white dark:bg-ink-900 scroll-mt-16">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Whatever it is, we&apos;ll take it.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? BoxIcon;
            return (
              <motion.a
                key={s.id}
                href="#estimate"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-ink-900/10 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:border-yellow-500 hover:shadow-soft dark:border-white/10 dark:bg-ink-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/12 text-yellow-600 dark:text-yellow-400">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold leading-snug">{s.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
