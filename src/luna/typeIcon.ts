import type { IconName } from '../ui';
import type { RequestType } from '../store';

export const typeIcon: Record<RequestType, IconName> = {
  service: 'roomService',
  maintenance: 'build',
  asset: 'inventory',
  access: 'badge',
  concierge: 'concierge',
  gathering: 'celebration',
};
