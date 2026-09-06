# Slide recipes

Implement these as PptxGenJS layouts. Measurements assume 13.33" × 7.5" 16:9. Leave the footer band (y ≥ 7.05) alone.

## Cover identity

- Full-bleed photo or branded texture at 60–80% opacity, or clean canvas plus top/bottom bars
- Institute or team mark x=0.45 y=0.28 w=1.4 h=0.45
- Client / event mark top-right mirrored
- Case title 28–36 pt centered or left, plus one-line slogan
- Team name above three circular photos (d=1.15, gap=0.35)
- Name + optional one-line credential under each photo
- No navigator on the cover

## Situation snapshot

Three bands.

1. Title + subtitle
2. Left 45% — company module (SWOT four tiles, or Strength / Weakness cards stacked)
3. Right 55% — industry module (hero market-size block + CAGR, competitor 2×2 or logo strip, one small mix chart)
4. Optional bottom strip — Situation | Problem | Answer as three tinted rows

Hero number lives in a primary-filled vertical or square tile. Unit and year sit inside the tile.

## Fracture / journey gap

- Horizontal stages as columns (Visit → Trial → Advice → Purchase → Use)
- Two swimlanes (Offline / Online, or Current / Desired)
- Red or accent box around the broken stage
- Problem pills (PROBLEM 1 / 2 / 3) on the right
- For multi-row journeys use a 4-row matrix — Concerns, Thinking, Touchpoints, Opportunity — across 5–6 stages

## Attractiveness / choice matrix

- Rows = options, columns = 4–5 criteria (investment, revenue, complexity, duration, overall)
- Header row primary fill, white text
- RAG or clock-pie in the last column
- Recommendation banner under the table, primary fill, one sentence naming the winner
- Optional left-edge brace grouping the shortlisted rows

## Named idea

- Category pill top-left
- Idea name in a wide primary pill
- 3–5 rounded cards across the top (what it is / who it is for / why first-mover)
- Comparison table Current vs Proposed occupying the middle
- Cost stack left, benefit stack right along the bottom
- Problem-ID pills top-right linking back to the fracture slide

## Mechanism — UI flow

- 4–8 phone frames in reading order
- Accent arrows, not cheesy curved callouts
- Vertical labels on the side of each frame (HOME, GIFTING, OCCASION)
- Keep frame aspect 9:19.5-ish; do not squash

## Mechanism — process

- Numbered chevrons or boxes 1 → 2 → 3 → 4
- One photo or icon per stage
- Callout chips for rates, times, recovery %
- Alternate path as a dashed branch

## Mechanism — operating model

- Five columns or five icon tiles — Organisation, Capabilities, Technology, Sourcing, Culture
- Under each, 3 fragment bullets
- Optional org sketch (steering committee + four units) on a following slide, not crammed here

## Persona

- Left 30% — circular photo, name, age, city tier, 3 sliders, Needs vs Pains, one quote
- Right 70% — before/after, Venn, or "what the organisation must do" flow
- Max three persona slides; if more segments exist, dump extras to a TG table

## Research proof

- n= and method in a small pill
- 3–4 stat bars or pies
- One quote card with name + role
- A "what this means for the idea" bar so research is not tourism

## Financial trio

Left 62% stacked

- Assumptions table (years as columns)
- Condensed P&L, totals row distinct fill, profit row green

Right 38%

- One chart (clustered column or stacked area)
- Key-insights rounded box, 3 bullets, including breakeven year and the load-bearing assumption

Label currency and scale once (`INR Cr`). Never mix Cr and Mn silently.

## Unit economics

- Small waterfall or three-bar contribution
- 4 KPI tiles (investment / incremental revenue / breakeven days / IRR)
- With-vs-without subsidy or with-vs-without idea as a pair of tiles
- Policy or enabler row underneath if the case is infra

## Campaign 360

Four quadrants or a 3-row grid

- Rows = funnel stages (Awareness / Consideration / Conversion)
- Columns = Channels, Targeting, Creatives, Landing / CTA
- Budget split printed on the stage rail (60 / 20 / 10)
- ROI tile somewhere visible
- Storyboard frames belong here or in annexure, not both

## Roadmap / Gantt

- Rows = workstreams (Tech, Product, GTM, Brand, Talent)
- Columns = months or years
- Phase bars in distinct tints, labelled PHASE-1 / PILOT / SCALE
- Market-window callout under the axis ("festival window, month 10")
- Owners as a thin last column if space remains; otherwise a footnote

## Risk and mitigation

Two-column or 2×2 probability × impact after mitigation.
Each risk is a card — risk sentence + mitigation sentence. Cap at 6.

## Conclusion pillars

- Title restates the named recommendation
- Three equal cards, each with an icon, a pillar name, and 3 reused metrics
- Optional Vision / year lockup above the cards
- This slide should be screenshot-able as the whole answer

## Thanks

Same texture language as the cover. Team photos again. No new argument.

## Annexure divider

Full-bleed texture + one word (APPENDIX / ANNEXURE) in white. Then workings. Each appendix content slide still has a title, a conclusion bar under charts, and a page number.

## Tiny construction notes for PptxGenJS

- Require `assets/helpers.js`. Call `drawNav`, `card`, `source`, `pageChip`, `icon`.
- If the slide claims trajectory / fee / months-to-exit / mix / CAGR / P&L, call `addChart`. Prose is not a chart.
- Charts use the family primary + one mute gray + RAG only when the series is semantic
- When in doubt, more modules at 11–12 pt beats two airy cards at 18 pt
- Run `python scripts/density-critic.py deck.pptx` before the visual critic
