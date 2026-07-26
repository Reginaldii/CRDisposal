export default function TruckIllustration({ fill, active }: { fill: number; active?: boolean }) {
  const bedX = 34;
  const bedWidth = 108;
  const bedTop = 30;
  const bedBottom = 74;
  const bedHeight = bedBottom - bedTop;
  const loadHeight = bedHeight * Math.min(fill, 1);

  return (
    <svg viewBox="0 0 160 90" className="h-16 w-28 sm:h-20 sm:w-32" fill="none">
      {/* dump bed */}
      <path
        d={`M${bedX} ${bedTop} h${bedWidth} v${bedHeight} h-${bedWidth} z`}
        className={active ? 'fill-yellow-500/10' : 'fill-black/[0.03] dark:fill-white/[0.04]'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity={0.5}
      />
      {/* load fill */}
      {fill > 0 && (
        <rect
          x={bedX + 1.5}
          y={bedBottom - loadHeight}
          width={bedWidth - 3}
          height={Math.max(loadHeight - 1.5, 0)}
          className={active ? 'fill-yellow-500' : 'fill-yellow-500/70'}
          rx="2"
        />
      )}
      {/* cab */}
      <path
        d="M8 74V52a4 4 0 0 1 4-4h16l6 10v16z"
        className={active ? 'fill-ink-900 dark:fill-white' : 'fill-black/[0.06] dark:fill-white/[0.08]'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity={0.6}
      />
      {/* wheels */}
      <circle cx="26" cy="78" r="7" className="fill-ink-900 dark:fill-white" opacity={0.7} />
      <circle cx="100" cy="78" r="7" className="fill-ink-900 dark:fill-white" opacity={0.7} />
      <circle cx="126" cy="78" r="7" className="fill-ink-900 dark:fill-white" opacity={0.7} />
      {/* ground line */}
      <line x1="4" y1="85" x2="156" y2="85" stroke="currentColor" strokeWidth="2" opacity={0.15} />
    </svg>
  );
}
