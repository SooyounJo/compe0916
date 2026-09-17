import { F0, F0_RIGHT, STEP0_RIGHT_ICON_BLOB } from "@/ux2/lib/ux2Step0Layout";

/** 좌측 프리 스텝 중심 → 우측 원 (F0_RIGHT) */
export function mirrorPreStepCenterX(leftCenterX) {
  const dx = leftCenterX - F0 / 2;
  return F0_RIGHT / 2 - dx;
}

export function scalePreStepCenterY(leftCenterY) {
  return (leftCenterY / F0) * F0_RIGHT;
}

const STEP0_RIGHT_SLOT = {
  centerX: STEP0_RIGHT_ICON_BLOB.centerX,
  centerY: STEP0_RIGHT_ICON_BLOB.centerY,
};

/** Figma [12:638](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-638) — 2060×2028 */
const FIGMA_12_638_W = 2060;
const FIGMA_12_638_H = 2028;
const FIGMA_12_638_CX = FIGMA_12_638_W / 2;

function figma638X(px) {
  return (px / FIGMA_12_638_W) * F0_RIGHT;
}

function figma638Y(px) {
  return (px / FIGMA_12_638_H) * F0_RIGHT;
}

/** -1·-4 검색 등 — 0단계 우측 icon blob 슬롯 */
export const PRE_STEP_RIGHT_SEARCH = { ...STEP0_RIGHT_SLOT };

export const PRE_STEP_RIGHT_INSTAGRAM = { ...STEP0_RIGHT_SLOT };

/** -4 우 — 0단계 우측 icon blob 슬롯과 동일 */
export const PRE_STEP_RIGHT_4_COCKTAIL = {
  centerX: STEP0_RIGHT_ICON_BLOB.centerX,
  centerY: STEP0_RIGHT_ICON_BLOB.centerY,
  size: STEP0_RIGHT_ICON_BLOB.size,
};

/** Figma 1:602 — 카피 baseline */
export const PRE_STEP_RIGHT_4_PROMPT = {
  top: (1474 / F0) * F0_RIGHT,
};

/** -3 보이스 — 0 슬롯 중심 */
export const PRE_STEP_RIGHT_3_VOICE = {
  ...STEP0_RIGHT_SLOT,
  size: (138 / F0) * F0_RIGHT,
};

/** Figma [12:202](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-202) — 카피 */
const FIGMA_12_202_W = 2060;
const FIGMA_12_202_H = 2028;
const FIGMA_12_202_CX = FIGMA_12_202_W / 2;

function figma12X(px) {
  return (px / FIGMA_12_202_W) * F0_RIGHT;
}

function figma12Y(px) {
  return (px / FIGMA_12_202_H) * F0_RIGHT;
}

export const PRE_STEP_RIGHT_3_TEXT = {
  left: figma12X(FIGMA_12_202_CX - 553),
  top: figma12Y(897),
};

/** -3·-2 우 메인 검색 — 0단계 `STEP0_RIGHT_ICON_BLOB`과 동일 위치·크기 */
export const PRE_STEP_RIGHT_2_SEARCH = {
  centerX: STEP0_RIGHT_ICON_BLOB.centerX,
  centerY: STEP0_RIGHT_ICON_BLOB.centerY,
  size: STEP0_RIGHT_ICON_BLOB.size,
};

/** -2 우 arc — Figma 대비 위로 (캘린더·갤러리 공통) */
const PRE_STEP_RIGHT_2_ARC_UP_FIGMA_PX = 118;

/** 12:679 — calendar (215, opacity 40%) */
export const PRE_STEP_RIGHT_2_CALENDAR = {
  centerX: figma638X(FIGMA_12_638_CX - 17.5),
  centerY: figma638Y(226 + 215 / 2 - PRE_STEP_RIGHT_2_ARC_UP_FIGMA_PX),
  size: figma638X(215),
};

/** 12:638 / 32:291 — gallery (231) */
export const PRE_STEP_RIGHT_2_GALLERY = {
  centerX: figma638X(437 + 231 / 2),
  centerY: figma638Y(441 + 231 / 2 - PRE_STEP_RIGHT_2_ARC_UP_FIGMA_PX),
  size: figma638X(231),
};
