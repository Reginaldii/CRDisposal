import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        This page got hauled away.
      </h1>
      <p className="mt-4 max-w-md text-ink-500 dark:text-ink-300">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}
