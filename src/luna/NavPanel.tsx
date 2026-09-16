import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDemo } from '../demo';
import { useGo } from '../productRoot';
import { useDispatch, useUi } from '../store';
import { navGlass, orbGradient } from '../tokens';
import { Button, Chip, Icon, VoiceIndicator, type IconName } from '../ui';
import { navGroups } from './nav';

const ID = 'L-03';

const icons: Record<string, IconName> = {
  requests: 'description',
  'my-requests': 'listAlt',
  archive: 'inventory',
  registry: 'inventory',
  inventory: 'basket',
  fleet: 'badge',
  inspections: 'checkCircle',
  'action-plans': 'warning',
  'client-center': 'person',
  chat: 'forum',
  'chat-history': 'history',
  feedback: 'forum',
  admin: 'build',
  profile: 'person',
  announcements: 'roomService',
};

function ActionCardPanel() {
  const { actionCard } = useUi();
  const dispatch = useDispatch();
  const engine = useDemo();
  if (!actionCard) return null;

  return (
    <div data-id={`${ID}/action-card`} className="flex flex-col gap-md">
      <span className="text-title">{actionCard.title}</span>
      <div className="flex flex-col items-start gap-sm">
        {actionCard.fields.map((f) => (
          <Chip
            key={f.label}
            data-id={`${ID}/action-field-${f.label}`}
            variant="field"
            lowConfidence={f.confidence === 'low'}
          >
            {f.value}
          </Chip>
        ))}
      </div>
      <div className="mt-md flex items-center gap-sm">
        <Button
          data-id={`${ID}/action-cancel`}
          variant="ghost"
          onClick={() => {
            dispatch({ kind: 'dismissActionCard' });
            dispatch({ kind: 'setVoiceState', state: 'idle' });
          }}
        >
          Cancel
        </Button>
        <Button
          data-id={`${ID}/action-confirm`}
          className="ml-auto"
          onClick={() => {
            engine.confirm(actionCard.id);
            dispatch({ kind: 'dismissActionCard' });
            dispatch({ kind: 'setVoiceState', state: 'idle' });
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

// Bottom-right floating panel with a frosted-glass ground, matching the live
// build: three stacked layers, 20px radius, 1px rgba(0,0,0,.06), and the
// measured drop shadow.
export function NavPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const go = useGo();
  const location = useLocation();
  const engine = useDemo();
  const dispatch = useDispatch();
  const { actionCard, voiceState } = useUi();
  const [command, setCommand] = useState('');

  const submit = (kind: 'type' | 'voice', text: string) => {
    if (!text.trim()) return;
    engine.submitInput(ID, kind, text.trim());
    setCommand('');
  };

  const showing = open || Boolean(actionCard);

  return (
    <div
      data-id={`${ID}/panel`}
      className={`absolute bottom-xl right-xl z-overlay w-navPanel overflow-hidden rounded-nav border border-panelBorder shadow-nav transition-opacity duration-overlay ${
        showing ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ backgroundColor: navGlass.base, backdropFilter: navGlass.backdrop }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: navGlass.gradient, opacity: navGlass.gradientOpacity }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: navGlass.veil }} />

      <button
        type="button"
        data-id={`${ID}/close-nav`}
        onClick={onClose}
        className="absolute right-navX top-navX z-sheet flex h-orb w-orb items-center justify-center rounded-circle bg-surface text-text"
      >
        <Icon name="collapse" size={16} />
      </button>

      <div className="relative px-navX pb-navY pt-navTop">
        {actionCard ? (
          <ActionCardPanel />
        ) : (
          <div className="flex flex-col gap-xl">
            {navGroups.map(({ group, items }, i) => (
              <div key={group}>
                {i > 0 && <hr className="mb-xl border-0 border-t border-navDivider" />}
                <p className="mb-sm text-nav text-navLabel">{group}</p>
                <div className="flex flex-wrap gap-sm">
                  {items.map((item) => {
                    const active = Boolean(item.to && location.pathname.endsWith(item.to));
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-id={`${ID}/nav-${item.id}`}
                        onClick={
                          item.to
                            ? () => {
                                go(item.to!);
                                onClose();
                              }
                            : undefined
                        }
                        className={`flex h-navItem items-center gap-xs rounded-nav pl-xs pr-md text-nav text-primary ${
                          active ? 'bg-navSelected' : 'bg-surface'
                        }`}
                      >
                        <span className="flex h-navIcon w-navIcon items-center justify-center">
                          <Icon name={icons[item.id] ?? 'description'} size={18} />
                        </span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-xl flex items-center gap-md">
          <div className="flex h-commandRow min-w-0 flex-1 items-center gap-md rounded-pill bg-surface px-xl">
            <input
              data-id={`${ID}/command-input`}
              value={command}
              placeholder="What do you need?"
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit('type', command)}
              className="min-w-0 flex-1 bg-transparent text-nav outline-none placeholder:text-textMuted"
            />
            <button
              type="button"
              data-id={`${ID}/command-send`}
              onClick={() => submit('type', command)}
              className="shrink-0 text-textMuted"
            >
              <Icon name="arrowForward" size={14} />
            </button>
          </div>
          <button
            type="button"
            data-id={`${ID}/command-mic`}
            onClick={() => {
              dispatch({ kind: 'setVoiceState', state: 'listening' });
              submit('voice', command || 'assign');
            }}
            className="h-orb w-orb shrink-0 overflow-hidden rounded-circle"
            style={{ backgroundImage: orbGradient, filter: 'blur(0.2px) saturate(1.15)' }}
          />
        </div>

        {(voiceState === 'listening' || voiceState === 'parsing') && (
          <div className="mt-md flex items-center gap-sm">
            <VoiceIndicator state={voiceState} data-id={`${ID}/voice`} />
            <span className="text-meta text-textMuted">
              {voiceState === 'listening' ? 'Listening' : 'Working it out'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
