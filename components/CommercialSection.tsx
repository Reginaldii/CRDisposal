import { site } from '@/lib/site';
import { Building2Icon, PhoneIcon } from './icons';

export default function CommercialSection() {
  return (
    <section id="commercial" className="section scroll-mt-16 bg-ink-900 text-white">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">For Property & Trade Professionals</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            A hauling partner when the work keeps coming.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">
            Property managers, landlords, contractors, realtors, and local businesses can contact us about turnovers, project debris, clear-outs, and repeat hauling needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#estimate" className="btn-primary">Discuss a Project</a>
            <a href={site.phoneHref} className="btn border border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">
              <PhoneIcon className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <Building2Icon className="h-9 w-9 text-yellow-500" />
          <h3 className="mt-6 text-2xl font-bold">Good fits for CR Disposal</h3>
          <ul className="mt-6 grid gap-4 text-ink-200 sm:grid-cols-2">
            {[
              'Rental unit turnovers',
              'Estate and property cleanouts',
              'Renovation debris hauling',
              'Office and retail clear-outs',
              'Recurring removal needs',
              'Time-sensitive property work',
            ].map((item) => (
              <li key={item} className="border-l-2 border-yellow-500 pl-3">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
