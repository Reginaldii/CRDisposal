import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-600 dark:text-ink-300">
          <p>
            CR Disposal (&quot;we,&quot; &quot;us&quot;) collects the information you submit
            through our estimate and contact forms — including your name, phone number, email,
            address, and any photos you upload — solely to respond to your request, schedule
            service, and communicate about your job.
          </p>
          <p>
            We do not sell your personal information to third parties. Information may be shared
            with service providers who help us operate our business (such as payment processors
            or scheduling software), under obligations to keep it confidential.
          </p>
          <p>
            You may request that we delete your information at any time by contacting us at{' '}
            {site.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
