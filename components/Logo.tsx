import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="CR Disposal home">
      <Image
        src="/images/logo.png"
        alt="CR Disposal"
        width={44}
        height={44}
        priority
        className="h-9 w-9 md:h-10 md:w-10 object-contain"
      />
      <span className="font-display text-lg md:text-xl font-extrabold tracking-tight leading-none">
        CR <span className="text-yellow-500">DISPOSAL</span>
      </span>
    </Link>
  );
}
