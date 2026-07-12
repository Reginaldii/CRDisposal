import { TruckIcon } from './icons';

const variants = {
  dark: 'bg-[radial-gradient(circle_at_30%_20%,#2B2B2F,#0A0A0B_70%)]',
  yellow: 'bg-[radial-gradient(circle_at_70%_30%,#F5B400,#AD7B00_75%)]',
  slate: 'bg-[radial-gradient(circle_at_50%_0%,#1E1E21,#0A0A0B_80%)]',
};

export default function PhotoPlaceholder({
  label,
  variant = 'dark',
  className = '',
  ratio = 'aspect-[4/3]',
}: {
  label: string;
  variant?: keyof typeof variants;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${ratio} ${variants[variant]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
        <TruckIcon className="h-8 w-8" />
        <span className="max-w-[70%] text-center text-xs font-medium uppercase tracking-[0.15em] text-white/50">
          {label}
        </span>
      </div>
    </div>
  );
}
