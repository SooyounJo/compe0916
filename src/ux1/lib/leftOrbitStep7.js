import {
  LEFT_ORBIT_STEP4_ENTRY_BASE_S,
  LEFT_ORBIT_STEP4_ENTRY_STAGGER_S,
  UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S,
} from "./leftOrbitStep4";

const F = 1879.5;
const ARC_CX = 50;
const ARC_CY = 50;
const SLOT_R = 34;

function sizeCqw(px) {
  return (px / F) * 100;
}

function arcPosition(degFromNorth, radius = SLOT_R) {
  const rad = (degFromNorth * Math.PI) / 180;
  const left = ARC_CX + radius * Math.sin(rad);
  const top = ARC_CY - radius * Math.cos(rad);
  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

/** burger 180° 중심 — music·people은 이전 슬롯 유지 */
const STEP7_SLOT_DEG = {
  moon: 268,
  calendar: 242,
  cocktail: 210,
  burger: 180,
  people: 142,
  music: 108,
};

/** arc — music(우) → moon(좌) 순차 등장 */
export const LEFT_ORBIT_STEP7_ARC_ENTRY_ORDER = [
  "music",
  "people",
  "burger",
  "cocktail",
  "calendar",
  "moon",
];

/** left-step5-music-icon / right-step4-music-icon 과 동일 지름 */
export const LEFT_ORBIT_STEP7_ARC_MUSIC_SIZE_PCT = 20.8;

const ARC_ICON_DEFS = [
  {
    id: "moon",
    deg: STEP7_SLOT_DEG.moon,
    src: "/figma/left-orbit/moon-blob.svg",
    sizeCqw: sizeCqw(183.482),
  },
  {
    id: "calendar",
    deg: STEP7_SLOT_DEG.calendar,
    src: "/figma/left-orbit/calendar-blob.svg",
    iconSrc: "/figma/left-orbit/calendar-icon.svg",
    sizeCqw: sizeCqw(183.482),
    opacity: 0.85,
  },
  {
    id: "cocktail",
    deg: STEP7_SLOT_DEG.cocktail,
    src: "/figma/left-orbit/cocktail-blob.svg",
    sizeCqw: sizeCqw(251.945),
  },
  {
    id: "burger",
    deg: STEP7_SLOT_DEG.burger,
    src: "/figma/left-orbit/burger-blob.svg",
    sizeCqw: sizeCqw(282),
  },
  {
    id: "people",
    deg: STEP7_SLOT_DEG.people,
    src: "/figma/left-orbit/people-blob.svg",
    sizeCqw: sizeCqw(296.673),
  },
  {
    id: "music",
    deg: STEP7_SLOT_DEG.music,
    isMusic: true,
    sizePct: LEFT_ORBIT_STEP7_ARC_MUSIC_SIZE_PCT,
  },
];

function enrichArcIcon(def) {
  const end = arcPosition(def.deg);
  const orderIndex = LEFT_ORBIT_STEP7_ARC_ENTRY_ORDER.indexOf(def.id);
  return {
    ...def,
    left: end.left,
    top: end.top,
    orderIndex,
    /** 4단계와 동일 stagger — music(0) … moon(5) */
    delayS: Math.max(0, orderIndex) * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S,
  };
}

export const LEFT_ORBIT_STEP7_ARC_ICONS = LEFT_ORBIT_STEP7_ARC_ENTRY_ORDER.map(
  (id) => enrichArcIcon(ARC_ICON_DEFS.find((def) => def.id === id)),
);

/** 4단계 enter-arc 와 동일 duration */
export const UX1_STEP7_ARC_ENTER_ANIM_S = UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S;

/** ── 6→7 좌측 타이밍: 음악 out → gap → 사운드 in → arc(우→좌) ── */
export const UX1_STEP7_MUSIC_OUT_DELAY_S = 0.2;
export const UX1_STEP7_MUSIC_OUT_ANIM_S = 1.25;
export const UX1_STEP7_MUSIC_OUT_GAP_S = 0.4;

export const UX1_STEP7_SOUND_IN_DELAY_S =
  UX1_STEP7_MUSIC_OUT_DELAY_S +
  UX1_STEP7_MUSIC_OUT_ANIM_S +
  UX1_STEP7_MUSIC_OUT_GAP_S;

export const UX1_STEP7_SOUND_IN_ANIM_S = 1.15;

export const UX1_STEP7_ARC_ICONS_BASE_S =
  UX1_STEP7_SOUND_IN_DELAY_S + UX1_STEP7_SOUND_IN_ANIM_S + 0.35;

export function step7ArcIconsTotalS() {
  return (
    UX1_STEP7_ARC_ICONS_BASE_S +
    LEFT_ORBIT_STEP4_ENTRY_BASE_S +
    5 * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S +
    UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S +
    0.3
  );
}

/** 6→7 좌측 step6 텍스트 퇴장 */
export const UX1_STEP6_TO7_TEXT_OUT_DELAY_S = 0.05;
export const UX1_STEP6_TO7_TEXT_OUT_ANIM_S = 0.95;

/** 6→7 우측 — 음악 out → gap → 사운드 → 텍스트 */
export const UX1_STEP7_RIGHT_MUSIC_OUT_DELAY_S = 0.25;
export const UX1_STEP7_RIGHT_MUSIC_OUT_ANIM_S = 1.15;
export const UX1_STEP7_RIGHT_MUSIC_OUT_GAP_S = 0.35;

export const UX1_STEP7_RIGHT_SOUND_IN_DELAY_S =
  UX1_STEP7_RIGHT_MUSIC_OUT_DELAY_S +
  UX1_STEP7_RIGHT_MUSIC_OUT_ANIM_S +
  UX1_STEP7_RIGHT_MUSIC_OUT_GAP_S;

export const UX1_STEP7_RIGHT_SOUND_IN_ANIM_S = 1.1;

/** 좌 arc 6개 거의 완료 시점 — moon 진행 중 */
export function step7LeftArcNearCompleteS() {
  return (
    UX1_STEP7_ARC_ICONS_BASE_S +
    LEFT_ORBIT_STEP4_ENTRY_BASE_S +
    5 * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S +
    UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S * 0.55
  );
}

export const UX1_STEP7_RIGHT_TEXT_IN_DELAY_S = step7LeftArcNearCompleteS();
export const UX1_STEP7_RIGHT_TEXT_IN_ANIM_S = 1.15;

/** 텍스트 등장 후 유지 시간 */
export const UX1_STEP7_RIGHT_TEXT_HOLD_S = 2.6;

export const UX1_STEP7_RIGHT_TEXT_OUT_DELAY_S =
  UX1_STEP7_RIGHT_TEXT_IN_DELAY_S +
  UX1_STEP7_RIGHT_TEXT_IN_ANIM_S +
  UX1_STEP7_RIGHT_TEXT_HOLD_S;

export const UX1_STEP7_RIGHT_TEXT_OUT_ANIM_S = 1.1;

/** 텍스트 퇴장과 동시에 중앙 로딩 닷 등장 */
export const UX1_STEP7_RIGHT_DOTS_IN_DELAY_S = UX1_STEP7_RIGHT_TEXT_OUT_DELAY_S;
export const UX1_STEP7_RIGHT_DOTS_IN_ANIM_S = 1.2;

export function step7RightSequenceTotalS() {
  return UX1_STEP7_RIGHT_DOTS_IN_DELAY_S + UX1_STEP7_RIGHT_DOTS_IN_ANIM_S + 0.3;
}

export const UX1_STEP6_DWELL_MS = 7200;

/** 7단계 전체 시퀀스(로딩 닷까지) 후 8로 넘어가기 전 체류 */
export const UX1_STEP7_DWELL_MS = Math.round(
  (step7RightSequenceTotalS() + 4.5) * 1000,
);

export const UX1_STEP7_SONG_LINES = [
  "A song for today's",
  "wine mood, paired",
  "with old memories",
];
