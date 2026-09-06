// CaseLikeDeckMaker — paste at the top of presentation.js and lock before drawing.
// Family A consulting-grid defaults. Override hexes when the brief has a client brand.

const FAMILY = "consulting-grid"; // or "brand-campaign"

const C = {
  canvas: "FFFFFF",
  canvasAlt: "F6F7F9",
  primary: "0B1F3A",
  primarySoft: "E8EEF4",
  accent: "C9A227",
  text: "1B1E23",
  mute: "5C6570",
  line: "D5DAE1",
  ragGood: "1B7F4E",
  ragMid: "C48A00",
  ragBad: "C0392B",
  white: "FFFFFF",
};

const TYPE = {
  cover: 32,
  title: 20,
  subtitle: 12,
  cardTitle: 13,
  body: 12,
  table: 10,
  hero: 26,
  source: 9,
  page: 11,
};

const BOX = {
  margin: 0.45,
  gutter: 0.16,
  titleY: 0.28,
  titleH: 0.42,
  subY: 0.70,
  contentY: 0.98,
  footerY: 7.08,
  pageW: 13.33,
  pageH: 7.5,
  radius: 6,
};

const NAV = ["Situation", "Diagnosis", "Idea", "Proof", "Build", "Close"];
// drawNav(slide, activeIndex) should fill NAV[activeIndex] with C.primary
