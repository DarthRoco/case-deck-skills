# Visual system

Pick one family per deck and do not mix.

## Family navy-board

Default for client readouts and strategy memos.

- Canvas `#FFFFFF`
- Primary `#051C2C` or `#1B365D`
- Well `#E8F1FA` / `#D6E6F5`
- Accent `#00A9F4` (use rarely; titles stay navy)
- Text `#051C2C` / mute `#5C6B7A`
- Warning `#C0392B`
- Footer bar `#D6E6F5` or hairline rule
- Footer copy: `SOURCE: …` left, `{footerName}  |  n` right
- Eyebrow in mute 10–11 pt above the action title
- Charts in navy / steel blue, annotations as thin-outline boxes
- Icons almost never; numbered markers if needed

## Family green-paper

Use when the deliverable is a published-style white paper with Exhibit N labels.

- Canvas `#FFFFFF`
- Primary `#0F6B3C`
- Accent `#00A651` / mint `#C8EBD8`
- Text `#1A1A1A` / mute `#5F6B66`
- Footer is the locked `footerName`, small caps or a short copyright line the user supplies
- Exhibit label format: `Exhibit 3 | Operators must balance three competing demands`
- Conceptual diagrams in a single green ramp, not a rainbow

## Family red-navy

Use when the brief wants a snapshot box plus results language.

- Canvas `#FFFFFF`
- Primary navy `#001F5B` (title bars) + red `#CC0000` (accent)
- Gold hairline `#C4A35A` under navy bars — optional
- Well `#D6E4F0`
- Stamp `PRELIMINARY` top-right on working client pages
- Footer 8 pt confidential line
- Snapshot box with a 2 pt red or navy rule

## Dark variant

Do not use unless the user is presenting in a theatre and asks. Board work is white paper.

## Type scale (16:9, 13.33" × 7.5")

| Role | Size | Weight |
|---|---|---|
| Cover title | 28–36 | Bold |
| Action title | 18–22 | Bold |
| Eyebrow / section | 10–11 | Regular, mute |
| Exhibit heading | 14–16 | Semibold |
| Body / bullet | 12–14 | Regular |
| Table header | 10–11 | Semibold |
| Table body | 10–11 | Regular |
| Hero number | 20–28 | Bold |
| Source / footer | 8–9 | Regular |
| Page number | 10–11 | Regular |

One typeface family (Arial / Calibri / Inter). Serif is allowed only on commentary pages, never mixed into a board readout.

## Layout tokens

- Outer margin 0.50" (never < 0.45")
- Gutter 0.18–0.24"
- Footer reserved band 0.42"
- Title band 0.85–1.05" including eyebrow
- Content box starts below title band, ends above footer
- Max 2 columns on a working slide (exhibit + rail). 3 only for equal lever tiles
- No left-rail navigator unless the user is presenting a 40-slide oral and asks for one

## Navigator patterns

These readouts usually have **no persistent tab bar**. Orientation is

- repeating agenda as divider slides, or
- eyebrow section label on each page

If the user insists on a navigator, use a mute eyebrow row of 5–6 words, current item in primary, no filled pills copied from campus comps.

## Icon rules

- Default: no icons
- If used, one optical size, monochrome, same weight
- Geometric markers (1 / 2 / 3) beat clip-art
- Conceptual loops may use one metaphor per node (scale, recycle, balance) in family primary

## Photography and logos

- Identity mark only if the user supplied it, consistent height ~0.28"
- Client mark on the title slide only
- No stock handshake photography
- No circular headshots on a readout
- Maps only when geography is the argument

## Factory

Require `assets/helpers.js`. Start from `assets/templates/tpl-title.js`, `tpl-exhibit.js`, `tpl-appendix.js`. Whitespace is a gutter around the exhibit, not the exhibit. No decorative icons. Run `python scripts/density-critic.py deck.pptx --mode readout`.

## Anti-patterns

- Campus-comp card walls (4–8 modules)
- Persona photos, phone mockups, campaign storyboards
- Mixing navy tables with mint icons and a red header
- Body text under 10 pt on a projected slide
- Default PowerPoint chart styles
- Changing `footerName` mid-deck
- Leftover lorem, xxxx, click-here
- Team selfies
- RAG as the only encoding of a rating
- Second chart sneaking into the footer band

## Accessibility floor

- Contrast on body text ≥ 7:1
- White text only on navy / green / red bars
- Notes and SOURCE still readable at 8–9 pt
- Do not encode meaning by colour alone
