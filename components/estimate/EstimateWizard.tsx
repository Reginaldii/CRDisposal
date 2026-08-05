'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EstimateFormData, initialEstimateData, MIN_PHOTOS, TOTAL_STEPS } from './types';
import StepIndicator from './StepIndicator';
import Step1Items from './steps/Step1Items';
import Step2Locations from './steps/Step2Locations';
import Step3PhotosConditions from './steps/Step3PhotosConditions';
import Step4AddressTiming from './steps/Step4AddressTiming';
import Step5ContactSubmit from './steps/Step5ContactSubmit';
import { ArrowRightIcon, CheckIcon, PhoneIcon } from '../icons';
import { site } from '@/lib/site';
import { estimateJob } from '@/lib/pricingEngine';
import { getPublishedPrice } from '@/lib/publishedPricing';

function isStepValid(step: number, data: EstimateFormData) {
  switch (step) {
    case 1:
      return data.skipItemList || Object.values(data.itemQuantities).some((q) => q > 0);
    case 2:
      return data.locations.length > 0;
    case 3:
      return data.photos.length >= MIN_PHOTOS;
    case 4:
      return (
        data.address.trim().length > 3 &&
        data.zip.trim().length === 5 &&
        data.dateOption !== '' &&
        (data.dateOption !== 'choose' || data.chosenDate !== '')
      );
    case 5:
      return data.name.trim().length > 1 && data.phone.trim().length >= 7;
    default:
      return true;
  }
}

export default function EstimateWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<EstimateFormData>(initialEstimateData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const cardTopRef = useRef<HTMLDivElement>(null);
  const skipNextScroll = useRef(true);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setData((d) => ({ ...d, referralCode: ref }));
  }, [searchParams]);

  // Each step (and the final success screen) is a different height, so the
  // browser doesn't re-anchor scroll position on its own — going from a
  // tall step to a short one can leave the viewport scrolled past where the
  // card now ends, making it look like the whole wizard disappeared on
  // mobile. Re-anchor to the top of the card on every step change instead.
  // Skips the very first render so landing on the page doesn't fight
  // whatever scroll position got the customer here.
  useEffect(() => {
    if (skipNextScroll.current) {
      skipNextScroll.current = false;
      return;
    }
    cardTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, submitted]);

  function update(patch: Partial<EstimateFormData>) {
    setData((d) => ({ ...d, ...patch }));
  }

  function next() {
    if (!isStepValid(step, data)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    if (!isStepValid(TOTAL_STEPS, data)) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong submitting your estimate. Please call or text us instead.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const estimate = estimateJob({ itemQuantities: data.itemQuantities, accessConditions: data.conditions });
    const hasEstimate = !data.skipItemList;
    const published = hasEstimate ? getPublishedPrice(data.itemQuantities, estimate.truckFillFraction) : null;
    return (
      <div
        ref={cardTopRef}
        className="scroll-mt-24 rounded-3xl border border-ink-900/10 bg-white p-10 text-center shadow-lift dark:border-white/10 dark:bg-ink-800 md:p-14"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Estimate submitted for review.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-300">
          We&apos;ll reach out by {data.contactPreference} with your final quote — usually within
          15–30 minutes during business hours. Need it faster?
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-ink-900/10 bg-ink-50 p-5 text-left text-sm dark:border-white/10 dark:bg-ink-900">
          {hasEstimate && published ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                Starting At
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold tracking-tight">
                ${published.low}
              </p>
              <p className="mt-1 text-ink-500 dark:text-ink-300">
                Typical range: ${published.low} – ${published.high}
              </p>
              <p className="mt-3 text-ink-500 dark:text-ink-300">
                Final price depends on travel, stairs, and disposal — every estimate is
                personally reviewed before it&apos;s final. Fair pricing, fast response, no
                surprises.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                Your Estimate
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                We&apos;ll price it from your photos
              </p>
              <p className="mt-3 text-ink-500 dark:text-ink-300">
                Since you skipped the item list, we&apos;ll personally review your photos and
                description before sending pricing.
              </p>
            </>
          )}
        </div>

        <a href={site.phoneHref} className="btn-primary mt-6">
          <PhoneIcon className="h-4 w-4" />
          Call {site.phone}
        </a>
      </div>
    );
  }

  const valid = isStepValid(step, data);

  return (
    <div
      ref={cardTopRef}
      className="scroll-mt-24 rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift dark:border-white/10 dark:bg-ink-800 sm:p-8 md:p-10"
    >
      <StepIndicator step={step} />

      <div className="mt-8 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {step === 1 && <Step1Items data={data} update={update} />}
            {step === 2 && <Step2Locations data={data} update={update} />}
            {step === 3 && <Step3PhotosConditions data={data} update={update} />}
            {step === 4 && <Step4AddressTiming data={data} update={update} />}
            {step === 5 && <Step5ContactSubmit data={data} update={update} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button type="button" onClick={back} className="btn-outline">
            Back
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button type="button" onClick={next} disabled={!valid} className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40">
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={submitting || !valid} className="btn-primary flex-1 disabled:opacity-60">
            {submitting ? 'Submitting…' : 'Submit For Final Review'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
