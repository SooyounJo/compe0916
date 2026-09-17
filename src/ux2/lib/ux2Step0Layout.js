/** Figma 1:792 — 0단계 좌측 (1879.5 원) */
export const F0 = 1879.5;

/** 0단계 — 초기 카피 유지 후 텍스트·아이콘 handoff 동시 */
export const STEP0_TEXT_HANDOFF_MS = 2000;
export const STEP0_ICON_HANDOFF_MS = 1000;

export const STEP0_TEXT = {
  left: 254,
  top: 832,
  height: 216,
};

export const STEP0_SEARCH_BLOB = {
  left: 1501,
  top: 809,
  size: 275.75,
};

export const STEP0_INSTAGRAM_BLOB = {
  left: 1364,
  top: 1181,
  size: 223,
};

export const STEP0_VOICE = {
  left: 1601,
  top: 871,
  size: 138,
};

/** Figma [33:224](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=33-224) — Frame 2085672045 */
export const F0_RIGHT = 1872.85546875;

export const STEP0_RIGHT_ROW = {
  left: 84,
  top: 809,
  width: 1594.75,
  height: 275.75,
  blobSize: 275.75,
  /** icon blob 끝 ~ 텍스트 시작 (392.75 − 275.75) */
  textOffsetX: 392.75,
};

/** 0단계 우측 카피 — Figma 대비 좌측(인스타 슬롯 쪽)으로 당김 (px, F0_RIGHT) */
export const STEP0_RIGHT_TEXT_NUDGE_LEFT_PX = 72;

export function pctCircleRight(px, basis = F0_RIGHT) {
  return (px / basis) * 100;
}

export function pctCircle(px, basis = F0) {
  return (px / basis) * 100;
}

export function centerOf(box) {
  return {
    x: box.left + box.size / 2,
    y: box.top + box.size / 2,
  };
}

/** 우측 0 — 인스타 출발(원 좌하, Figma 대칭 근사) */
export const STEP0_RIGHT_IG_ORIGIN = {
  left: 168,
  top: 1188,
  size: 223,
};
