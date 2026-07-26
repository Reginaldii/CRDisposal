'use client';

import { site } from '@/lib/site';
import { PhoneIcon, MessageIcon, CalendarIcon } from './icons';

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex xl:hidden border-t border-ink-900/10 bg-white/95 backdrop-blur-lg dark:bg-ink-900/95 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
      <a
        href={site.phoneHref}
        className="flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-bold text-ink-900 dark:text-white"
      >
        <PhoneIcon className="h-5 w-5" />
        Call
      </a>
      <a
        href={site.smsHref}
        className="flex flex-1 flex-col items-center gap-0.5 border-x border-ink-900/10 py-3 text-xs font-bold text-ink-900 dark:border-white/10 dark:text-white"
      >
        <MessageIcon className="h-5 w-5" />
        Text
      </a>
      <a
        href="#estimate"
        className="flex flex-1 flex-col items-center gap-0.5 bg-yellow-500 py-3 text-xs font-bold text-ink-900"
      >
        <CalendarIcon className="h-5 w-5" />
        Estimate
      </a>
    </div>
  );
}
