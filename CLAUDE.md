# CLAUDE.md

Throwaway frontend demo of two products, shown to a client in a 60-minute
meeting. No backend, ever. Optimise for visual fidelity and correct flows.
Nothing else.

## Read before doing anything

| File | What it is |
|---|---|
| `docs/00-brief.md` | Context, audience, scope, definition of done |
| `docs/01-demo-script.md` | The 7 beats. Everything serves this. |
| `docs/02-ia.md` | Request spine, voice model, nav for both products |
| `docs/03-screens.md` | All 20 screen specs with `data-id`s |
| `docs/04-components.md` | The component library. The whole vocabulary. |
| `docs/05-data-model.md` | Entities and seed content |
| `docs/06-demo-engine.md` | Script engine and every beat as config |
| `docs/07-genie-frame-map.md` | Figma node IDs for Genie screens |
| `TASKS.md` | The build queue. Work it top to bottom. |

## How to work

Take the next unticked task in `TASKS.md`. Do that task only. Screenshot with
Playwright, review the screenshot, tick the box, report what you built and
anything you had to guess.

**Stop at every REVIEW GATE and wait.** Do not continue past one.

Do not work ahead. Do not refactor screens you weren't asked to touch. Do not
"improve" something you notice in passing — mention it instead.

## Non-negotiables

1. **Tokens are law.** Every colour, size, radius and gap comes from
   `src/tokens.ts`. No raw hex, no px literals, no Tailwind arbitrary values in
   components. If you need a value that isn't there, stop and ask.
2. **No new components without asking.** `docs/04-components.md` is the complete
   vocabulary. Compose from it.
3. **Every interactive element carries `data-id`**, format
   `L-01/filter-chip-escalated`. Screen ID, slash, element name. Icons and rows
   included. This is how feedback is addressed.
4. **Every screenshot gets looked at** before the task is ticked.
5. **iPad landscape only.** Genie renders in a fixed 1280x800 frame, Luna
   full-width. No breakpoints, no portrait, no mobile.
6. **Specs are exhaustive.** Where `docs/03-screens.md` is silent, ask — do not
   fill the gap with a reasonable guess. Guessing is how this build goes wrong.

## Fidelity sources

- **Layer A (Luna)** — match `https://luna-dev.crossbo.com`. Confirmed token
  values are already in `src/tokens.ts`.
- **Layer B (Genie)** — Figma MCP, file key `wDL5ESB8yofxIbXjSha7I5`. Call
  `get_design_context` on the node in `docs/07-genie-frame-map.md` before
  building that screen. Add any new colour to `src/tokens.ts` in the same change.
- **Layer C** — `docs/03-screens.md` is the only source. Nothing exists to copy.

## Content

Real content only, from `src/data/seed.ts`. Consistent across screens — a
request reading "Pool pump noise" on the board reads the same in the detail
panel. Need content that isn't there? Add it to the seed file, not inline.

Copy is sentence case, active voice. A button that says "Assign" produces a
timeline entry that says "Assigned". Never "Submit". Never "Click here".

All timestamps computed relative to app load. Never hardcode a date.

## Stack

Vite + React + TypeScript + Tailwind. `react-router-dom`. One React context with
a reducer for all state — no Redux, no Zustand, no query library. Both products
read the same store; that is how a Luna action updates Genie.

Font: system stack only. On the demo iPad this resolves to SF Pro Display, which
is what the real Luna build uses. Do not load webfonts.

## Never build

Auth · permissions · routing guards · tests · README files · code comments
explaining obvious code · error boundaries · retry logic · loading skeletons ·
empty-state illustrations · config abstraction · env vars · feature flags ·
responsive layouts · portrait · dark mode · `TODO` · `lorem ipsum` ·
`Placeholder` · stub screens behind non-demo nav items · any screen not in
`docs/03-screens.md`.

## When feedback arrives

It will name a `data-id`. Change that element only. If the fix needs a change to
a shared component, say so first — that affects screens already approved.
