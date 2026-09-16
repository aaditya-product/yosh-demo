import { useState } from 'react';
import {
  formatPrice,
  genieCopy,
  genieServiceHero,
  genieServiceTreatmentPhoto,
  moods,
} from '../data/seed';
import { useAppState } from '../store';
import { genie } from '../tokens';

const ID = 'G-07';

// Rebuilt at R.2's checklist pass. The 2.2 build had no hero at all — 09-
// genie-reference.md's "Service browse — the shared pattern" calls for a
// photographic hero with centred serif type, category cards overlapping its
// lower edge, then the mood chips, then treatment cards with photos. All
// three photos here are real, pulled via download_assets from this screen's
// own node (534:11085), not reused from Home. "Help me choose" stays dropped
// — that decision was about the button having no defined behaviour, not
// about tokens, and the checklist doesn't reopen it.
//
// No filter icon before the mood chips yet (09 calls for one) — flagged, not
// built, to keep this pass to what the checklist actually named.
export function ServiceBrowse() {
  const { services } = useAppState();
  const [activeMood, setActiveMood] = useState<(typeof moods)[number]>(moods[0]);
  const shown = services.filter((s) => s.mood === activeMood);
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-genieCardGap">
      <p className="shrink-0 py-genieCardGap pr-genieCardGap text-geniePageTitle text-genieInk">
        {genieCopy.catalogueTitle}
      </p>

      <div style={{ marginBottom: genie.space.heroOverlap }} className="relative shrink-0">
        <div
          data-id={`${ID}/hero`}
          className="relative flex flex-col items-center justify-center gap-xs overflow-hidden bg-cover bg-center px-genieCardGap text-center"
          style={{ backgroundImage: `url(${genieServiceHero})`, height: genie.size.heroHeight }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-genieOverlayTop to-genieOverlayBottom" />
          <p className="relative text-genieHeroTitle text-textOnPrimary">{genieCopy.catalogueHeadline}</p>
          <p className="relative text-genieBody text-textOnPrimary opacity-80">{genieCopy.catalogueSubhead}</p>
        </div>

        <div className="absolute inset-x-0 flex gap-genieChipGap overflow-x-auto px-genieCardGap" style={{ bottom: -genie.size.heroCategoryH / 2 }}>
          {categories.map((cat) => (
            <div
              key={cat}
              data-id={`${ID}/category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative flex shrink-0 items-center overflow-hidden rounded-genieHeroCategory bg-cover bg-center px-lg"
              style={{
                backgroundImage: `url(${genieServiceTreatmentPhoto})`,
                width: genie.size.heroCategoryW,
                height: genie.size.heroCategoryH,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-genieOverlayTop to-genieOverlayBottom" />
              <p className="relative text-genieBodyMed text-textOnPrimary">{cat}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-genieCardGap pr-genieCardGap">
        <div>
          <p className="text-genieMeta text-genieSecondaryText">{genieCopy.moodPrompt}</p>
          <div className="mt-genieChipGap flex flex-wrap gap-genieChipGap">
            {moods.map((mood) => {
              const selected = mood === activeMood;
              return (
                <button
                  key={mood}
                  type="button"
                  data-id={`${ID}/chip-${mood.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveMood(mood)}
                  style={{ height: genie.size.chip }}
                  className={`rounded-pill px-genieChipPadX py-genieChipPadY text-genieBody ${
                    selected
                      ? 'border-genieChipSelected border-genieDeepTeal text-genieDeepTealText'
                      : 'border-hair border-genieChipBorder text-genieTextPrimary90'
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-genieCardGap">
          {shown.map((s) => (
            <div
              key={s.id}
              data-id={`${ID}/card-${s.id}`}
              className="flex items-center justify-between gap-genieCardGap rounded-genieCard bg-genieCardBg p-genieCardPad shadow-genieCard"
            >
              <div>
                <p className="text-genieItemTitle text-genieTextPrimary90">{s.name}</p>
                <p className="mt-genieChipGap">
                  <span className="text-genieMeta text-genieSecondaryText">{genieCopy.priceFromLabel}</span>{' '}
                  <span className="text-genieItemTitle text-genieTextPrimary90">{formatPrice(s.priceFrom)}</span>
                </p>
              </div>
              <div
                className="shrink-0 overflow-hidden rounded-genieItemPhoto bg-cover bg-center"
                style={{
                  backgroundImage: `url(${genieServiceTreatmentPhoto})`,
                  width: genie.size.itemPhotoW,
                  height: genie.size.itemPhotoH,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
