'use client';

import Link from 'next/link';
import { site } from '@/lib/site';
import { PhoneIcon, ArrowRightIcon } from './icons';

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex xl:hidden border-t border-ink-900/10 bg-white/95 backdrop-blur-lg dark:bg-ink-900/95 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold text-ink-900 dark:text-white"
      >
        <PhoneIcon className="h-4 w-4" />
        Call Now
      </a>
      <Link
        href="/quote"
        className="flex flex-1 items-center justify-center gap-2 bg-yellow-500 py-4 text-sm font-bold text-ink-900"
      >
        Get a Quote
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
