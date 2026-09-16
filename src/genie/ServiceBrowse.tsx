import { useState } from 'react';
import { formatPrice, genieCopy, moods } from '../data/seed';
import { useAppState } from '../store';
import { Card, Chip, Icon } from '../ui';

const ID = 'G-07';

// Node 534:11085's chip row filters by mood (Relaxation/Pain relief/Detox/
// Facials) — that is the content 03-screens.md calls "mood/interest grouping"
// even though its own id list shorthands the row as `chip-{category}`. No
// photography anywhere else in this app, so the hero banner and card
// thumbnails are icons, not the Figma stock photo. The "Help me choose" AI
// button isn't built — nothing in the spec or engine describes what it would
// do, and an inert AI button reads worse than not having one.
export function ServiceBrowse() {
  const { services } = useAppState();
  const [activeMood, setActiveMood] = useState<(typeof moods)[number]>(moods[0]);

  const shown = services.filter((s) => s.mood === activeMood);

  return (
    <div className="flex h-full flex-col gap-lg overflow-y-auto p-xl">
      <p className="text-title">{genieCopy.catalogueTitle}</p>

      <div>
        <p className="text-bodyLg">{genieCopy.catalogueHeadline}</p>
        <p className="mt-xs text-body text-textMuted">{genieCopy.catalogueSubhead}</p>
      </div>

      <div>
        <p className="text-meta text-textMuted">{genieCopy.moodPrompt}</p>
        <div className="mt-md flex flex-wrap gap-sm">
          {moods.map((mood) => (
            <Chip
              key={mood}
              data-id={`${ID}/chip-${mood.toLowerCase().replace(/\s+/g, '-')}`}
              selected={mood === activeMood}
              onClick={() => setActiveMood(mood)}
            >
              {mood}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-lg">
        {shown.map((s) => (
          <Card key={s.id} data-id={`${ID}/card-${s.id}`} className="w-experienceCard p-lg">
            <span className="flex h-avatarLg w-avatarLg items-center justify-center rounded-circle bg-primaryFill text-primary">
              <Icon name="spa" size={22} />
            </span>
            <p className="mt-md text-bodyMed">{s.name}</p>
            <p className="mt-xs text-meta text-textMuted">{s.description}</p>
            <p className="mt-md text-body">
              <span className="text-textMuted">{genieCopy.priceFromLabel}</span>{' '}
              <span className="text-bodyMed">{formatPrice(s.priceFrom)}</span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
