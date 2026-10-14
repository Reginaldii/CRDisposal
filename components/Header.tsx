'use client';

import Logo from './Logo';
import { site } from '@/lib/site';
import { MessageIcon, PhoneIcon } from './icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-900/10 bg-white/95 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-ink-50 sm:flex"
          >
            <PhoneIcon className="h-4 w-4 text-yellow-500" />
            {site.phone}
          </a>
          <a href={site.smsHref} className="btn-primary px-4 py-2.5 md:px-6">
            <MessageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Text Photos</span>
            <span className="sm:hidden">Text</span>
          </a>
        </div>
      </div>
    </header>
  );
}
