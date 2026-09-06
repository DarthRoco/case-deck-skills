// Scaffold — annexure divider + a workings slide.

function applyAnnexureDivider(pres, C, BOX, payload) {
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: BOX.pageW, h: BOX.pageH,
    fill: { color: C.primary }, line: { color: C.primary },
  });
  s.addText(payload.word || "ANNEXURE", {
    x: 0.7, y: 2.8, w: 12, h: 0.8,
    fontFace: "Calibri", fontSize: 40, bold: true, color: C.white, margin: 0,
  });
  s.addText(payload.sub || "Workings, unused quotes, extra charts.", {
    x: 0.7, y: 3.7, w: 12, h: 0.4,
    fontFace: "Calibri", fontSize: 16, color: "D5DAE1", margin: 0,
  });
  return s;
}

function applyAnnexureTable(pres, H, C, payload) {
  const s = pres.addSlide();
  H.topBar(s);
  H.insightTitle(s, payload.title, "APPENDIX");
  H.comparisonTable(s, 0.45, 1.15, 12.4, 5.4, payload.rows);
  H.source(s, payload.source || "SOURCE: Field roster.");
  H.pageChip(s, payload.page || "A1");
  return s;
}

module.exports = { applyAnnexureDivider, applyAnnexureTable };
