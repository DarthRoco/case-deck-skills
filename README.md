# Case Deck Skills

Hello there.

This repo is my attempt at writing skills an agent can load to get better at
a specific kind of slide. Think of them as add-ons on top of whatever PPT
capability the agent already has. They cannot make PowerPoints on their own.

I wrote them to mimic the feel of case-competition decks and of
strategy-style working presentations: a locked visual system, insight or
action titles, and a critic pass before you call it done.

I am not affiliated with any institution. This is just me trying something
new. Feedback is welcome.

— [Shreyas Bhat](https://github.com/DarthRoco)

| Skill | Grammar | Use when |
|---|---|---|
| [`case-like-deck-maker`](skills/case-like-deck-maker/) | Dense cards, insight titles, navigator, annexure | Case-comp / recommendation deck |
| [`exhibit-readout-deck-maker`](skills/exhibit-readout-deck-maker/) | One exhibit per slide, action titles, SOURCE footer | Board readout / discussion document / white paper |

The skills do not train a model. They are markdown + helpers the agent loads
when the task matches. The five-pass loop (intake → spine → visual lock →
build → critic) lives inside each `SKILL.md`.

## Install

Copy the skill folder your agent should see. Folder name must stay equal to
the `name:` field in `SKILL.md`.

**Claude Code** (project)

```bash
git clone https://github.com/DarthRoco/case-deck-skills.git
mkdir -p .claude/skills
cp -R case-deck-skills/skills/case-like-deck-maker .claude/skills/
cp -R case-deck-skills/skills/exhibit-readout-deck-maker .claude/skills/
```

User-scoped install: the same folders under `~/.claude/skills/`.

**Grok**

```bash
cp -R case-deck-skills/skills/case-like-deck-maker ~/.grok/skills/
cp -R case-deck-skills/skills/exhibit-readout-deck-maker ~/.grok/skills/
```

**Cursor / Codex / other Agent Skills hosts**

```bash
cp -R case-deck-skills/skills/case-like-deck-maker .cursor/skills/
cp -R case-deck-skills/skills/exhibit-readout-deck-maker .cursor/skills/
# Codex often reads ~/.agents/skills/ or .agents/skills/
```

Then ask the agent for a deck. It should load the matching `SKILL.md` before
drawing.

## Requirements

- A host that can emit PPTX via [PptxGenJS](https://github.com/gitbrent/PptxGenJS)
  (Grok's bundled `pptx` skill, or Node + `pptxgenjs`)
- Python 3 for `scripts/density-critic.py`
- Do not author slides with `python-pptx`
- Icons are optional. Drop PNGs in
  `skills/case-like-deck-maker/assets/icons/` or leave that folder empty.

## How a session should run

1. Intake — decision, constraints, evidence, visual family
2. Spine — insight titles or action titles, named recommendation
3. Visual lock — tokens written once
4. Build — helpers + templates, chart mandate, source lines
5. Critic — `density-critic.py`, then visual + argument review

Do not skip to drawing.

## What's in the pack

- Orchestration and critic rules
- Drawing helpers and templates
- Optional card icons — drop PNGs in `skills/case-like-deck-maker/assets/icons/`
- Colour tokens: `consulting-grid`, `brand-campaign`, `navy-board`,
  `green-paper`, `red-navy`

Use logos and names you actually have rights to. Flag invented numbers as
assumptions.

## Feedback

Open an issue or a PR. See [CONTRIBUTING.md](CONTRIBUTING.md). I would like
to hear what broke, what looked off, and what you would change.

## License

[MIT](LICENSE)
