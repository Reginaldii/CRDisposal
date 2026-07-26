import { whyPartner } from '@/lib/partners';
import { ShieldIcon, ClockIcon, MessageIcon, TagIcon, StarIcon, CheckIcon } from '../icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldIcon,
  clock: ClockIcon,
  message: MessageIcon,
  tag: TagIcon,
  star: StarIcon,
  check: CheckIcon,
};

export default function WhyPartner() {
  return (
    <section className="section bg-white dark:bg-ink-900">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Partner With Us</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Your reputation, protected.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {whyPartner.map((item) => {
            const Icon = iconMap[item.icon] ?? CheckIcon;
            return (
              <div key={item.label} className="flex flex-col items-center gap-3 text-center">
                <Icon className="h-8 w-8 text-yellow-500" />
                <span className="text-sm font-semibold leading-snug">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
