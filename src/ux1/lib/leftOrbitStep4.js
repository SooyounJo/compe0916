import {
  leftExitRimAlongArc,
  LEFT_SEAM,
} from "./dualOrbitHandoffPath";

/** 원 하단 외곽 arc — 0°=12시, 시계방향 */
const F = 1879.5;

const ARC_CX = 50;
const ARC_CY = 50;
const ARC_R = 45;
/** 4단계 슬롯 — 실기 기준 원 안쪽 링 (rim 경로보다 안쪽) */
const SLOT_R = 34;

function sizeCqw(px) {
  return (px / F) * 100;
}

function arcPosition(degFromNorth, radius = ARC_R) {
  const rad = (degFromNorth * Math.PI) / 180;
  const left = ARC_CX + radius * Math.sin(rad);
  const top = ARC_CY - radius * Math.cos(rad);
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

/** rim을 따라 entryDeg → slotDeg — 등간격 웨이포인트로 코드 보간 완화 */
function entryRimPath(entryDeg, slotDeg) {
  const a = arcPosition(lerpDeg(entryDeg, slotDeg, 1 / 6));
  const b = arcPosition(lerpDeg(entryDeg, slotDeg, 2 / 6));
  const c = arcPosition(lerpDeg(entryDeg, slotDeg, 3 / 6));
  const d = arcPosition(lerpDeg(entryDeg, slotDeg, 4 / 6));
  const e = arcPosition(lerpDeg(entryDeg, slotDeg, 5 / 6));
  return {
    entryRimALeft: a.left,
    entryRimATop: a.top,
    entryRimBLeft: b.left,
    entryRimBTop: b.top,
    entryRimCLeft: c.left,
    entryRimCTop: c.top,
    entryRimDLeft: d.left,
    entryRimDTop: d.top,
    entryRimELeft: e.left,
    entryRimETop: e.top,
  };
}

export const LEFT_ORBIT_STEP5_STAY_IDS = ["moon", "calendar", "cocktail"];
/** 우측부터 빠져나감 (people → burger) */
export const LEFT_ORBIT_STEP5_EXIT_IDS = ["people", "burger"];

/** 실기 사진 기준 — 9시(달)에서 4시(사람)까지 균일한 링 정렬 */
const STEP4_SLOT_DEG = {
  moon: 262,
  calendar: 235,
  cocktail: 202,
  burger: 162,
  people: 123,
};

/** 5단계: 우측 rim 세로 (위 cocktail → calendar → moon) — Figma ref, 와인(3시) 피함 */
const STEP5_RELOCATE_DEG = {
  cocktail: 68,
  calendar: 106,
  moon: 128,
};

/** 하단 arc 좌측 rim — 좌→우로 행렬처럼 순차 진입 */
const ENTRY_RIM_DEG = 290;
/** 슬롯 간격(°). STEP4_SLOT_DEG 기준 */
const SLOT_SPACING_DEG = 26;
/** 공통 각속도 — 같은 속도로 아크를 따라가며 행렬이 이어짐 */
const ENTRY_DEG_PER_S = 92;

export const LEFT_ORBIT_ARC_ENTRY = arcPosition(ENTRY_RIM_DEG);
/** 4 진입: 앞 아이콘과 슬롯 간격만큼 떨어져 출발 */
export const LEFT_ORBIT_STEP4_ENTRY_STAGGER_S =
  SLOT_SPACING_DEG / ENTRY_DEG_PER_S;
export const LEFT_ORBIT_STEP4_ENTRY_BASE_S = 0.2;
/** globals.css ux1-left-icon-arc-enter duration과 동일 */
export const UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S = 0.9;
/** globals.css right-step4-music-icon-in duration과 동일 */
export const UX1_STEP4_MUSIC_ENTER_ANIM_S = 1.45;
/** 좌 arc 5개 진입 완료 후 우 음악·Let's Party 동시 등장 */
export const UX1_STEP4_RIGHT_REVEAL_DELAY_S =
  LEFT_ORBIT_STEP4_ENTRY_BASE_S +
  4 * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S +
  UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S;
/** 음악·텍스트 완전 등장 후 4→5 전환까지 추가 체류 */
export const UX1_STEP4_POST_REVEAL_BUFFER_MS = 3200;
export const UX1_STEP4_DWELL_MS = Math.round(
  (UX1_STEP4_RIGHT_REVEAL_DELAY_S + UX1_STEP4_MUSIC_ENTER_ANIM_S) * 1000 +
    UX1_STEP4_POST_REVEAL_BUFFER_MS,
);

/** 좌→우 (entry에 가까운 순) */
const ENTRY_ORDER = ["moon", "calendar", "cocktail", "burger", "people"];

const ICON_DEFS = [
  {
    id: "moon",
    deg: STEP4_SLOT_DEG.moon,
    src: "/figma/left-orbit/moon-blob.svg",
    sizeCqw: sizeCqw(183.482),
  },
  {
    id: "calendar",
    deg: STEP4_SLOT_DEG.calendar,
    src: "/figma/left-orbit/calendar-blob.svg",
    iconSrc: "/figma/left-orbit/calendar-icon.svg",
    sizeCqw: sizeCqw(183.482),
    opacity: 0.85,
  },
  {
    id: "cocktail",
    deg: STEP4_SLOT_DEG.cocktail,
    src: "/figma/left-orbit/cocktail-blob.svg",
    sizeCqw: sizeCqw(251.945),
  },
  {
    id: "burger",
    deg: STEP4_SLOT_DEG.burger,
    src: "/figma/left-orbit/burger-blob.svg",
    sizeCqw: sizeCqw(251.945),
  },
  {
    id: "people",
    deg: STEP4_SLOT_DEG.people,
    src: "/figma/left-orbit/people-blob.svg",
    sizeCqw: sizeCqw(296.673),
  },
];

function enrichIcon(def) {
  const end = arcPosition(def.deg, SLOT_R);
  const entry = entryRimPath(ENTRY_RIM_DEG, def.deg);
  const arcDeg = Math.abs(ENTRY_RIM_DEG - def.deg);
  const orderIndex = ENTRY_ORDER.indexOf(def.id);
  const base = {
    ...def,
    left: end.left,
    top: end.top,
    entryStartLeft: LEFT_ORBIT_ARC_ENTRY.left,
    entryStartTop: LEFT_ORBIT_ARC_ENTRY.top,
    delayS: Math.max(0, orderIndex) * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S,
    /** 거리 ∝ 시간 → 행렬이 같은 각속도로 이어짐 */
    durationS: Math.max(0.45, arcDeg / ENTRY_DEG_PER_S),
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
