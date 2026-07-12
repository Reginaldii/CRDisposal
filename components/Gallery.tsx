import PhotoPlaceholder from './PhotoPlaceholder';

const items: { label: string; variant: 'dark' | 'yellow' | 'slate'; ratio: string }[] = [
  { label: 'Hooklift Delivery — Driveway Placement', variant: 'dark', ratio: 'aspect-[4/3]' },
  { label: 'Before / After — Full Property Cleanout', variant: 'yellow', ratio: 'aspect-square' },
  { label: 'Roofing Tear-Off Job Site', variant: 'slate', ratio: 'aspect-[4/3]' },
  { label: '30-Yard Fleet Lineup', variant: 'dark', ratio: 'aspect-square' },
  { label: 'Kitchen Remodel Debris Loadout', variant: 'yellow', ratio: 'aspect-[4/3]' },
  { label: 'New Construction Site Service', variant: 'slate', ratio: 'aspect-[4/3]' },
];

export default function Gallery() {
  return (
    <section className="section bg-ink-50 dark:bg-ink-800">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              See the work.
            </h2>
          </div>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item) => (
            <PhotoPlaceholder key={item.label} label={item.label} variant={item.variant} ratio={item.ratio} className="break-inside-avoid" />
          ))}
        </div>
      </div>
    </section>
  );
}
