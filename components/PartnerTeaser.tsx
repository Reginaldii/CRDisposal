import Link from 'next/link';
import { ArrowRightIcon, HandshakeIcon } from './icons';

export default function PartnerTeaser() {
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container-x">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-14 text-center md:px-16">
          <HandshakeIcon className="h-10 w-10 text-yellow-500" />
          <div className="max-w-xl">
            <p className="eyebrow">For Local Businesses</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Realtor, contractor, or property manager? Partner with us.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
              Earn a referral commission every time a client you send us becomes a completed job —
              free to join, no limit on referrals.
            </p>
          </div>
          <Link href="/partners" className="btn-primary">
            Learn About Our Partner Program
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
