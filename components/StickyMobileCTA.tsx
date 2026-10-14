'use client';

import { site } from '@/lib/site';
import { MessageIcon, PhoneIcon } from './icons';

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink-900/10 bg-white/95 backdrop-blur-lg xl:hidden pb-[env(safe-area-inset-bottom)]">
      <a
        href={site.smsHref}
        className="flex items-center justify-center gap-2 bg-yellow-500 py-3.5 text-sm font-extrabold text-ink-900"
      >
        <MessageIcon className="h-5 w-5" />
        Text Photos
      </a>
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-extrabold text-ink-900"
      >
        <PhoneIcon className="h-5 w-5" />
        Call Now
      </a>
    </div>
  );
}
