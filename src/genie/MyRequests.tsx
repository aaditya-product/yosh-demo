import { relativeTime } from '../data/time';
import { useGo } from '../productRoot';
import { useAppState } from '../store';
import { Card, Icon, StatusBadge } from '../ui';
import { typeIcon } from '../luna/typeIcon';

const ID = 'G-05';
const RESIDENT = 'aisha';

export function MyRequests() {
  const { requests } = useAppState();
  const go = useGo();
  const mine = requests.filter((r) => r.requester === RESIDENT);

  return (
    <div className="flex h-full flex-col px-xl py-lg">
      <p className="text-title">My requests</p>

      <div data-id={`${ID}/list`} className="mt-lg flex min-h-0 flex-1 flex-col gap-sm overflow-y-auto">
        {mine.map((r) => (
          <Card
            key={r.id}
            data-id={`${ID}/card-${r.id}`}
            onClick={() => go(`requests/${r.id}`)}
            className="px-lg py-md"
          >
            <div className="flex items-center gap-md">
              <span className="flex h-avatarLg w-avatarLg shrink-0 items-center justify-center rounded-circle bg-primaryFill text-primary">
                <Icon name={typeIcon[r.type]} size={20} />
              </span>
              <span className="min-w-0 flex-1 truncate text-bodyLg">{r.title}</span>
              <StatusBadge
                status={r.priority === 'escalated' ? 'escalated' : r.status}
                audience="resident"
                data-id={`${ID}/card-${r.id}/status`}
              />
            </div>

            <hr className="my-md border-0 border-t border-border" />

            <div className="flex items-center gap-md">
              <span className="min-w-0 flex-1 text-meta text-textMuted">
                {r.items.length > 0
                  ? r.items.map((i) => `${i.label} ×${i.qty}`).join(' · ')
                  : r.ref}
              </span>
              <span className="text-meta text-textMuted">{relativeTime(r.createdAt)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
