# 04 · Component library

Everything in `src/ui/`. This is the entire vocabulary. **Do not add a component
without asking.**

All values from `src/tokens.ts`. No raw hex, no arbitrary Tailwind values.

---

## `Button`

| Prop | Values |
|---|---|
| `variant` | `primary` · `secondary` · `ghost` · `danger` |
| `size` | `sm` (32h) · `md` (40h) · `lg` (56h) |

- `primary` — `color.primary` bg, `textOnPrimary`, `radius.pill`
- `secondary` — `surface` bg, `primaryBorder` 1px, `primary` text
- `ghost` — transparent, `text` colour
- `danger` — `statusEscalated` bg, white text

`lg` exists for the inspection runner's Pass/Fail/N/A. Touch targets never below
44px anywhere in the app.

## `Chip`

| Prop | Values |
|---|---|
| `selected` | boolean |
| `count` | number, optional |
| `variant` | `filter` · `field` · `property` |

- `filter` — count badge as a filled circle at the leading edge
- `field` — used in confirm cards. `primaryFill` bg, `primaryBorder`, editable
  affordance on hover
- `property` — the top row. Selected is solid `color.primary` with white text

All `radius.pill`.

## `Card`

`radius.card` · `surface` bg · optional 1px `border`.
`selected` state: `chipSelected` bg with `primaryBorderStrong` left edge 3px.
`escalated` state: `statusEscalated` 1px border.

## `ListRow`

Leading circle slot (icon or avatar), title, subtitle, trailing slot.
Optional divider then a body slot beneath — this is the Luna request card shape.

## `StatusBadge`

Maps status to colour and label. Single source of truth for status presentation
across both products — Genie and Luna must never disagree on what "assigned"
looks like.

```
new         statusLive
open        primary
assigned    primary
in_progress statusLive
done        textMuted
cancelled   textMuted
escalated   statusEscalated
```

## `Avatar`

Initials on `primaryFill`, `type.metaBold`. Sizes 24 · 32 · 40.

## `Sheet`

Right-side panel. `width` prop. Slides in 240ms ease-out. Scrim
`rgba(0,0,0,0.25)`. Close X top left.

## `Field`

Label above, input below. `surface` bg, 1px `border`, `radius.card`.
Optional trailing slot — used for the mic button.

## `Select`

Matches Luna's live dropdowns exactly: full-width, `radius.pill`, 1px
`borderMuted`, chevron right.

## `SegmentedControl`

Pill container `surfaceMuted`, selected segment `chipSelected` with
`radius.pill`. Used for `Request | Schedule` and the registry facet switcher.

## `Tabs`

Foot tabs as in Luna's request detail — icon above label, active in
`color.primary`.

## `Timeline`

Vertical. Numbered circular markers, connecting line in `border`.
Entry: event text `type.body`, timestamp `type.meta` `textMuted`.
`variant`: `numbered` (Luna) · `plain` (Genie).

## `ConfirmCard`

**Shared by `G-04` and `L-03`.** The single most reused idea in the demo.

| Prop | |
|---|---|
| `icon` | type icon |
| `title` | action or request type |
| `fields` | `[{ key, label, confidence }]` rendered as `Chip variant="field"` |
| `source` | optional quoted transcript fragment |
| `onConfirm` `onCancel` | |

Fields with `confidence: 'low'` render with a dashed border to signal "check
this". Used sparingly — one field at most per card.

## `VoiceIndicator`

| `state` | Rendering |
|---|---|
| `idle` | Static ring, `primaryBorder` |
| `listening` | Pulsing ring, 1.4s cycle, `color.primary` |
| `parsing` | Slow rotating sweep |

Never a literal waveform. A soft ring reads as premium; a waveform reads as a
voice memo app.

## `Toast`

Bottom centre. `surface` bg, shadow, `radius.pill`. Optional action slot for
Undo. Auto-dismiss configurable, default 6s.

---

## Kitchen sink

`/kitchen-sink` renders every component in every state, on both `color.page` and
`color.surface` backgrounds. Built in Phase 0 and reviewed before any screen
exists.
