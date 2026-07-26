import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import EstimateSection from '@/components/EstimateSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesGrid from '@/components/ServicesGrid';
import HowItWorks from '@/components/HowItWorks';
import RestrictedItemsSection from '@/components/RestrictedItemsSection';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import ServiceAreaSection from '@/components/ServiceAreaSection';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'CR Disposal | Junk Gone Today — Lehigh Valley, PA',
  description:
    'Fast, affordable, locally owned junk removal in the Lehigh Valley. Same-day service, upfront pricing, free estimates in under two minutes.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <EstimateSection />
      <WhyChooseUs />
      <ServicesGrid />
      <HowItWorks />
      <RestrictedItemsSection />
      <AboutSection />
      <Testimonials />
      <Gallery />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
