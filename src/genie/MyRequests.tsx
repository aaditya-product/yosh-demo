import { relativeTime } from '../data/time';
import { useGo } from '../productRoot';
import { useAppState } from '../store';
import { Icon, residentStatusLabel } from '../ui';
import { typeIcon } from '../luna/typeIcon';

const ID = 'G-05';
const RESIDENT = 'aisha';

// Genie has no status vocabulary of its own — no request-status UI appears
// anywhere in the six sampled reference frames — so the labels are Luna's
// single source of truth (residentStatusLabel), reused as content, not as a
// styled component. The pill styling below is Genie's own (checklist item 1):
// a two-tone simplification (muted vs active) rather than inventing a third
// colour Genie has never shown, plus `urgent` for escalated, which is flagged
// as invented in tokens.ts since no sampled frame has that state either.
const ACTIVE = new Set(['assigned', 'in_progress']);

// Rebuilt at R.2's checklist pass. No Figma node exists for this screen (03-
// screens.md marks it Layer C, spec-only) — its own line there ("matches
// Luna's card rhythm... on Genie's lighter surface") is superseded by the
// definition-of-done checklist now: no Luna tokens on a Genie screen, ever,
// including that card rhythm. Structure (title, list, card contents) is
// unchanged; every value below comes from the `genie` namespace instead.
export function MyRequests() {
  const { requests } = useAppState();
  const go = useGo();
  const mine = requests.filter((r) => r.requester === RESIDENT);

  return (
    <div className="flex h-full flex-col gap-genieCardGap py-genieCardGap pr-genieCardGap">
      <p className="text-geniePageTitle text-genieInk">My requests</p>

      <div data-id={`${ID}/list`} className="flex min-h-0 flex-1 flex-col gap-genieCardGap overflow-y-auto pb-genieCardGap">
        {mine.map((r) => {
          const status = r.priority === 'escalated' ? 'escalated' : r.status;
          const active = ACTIVE.has(status);
          return (
            <div
              key={r.id}
              data-id={`${ID}/card-${r.id}`}
              onClick={() => go(`requests/${r.id}`)}
              className="cursor-pointer rounded-genieCard bg-genieCardBg p-genieCardPad shadow-genieCard"
            >
              <div className="flex items-center gap-genieChipGap">
                <span className="flex h-genieListAvatar w-genieListAvatar shrink-0 items-center justify-center rounded-circle bg-genieDeepTealFill text-genieDeepTeal">
                  <Icon name={typeIcon[r.type]} size={20} />
                </span>
                <span className="min-w-0 flex-1 truncate text-genieItemTitle text-genieTextPrimary90">
                  {r.title}
                </span>
                <span
                  data-id={`${ID}/card-${r.id}/status`}
                  className={`shrink-0 text-genieMeta ${
                    status === 'escalated' ? 'text-genieUrgent' : active ? 'text-genieDeepTeal' : 'text-genieSecondaryText'
                  }`}
                >
                  {residentStatusLabel(status)}
                </span>
              </div>

              <hr className="my-genieChipGap border-0 border-t border-genieCardBorder" />

              <div className="flex items-center gap-genieChipGap">
                <span className="min-w-0 flex-1 text-genieMeta text-genieSecondaryText">
                  {r.items.length > 0 ? r.items.map((i) => `${i.label} ×${i.qty}`).join(' · ') : r.ref}
                </span>
                <span className="text-genieMeta text-genieSecondaryText">{relativeTime(r.createdAt)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
