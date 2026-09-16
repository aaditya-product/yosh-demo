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
  surfaceAlt:     '#F0F0F0',   // card leading circle, measured
  chipSelected:   '#CADFD4',

  // text
  text:           '#333333',
  textMuted:      '#858585',
  textOnPrimary:  '#FFFFFF',

  // status
  statusLive:     '#26A69A',   // "New" badge
  statusEscalated:'#EF4444',   // measured on luna-dev filter count circle
  escalatedEdge:  '#FF0000',   // card border when a request is escalated
  statusWarn:     '#E2A03F',   // amber dot on the card status cluster
  ink:            '#2D4E5E',   // timeline markers, connector, Save button

  // Request tag dots, measured on the live Select tags sheet
  tagDelayed:     '#E2A03F',
  tagEscalated:   '#EF4444',
  tagHighPriority:'#2D4E5E',
  tagReopened:    '#B97A57',
  tagOnHold:      '#636363',
  tagNeedAttention:'#823E0A',
  statusWarning:  'rgba(234, 179, 8, 0.20)',

  // lines
  border:         '#E5E7EB',
  borderMuted:    '#9C9C9C',   // card status pill outline
  divider:        '#B3B3B3',   // hairline inside a request card
  navDivider:     '#C1C1C1',   // between nav groups
  chipBorder:     'rgba(156, 156, 156, 0.05)',
  panelBorder:    'rgba(0, 0, 0, 0.06)',
  navSelected:    'rgba(21, 97, 109, 0.12)',
  navLabel:       'rgba(0, 0, 0, 0.5)',
  cancelBorder:   'rgba(0, 0, 0, 0.5)',

  // scrim behind Sheet, from docs/04-components.md
  scrim:          'rgba(0, 0, 0, 0.25)',
} as const;

// Four sizes, three weights. Do not add a fifth size without asking.
export const type = {
  meta:      { size: 12, weight: 400, leading: 15 },
  metaBold:  { size: 12, weight: 600, leading: 16 },
  body:      { size: 14, weight: 400, leading: 20 },
  bodyMed:   { size: 14, weight: 500, leading: 20 },
  bodyLg:    { size: 16, weight: 400, leading: 24 },
  title:     { size: 24, weight: 600, leading: 32 },
  status:    { size: 12, weight: 600, leading: 16 },
  nav:       { size: 15, weight: 400, leading: 20 },   // nav items and command bar
  panelTitle:{ size: 18, weight: 600, leading: 28 },   // detail panel heading
  event:     { size: 14, weight: 700, leading: 20 },   // bold keyword in a timeline line
  tagTitle:  { size: 16, weight: 500, leading: 24 },   // Select tags heading
} as const;

export const radius = {
  pill: 9999,   // dominant — filters, chips, buttons
  card: 8,      // request card, detail chip
  panel: 12,    // detail panel blocks, timeline accordion
  sheet: 16,    // panel title card, foot tab bar
  nav: 20,      // nav panel and its items
  modal: 24,    // Select tags sheet top corners
  circle: 9999,
} as const;

export const space = {
  xs: 4,
  sm: 8,    // dominant gap
  md: 12,
  lg: 16,
  xl: 24,
} as const;

// Control sizes. Named in docs/04-components.md: button heights 32/40/56, a
// 44px floor on every touch target, avatars 24/32/40.
export const control = {
  btnSm:  32,
  btnMd:  40,
  btnLg:  56,
  touch:  44,   // minimum tappable box anywhere in the app
  chip:     50,   // filter pill, measured
  count:    32,   // filter count circle, measured
  propChip: 46,   // property chip, measured
  segment:  46,   // segmented control container, measured
  segmentInner: 44,
  statusPill:   44,
  iconBtn:  38,   // circular search / add buttons, measured
  leading:  48,   // card leading circle, measured
  statusCluster: 44,
  dot:      18,   // priority dot on the card status cluster
  marker:   28,   // timeline numbered marker
  select:   48,   // staff select and status button in the detail panel
  navItem:  40,
  navIcon:  30,
  commandRow: 42,
  orb:      42,
  accordion: 52,   // timeline accordion header, measured
  detailChip: 46,  // chip inside the detail panel, measured
  titleCard: 68,   // detail panel title card, measured
  handle:    4,    // bottom sheet drag handle
  tagRow:    56,   // Select tags row, measured
  tagCheck:  32,
  modalBtn:  54,
  bar:       12,   // workload bar
  avatarSm: 24,
  avatarMd: 32,
  avatarLg: 40,
} as const;

// Stroke widths. `edge` is the Card selected left edge, named in
// docs/04-components.md. `hair` and `ring` are not named there.
export const stroke = {
  hair: 1,   // not named in 04. Decision: default hairline.
  ring: 2,   // not named in 04. Decision: VoiceIndicator ring.
  edge: 3,   // docs/04-components.md, Card selected left edge.
} as const;

// Shadows, measured on luna-dev.
export const shadow = {
  nav:    'rgba(16, 24, 40, 0.16) 0px 10px 34px 0px',
  tabBar: 'rgba(0, 0, 0, 0.06) 0px -1px 34.7px 0px',
} as const;

// The nav panel's frosted glass: three stacked layers, measured.
export const navGlass = {
  base:            'rgba(249, 249, 249, 0.3)',
  backdrop:        'saturate(1.8) blur(7.6px)',
  gradient:        'linear-gradient(140.369deg, #15616D 0%, #9D8E1E 47.3%, #29BCD3 100%)',
  gradientOpacity: 0.32,
  veil:            'rgba(255, 255, 255, 0.58)',
} as const;

// The voice orb. The live build renders an animated multicolour blob; this is
// a static stand-in with the same palette.
export const orbGradient = [
  'radial-gradient(circle at 30% 28%, #8FD8E8 0%, rgba(143,216,232,0) 58%)',
  'radial-gradient(circle at 72% 32%, #F0B5C8 0%, rgba(240,181,200,0) 55%)',
  'radial-gradient(circle at 62% 76%, #9D8E1E 0%, rgba(157,142,30,0) 52%)',
  'radial-gradient(circle at 24% 74%, #29BCD3 0%, rgba(41,188,211,0) 55%)',
  'linear-gradient(140deg, #E7F2F4, #F4E9F0)',
].join(', ');

// Motion, from docs/04-components.md and TASKS 6.4.
export const motion = {
  sheet:   240,
  overlay: 180,
  toast:   6000,
  pulse:   1400,
} as const;

// Luna board layout. 03-screens.md: list column ~750px.
export const layout = {
  boardList: 750,
  statusSelect: 160,
  etaSelect: 160,
  thread: 200,
  timeline: 300,   // expanded accordion scrolls independently
  detailSheet: 520,
  handleW: 44,
  navPanel: 431,   // floating nav panel, measured
  navContent: 391,
  rail: 208,   // widened at 2.1 to fit icon-beside-label rows, per Figma 534:10120
  genieContent: 720,
  bubble: 520,
  hourLabel: 64,   // L-12 schedule entry time column
  templateSheet: 420,
  quickTile: 88,       // G-02 quick action circle
  experienceCard: 280, // G-02 experience card
} as const;

export const frame = {
  genie:  { w: 1280, h: 800 },  // fixed, landscape only
} as const;

// Font: system stack. On the demo iPad this resolves to SF Pro Display,
// which is what the real Luna build uses. No webfont loading.
export const font =
  '-apple-system, system-ui, "SF Pro Display", "Segoe UI", Roboto, sans-serif';
