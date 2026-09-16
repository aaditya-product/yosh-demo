import { useEffect, useState } from 'react';
import { TAGS, tagColor, useDispatch, type Request } from '../store';
import { Icon } from '../ui';

const ID = 'L-02';

// The live build's Select tags sheet: bottom-anchored card, 24px top corners,
// outlined pill rows with a coloured dot, a filled check on applied tags, and
// Cancel / Save side by side.
export function TagSheet({
  request,
  open,
  onClose,
}: {
  request: Request;
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState<string[]>(request.tags);

  useEffect(() => {
    if (open) setDraft(request.tags);
  }, [open, request.tags]);

  const toggle = (id: string, system: boolean) => {
    if (system) return;
    setDraft((d) => (d.includes(id) ? d.filter((t) => t !== id) : [...d, id]));
  };

  return (
    <>
      <div
        data-id={`${ID}/tag-scrim`}
        onClick={onClose}
        className={`absolute inset-0 z-sheet bg-scrim transition-opacity duration-overlay ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        data-id={`${ID}/tag-sheet`}
        className={`absolute inset-x-0 bottom-0 z-sheet rounded-t-modal bg-surface p-xl transition-transform duration-sheet ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <p className="text-tagTitle">Select tags</p>

        <div className="mt-lg flex flex-col gap-lg">
          {TAGS.map((tag) => {
            const on = draft.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                data-id={`${ID}/tag-${tag.id}`}
                onClick={() => toggle(tag.id, tag.system)}
                className="flex h-tagRow items-center gap-md rounded-pill border border-borderMuted px-lg"
              >
                <span className={`h-dot w-dot shrink-0 rounded-circle ${tagColor[tag.id]}`} />
                <span className={`text-body ${tag.system ? 'text-textMuted' : 'text-text'}`}>
                  {tag.label}
                </span>
                {on && (
                  <span className="ml-auto flex h-tagCheck w-tagCheck items-center justify-center rounded-circle bg-ink text-textOnPrimary">
                    <Icon name="check" size={16} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-xl flex gap-lg">
          <button
            type="button"
            data-id={`${ID}/tag-cancel`}
            onClick={onClose}
            className="h-modalBtn flex-1 rounded-pill border border-cancelBorder text-body text-text"
          >
            Cancel
          </button>
          <button
            type="button"
            data-id={`${ID}/tag-save`}
            onClick={() => {
              dispatch({ kind: 'setTags', id: request.id, tags: draft });
              onClose();
            }}
            className="h-modalBtn flex-1 rounded-pill bg-ink text-body text-textOnPrimary"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
