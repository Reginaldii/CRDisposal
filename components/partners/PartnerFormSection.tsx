import PartnerForm from './PartnerForm';

export default function PartnerFormSection() {
  return (
    <section id="partner-form" className="section bg-ink-50 dark:bg-ink-800 scroll-mt-16">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Join the Program</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Become a Partner
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">
            Free to join. Takes about two minutes.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
