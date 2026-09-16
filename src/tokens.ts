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
  railHair: 0.5,   // GenieRail card edge, measured node 534:10189
  genieChipSelected: 1.5,  // selected mood-chip border, measured node 534:11085
} as const;

// Shadows, measured on luna-dev unless noted.
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
  genieContent: 720,
  bubble: 520,
  hourLabel: 64,   // L-12 schedule entry time column
  templateSheet: 420,
  quickTile: 129,      // corrected at R.2, measured node 534:9809 ("128.961px"), was a guess (88) at 2.1
  experienceCard: 280, // G-02 experience card, ~matches measured node 534:9809 (280.954px)
  experienceCardH: 160, // approximate — Figma's carousel cards vary 145-226px tall per card; not a single measured value
} as const;

export const frame = {
  genie:  { w: 1280, h: 800 },  // fixed, landscape only
} as const;

// Font: system stack. On the demo iPad this resolves to SF Pro Display,
// which is what the real Luna build uses. No webfont loading.
export const font =
  '-apple-system, system-ui, "SF Pro Display", "Segoe UI", Roboto, sans-serif';

// ---------------------------------------------------------------------------
// Genie — its own design language, extracted separately from Luna's.
//
// tokens.ts started life seeded from Luna's computed CSS (Phase 0), and every
// Genie screen through R.1 was built reusing those Luna values — spacing,
// type scale, radii, shadows, all of it. That was wrong: Genie and Luna read
// as two different products in the source material and should read as two
// different products here. Assume nothing below matches the tables above.
//
// Extracted 2026-09 by calling get_design_context on six Figma nodes chosen
// to span the product: 534:10120 (Home, rail open), 534:9809 (Home, base),
// 534:11085 (Spa browse), 534:13171 (Spa booking detail panel, both its
// hidden and its visible/open state), 534:6503 (Housekeeping), 534:20237
// (Welcome). Every value below is cited to one of those. This is a working
// set from six sampled frames, not a claim of exhaustive coverage — extend it
// the same way (get_design_context, cite the node) as later Genie screens get
// built or rebuilt.
//
// Structure and interaction still come from docs/09-genie-reference.md
// (outranks Figma for Genie). Figma is pixel values only, per that file's own
// "How to use this with Figma" section.
export const genie = {
  color: {
    // Text
    ink:            '#15191C',   // page titles ("Spa Booking", "Housekeeping"), 534:11085 / 534:6503
    textPrimary90:  'rgba(0,0,0,0.9)',  // item-card titles, 534:11085
    textPrimary85:  'rgba(0,0,0,0.85)', // Home quick-tile labels, 534:9809
    textPrimary80:  'rgba(0,0,0,0.8)',  // Housekeeping segmented-tab labels, 534:6503
    secondaryText:  '#636363',   // "Starting from", body copy captions — named "Secondary Text" in Figma, 534:13171
    labelMuted:     '#454647',   // side-sheet field labels ("About …", "Dietary information"), 534:6503

    // Teal family — Genie uses at least three distinct teals, not Luna's one.
    // Keep them distinct; do not collapse to `color.primary`.
    deepTeal:       '#2D4E5E',   // named "Deep Teal" in Figma. Primary CTA fill ("Help me choose"),
                                  // section headings ("Relaxtion"), selected chip border. 534:13171 / 534:11085
    deepTealFill:   'rgba(45,78,94,0.10)', // derived: deepTeal at 10% — same alpha Luna uses for primaryFill,
                                  // applied to Genie's own colour. No Figma node has an icon-in-a-tinted-circle
                                  // for a screen with no photo source (G-05); this is that treatment's fill.
    deepTealText:   '#05363D',   // selected mood-chip text (on white, with deepTeal border), 534:11085
    accentTeal:     '#15616D',   // == color.primary. "Place Request" CTA, Home's serif accent colour.
                                  // A genuine overlap with Luna, not an assumption — measured separately, 534:9809 / 534:6503
    chatGradientFrom: '#125A65', // "genie main" chat-entry button, diagonal gradient, 534:6503
    chatGradientTo:   '#197886',
    welcomeBg:      '#1C7684',   // Welcome screen background wash, 534:20237

    // Confirm / select — sage green, not teal
    sage:           '#CADFD4',   // named "Primary CTA" in Figma. Book Now / Add / selected option pills.
                                  // == color.chipSelected — a second genuine overlap. 534:6503 / 534:13171

    // Welcome screen's own warm-cream pair (nowhere else in the product)
    cream:          '#F5F2E9',   // Welcome hero text, language pills, ENTER button fill, 534:20237
    creamText:      '#142821',   // dark text on the cream ENTER button, 534:20237

    // Surfaces
    cardBg:         '#FFFFFF',
    infoCardBg:     '#F5F7F9',   // side-sheet grouped info cards (About/Dietary/Nutrition) — == color.page, 534:6503
    introBoxBg:     'rgba(80,125,157,0.07)', // highlighted intro strip in the booking detail panel, 534:13171

    // Borders
    cardBorder:     '#DADADA',   // item-card border (Spa, Housekeeping), 534:11085 / 534:6503
    cardBorderFaint:'rgba(0,0,0,0.3)', // Housekeeping card border (thinner variant of the same idea), 534:6503
    chipBorder:     'rgba(0,0,0,0.5)', // unselected filter/mood chip border, 534:11085
    segmentBorder:  'rgba(0,0,0,0.5)', // Housekeeping segmented-control track border, 534:6503
    railBorder:     '#D8D8D8',   // GenieRail card edge, measured node 534:10189
    railLabel:      '#5C5C5C',   // GenieRail item label, measured node 534:10189

    // Photo-card gradient overlay (promo cards, hero image cards)
    overlayTop:     'rgba(0,0,0,0)',
    overlayBottom:  'rgba(0,0,0,0.7)',

    // Not extracted — none of the six sampled frames show an escalated/urgent
    // state. Invented at R.2's G-05 rebuild because a resident can genuinely
    // see one (03-screens.md's escalated-priority mapping), so some colour is
    // needed; picked from Genie's own warm, low-saturation family rather than
    // reaching for Luna's `statusEscalated` red. Revisit if a real frame
    // surfaces this state.
    urgent:         '#A6462D',
  },

  // Genie's type scale is wide and role-driven, not Luna's fixed four sizes —
  // it runs from 12px tracked caps to a 78px serif hero name, mixing SF Pro
  // Display, plain SF Pro, and Playfair Display. Named by role, each cited.
  type: {
    caption:     { size: 12, weight: 500, leading: 16, tracking: 3.84 }, // "SELECT YOUR LANGUAGE", 534:20237
    small:       { size: 13, weight: 500, leading: 16, tracking: 0.26 }, // language pills / ENTER, 534:20237
    meta:        { size: 14, weight: 400, leading: 20 },                // "Starting from", intro-box body, 534:13171
    metaSemibold:{ size: 14, weight: 600, leading: 16 },                // "You'll love this if:", 534:13171
    body:        { size: 16, weight: 400, leading: 24 },                // chip labels, "Browse by category…", 534:11085
    bodyMed:     { size: 16, weight: 500, leading: 24 },                // named "body-lg" in Figma, 534:13171
    tileLabel:   { size: 15, weight: 500, leading: 18, tracking: 1.35 }, // Home quick-tile caption, tracked caps, 534:9809
    itemTitle:   { size: 20, weight: 500, leading: 24 },                // item-card title (massage, towel…), 534:11085
    heading:     { size: 20, weight: 600, leading: 24 },                // section heading ("Relaxtion"), 534:11085
    heroTitle:   { size: 20, weight: 600, leading: 35 },                // booking-panel hero ("Feel better, your way"), 534:13171
    pageTitle:   { size: 24, weight: 500, leading: 24 },                // "Spa Booking" / "Housekeeping", 534:11085
    priceBold:   { size: 24, weight: 700, leading: 25, tracking: 0.72 },// booking-panel footer price, 534:13171
    serifAccent: { size: 26, weight: 500, leading: 32, italic: true },  // "Experiences for you", Playfair italic, 534:9809
    welcomeName: { size: 78, weight: 500, leading: 78 },                // "Thomas", Playfair, 534:20237
  },

  // Corner radii — a much wider range than Luna's, tightest on item-card
  // photos (7px) up to the fully-round rail card (26, already in `radius`).
  radius: {
    itemPhoto:    7,     // item-card thumbnail crop, 534:11085
    card:         8,     // item card itself (Spa, Housekeeping) — coincides with radius.card, 534:11085
    infoCard:     5.76,  // side-sheet grouped info cards, 534:6503
    promoCard:    11.5,  // Home promo cards ("Explore El Gouna"), 534:9809
    heroCategory: 15.85, // hero-band category cards (Spa: Massage/Hammam Therapy), 534:11085
    rail:         26,    // GenieRail card, measured node 534:10189
  },

  // Spacing rhythm — looser and less uniform than Luna's tight xs/sm/md/lg/xl
  // ladder. Named by where they show up rather than forced onto that scale.
  space: {
    cardPad:      16,  // item-card internal padding (Spa, Housekeeping), 534:11085 / 534:6503
    chipGap:      12,  // between filter/mood chips, 534:11085
    chipPadX:     23,  // mood chip horizontal padding, measured 23.2px, 534:11085
    chipPadY:     12,  // mood chip vertical padding, measured 11.6px, 534:11085
    heroOverlap:  54,  // half `size.heroCategoryH` — how far the category-card row
                        // spills past the hero's bottom edge ("partially overlapping
                        // the hero's bottom edge", 09-genie-reference.md). Derived,
                        // not directly measured — Figma's own frame keeps the cards
                        // fully inside the hero band, but the reference doc (which
                        // outranks Figma for structure) and the rendered screenshot
                        // both show real overlap, so this is a principled midpoint.
    sectionGap:   18,  // section heading to its divider line, 534:11085
    cardGap:      24,  // item-card row gap, Home promo-card gap, 534:9809 / 534:11085
    gridGap:      30,  // Housekeeping's 3-column grid gap, 534:6503
    tileRowGap:   37,  // Home quick-tile row gap, 534:9809
    sectionStack: 45,  // Housekeeping's top-level vertical stack gap, 534:6503
    railItemGap:  40,  // vertical gap between rail items, measured, 534:10189
    railPadX:     20,  // rail's own internal horizontal padding, measured, 534:10190
    // The rail's clearance, applied once at the Genie shell (GenieShell.tsx),
    // never per screen — the rail floats over content globally (R.1), so
    // every route needs the same protection. Value is 105, measured node
    // 534:11085 (Service browse's own left content margin) — not Home's own
    // 64 (node 534:9809), because 64 barely clears the rail's collapsed
    // icon-column width (63 = size.railLeft 11 + size.railIconW 52) with
    // almost no margin. 105 is a real measured value from the same file,
    // just borrowed from a screen with more breathing room, and every screen
    // now gets the same figure rather than each being tuned separately.
    contentX:     105,
  },

  // Ambient card shadow — soft and near-invisible against white, a different
  // character from Luna's crisper `shadow.nav`.
  shadow: {
    card: '0px 0px 21.5px 0px #F0F0F0, 0px 0px 12.3px 0px #F0F0F0, 0px 0px 7.2px 0px #F0F0F0, ' +
          '0px 0px 3.6px 0px #F0F0F0, 0px 0px 1px 0px #F0F0F0, 0px 0px 0.5px 0px #F0F0F0', // 534:9809
    sheetFooter: '0px -31px 4.5px rgba(163,163,163,0), 0px -20px 4px rgba(163,163,163,0.01), ' +
          '0px -11px 3.5px rgba(163,163,163,0.05), 0px -5px 2.5px rgba(163,163,163,0.09), ' +
          '0px -1px 1.5px rgba(163,163,163,0.1)', // booking-panel sticky footer, upward, 534:13171
    // GenieRail float, measured node 534:10189 (soft rightward-projecting shadow).
    railFloat:
      '81px 0px 11.5px rgba(158,158,158,0), 52px 0px 10.5px rgba(158,158,158,0.01), ' +
      '29px 0px 8.5px rgba(158,158,158,0.05), 13px 0px 6.5px rgba(158,158,158,0.09), ' +
      '3px 0px 3.5px rgba(158,158,158,0.1)',
  },

  // Control sizes with no Figma equivalent at all — none of the six sampled
  // frames put an icon in a small circle inline in a row (Genie's own icon
  // treatment is either a full photo tile or a bare rail icon). Estimated,
  // not measured; needed for G-05's request-type marker, which has no photo
  // source (no Figma node) to draw from instead.
  size: {
    listAvatar: 40,
    chip: 50,           // filter/mood chip height, measured, 534:11085
    heroHeight: 245,    // browse-screen hero band height, measured, 534:11085
    heroCategoryW: 307, // hero category card, measured, 534:11085
    heroCategoryH: 108,
    itemPhotoW: 153,    // item-card thumbnail (Spa, Housekeeping), measured, 534:11085 / 534:6503
    itemPhotoH: 105,
    // GenieRail, corrected at R.1, moved into this namespace at R.2's
    // checklist pass. The icon-column and collapsed-sliver widths have no
    // Figma node behind them — 09-genie-reference.md's own text calls the
    // icon column "~52px", and the sliver has no measurement at all, so
    // that one is a guess ("thin", "barely visible").
    railSliverW:   14,  // guessed, no measurement or estimate exists
    railIconW:     52,  // 09-genie-reference.md estimate, no Figma node
    railExpandedW: 143, // measured, node 534:10189
    railHeight:    555, // measured, node 534:10189
    railLeft:      11,  // measured, node 534:10189
  },
} as const;

// Playfair Display is used for two Genie accents (the italic "Experiences for
// you" heading, the Welcome screen's guest name) but CLAUDE.md bans webfont
// loading. Georgia is the closest system-available serif to Playfair's
// transitional, high-contrast character — same substitution logic as `font`
// standing in for SF Pro Display.
export const genieSerifFont = 'Georgia, "Times New Roman", serif';
