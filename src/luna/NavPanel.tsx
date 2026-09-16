import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDemo } from '../demo';
import { useDispatch, useUi } from '../store';
import { Button, Chip, Field, Icon, VoiceIndicator } from '../ui';
import { navGroups } from './nav';

const ID = 'L-03';

// The orb is a live call-handling widget, not the command bar. 02-ia.md is
// explicit that they stay separate.
function Orb() {
  return (
    <button
      type="button"
      data-id={`${ID}/orb`}
      className="flex h-btnMd w-btnMd shrink-0 items-center justify-center rounded-circle bg-primary text-textOnPrimary"
      title="Calls"
    >
      <Icon name="forum" size={18} />
    </button>
  );
}

function ActionCardPanel() {
  const { actionCard } = useUi();
  const dispatch = useDispatch();
  const engine = useDemo();
  if (!actionCard) return null;

  return (
    <div data-id={`${ID}/action-card`} className="flex flex-col gap-md p-lg">
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

export function NavPanel() {
  const navigate = useNavigate();
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

  return (
    <div className="flex h-full w-navPanel shrink-0 flex-col border-r border-border bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {actionCard ? (
          <ActionCardPanel />
        ) : (
          <div className="flex flex-col gap-lg p-lg">
            {navGroups.map(({ group, items }) => (
              <div key={group}>
                <p className="mb-sm text-meta text-textMuted">{group}</p>
                <div className="flex flex-wrap gap-sm">
                  {items.map((item) => (
                    <Chip
                      key={item.id}
                      data-id={`${ID}/nav-${item.id}`}
                      selected={Boolean(item.to && location.pathname.endsWith(item.to))}
                      onClick={item.to ? () => navigate(item.to!) : undefined}
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border p-lg">
        <div className="flex items-end gap-sm">
          <span className="min-w-0 flex-1">
            <Field
              data-id={`${ID}/command-input`}
              label="What do you need?"
              value={command}
              placeholder="Assign the AC job to Rahul"
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit('type', command)}
              trailing={
                <button
                  type="button"
                  data-id={`${ID}/command-mic`}
                  onClick={() => {
                    dispatch({ kind: 'setVoiceState', state: 'listening' });
                    submit('voice', command || 'assign');
                  }}
                  className="text-textMuted"
                >
                  <Icon name="mic" size={20} />
                </button>
              }
            />
          </span>
          <Orb />
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
