'use client';

import {
  HomeIcon,
  BuildingIcon,
  Building2Icon,
} from './icons';

const serviceGroups = [
  {
    title: 'Home & Property Cleanouts',
    description: 'Garages, basements, estates, storage units, rental turnovers, and whole-property cleanouts.',
    examples: ['Estate and moving cleanouts', 'Rental property turnovers', 'Furniture and appliance removal'],
    icon: HomeIcon,
  },
  {
    title: 'Construction & Debris Removal',
    description: 'Hauling for renovation debris, job-site cleanup, yard material, and bulky project waste.',
    examples: ['Remodeling debris', 'Contractor job-site cleanup', 'Shed and outdoor material removal'],
    icon: BuildingIcon,
  },
  {
    title: 'Commercial & Recurring Hauling',
    description: 'Flexible removal support for landlords, property managers, offices, and local businesses.',
    examples: ['Apartment and unit cleanouts', 'Office and retail clear-outs', 'Repeat pickup arrangements'],
    icon: Building2Icon,
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="section bg-white dark:bg-ink-900 scroll-mt-16">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Built for more than a single-item pickup.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500 dark:text-ink-300">
            We focus on clearing meaningful amounts of material safely and efficiently. Small pickups are welcome when they make sense, but cleanouts and project work are our specialty.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {serviceGroups.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href="#estimate"
                className="group rounded-3xl border border-ink-900/10 bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-yellow-500 hover:shadow-soft dark:border-white/10 dark:bg-ink-800"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/12 text-yellow-600 dark:text-yellow-400">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{service.description}</p>
                <ul className="mt-5 space-y-2 text-sm font-medium">
                  {service.examples.map((example) => <li key={example}>— {example}</li>)}
                </ul>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
