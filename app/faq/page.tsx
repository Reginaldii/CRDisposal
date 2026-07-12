import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { faqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ — Dumpster Rental Questions Answered',
  description:
    'Answers to the most common dumpster rental questions: weight limits, permits, restricted items, mixing materials, and rental length.',
  alternates: { canonical: '/faq' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered straight."
        subtitle="Everything customers ask us before booking — weight limits, permits, restricted items, and rental length."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection title="Still have a question?" subtitle="Call us and we'll walk you through your specific project." />
    </>
  );
}
