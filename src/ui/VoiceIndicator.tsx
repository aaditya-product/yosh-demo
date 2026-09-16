import type { VoiceState } from '../store';

// Never a waveform. A soft ring reads as premium.
export function VoiceIndicator({ state, ...rest }: { state: VoiceState; 'data-id': string }) {
  return (
    <span className="relative inline-flex h-btnLg w-btnLg items-center justify-center" {...rest}>
      {state === 'listening' ? (
        <span className="absolute inset-0 animate-pulseRing rounded-circle border-ring border-primary" />
      ) : state === 'parsing' ? (
        <span className="absolute inset-0 animate-sweep rounded-circle border-ring border-primaryBorder border-t-primary" />
      ) : (
        <span className="absolute inset-0 rounded-circle border-ring border-primaryBorder" />
      )}
      <span className="h-avatarSm w-avatarSm rounded-circle bg-primaryFill" />
    </span>
  );
}
