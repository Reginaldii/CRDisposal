import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeatureGrid from '@/components/FeatureGrid';
import DumpsterSizeCalculator from '@/components/DumpsterSizeCalculator';
import ContractorStrip from '@/components/ContractorStrip';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ServiceAreasStrip from '@/components/ServiceAreasStrip';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'CR Disposal | Dumpster Rentals Done Right — Lehigh Valley, PA',
  description:
    'Same-day dumpster delivery, transparent flat-rate pricing, and hooklift service for contractors and homeowners across the Lehigh Valley, PA. Licensed & insured.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeatureGrid />
      <DumpsterSizeCalculator />
      <ContractorStrip />
      <Gallery />
      <Testimonials />
      <ServiceAreasStrip />
      <CTASection />
    </>
  );
}
