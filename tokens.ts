// Single source of truth for both products.
// Luna values below are measured from the live build at luna-dev.crossbo.com.
// Genie values are added here as each Figma frame is pulled — never inline.

export const color = {
  // shared primary — Luna computed, matches Genie's rail icons
  primary:        '#15616D',
  primaryFill:    'rgba(21, 97, 109, 0.10)',
  primaryBorder:  'rgba(21, 97, 109, 0.14)',
  primaryBorderStrong: 'rgba(21, 97, 109, 0.20)',

  // surfaces
  page:           '#F5F7F9',
  surface:        '#FFFFFF',
  surfaceMuted:   '#F2F2F2',
  chipSelected:   '#CADFD4',

  // text
  text:           '#333333',
  textMuted:      '#858585',
  textOnPrimary:  '#FFFFFF',

  // status
  statusLive:     '#26A69A',   // "New" badge
  statusEscalated:'#E5484D',   // measured from the escalation badge — verify
  statusWarning:  'rgba(234, 179, 8, 0.20)',

  // lines
  border:         '#E5E7EB',
  borderMuted:    '#9C9C9C',
} as const;

// Four sizes, three weights. Do not add a fifth size without asking.
export const type = {
  meta:      { size: 12, weight: 400, leading: 15 },
  metaBold:  { size: 12, weight: 600, leading: 16 },
  body:      { size: 14, weight: 400, leading: 20 },
  bodyMed:   { size: 14, weight: 500, leading: 20 },
  bodyLg:    { size: 16, weight: 400, leading: 24 },
  title:     { size: 20, weight: 600, leading: 28 },
} as const;

export const radius = {
  pill: 9999,   // dominant — filters, chips, buttons
  card: 6,
  panel: 8,
  circle: 9999,
} as const;

export const space = {
  xs: 4,
  sm: 8,    // dominant gap
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const frame = {
  genie:  { w: 1280, h: 800 },  // fixed, landscape only
} as const;

// Font: system stack. On the demo iPad this resolves to SF Pro Display,
// which is what the real Luna build uses. No webfont loading.
export const font =
  '-apple-system, system-ui, "SF Pro Display", "Segoe UI", Roboto, sans-serif';
