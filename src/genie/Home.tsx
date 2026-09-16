import { timeOfDayGreeting } from '../data/time';
import { formatPrice, genieHomeHero, genieQuickActions } from '../data/seed';
import { useGo } from '../productRoot';
import { useAppState } from '../store';
import { Icon } from '../ui';

const ID = 'G-02';
const RESIDENT = 'aisha';

// Rebuilt at R.2 per docs/09-genie-reference.md: Genie is photography-led
// (full-bleed header, circular photo tiles, dark photo cards with copy
// overlaid), not the white-card/icon-avatar treatment built at 2.1 on tokens
// seeded from Luna. Structure and copy are unchanged from 2.1's own resolved
// content decisions — greeting/weather/quick-tiles/experience-cards only, no
// promo tiles or event video section (03-screens.md's G-02 line doesn't call
// for them, and the user confirmed dropping them was correct). What changed
// is that every value now comes from the `genie` namespace in tokens.ts and
// every image is real, pulled from Figma — see src/data/seed.ts.
export function Home() {
  const go = useGo();
  const { residents, services, weather } = useAppState();
  const resident = residents.find((r) => r.id === RESIDENT);
  const firstName = resident?.name.split(' ')[0] ?? '';
  const featured = services.slice(0, 3);

  return (
    <div className="flex h-full flex-col gap-genieCardGap overflow-y-auto pb-xl">
      {/* Full-bleed, edge to edge — docs/09-genie-reference.md. Everything
          below it is inset by genieContentX so it clears the rail, which
          floats over content rather than pushing it (R.1); this band doesn't
          need to, since it has no content as far left as the rail reaches. */}
      <div
        data-id={`${ID}/hero`}
        className="relative flex shrink-0 items-start justify-between overflow-hidden rounded-b-panel bg-cover bg-center p-xl"
        style={{ backgroundImage: `url(${genieHomeHero})`, minHeight: 220 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-genieOverlayTop to-genieOverlayBottom" />
        <div className="relative">
          <p className="text-genieBody text-textOnPrimary opacity-80">{timeOfDayGreeting()},</p>
          <p className="mt-xs text-title text-textOnPrimary">{firstName}</p>
        </div>
        <span
          data-id={`${ID}/weather`}
          className="relative flex items-center gap-md rounded-pill bg-scrim px-lg py-md text-textOnPrimary"
        >
          <Icon name="sunny" size={22} />
          <span>
            <span className="block text-bodyMed">{weather.tempC}°C</span>
            <span className="block text-meta opacity-80">{weather.condition}</span>
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-genieCardGap pl-genieContentX pr-xl">
        <div className="flex flex-wrap gap-genieTileRowGap">
          {genieQuickActions.map((action, i) => (
            <button
              key={action.id}
              type="button"
              data-id={`${ID}/quick-${i}`}
              onClick={'to' in action && action.to ? () => go(action.to!) : undefined}
              className="flex w-quickTile flex-col items-center gap-sm text-center"
            >
              {'photo' in action && action.photo ? (
                <span className="block h-quickTile w-quickTile overflow-hidden rounded-circle">
                  <img src={action.photo} alt="" className="h-full w-full object-cover" />
                </span>
              ) : (
                <span className="flex h-quickTile w-quickTile items-center justify-center rounded-circle bg-primaryFill text-primary">
                  <Icon name="build" size={26} />
                </span>
              )}
              <span className="break-words text-genieTileLabel uppercase tracking-genieTileLabel text-genieTextPrimary85">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-genieCard bg-surface p-xl shadow-genieCard">
          <p className="text-center font-serif italic text-genieSerifAccent text-genieAccentTeal">
            Experiences for you
          </p>
          <p className="text-center text-genieBody lowercase text-genieAccentTeal">curated with care</p>
          <div className="mt-lg flex gap-genieCardGap overflow-x-auto pb-xs">
            {featured.map((s) => (
              <div
                key={s.id}
                data-id={`${ID}/experience-${s.id}`}
                onClick={() => go('/services')}
                className="relative h-experienceCard w-experienceCard shrink-0 cursor-pointer overflow-hidden rounded-genieCard"
              >
                {s.photo && <img src={s.photo} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-b from-genieOverlayTop to-genieOverlayBottom" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-xs px-lg text-center text-textOnPrimary">
                  <p className="text-bodyMed">{s.name}</p>
                  <p className="text-meta text-genieTextPrimary85">{s.description}</p>
                </div>
                <p className="absolute inset-x-0 bottom-0 bg-genieOverlayBottom py-sm text-center text-genieCaption uppercase tracking-genieCaption text-textOnPrimary">
                  {s.mood} · From {formatPrice(s.priceFrom)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
