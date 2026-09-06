// ExhibitReadoutDeckMaker — paste at the top of presentation.js and lock before drawing.
// Default family is navy-board. Switch hexes when Pass 2 locks green-paper or red-navy.
// footerName is a session or client label. Default is generic.

const FAMILY = "navy-board"; // or "green-paper" or "red-navy"

const FIRM = {
  "navy-board": {
    canvas: "FFFFFF",
    primary: "051C2C",
    well: "E8F1FA",
    wellAlt: "D6E6F5",
    accent: "00A9F4",
    text: "051C2C",
    mute: "5C6B7A",
    line: "D0D7DE",
    warning: "C0392B",
    footerBar: "D6E6F5",
    white: "FFFFFF",
    footerName: "Prepared for the working session",
  },
  "green-paper": {
    canvas: "FFFFFF",
    primary: "0F6B3C",
    well: "E7F5EE",
    wellAlt: "C8EBD8",
    accent: "00A651",
    text: "1A1A1A",
    mute: "5F6B66",
    line: "D5DDD8",
    warning: "C0392B",
    footerBar: "FFFFFF",
    white: "FFFFFF",
    footerName: "Prepared for the working session",
  },
  "red-navy": {
    canvas: "FFFFFF",
    primary: "001F5B",
    well: "D6E4F0",
    wellAlt: "F3F6FA",
    accent: "CC0000",
    text: "001F5B",
    mute: "5C6570",
    line: "D0D7DE",
    warning: "C0392B",
    footerBar: "FFFFFF",
    white: "FFFFFF",
    footerName: "Prepared for the working session",
    gold: "C4A35A",
  },
};

const C = FIRM[FAMILY];

const TYPE = {
  cover: 32,
  title: 20,
  eyebrow: 11,
  exhibit: 15,
  body: 13,
  table: 11,
  hero: 24,
  source: 9,
  page: 11,
};

const BOX = {
  margin: 0.5,
  gutter: 0.2,
  titleY: 0.28,
  titleH: 0.46,
  eyebrowY: 0.18,
  contentY: 1.05,
  footerY: 7.08,
  pageW: 13.33,
  pageH: 7.5,
  radius: 2,
};

const NAV = ["Situation", "Diagnosis", "Options", "Answer", "Value", "Build", "Ask"];
// Default readouts use eyebrow + divider slides, not filled campus tabs.
