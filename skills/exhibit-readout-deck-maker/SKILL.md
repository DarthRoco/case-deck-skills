---
name: exhibit-readout-deck-maker
description: Build partner-ready exhibit-led PowerPoint readouts — action titles, one exhibit per slide, SOURCE footers, pyramid argument. Use when the user asks for a board readout, discussion document, white paper, preliminary brief, or sparse consulting slides rather than dense campus case-comp cards.
license: MIT
compatibility: Requires a host that can emit PPTX via PptxGenJS (Grok pptx skill, or Node + pptxgenjs). Python 3 for scripts/density-critic.py.
metadata:
  type: workflow
  version: "1.2.0"
  author: Shreyas Bhat
  homepage: https://github.com/DarthRoco/case-deck-skills
---

# ExhibitReadoutDeckMaker

Produce widescreen (default) or letter-portrait decks that argue like a client working session: pyramid-first, exhibit-led, one idea per slide, source-cited.

This skill is methodology plus drawing primitives. File I/O depends on the host (see Host contract). Use this skill for storyline, slide recipes, visual grammar, and the critic loop.

Do not borrow the dense card-wall grammar of `case-like-deck-maker` unless the user explicitly asks to hybridise.

Palettes are design tokens. Use logos and names the user actually supplied. Default footer is `Prepared for the working session` unless they give you a client or session label.

## When this skill is in charge

- User wants a board / partner readout / discussion document / white paper / preliminary brief
- User says the last deck looked like a campus comp, too busy, or not like a working file
- User wants action titles, waterfalls, distribution curves, snapshot boxes, exhibit-N claims, decision frames

Never generate PPTX with python-pptx. Author slides with PptxGenJS.

## Host contract

- Grok — load the bundled `pptx` skill for PptxGenJS, unpack, overlap check, render, pack.
- Claude Code / Codex / Cursor / other — generate with Node + `pptxgenjs`, using `assets/helpers.js` and `assets/templates/`. After pack, run `python scripts/density-critic.py out.pptx --mode readout`.
- Any host — do not author slides with python-pptx.

## Orchestration (do not skip)

Work in five passes. Each pass has a written artifact (in the conversation or as a file under `artifacts/` in the project working directory). Do not jump to drawing slides before Pass 2 is locked.

### Pass 0 — Intake

Extract, or ask only for what is missing

- Client / protagonist, industry, geography
- Decision the room must leave believing
- Constraints (slide cap, portrait vs 16:9, confidentiality, brand colours)
- Evidence on hand (exhibits, n, interviews, financials)
- Family choice — `navy-board` (default) or `green-paper` or `red-navy` (see [visual-system.md](references/visual-system.md))

If the user dumped a prompt and data, do not interview them for 10 questions. Infer, state assumptions, proceed.

### Pass 1 — Spine

Write a 10–18 slide spine using the default arc in [content-architecture.md](references/content-architecture.md)

1. Title lockup
2. Agenda contract
3. Situation (governing chart)
4. Complication (waterfall / gap)
5. Diagnosis
6. Options
7. Named recommendation
8. Value
9. How / operating model
10. Roadmap
11. Ask / decision frame
12. Appendix firewall

Every slide in the spine gets an **action title** (the sentence a partner would highlight), not a label. "Financials" is illegal. "Break-even in year 3 if 10 percent of the addressable base converts" is legal.

Name the choice. Unnamed "Option A" is illegal unless the options are genuinely unnamed in the brief.

### Pass 2 — Visual lock

Lock tokens before drawing

- Family (`navy-board` | `green-paper` | `red-navy`)
- Primary, canvas, well, text, mute, warning
- Footer identity string (default `Prepared for the working session`; override with the client's name if they gave you one)
- Type scale, margin, gutter
- Icon rule (default none)

Write the token block at the top of the generation script as comments / constants. Do not drift mid-deck.

### Pass 3 — Build

Copy [assets/helpers.js](assets/helpers.js) and [assets/token-block.js](assets/token-block.js) into the generation script. Call the helpers. Do not re-implement `eyebrow`, `actionTitle`, `source`, `identityFooter`, or `exhibitWell` by hand.

Start from a scaffold in [assets/templates/](assets/templates/) (`tpl-title.js`, `tpl-exhibit.js`, `tpl-appendix.js`) when the slide type matches.

For each spine slide, pick a recipe from [slide-recipes.md](references/slide-recipes.md).

**Chart mandate.** If the slide claims a trajectory, fee, months-to-exit, gap, mix, waterfall, distribution curve, or any time series, the slide must contain a PptxGenJS `addChart` (or a constructed shape-waterfall). A paragraph that describes the chart is a failed slide.

**Icon rule.** Default is none. Do not put favicon-style icons on navy-board slides. Tiny geometric row markers inside a table are allowed. Do not generate a decorative spritesheet for this family.

Rules while building

- Outer margin ≥ 0.45"
- One exhibit per working slide
- Body text 12–14 pt (10–11 pt only inside dense tables)
- SOURCE line 8–9 pt in the footer band
- Identity label + page number in the footer band
- Eyebrow section label above the action title
- Notes numbered under the exhibit well
- Sample size and window sit on the exhibit they support
- No leftover lorem, xxxx, click-here, or author chat debris
- Logos keep native aspect ratio
- 16:9 unless the user demands a portrait discussion document

If a slide needs two charts, split the slide or send the second to appendix. Do not shrink below 10 pt to cram a second story onto the same canvas.

### Pass 4 — Dual critic

Run `python scripts/density-critic.py <deck.pptx> --mode readout` before declaring done. Then run both critics. Fix, then re-render affected slides.

**Illegal (automatic fail — rebuild the slide)**

- A working slide with no exhibit (chart, table, process, or decision frame). Three quote slabs are not an exhibit
- A title lockup that leaves more than ~40% of the canvas unused with no governing number or agenda strip
- A title that is a label (`Overview`, `Financials`, `Recommendations`, `Next Steps` as the only title)
- Campus-comp card walls (4+ rounded marketing cards, bottom tab navigator, icon circles)
- Decorative icons or a generated spritesheet
- Missing SOURCE line or identity footer on a working slide
- Trajectory / fee / months-to-exit / gap / mix claimed in prose with no chart object
- Cover and body that feel like two different families

**Exhibit floor.** If a partner cannot point at "the exhibit" in two seconds, it failed. Whitespace is a gutter around the exhibit, not the exhibit.

**Visual critic** (render slides, inspect images, overlap check)

- Overflow, collision with footer, low contrast, uneven gutters
- Stretched marks, orphan bullets
- Cover and body feeling like two different families
- Campus-comp card walls that snuck in

**Argument critic** (read the extracted titles as a partner)

- Can you repeat the recommendation in one breath after the answer slide?
- Does every later slide make that recommendation more credible?
- Is the governing number on the situation slide reused on the value slide?
- Are assumptions visible on the economics slide?
- Is there a 30- or 90-day ask with an owner?
- Would a screenshot of any single working slide still make sense?

Do not declare done on the first render.

## Default visual family

If the user says "discussion document" or says nothing — `navy-board`.
If the user wants exhibit-N white-paper pages — `green-paper`.
If the user wants a snapshot box plus results language — `red-navy`.

Full tokens, footer strings, and anti-patterns live in [visual-system.md](references/visual-system.md).
Working patterns live in [winning-patterns.md](references/winning-patterns.md).

## Content laws

1. Recommendation first. The deck exists to make one decision feel inevitable.
2. Action titles. Labels are illegal on working slides.
3. One exhibit per slide. Cards are rare and structural.
4. Name the choice and, if it earns its keep, the framework.
5. Economics on one slide. Assumptions + one chart + 3-bullet so-what.
6. Implementation has dates and owners.
7. Appendix is a firewall. Main readout 10–18 slides.
8. Sources on the slide they support.
9. Footer is identity. The locked `footerName` never changes mid-deck.
10. Close the loop. The ask slide reuses the same number the situation slide introduced.

## Using PptxGenJS

- Creating from scratch → copy `assets/helpers.js` + a scaffold from `assets/templates/`, then PptxGenJS.
- Editing an existing .pptx → preserve a real client palette if present; still apply action titles, one-exhibit discipline, SOURCE footers.
- Always run overlap check, render-to-images, and inspect. Quiet slides still overflow when titles wrap and notes collide with the footer.

## Optional written artifacts

When the user wants reuse or the brief is large, write these under the project working directory (`artifacts/` if it exists)

- `spine.md` — Pass 1 outline with action titles
- `tokens.md` — Pass 2 lock
- the `.pptx` itself

Do not create extra files the user did not ask for unless they help a multi-hour build.

## What this skill does not do

- It does not replace legal / financial modelling accuracy. Flag invented numbers as assumptions.
- It does not reproduce copyrighted competitor ads or pack shots.
- It does not refuse to do the analysis when the user gave a prompt and no answer — produce both analysis and deck, stating assumptions.
- It does not optimise for campus case comps (use `case-like-deck-maker`) or for social carousels.
- It does not invent a house style for an organisation the user did not name.

## References

- [winning-patterns.md](references/winning-patterns.md) — distilled working patterns
- [content-architecture.md](references/content-architecture.md) — spine and title rules
- [slide-recipes.md](references/slide-recipes.md) — layout recipes
- [visual-system.md](references/visual-system.md) — tokens, footers, anti-patterns
- [assets/helpers.js](assets/helpers.js) — required drawing primitives
- [assets/templates/](assets/templates/) — title / exhibit / appendix scaffolds
- [scripts/density-critic.py](scripts/density-critic.py) — exhibit + title linter
