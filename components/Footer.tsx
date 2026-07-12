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
              Premium dumpster rentals and hauling for contractors and homeowners across the
              Lehigh Valley. Licensed, insured, locally owned.
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
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-200">
              {primaryNav.slice(0, 5).map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="hover:text-yellow-400">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Resources</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-200">
              <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
              <li><Link href="/faq" className="hover:text-yellow-400">FAQ</Link></li>
              <li><Link href="/pricing" className="hover:text-yellow-400">Pricing</Link></li>
              <li><Link href="/quote" className="hover:text-yellow-400">Instant Quote</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Service Areas</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-ink-200">
              {cities.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="hover:text-yellow-400">{c.name}, PA</Link>
                </li>
              ))}
            </ul>
            <Link href="/service-areas" className="mt-4 inline-block text-sm font-semibold text-yellow-400 hover:text-yellow-300">
              View all service areas →
            </Link>
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
