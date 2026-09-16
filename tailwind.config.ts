import type { Config } from 'tailwindcss';
import { color, type as typeScale, radius, space, frame, font, control, motion, stroke, layout, shadow } from './src/tokens';

const px = (n: number) => `${n}px`;

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

const borderRadius = Object.fromEntries(
  Object.entries(radius).map(([name, n]) => [name, px(n)]),
);

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', ...color },
    fontFamily: { sans: [font] },
    fontSize: fontSize as never,
    spacing,
    borderRadius,
    extend: {
      width: {
        genie: px(frame.genie.w),
        genieHalf: px(frame.genie.w / 2 - 80),
        boardList: px(layout.boardList),
        statusSelect: px(layout.statusSelect),
        etaSelect: px(layout.etaSelect),
        navPanel: px(layout.navPanel),
        rail: px(layout.rail),
        genieContent: px(layout.genieContent),
        ...Object.fromEntries(Object.entries(control).map(([k, v]) => [k, px(v)])),
      },
      height: {
        genie: px(frame.genie.h),
        sheetDemo: px(360),
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
      boxShadow: { toast: '0 4px 16px rgba(0, 0, 0, 0.12)', nav: shadow.nav, tabBar: shadow.tabBar },
      zIndex: { overlay: '40' },
      borderColor: { divider: color.divider, navDivider: color.navDivider, panelBorder: color.panelBorder },
      padding: { navX: '19px', navY: '19px', navTop: '31px', cardPad: '20px' },
      borderWidth: Object.fromEntries(Object.entries(stroke).map(([k, v]) => [k, px(v)])),
    },
  },
  plugins: [],
} satisfies Config;
