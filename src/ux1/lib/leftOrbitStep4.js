import {
  leftExitRimAlongArc,
  LEFT_SEAM,
} from "@/lib/dualOrbitHandoffPath";

/** 원 하단 외곽 arc — 0°=12시, 시계방향 */
const F = 1879.5;

const ARC_CX = 50;
const ARC_CY = 50;
const ARC_R = 44;

function sizeCqw(px) {
  return (px / F) * 100;
}

function arcPosition(degFromNorth) {
  const rad = (degFromNorth * Math.PI) / 180;
  const left = ARC_CX + ARC_R * Math.sin(rad);
  const top = ARC_CY - ARC_R * Math.cos(rad);
  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

function lerpDeg(from, to, t) {
  return from + (to - from) * t;
}

function rimPath(fromDeg, toDeg) {
  const a = arcPosition(lerpDeg(fromDeg, toDeg, 0.38));
  const b = arcPosition(lerpDeg(fromDeg, toDeg, 0.72));
  const end = arcPosition(toDeg);
  return {
    rimALeft: a.left,
    rimATop: a.top,
    rimBLeft: b.left,
    rimBTop: b.top,
    relocateLeft: end.left,
    relocateTop: end.top,
  };
}

function exitRimPath(fromDeg) {
  const path = leftExitRimAlongArc(fromDeg);
  return {
    rimALeft: path.rimA.left,
    rimATop: path.rimA.top,
    rimBLeft: path.rimB.left,
    rimBTop: path.rimB.top,
    dipLeft: path.rimC.left,
    dipTop: path.rimC.top,
    sOutLeft: path.rimD.left,
    sOutTop: path.rimD.top,
    sMidLeft: path.seam.left,
    sMidTop: path.seam.top,
    sBridgeLeft: path.bridge.left,
    sBridgeTop: path.bridge.top,
  };
}

export const LEFT_HANDOFF_DIP = LEFT_SEAM;

/** rim을 따라 entryDeg → slotDeg (하단 arc, 좌→우) */
function entryRimPath(entryDeg, slotDeg) {
  const a = arcPosition(lerpDeg(entryDeg, slotDeg, 0.2));
  const b = arcPosition(lerpDeg(entryDeg, slotDeg, 0.44));
  const c = arcPosition(lerpDeg(entryDeg, slotDeg, 0.68));
  const d = arcPosition(lerpDeg(entryDeg, slotDeg, 0.88));
  return {
    entryRimALeft: a.left,
    entryRimATop: a.top,
    entryRimBLeft: b.left,
    entryRimBTop: b.top,
    entryRimCLeft: c.left,
    entryRimCTop: c.top,
    entryRimDLeft: d.left,
    entryRimDTop: d.top,
  };
}

export const LEFT_ORBIT_STEP5_STAY_IDS = ["moon", "calendar", "cocktail"];
/** 우측부터 빠져나감 (people → burger) */
export const LEFT_ORBIT_STEP5_EXIT_IDS = ["people", "burger"];

const STEP4_SLOT_DEG = {
  moon: 218,
  calendar: 192,
  cocktail: 166,
  burger: 140,
  people: 114,
};

/** 5단계: 우측 rim 세로 (위 cocktail → calendar → moon) — Figma ref, 와인(3시) 피함 */
const STEP5_RELOCATE_DEG = {
  cocktail: 68,
  calendar: 106,
  moon: 128,
};

/** 하단 arc 좌측 rim — 우측 슬롯부터 순차 진입 */
const ENTRY_RIM_DEG = 252;

export const LEFT_ORBIT_ARC_ENTRY = arcPosition(ENTRY_RIM_DEG);
/** 4 진입: 우→좌 등장 간격 */
export const LEFT_ORBIT_STEP4_ENTRY_STAGGER_S = 0.17;
export const LEFT_ORBIT_STEP4_ENTRY_BASE_S = 0.32;

const ICON_DEFS = [
  {
    id: "moon",
    deg: STEP4_SLOT_DEG.moon,
    src: "/figma/left-orbit/moon-blob.svg",
    sizeCqw: sizeCqw(183.482),
    delayS: LEFT_ORBIT_STEP4_ENTRY_STAGGER_S * 4,
  },
  {
    id: "calendar",
    deg: STEP4_SLOT_DEG.calendar,
    src: "/figma/left-orbit/calendar-blob.svg",
    iconSrc: "/figma/left-orbit/calendar-icon.svg",
    sizeCqw: sizeCqw(183.482),
    opacity: 0.85,
    delayS: LEFT_ORBIT_STEP4_ENTRY_STAGGER_S * 3,
  },
  {
    id: "cocktail",
    deg: STEP4_SLOT_DEG.cocktail,
    src: "/figma/left-orbit/cocktail-blob.svg",
    sizeCqw: sizeCqw(251.945),
    delayS: LEFT_ORBIT_STEP4_ENTRY_STAGGER_S * 2,
  },
  {
    id: "burger",
    deg: STEP4_SLOT_DEG.burger,
    src: "/figma/left-orbit/burger-blob.svg",
    sizeCqw: sizeCqw(251.945),
    delayS: LEFT_ORBIT_STEP4_ENTRY_STAGGER_S,
  },
  {
    id: "people",
    deg: STEP4_SLOT_DEG.people,
    src: "/figma/left-orbit/people-blob.svg",
    sizeCqw: sizeCqw(296.673),
    delayS: 0,
  },
];

function enrichIcon(def) {
  const end = arcPosition(def.deg);
  const entry = entryRimPath(ENTRY_RIM_DEG, def.deg);
  const base = {
    ...def,
    left: end.left,
    top: end.top,
    entryStartLeft: LEFT_ORBIT_ARC_ENTRY.left,
    entryStartTop: LEFT_ORBIT_ARC_ENTRY.top,
    ...entry,
  };

  if (LEFT_ORBIT_STEP5_STAY_IDS.includes(def.id)) {
    return { ...base, ...rimPath(def.deg, STEP5_RELOCATE_DEG[def.id]) };
  }
  if (LEFT_ORBIT_STEP5_EXIT_IDS.includes(def.id)) {
    return { ...base, ...exitRimPath(def.deg) };
  }
  return base;
}

export const LEFT_ORBIT_STEP4_ICONS = ICON_DEFS.map(enrichIcon);
