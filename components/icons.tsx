import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M1 3h13v13H1z" />
      <path d="M14 8h4l4 4v4h-8z" />
      <circle cx="6" cy="18.5" r="1.75" />
      <circle cx="17.5" cy="18.5" r="1.75" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.58z" />
      <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.6 7.5 9 4.5-1.4 7.5-4.5 7.5-9V6z" />
      <path d="m8.5 12 2.3 2.3L15.5 10" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 4h4l1.5 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 1.5v4a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 3 5.6 1.5 1.5 0 0 1 4.5 4z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17.1l-5.9 3.4 1.3-6.6-4.9-4.6 6.6-.7z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.6 7-12a7 7 0 0 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function RecycleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 19H4.8a2 2 0 0 1-1.7-3l1.1-1.9" />
      <path d="m9 4.8 1.7-1.8a2 2 0 0 1 3.3.5l1 2" />
      <path d="M14.5 19.4 17 20l-.6-2.5" />
      <path d="M17 20H8.3" />
      <path d="m5.5 15 2.5-4.3" />
      <path d="M19.5 15.5 17 11.2" />
      <path d="m14 4 3 5.2h-6" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="10" height="18" />
      <rect x="14" y="8" width="6" height="13" />
      <path d="M7 7h1M7 11h1M7 15h1M10 7h1M10 11h1M10 15h1M17 12h1M17 16h1" />
    </svg>
  );
}

export function Building2Icon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="8" height="14" />
      <rect x="13" y="3" width="8" height="18" />
      <path d="M6 11h2M6 15h2M16 7h2M16 11h2M16 15h2" />
    </svg>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  );
}

export function ApplianceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
      <path d="M5 10h14" />
      <path d="M9 6h1M9 14h1" />
    </svg>
  );
}

export function GarageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10 12 4l9 6v10H3z" />
      <path d="M6 20v-7h12v7" />
      <path d="M6 15h12M6 17.5h12" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 20C5 11 11 4 20 4c0 9-7 15-15 16z" />
      <path d="M5 20c2-4 5-7 9-9" />
    </svg>
  );
}

export function HotTubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="9" width="18" height="9" rx="2" />
      <path d="M7 5.5c0 1-1 1-1 2s1 1 1 2M12 5.5c0 1-1 1-1 2s1 1 1 2M17 5.5c0 1-1 1-1 2s1 1 1 2" />
      <path d="M3 13.5h18" />
    </svg>
  );
}

export function ShedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11 12 5l9 6" />
      <path d="M4 11v9h16v-9" />
      <path d="M12 5v6M9 20v-5h6v5" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8 12 4l9 4-9 4-9-4z" />
      <path d="M3 8v9l9 4 9-4V8" />
      <path d="M12 12v9" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="4" />
      <path d="m11 11 9 9M16 16l2.5 2.5M19 13l2.5 2.5" />
    </svg>
  );
}

export function MuscleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 20V10a4 4 0 0 1 4-4c1.5 0 2 1 3 1s1.5-1 3-1a4 4 0 0 1 4 4v2" />
      <path d="M5 20h14M19 12c1.5 0 2 1.2 2 2.5S19.5 18 18 18h-1" />
    </svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16v11H9l-4 4V16H4z" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}
