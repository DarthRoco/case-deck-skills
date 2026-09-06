---
name: case-like-deck-maker
description: Build dense, judge-ready case-competition and recommendation PowerPoint decks. Use when the user asks for a case deck, case-comp PPT, campus-challenge slides, or a card-based consulting-style recommendation deck rather than a sparse board readout.
license: MIT
compatibility: Requires a host that can emit PPTX via PptxGenJS (Grok pptx skill, or Node + pptxgenjs). Python 3 for scripts/density-critic.py.
metadata:
  type: workflow
  version: "1.2.0"
  author: Shreyas Bhat
  homepage: https://github.com/DarthRoco/case-deck-skills
---

# CaseLikeDeckMaker

Produce widescreen decks that look and argue like winning campus case-competition submissions: information-maximalist, card-based, insight-titled, research-forward, implementation-ready.

This skill is methodology plus drawing primitives. File I/O depends on the host (see Host contract). Use this skill for storyline, slide recipes, visual grammar, density, and the critic loop.

Do not invent sparse one-exhibit board slides unless the user explicitly asks for the sister skill `exhibit-readout-deck-maker`.

Use logos and names the user actually supplied.

## When this skill is in charge

- User wants a case-comp / campus-challenge / recommendation deck
- User says the last deck looked generic, too empty, or not like a dense case file
- User wants personas, journeys, attractiveness matrices, named ideas, Gantt, financial trio, annexure

Never generate PPTX with python-pptx. Author slides with PptxGenJS.

## Host contract

- Grok — load the bundled `pptx` skill for PptxGenJS, unpack, overlap check, render, pack.
- Claude Code / Codex / Cursor / other — generate with Node + `pptxgenjs`, using `assets/helpers.js` and `assets/templates/`. After pack, run `python scripts/density-critic.py out.pptx`.
- Any host — do not author slides with python-pptx.

## Orchestration (do not skip)

Work in five passes. Each pass has a written artifact (in the conversation or as a file under `artifacts/` in the project working directory). Do not jump to drawing slides before Pass 2 is locked.

### Pass 0 — Intake

Extract, or ask only for what is missing

- Client / case protagonist, industry, geography
- Decision the judge must leave believing
- Constraints (slide cap, time to present, must-use data, brand colours, logos)
- Evidence on hand (primary research, financials, interviews, mockups)
- Family choice — `consulting-grid` or `brand-campaign` (see [visual-system.md](references/visual-system.md))

If the user dumped a case prompt and data, do not interview them for 10 questions. Infer, state assumptions, proceed.

### Pass 1 — Spine

Write a 8–14 slide spine using the default arc in [content-architecture.md](references/content-architecture.md)

1. Cover (identity)
2. Situation snapshot (market + company + fracture)
3. Diagnosis / comparison / issue visualisation
4. Named recommendation (one breath)
5. Mechanism (how it works)
6. Proof (research + economics)
7. Implementation (phases, owners, risks)
8. Close (pillars + ask)
9. Annexure firewall + workings

Every slide in the spine gets an **insight title** (the sentence a judge would highlight), not a label. "Financials" is illegal. "Break-even in year 3 if 10% of health-conscious oat buyers convert" is legal.

Name the idea. Unnamed "Idea 1" is illegal unless the user forbids naming.

### Pass 2 — Visual lock

Lock tokens before drawing

- Family (`consulting-grid` | `brand-campaign`)
- Primary, canvas, text, mute, one accent, RAG
- Navigator style (bottom tabs | top chevrons | left rail)
- Type scale, card radius, margin, gutter
- Icon rule (flat, one weight, circular back or monochrome)

Write the token block at the top of the generation script as comments / constants. Do not drift mid-deck.

### Pass 3 — Build

Copy [assets/helpers.js](assets/helpers.js) and [assets/token-block.js](assets/token-block.js) into the generation script. Call the helpers. Do not re-implement `drawNav`, `card`, `source`, `pageChip`, or `kpiTile` by hand.

Start from a scaffold in [assets/templates/](assets/templates/) (`tpl-cover.js`, `tpl-content.js`, `tpl-annexure.js`) when the slide type matches. Overwrite content. Do not invent a new chrome system.

For each spine slide, pick a recipe from [slide-recipes.md](references/slide-recipes.md).

**Chart mandate.** If the slide claims a trajectory, fee meter, months-to-exit, mix, CAGR, P&L, funnel, or any time series, the slide must contain a PptxGenJS `addChart` (or a drawn sparkline of shapes). A paragraph that describes the chart is a failed slide. Rewrite it.

**Icon mandate.** Before drawing, check [assets/icons/](assets/icons/). If that folder contains `.png` files, content cards may use them via `icon(slide, name, x, y)` where `name` is the file stem (`market.png` → `market`). If the folder is empty, use filled geometric markers (1 / 2 / 3 in circles) instead. Do not generate a fresh icon sheet per deck. Do not use emoji or random clip-art. Users may drop their own PNGs into `assets/icons/` — see that folder's README.

Rules while building

- Outer margin ≥ 0.4"
- Card gutter 0.12–0.18"
- Body text 11–13 pt on content slides (10 pt only inside dense tables)
- Source line 8–9 pt bottom-left
- Page number in a filled square or tab
- One hero number per snapshot module, with unit + year + source
- Quotes get a name, role, and quotation marks
- Sample size sits next to every %
- No leftover lorem, xxxx, click-here, or author chat debris
- Logos and photos keep native aspect ratio
- 16:9 only unless the user demands otherwise

If a slide needs more than one recipe, split the slide or send overflow to annexure. Do not shrink below 10 pt to cram a second story onto the same canvas.

### Pass 4 — Dual critic

Run `python scripts/density-critic.py <deck.pptx>` before declaring done. Then run both critics. Fix, then re-render affected slides.

**Illegal (automatic fail — rebuild the slide)**

- A content slide with fewer than 3 modules (card, table, chart, quote, kpi, journey stage, or image frame)
- A cover with no institute-or-client lockup and no identity block (team / date / case name)
- A product / mechanism slide with no diagram, wireframe, journey, or chart
- A title that is a label (`Overview`, `Financials`, `Our Idea`, `Roadmap`, `Primary Research`, `Recommendations`, `Appendix` as the only title text)
- A slide that looks like a startup pitch or a notes doc — large type, two cards, 40% unused canvas
- Decorative clip-art or emoji; icons, if used, must come from `assets/icons/`
- Missing source line or page chip on a content slide
- Trajectory / fee / months-to-exit / mix / CAGR claimed in prose with no chart object

**Density floor.** If a screenshot of the slide could be a tweet, it failed. These decks are information-maximalist with gutters, not emptiness.

**Visual critic** (render slides, inspect images, overlap check)

- Overflow, collision with footer tabs, low contrast, uneven gutters
- Icon weight drift, stretched photos, orphan bullets
- Navigator highlighting the wrong section
- Cover and body feeling like two different decks

**Argument critic** (read the extracted text as a judge)

- Can you repeat the recommendation in one breath after slide 4?
- Does every later slide make that recommendation more credible?
- Is the broken journey step marked, and does the idea plug that exact hole?
- Are assumptions visible on the financial slide?
- Is there a week-one action (pilot city, owner, phase-1 scope)?
- Would a screenshot of any single content slide still make sense?

Do not declare done on the first render.

## Default visual family

If the case is a corporate / ops / merger / policy / tech-strategy problem → `consulting-grid`.
If the case is a brand, product, campaign, or consumer journey problem → `brand-campaign`.
If the case is a pure analytics / ML problem → still `consulting-grid`, but allow a dark-dashboard variant documented in visual-system.md.

Full tokens, navigator patterns, and anti-patterns live in [visual-system.md](references/visual-system.md).
Working patterns live in [winning-patterns.md](references/winning-patterns.md).

## Content laws

1. Recommendation first. The deck exists to make one decision feel inevitable.
2. Name things. Products, programs, campaigns, operating models get proper names.
3. Primary research is a module, not a footnote. Quote + n + city + role.
4. Cards, not paragraphs. If a block has more than three full sentences, it is the wrong module.
5. Show the mechanism. Wireframe, process, org, journey, or storyboard in the main deck.
6. Economics on one slide. Assumptions + condensed P&L or unit econ + one chart + 3-bullet so-what box.
7. Implementation has dates. Phases, months, pilot geography, governance.
8. Annexure is a firewall. Main deck 8–14 slides. Workings, extra quotes, extra charts, extra Gantts go after a divider.
9. Sources on the slide they support. Tiny, consistent.
10. Close the loop. Final content slide restates the recommendation as 3 pillars with the same numbers used earlier.

## Using PptxGenJS

- Creating from scratch → copy `assets/helpers.js` + a scaffold from `assets/templates/`, then PptxGenJS. Do not start from a sparse corporate template unless you immediately overwrite it with this chrome.
- Editing an existing .pptx → preserve their palette if it is already a client brand; still apply insight titles, cards, navigator, source lines.
- Always run overlap check, render-to-images, and inspect. Case-comp density makes overflow the default failure mode.

## Optional written artifacts

When the user wants reuse or the brief is large, write these under the project working directory (`artifacts/` if it exists)

- `spine.md` — Pass 1 outline with insight titles
- `tokens.md` — Pass 2 lock
- the `.pptx` itself

Do not create extra files the user did not ask for unless they help a multi-hour build.

## What this skill does not do

- It does not replace legal / financial modelling accuracy. Flag invented numbers as assumptions.
- It does not reproduce copyrighted competitor ads or pack shots. Use geometric placeholders and label them.
- It does not refuse to do the analysis when the user gave a prompt and no answer — produce both analysis and deck, stating assumptions.
- It does not optimise for print booklets or vertical social carousels.
- It does not produce sparse exhibit-led board readouts (use `exhibit-readout-deck-maker`).

## References

- [winning-patterns.md](references/winning-patterns.md) — distilled working patterns
- [content-architecture.md](references/content-architecture.md) — spine and title rules
- [slide-recipes.md](references/slide-recipes.md) — layout recipes
- [visual-system.md](references/visual-system.md) — tokens, navigators, anti-patterns
- [assets/helpers.js](assets/helpers.js) — required drawing primitives
- [assets/templates/](assets/templates/) — cover / content / annexure scaffolds
- [scripts/density-critic.py](scripts/density-critic.py) — module + chart + title linter
