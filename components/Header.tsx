'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { primaryNav, site } from '@/lib/site';
import { MenuIcon, CloseIcon, PhoneIcon, MessageIcon, StarIcon } from './icons';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('/#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Anchor-based scrollspy only makes sense on the homepage — on other
    // pages (e.g. /partners), just highlight whichever nav item matches
    // the current path instead.
    if (pathname !== '/') {
      setActive(pathname);
      return;
    }

    const sections = primaryNav
      .filter((item) => item.href.startsWith('/#'))
      .map((item) => document.querySelector(item.href.replace('/#', '#')))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(`/#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

        <nav className="hidden xl:flex items-center gap-6">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13.5px] font-medium tracking-tight transition-colors hover:text-yellow-600 dark:hover:text-yellow-400 ${
                active === item.href ? 'text-yellow-600 dark:text-yellow-400' : 'text-ink-700 dark:text-ink-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            {site.rating} <span className="text-ink-400 font-normal">({site.reviewCount}+)</span>
          </div>
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
            <PhoneIcon className="h-4 w-4 text-yellow-500" />
            {site.phone}
          </a>
          <Link href="/#estimate" className="btn-primary">
            Get Free Estimate
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
                  onClick={() => setOpen(false)}
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
                <a href={site.smsHref} className="btn-outline w-full">
                  <MessageIcon className="h-4 w-4" />
                  Text Photos
                </a>
                <Link href="/#estimate" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
