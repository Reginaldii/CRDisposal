'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EstimateFormData, initialEstimateData, TOTAL_STEPS } from './types';
import StepIndicator from './StepIndicator';
import Step1Contact from './steps/Step1Contact';
import Step2Address from './steps/Step2Address';
import Step3Photos from './steps/Step3Photos';
import Step4Items from './steps/Step4Items';
import Step5Conditions from './steps/Step5Conditions';
import Step6TruckFill from './steps/Step6TruckFill';
import Step7Date from './steps/Step7Date';
import Step8Notes from './steps/Step8Notes';
import Step9Review from './steps/Step9Review';
import { ArrowRightIcon, CheckIcon, PhoneIcon } from '../icons';
import { site } from '@/lib/site';

function isStepValid(step: number, data: EstimateFormData) {
  switch (step) {
    case 1:
      return data.name.trim().length > 1 && data.phone.trim().length >= 7;
    case 2:
      return data.address.trim().length > 3 && data.zip.trim().length === 5;
    case 4:
      return data.items.length > 0;
    case 6:
      return data.truckFill !== '';
    case 7:
      return data.dateOption !== '' && (data.dateOption !== 'choose' || data.chosenDate !== '');
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

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setData((d) => ({ ...d, referralCode: ref }));
  }, [searchParams]);

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
    return (
      <div className="rounded-3xl border border-ink-900/10 bg-white p-10 text-center shadow-lift dark:border-white/10 dark:bg-ink-800 md:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Estimate request received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-300">
          We&apos;ll reach out by {data.contactPreference} shortly, usually within the hour. Need it faster?
        </p>
        <a href={site.phoneHref} className="btn-primary mt-6">
          <PhoneIcon className="h-4 w-4" />
          Call {site.phone}
        </a>
      </div>
    );
  }

  const valid = isStepValid(step, data);

  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift dark:border-white/10 dark:bg-ink-800 sm:p-8 md:p-10">
      <StepIndicator step={step} />

      <div className="mt-8 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {step === 1 && <Step1Contact data={data} update={update} />}
            {step === 2 && <Step2Address data={data} update={update} />}
            {step === 3 && <Step3Photos data={data} update={update} />}
            {step === 4 && <Step4Items data={data} update={update} />}
            {step === 5 && <Step5Conditions data={data} update={update} />}
            {step === 6 && <Step6TruckFill data={data} update={update} />}
            {step === 7 && <Step7Date data={data} update={update} />}
            {step === 8 && <Step8Notes data={data} update={update} />}
            {step === 9 && <Step9Review data={data} />}
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
          <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-primary flex-1 disabled:opacity-60">
            {submitting ? 'Submitting…' : 'Get My Free Estimate'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
