import type { Config } from 'tailwindcss';
import { color, type as typeScale, radius, space, frame, font } from './src/tokens';

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
      width: { genie: px(frame.genie.w) },
      height: { genie: px(frame.genie.h) },
      minWidth: { genie: px(frame.genie.w) },
      minHeight: { genie: px(frame.genie.h) },
    },
  },
  plugins: [],
} satisfies Config;
