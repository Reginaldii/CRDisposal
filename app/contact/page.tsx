import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact CR Disposal',
  description:
    'Contact CR Disposal for dumpster rental pricing, scheduling, or contractor account setup. Call, email, or send a message online.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        subtitle="Call for the fastest response, or send a message and we'll get back to you within one business day."
      >
        <></>
      </PageHero>

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <a href={site.phoneHref} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-yellow-500 dark:border-white/10">
                <PhoneIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Call</p>
                  <p className="mt-0.5 text-lg font-bold">{site.phone}</p>
                </div>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-yellow-500 dark:border-white/10">
                <MailIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Email</p>
                  <p className="mt-0.5 text-lg font-bold">{site.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-6 dark:border-white/10">
                <MapPinIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Address</p>
                  <p className="mt-0.5 text-lg font-bold">{site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-ink-900/10 p-6 dark:border-white/10">
                <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Hours</p>
                  <div className="mt-1.5 space-y-1">
                    {site.hours.map((h) => (
                      <p key={h.days} className="text-sm text-ink-600 dark:text-ink-200">
                        <span className="font-semibold">{h.days}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10">
              <iframe
                title="CR Disposal Service Map"
                src="https://www.google.com/maps?q=Lehigh+Valley,PA&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
