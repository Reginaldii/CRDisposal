import type { Metadata } from 'next';
import PartnerHero from '@/components/partners/PartnerHero';
import PartnerHowItWorks from '@/components/partners/PartnerHowItWorks';
import PartnerCommission from '@/components/partners/PartnerCommission';
import WhyPartner from '@/components/partners/WhyPartner';
import IdealPartners from '@/components/partners/IdealPartners';
import PartnerFAQ from '@/components/partners/PartnerFAQ';
import PartnerFormSection from '@/components/partners/PartnerFormSection';

export const metadata: Metadata = {
  title: 'Partner Program — Earn Referral Commissions',
  description:
    'Join the CR Disposal Partner Program. Realtors, property managers, contractors, and other local businesses earn a 10% referral commission on every completed job — free to join, no limit on referrals.',
  alternates: { canonical: '/partners' },
};

export default function PartnersPage() {
  return (
    <>
      <PartnerHero />
      <PartnerHowItWorks />
      <PartnerCommission />
      <WhyPartner />
      <IdealPartners />
      <PartnerFAQ />
      <PartnerFormSection />
    </>
  );
}
