# Genie — Figma frame map

File key: `wDL5ESB8yofxIbXjSha7I5`
Section: `534:23231` · 55 top-level frames · all **1280×800 landscape**
(portrait duplicates exist at 800×1280 — ignore them, demo is landscape only)

Frames are unlabeled in Figma. The mapping below was derived from their text
content. Rows on the canvas correspond to flows. **Verify before building** —
the flagged ones are guesses.

Product context: Casa Cook, El Gouna. Guest "Thomas". Prices in €.

---

## Confirmed — named in Figma

| Node | Screen |
|---|---|
| `534:20222` | Idle / attract — clock, date, "TAP ANYWHERE TO BEGIN" |
| `534:20237` | Welcome — "WELCOME, Thomas", 6-language select, ENTER |

## Home — row y=2246

| Node | Screen |
|---|---|
| `534:9809` | Home, base state — greeting, weather 32°C, quick tiles, experiences |
| `534:9958` | Home, quick actions expanded — Order Burger/Snacks/Coffee/Tea, VIEW MENU |
| `534:10120` | Home, nav rail open — My Requests / Spa / Activities / Restaurant / Taxi / Store / Gym / Hotel info / Profile |
| `534:21095` `534:21293` | Home variants — ⚠ state unclear, inspect |

## In-room dining — row y=3245

| Node | Screen |
|---|---|
| `534:6079` | Menu — category chips (Curated / Starters / Main Course / Dessert), Food & Beverages tabs, item grid |
| `534:7171` `534:7754` `534:8341` `534:8885` `534:9344` | Sequential states of the ordering flow — item detail, "perfect pairings" upsell, cart, confirm. ⚠ exact order unverified, inspect in sequence |
| `534:10266` `534:10675` | ⚠ contain home content plus a "Name" field — likely Profile, not dining |

## Spa — row y=4228

| Node | Screen |
|---|---|
| `534:11085` | Browse by mood — Relaxation / Pain relief / Detox / Facials |
| `534:13171` | Treatment detail + "Booking this for" |
| `534:13414` | Booking for — Single / Couple, session length |
| `534:13657` | "Enhance your experience" upsell |
| `534:13925` | Date and time — Thu Jun 22, Morning / Afternoon / Evening |
| `534:14216` | Booking confirmed |

**This is the most complete flow in the file.** It generalises directly to
"request a service → pick options → pick a time → confirm", which covers most
of the resident-side RFI surface. Build it first and reuse the stepper.

## Activities — row y=5271

| Node | Screen |
|---|---|
| `534:11290` | Browse by interest — Recommended / Happening Now / Water Sports / City Tours |
| `534:12250` `534:12560` `534:12865` | Detail states — description, instructions. ⚠ differences unverified |

## Store — row y=6270

| Node | Screen |
|---|---|
| `534:11476` | Curated — price bands, guest favourites |
| `534:11617` | Category view — Wellness and Care |
| `534:11785` | Filters — Price / Popularity / Material |
| `534:12016` | Product detail — Universal Adapter, description |

## Housekeeping — row y=7259

| Node | Screen |
|---|---|
| `534:6503` | Amenities / Linens / Maintenance tabs, item list, Place Request |
| `534:6811` | Essentials — "Forgot something essential?", browsable items |

## Unidentified — rows y=8254, y=9246

`534:20262` `534:20457` `534:20628` `534:20814` `534:21431` `534:21614`

Six frames with text and child structure **identical to the nav-open home**.
Differences are state-only and not visible in metadata. Inspect visually before
assuming they're duplicates — one of them is likely the request-tracking view.

---

## Components present in the file

`request card` · `Track` · `CANCEL REQUEST` · `Request placed at: 2:45 PM` ·
`Special requests` · `side sheet` · `chips` · `genie main` (chat entry,
`ri:chat-ai-3-line`) · `Help me choose`

## Not in this section

No voice capture, listening, transcript, or waveform layers anywhere. No
gathering/event planner. Maintenance exists only as a tab label. These are new
design, not extraction.
