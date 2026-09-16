import type { Beat } from './types';

// Beats are wired per phase: b2 at task 1.5, b1 at 2.6, b4 at 3.3,
// b5 at 4.3, b6 at 4.4. The engine runs whatever is registered here.
export const beats: Beat[] = [];
