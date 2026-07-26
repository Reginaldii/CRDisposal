import Link from 'next/link';
import Logo from './Logo';
import { primaryNav, site } from '@/lib/site';
import { cities } from '@/lib/cities';
import { PhoneIcon, MailIcon, MapPinIcon } from './icons';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              Locally owned junk removal for the Lehigh Valley. Fast, affordable, upfront pricing.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-ink-200">
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-yellow-400">
                <PhoneIcon className="h-4 w-4 text-yellow-500" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-yellow-400">
                <MailIcon className="h-4 w-4 text-yellow-500" /> {site.email}
              </a>
              <span className="flex items-center gap-2.5">
                <MapPinIcon className="h-4 w-4 text-yellow-500" />
                {site.address
                  ? `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`
                  : `Serving ${site.serviceArea}`}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Menu</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-200">
              {primaryNav.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="hover:text-yellow-400">{i.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Service Area</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-ink-200 sm:grid-cols-3">
              {cities.map((c) => (
                <li key={c.slug}>{c.name}, PA</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} CR Disposal. All rights reserved. Serving the Lehigh Valley, PA.
          </p>
          <div className="flex gap-6 text-xs text-ink-400">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
