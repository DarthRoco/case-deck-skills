# Contributing

Issues and pull requests are welcome. This repo is a pair of Agent Skills, not
a slide-generation product.

## Rules for a patch

1. Keep `name:` in each `SKILL.md` equal to the parent folder name.
2. Keep skill descriptions free of `: ` (colon-space) so they stay valid
   Agent Skills YAML.
3. Prefer a failing critic case over a new adjective.
4. Do not commit `.pptx`, `.pdf`, client files, or logos you do not have
   rights to.

## Suggested test

Same fictional brief, skill on vs skill off. The critic should fail the
off-skill deck on label titles or missing exhibits.
