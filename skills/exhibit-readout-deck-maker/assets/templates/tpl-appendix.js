// Scaffold — appendix divider + workings table.

function applyAppendixDivider(pres, C, BOX, payload) {
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: BOX.pageW, h: BOX.pageH,
    fill: { color: C.primary }, line: { color: C.primary },
  });
  s.addText(payload.word || "APPENDIX", {
    x: 0.5, y: 3.0, w: 12, h: 0.7,
    fontFace: "Calibri", fontSize: 36, bold: true, color: C.white, margin: 0,
  });
  s.addText(payload.sub || "Backup exhibits. Not part of the oral spine.", {
    x: 0.5, y: 3.8, w: 12, h: 0.35,
    fontFace: "Calibri", fontSize: 14, color: "D6E6F5", margin: 0,
  });
  return s;
}

function applyAppendixExhibit(pres, H, C, payload) {
  const s = pres.addSlide();
  H.topRule(s);
  H.eyebrow(s, "APPENDIX");
  H.actionTitle(s, payload.title);
  if (payload.rows) {
    s.addTable(payload.rows, {
      x: 0.5, y: 1.15, w: 12.3, h: 5.5,
      border: [{ pt: 0.5, color: C.line }],
      fontFace: "Calibri",
      fontSize: 11,
      color: C.text,
    });
  }
  H.source(s, payload.source || "SOURCE: ");
  H.identityFooter(s, payload.page || "A1");
  return s;
}

module.exports = { applyAppendixDivider, applyAppendixExhibit };
