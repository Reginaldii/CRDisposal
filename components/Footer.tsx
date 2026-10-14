import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-white text-ink-600">
      <div className="container-x flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CR Disposal LLC · {site.serviceArea}</p>
        <div className="flex gap-5">
          <a href={site.phoneHref} className="font-bold text-ink-900">{site.phone}</a>
          <Link href="/privacy" className="hover:text-ink-900">Privacy</Link>
          <Link href="/terms" className="hover:text-ink-900">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
