'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { primaryNav, site } from '@/lib/site';
import { MenuIcon, CloseIcon, PhoneIcon, ArrowRightIcon } from './icons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-soft dark:bg-ink-900/85'
          : 'bg-white/0 dark:bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <Logo />

        <nav className="hidden xl:flex items-center gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13.5px] font-medium tracking-tight transition-colors hover:text-yellow-600 dark:hover:text-yellow-400 ${
                pathname === item.href ? 'text-yellow-600 dark:text-yellow-400' : 'text-ink-700 dark:text-ink-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white"
          >
            <PhoneIcon className="h-4 w-4 text-yellow-500" />
            {site.phone}
          </a>
          <Link href="/quote" className="btn-primary">
            Get a Quote
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="xl:hidden flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 dark:border-white/15"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="xl:hidden overflow-hidden border-t border-ink-900/10 bg-white dark:bg-ink-900 dark:border-white/10"
          >
            <div className="container-x flex flex-col gap-1 py-5">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-800"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href={site.phoneHref} className="btn-dark w-full">
                  <PhoneIcon className="h-4 w-4" />
                  Call {site.phone}
                </a>
                <Link href="/quote" className="btn-primary w-full">
                  Get a Quote
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
