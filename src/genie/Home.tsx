import { useAppState } from '../store';
import { genie } from '../tokens';
import { Icon } from '../ui';

const ID = 'G-02';
const RESIDENT = 'aisha';

const TILES = [
  { id: 'housekeeping', title: 'Housekeeping', sub: 'Services' },
  { id: 'maintenance', title: 'Maintenance', sub: 'Services' },
  { id: 'event-planning', title: 'Event', sub: 'Planning' },
  { id: 'chauffeur', title: 'Chauffeur', sub: 'Request' },
] as const;

// Rebuilt at 2.1 per the corrected docs/09-genie-reference.md: this Home has
// no rail, no photo hero, no greeting — all three were carried over from the
// Casa Cook recording and don't hold up against the real Yosh reference
// (home-orders-banner.png / home-room-controls.png). Real chrome only:
// weather widget, Room/Property card, an inert `Open Controls` stub (Room
// Controls itself is explicitly out of scope, see 09-genie-reference.md),
// the tile row, a status-banner shell (pill/detail/chat content arrives at
// 2.5), and an ambient chat orb bottom-left. Every value below is from the
// `genie` namespace — see tokens.ts for sourcing (screenshot-estimated,
// get_design_context on 158:3930 wouldn't resolve this session).
export function Home() {
  const { residents, properties, weather } = useAppState();
  const resident = residents.find((r) => r.id === RESIDENT);
  const property = properties.find((p) => p.id === resident?.propertyId);
  // "Your Room" from the reference has no equivalent here — residents hold a
  // whole property, not a numbered room in someone else's building (see
  // 03-screens.md G-11's own precedent of dropping "Dates of stay" for the
  // same reason). One stacked fact instead of two: the property's own number,
  // parsed out of its name ("Villa 12" -> "12"), labelled "Your Property".
  const propertyNumber = property?.name.match(/\d+/)?.[0] ?? '—';

  return (
    <div className="flex h-full gap-genieHomeStackGap bg-page p-xl">
      <div className="flex w-genieHomeStackW shrink-0 flex-col gap-genieHomeStackGap">
        <div
          data-id={`${ID}/weather`}
          className="rounded-genieHomeCard bg-page p-lg text-center"
        >
          <Icon name="sunny" size={genie.size.weatherIcon} className="mx-auto text-genieAccentTeal" />
          <p className="mt-sm text-genieHomeStat text-genieInk">{weather.tempC}°C</p>
          <p className="text-body text-genieSecondaryText">{weather.tempLowC}°C</p>
        </div>

        <div
          data-id={`${ID}/property-card`}
          className="rounded-genieHomeCard bg-surface p-lg text-center"
        >
          <p className="text-genieHomeStat text-genieInk">{propertyNumber}</p>
          <p className="text-body text-genieSecondaryText">Your Property</p>
        </div>

        <button
          type="button"
          data-id={`${ID}/open-controls`}
          className="rounded-genieHomeCard bg-page p-lg text-center text-bodyMed text-genieTextPrimary90"
        >
          Open
          <br />
          Controls
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-genieHomeStackGap">
        {/* Status banner shell only — pill/detail/Chat with X content is 2.5 */}
        <div
          data-id={`${ID}/status-banner`}
          className="flex shrink-0 items-center gap-genieChipGap rounded-genieHomeCard bg-surface p-lg shadow-genieCard"
        >
          <p className="text-genieHomeTileTitle text-genieInk">
            Your
            <br />
            <span className="text-genieHomeTileSub">Orders</span>
          </p>
          <button
            type="button"
            data-id={`${ID}/status-banner/arrow`}
            className="flex shrink-0 items-center justify-center rounded-circle bg-genieSage text-genieInk"
            style={{ width: genie.size.arrowBtn, height: genie.size.arrowBtn }}
          >
            <Icon name="arrowForward" size={20} />
          </button>
        </div>

        <div
          data-id={`${ID}/tiles`}
          className="grid grid-cols-2 content-start gap-genieHomeGridGap"
        >
          {TILES.map((tile) => (
            <div
              key={tile.id}
              data-id={`${ID}/tile-${tile.id}`}
              className="relative rounded-genieHomeCard bg-page p-xl"
              style={{ height: genie.size.homeTileH }}
            >
              <p className="text-genieHomeTileTitle text-genieInk">
                {tile.title}
                <br />
                <span className="text-genieHomeTileSub">{tile.sub}</span>
              </p>
              <button
                type="button"
                data-id={`${ID}/tile-${tile.id}/open`}
                className="absolute bottom-lg right-lg flex items-center justify-center rounded-circle bg-genieSage text-genieInk"
                style={{ width: genie.size.arrowBtn, height: genie.size.arrowBtn }}
              >
                <Icon name="arrowForward" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        data-id={`${ID}/chat-orb`}
        className="fixed bottom-xl left-xl rounded-circle shadow-genieCard"
        style={{
          width: genie.size.chatOrb,
          height: genie.size.chatOrb,
          backgroundImage: genie.color.chatOrbGradient,
        }}
      />
    </div>
  );
}
