import ContactForm from './ContactForm';
import { site } from '@/lib/site';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './icons';

export default function ContactSection() {
  return (
    <section id="contact" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Prefer to talk it through?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <a href={site.phoneHref} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-white/10 dark:bg-ink-900">
                <PhoneIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Call or Text</p>
                  <p className="mt-0.5 text-lg font-bold">{site.phone}</p>
                </div>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-6 transition-colors hover:border-yellow-500 dark:border-white/10 dark:bg-ink-900">
                <MailIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Email</p>
                  <p className="mt-0.5 text-lg font-bold">{site.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-6 dark:border-white/10 dark:bg-ink-900">
                <MapPinIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Address</p>
                  <p className="mt-0.5 text-lg font-bold">{site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-ink-900/10 bg-white p-6 dark:border-white/10 dark:bg-ink-900">
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
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
