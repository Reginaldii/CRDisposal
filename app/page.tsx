import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { CheckIcon, MessageIcon, PhoneIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'CR Disposal | Property Cleanouts, Junk Removal & Hauling',
  description:
    'CR Disposal handles the labor, loading, hauling, and disposal for property cleanouts, junk removal, and debris hauling across Berks County and the Lehigh Valley.',
  alternates: { canonical: '/' },
};

const services = [
  'Property cleanouts',
  'Basements & garages',
  'Furniture & bulky items',
  'Renovation debris',
  'Rental turnovers',
  'Site cleanup',
];

export default function HomePage() {
  return (
    <div id="home" className="bg-ink-900 text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(245,180,0,0.18),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(245,180,0,0.11),transparent_35%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg,#fff 0,#fff 1px,transparent 1px,transparent 72px)',
          }}
        />

        <div className="container-x grid min-h-[calc(100svh-64px)] items-center gap-10 py-10 md:min-h-[calc(100vh-80px)] md:py-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-500">
              Berks County + Lehigh Valley
            </p>

            <h1 className="mt-4 font-display text-[clamp(3.4rem,8vw,7.2rem)] font-black leading-[0.88] tracking-[-0.065em]">
              WE HANDLE
              <br />
              <span className="text-yellow-500">THE MESS.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
              Property cleanouts, junk removal, and hauling. We do the labor, load the truck,
              haul it away, and leave the space ready for what comes next.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.smsHref} className="btn-primary text-base sm:min-w-[235px]">
                <MessageIcon className="h-5 w-5" />
                Text Photos for a Quote
              </a>
              <a
                href={site.phoneHref}
                className="btn border border-white/25 bg-white/10 text-base text-white hover:border-white/60 hover:bg-white/15 sm:min-w-[190px]"
              >
                <PhoneIcon className="h-5 w-5" />
                Call {site.phone}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-200">
              {['We load it', 'We haul it', 'You get your space back'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-yellow-500" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-2 text-sm text-ink-200"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-8 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white p-7 shadow-2xl md:p-9">
              <Image
                src="/images/favicon.png"
                alt="CR Disposal logo"
                width={512}
                height={512}
                className="mx-auto h-auto w-full max-w-[360px] object-contain"
                priority
              />

              <div className="mt-5 border-t border-ink-900/10 pt-5 text-ink-900">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-600">
                  Investors · Landlords · Property Owners
                </p>
                <p className="mt-2 text-lg font-extrabold leading-snug">
                  Bought the property with somebody else&apos;s problem inside?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Send photos. We&apos;ll quote the cleanout so your property can move straight
                  into renovation, turnover, or sale.
                </p>
                <Link
                  href="/partners"
                  className="mt-4 inline-flex text-sm font-bold text-ink-900 underline decoration-yellow-500 decoration-2 underline-offset-4"
                >
                  Commercial & investor work →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20">
          <div className="container-x flex flex-col gap-2 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-300 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span>Local owner-operated service</span>
            <span>{site.phone}</span>
            <span>crdisposal.net</span>
          </div>
        </div>
      </section>
    </div>
  );
}
