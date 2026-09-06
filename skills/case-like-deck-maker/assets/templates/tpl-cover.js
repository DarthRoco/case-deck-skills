// Scaffold — cover identity. Copy into presentation.js and replace strings.
// Requires helpers.js + token-block.js in the same folder you run from.

const pptxgen = require("pptxgenjs");
const { makeHelpers } = require("../helpers");

function applyCover(pres, H, C, TYPE, BOX, payload) {
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: BOX.pageW, h: BOX.pageH,
    fill: { color: C.primary }, line: { color: C.primary },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: BOX.pageH,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  s.addText((payload.eyebrow || "CASE COMPETITION").toUpperCase(), {
    x: 0.7, y: 1.35, w: 11.8, h: 0.28,
    fontFace: "Calibri", fontSize: 12, bold: true, color: C.accent, margin: 0,
  });
  s.addText(payload.title, {
    x: 0.7, y: 1.75, w: 11.8, h: 1.2,
    fontFace: "Calibri", fontSize: TYPE.cover, bold: true, color: C.white, margin: 0,
  });
  s.addText(payload.subtitle || "", {
    x: 0.7, y: 3.05, w: 11.8, h: 0.4,
    fontFace: "Calibri", fontSize: 16, color: "D5DAE1", margin: 0,
  });
  const kpis = payload.kpis || [];
  kpis.forEach((k, i) => {
    const x = 0.7 + i * 2.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 4.3, w: 2.7, h: 1.35,
      fill: { color: "13283F" }, line: { color: "13283F" }, rectRadius: 0.06,
    });
    s.addText(String(k.value), {
      x, y: 4.4, w: 2.7, h: 0.7,
      fontFace: "Calibri", fontSize: 28, bold: true, color: C.accent, align: "center", margin: 0,
    });
    s.addText(k.label, {
      x, y: 5.1, w: 2.7, h: 0.4,
      fontFace: "Calibri", fontSize: 12, color: C.white, align: "center", margin: 0,
    });
  });
  s.addText(payload.byline || "", {
    x: 0.7, y: 6.85, w: 11.8, h: 0.28,
    fontFace: "Calibri", fontSize: 12, color: "9AA3AD", margin: 0,
  });
  return s;
}

module.exports = { applyCover };
