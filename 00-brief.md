# 00 · Brief

## What this is

A throwaway frontend demo of two products, built to present to a prospective
client. No backend. No persistence. All behaviour is scripted.

- **Genie** — resident-facing iPad app, in-residence
- **Luna** — staff-facing operations platform

Both already exist as real products. This repo replicates them and adds the
modules the client asked for that don't exist yet.

## The client

Yosh Hospitality LLC OPC. They issued an RFI (`RFI-OPR-01`) for an "Operations
App" covering resident service requests, maintenance, gatherings, asset
registries, HSE inspections, staff scheduling and analytics. We responded as
vendor. This demo backs that response.

Residential estate operations, not hotel. Residents and properties, not guests
and rooms.

## The room

Under one hour. Three people:

| Who | Cares about | What convinces them |
|---|---|---|
| **CIO** | Integration, data sovereignty, TCO | Seeing D365/CAFM handoffs, one platform not fourteen |
| **CTO** | Is this real or a mockup | Live state moving between products, drill-through to real records |
| **Experience Director** | How it feels | Voice that understands, premium visual quality, zero clunk |

Design every decision against those three. Anything that doesn't move one of
them is cut.

## Scope

**20 screens.** Not the full product. The screens that serve the demo script in
`01-demo-script.md` and nothing else.

Three layers, different effort profiles:

| Layer | Source | Screens | Approach |
|---|---|---|---|
| **A · Replicate** | Live Luna build | 4 | Match what's on screen |
| **B · Extract** | Genie Figma | 6 | Pull node via Figma MCP, build to it |
| **C · Design** | Nothing exists | 10 | Spec'd in `03-screens.md` — build to spec, don't invent |

Layer C is where the client's differentiators live. It is also where you are most
likely to invent things. Build strictly to spec; if the spec is silent, ask.

## Definition of done, per screen

1. Renders at the correct frame size
2. Every colour, size, radius, gap comes from `src/tokens.ts`
3. Every interactive element has a `data-id`
4. Content comes from `src/data/seed.ts`, not inline strings
5. Playwright screenshot taken and reviewed
6. Task checked off in `TASKS.md`

## Explicitly out of scope

Auth. Permissions. Routing guards. Tests. README files. Error boundaries.
Loading skeletons. Responsive layouts. Portrait orientation. Dark mode.
Any module not named in `03-screens.md`.

## Open decision — content naming

Seed data uses placeholder property and resident names (`Villa 12`,
`The Residence`). Replace with real Yosh property names before the demo if
available. Flagged in `05-data-model.md`.
