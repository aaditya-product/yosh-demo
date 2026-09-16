import { timeOfDayGreeting } from '../data/time';
import { formatPrice } from '../data/seed';
import { useGo } from '../productRoot';
import { useAppState } from '../store';
import { Card, Chip, Icon, type IconName } from '../ui';

const ID = 'G-02';
const RESIDENT = 'aisha';

// Genie's own quick actions, not Figma's hotel row (Order Food / Spa / Taxi /
// Kayaking / Store) — same reasoning as the rail: this is a residential
// estate. Each ties to a Section A beat; inert until that beat's screen
// exists, same as an unbuilt rail item. "Book a treatment" lights up now that
// G-07 exists (2.2).
const quickActions: { label: string; icon: IconName; to?: string }[] = [
  { label: 'Housekeeping', icon: 'cleaning' },
  { label: 'Order coffee', icon: 'coffee' },
  { label: 'Book a treatment', icon: 'spa', to: '/services' },
  { label: 'Report an issue', icon: 'build' },
  { label: 'Plan a gathering', icon: 'celebration' },
];

export function Home() {
  const go = useGo();
  const { residents, services, weather } = useAppState();
  const resident = residents.find((r) => r.id === RESIDENT);
  const firstName = resident?.name.split(' ')[0] ?? '';
  const featured = services.slice(0, 3);

  return (
    <div className="flex h-full flex-col gap-xl overflow-y-auto p-xl">
      <div className="flex items-center justify-between rounded-panel bg-gradient-to-br from-primary to-ink p-xl text-textOnPrimary">
        <div>
          <p className="text-body opacity-80">{timeOfDayGreeting()},</p>
          <p className="mt-xs text-panelTitle">{firstName}</p>
        </div>
        <span
          data-id={`${ID}/weather`}
          className="flex items-center gap-md rounded-pill bg-textOnPrimary bg-opacity-10 px-lg py-md"
        >
          <Icon name="sunny" size={22} />
          <span>
            <span className="block text-bodyMed">{weather.tempC}°C</span>
            <span className="block text-meta opacity-80">{weather.condition}</span>
          </span>
        </span>
      </div>

      <div className="flex flex-wrap gap-xl">
        {quickActions.map((action, i) => (
          <button
            key={action.label}
            type="button"
            data-id={`${ID}/quick-${i}`}
            onClick={action.to ? () => go(action.to!) : undefined}
            className="flex w-quickTile flex-col items-center gap-sm text-center"
          >
            <span className="flex h-quickTile w-quickTile items-center justify-center rounded-circle bg-primaryFill text-primary">
              <Icon name={action.icon} size={26} />
            </span>
            <span className="text-meta text-textMuted">{action.label}</span>
          </button>
        ))}
      </div>

      <div>
        <p className="text-title">Experiences for you</p>
        <div className="mt-md flex flex-wrap gap-lg">
          {featured.map((s) => (
            <Card
              key={s.id}
              data-id={`${ID}/experience-${s.id}`}
              className="w-experienceCard p-lg"
              onClick={() => go('/services')}
            >
              <span className="flex h-avatarLg w-avatarLg items-center justify-center rounded-circle bg-primaryFill text-primary">
                <Icon name="spa" size={22} />
              </span>
              <p className="mt-md text-bodyMed">{s.name}</p>
              <p className="mt-xs text-meta text-textMuted">{s.description}</p>
              <div className="mt-md flex items-center justify-between">
                <Chip data-id={`${ID}/experience-${s.id}/mood`}>{s.mood}</Chip>
                <span className="text-meta text-textMuted">
                  From {formatPrice(s.priceFrom)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
