import type { Config } from 'tailwindcss';
import { color, type as typeScale, radius, space, frame, font, control, motion, stroke, layout, shadow, genie, genieSerifFont } from './src/tokens';

const px = (n: number) => `${n}px`;
const genieKey = (name: string) => `genie${name[0].toUpperCase()}${name.slice(1)}`;

const fontSize = Object.fromEntries(
  Object.entries(typeScale).map(([name, t]) => [
    name,
    [px(t.size), { lineHeight: px(t.leading), fontWeight: String(t.weight) }],
  ]),
) as Config['theme'] & Record<string, unknown>;

const spacing = {
  0: '0px',
  ...Object.fromEntries(Object.entries(space).map(([name, n]) => [name, px(n)])),
};

const borderRadius = {
  ...Object.fromEntries(Object.entries(radius).map(([name, n]) => [name, px(n)])),
  ...Object.fromEntries(Object.entries(genie.radius).map(([name, n]) => [genieKey(name), px(n)])),
};

// Genie's own scale (R.2 correction — see the `genie` namespace in tokens.ts).
// Flattened into Tailwind's normal theme keys, all prefixed `genie`, so Genie
// components use ordinary utility classes like every other token in the app.
const genieColors = Object.fromEntries(Object.entries(genie.color).map(([k, v]) => [genieKey(k), v]));

const genieFontSize = Object.fromEntries(
  Object.entries(genie.type).map(([name, t]) => [
    genieKey(name),
    [px(t.size), { lineHeight: px(t.leading), fontWeight: String(t.weight) }],
  ]),
);

const genieLetterSpacing = Object.fromEntries(
  Object.entries(genie.type)
    .filter(([, t]) => 'tracking' in t)
    .map(([name, t]) => [genieKey(name), px((t as { tracking: number }).tracking)]),
);

const genieGap = Object.fromEntries(Object.entries(genie.space).map(([name, n]) => [genieKey(name), px(n)]));
const genieShadow = Object.fromEntries(Object.entries(genie.shadow).map(([name, v]) => [genieKey(name), v]));

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', ...color, ...genieColors },
    fontFamily: { sans: [font], serif: [genieSerifFont] },
    fontSize: { ...fontSize, ...genieFontSize } as never,
    spacing,
    borderRadius,
    extend: {
      width: {
        handleBar: px(layout.handleW),
        genie: px(frame.genie.w),
        genieHalf: px(frame.genie.w / 2 - 80),
        boardList: px(layout.boardList),

        statusSelect: px(layout.statusSelect),
        etaSelect: px(layout.etaSelect),
        navPanel: px(layout.navPanel),
        railSliver: px(layout.railSliver),
        railIcon: px(layout.railIcon),
        railExpanded: px(layout.railExpanded),
        hair: px(stroke.hair),
        genieContent: px(layout.genieContent),
        hourLabel: px(layout.hourLabel),
        quickTile: px(layout.quickTile),
        experienceCard: px(layout.experienceCard),
        ...Object.fromEntries(Object.entries(control).map(([k, v]) => [k, px(v)])),
      },
      height: {
        handleBar: px(control.handle),
        genie: px(frame.genie.h),
        sheetDemo: px(360),
        detailSheet: px(layout.detailSheet),
        quickTile: px(layout.quickTile),
        experienceCard: px(layout.experienceCardH),
        rail: px(layout.railHeight),
        ...Object.fromEntries(Object.entries(control).map(([k, v]) => [k, px(v)])),
      },
      maxWidth: { bubble: px(layout.bubble) },
      minWidth: { genie: px(frame.genie.w), touch: px(control.touch) },
      minHeight: { genie: px(frame.genie.h), touch: px(control.touch) },
      maxHeight: { thread: px(layout.thread), timeline: px(layout.timeline) },
      transitionDuration: {
        sheet: `${motion.sheet}ms`,
        overlay: `${motion.overlay}ms`,
      },
      animation: {
        pulseRing: `pulseRing ${motion.pulse}ms ease-in-out infinite`,
        sweep: 'sweep 1200ms linear infinite',
      },
      keyframes: {
        pulseRing: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.06)' },
        },
        sweep: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      boxShadow: { toast: '0 4px 16px rgba(0, 0, 0, 0.12)', nav: shadow.nav, tabBar: shadow.tabBar, railFloat: shadow.railFloat, ...genieShadow },
      zIndex: { cluster: '10', sheet: '20', overlay: '40', switcher: '50' },
      borderColor: { divider: color.divider, navDivider: color.navDivider, panelBorder: color.panelBorder, cancelBorder: color.cancelBorder, railBorder: color.railBorder },
      padding: { navX: '19px', navY: '19px', navTop: '31px', cardPad: '20px', railX: px(layout.railPadX), genieContentX: px(layout.genieContentX) },
      inset: { navX: '19px', railLeft: px(layout.railLeft) },
      gap: { railItem: px(layout.railItemGap), ...genieGap },
      letterSpacing: genieLetterSpacing,
      borderWidth: Object.fromEntries(Object.entries(stroke).map(([k, v]) => [k, px(v)])),
    },
  },
  plugins: [],
} satisfies Config;
