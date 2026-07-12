import Link from 'next/link';
import { contractorBenefits } from '@/lib/content';
import { ArrowRightIcon, CheckIcon } from './icons';

export default function ContractorStrip() {
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">For Contractors</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Running five sites or fifty, we keep up.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-300">
              Priority scheduling, account billing, and a dispatcher who knows your job sites by
              name. Built for contractors who need dumpsters to be one less thing to manage.
            </p>
            <Link href="/contractors" className="btn-primary mt-8">
              Contractor Pricing
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contractorBenefits.slice(0, 4).map((b) => (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <CheckIcon className="h-5 w-5 text-yellow-500" />
                  <h3 className="mt-4 font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
