import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import EstimateSection from '@/components/EstimateSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesGrid from '@/components/ServicesGrid';
import HowItWorks from '@/components/HowItWorks';
import AboutSection from '@/components/AboutSection';
import ServiceAreaSection from '@/components/ServiceAreaSection';
import CommercialSection from '@/components/CommercialSection';

export const metadata: Metadata = {
  title: 'CR Disposal | Cleanouts, Debris Removal & Hauling — Lehigh Valley, PA',
  description:
    'Locally owned cleanouts, debris removal, and hauling for homeowners, landlords, property managers, and contractors in the Lehigh Valley.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <CommercialSection />
      <HowItWorks />
      <WhyChooseUs />
      <EstimateSection />
      <AboutSection />
      <ServiceAreaSection />
    </>
  );
}
