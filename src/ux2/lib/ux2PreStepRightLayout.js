import { F0, F0_RIGHT, STEP0_RIGHT_ICON_BLOB } from "@/ux2/lib/ux2Step0Layout";
import { PRE_STEP_4_COCKTAIL } from "@/ux2/lib/ux2PreStepLayout";

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

/** -1·-4·-3·-2 검색 등 — 0단계 우측 아이콘 블롭과 동일 중심 */
export const PRE_STEP_RIGHT_SEARCH = { ...STEP0_RIGHT_SLOT };

export const PRE_STEP_RIGHT_INSTAGRAM = { ...STEP0_RIGHT_SLOT };

export const PRE_STEP_RIGHT_4_COCKTAIL = {
  ...STEP0_RIGHT_SLOT,
  size: PRE_STEP_4_COCKTAIL.size,
};

/** Figma 1:602 — 카피 baseline */
export const PRE_STEP_RIGHT_4_PROMPT = {
  top: (1474 / F0) * F0_RIGHT,
};

/** -3 보이스 아이콘 — 0 슬롯 중심, 크기만 보이스 */
export const PRE_STEP_RIGHT_3_VOICE = {
  ...STEP0_RIGHT_SLOT,
  size: (138 / F0) * F0_RIGHT,
};

/** Figma [12:202](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-202) — 카피만 */
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

/** -2 우측 arc — 검색은 0 슬롯, 나머지 arc는 Figma 12:638 */
export const PRE_STEP_RIGHT_2_SEARCH = {
  ...STEP0_RIGHT_SLOT,
  size: STEP0_RIGHT_ICON_BLOB.size,
};

/** arc 아이콘 — 원 중심에서 rim 쪽으로 (너무 안쪽일 때) */
function nudgePreStep2ArcOutward(centerX, centerY, extraPx = 102) {
  const cx = F0_RIGHT / 2;
  const cy = F0_RIGHT / 2;
  const dx = centerX - cx;
  const dy = centerY - cy;
  const len = Math.hypot(dx, dy) || 1;
  return {
    centerX: centerX + (dx / len) * extraPx,
    centerY: centerY + (dy / len) * extraPx,
  };
}

const PRE_STEP_2_CALENDAR_RAW = {
  centerX: figma12X(FIGMA_12_202_CX - 17.5),
  centerY: figma12Y(226 + 215 / 2),
  size: figma12X(215),
};

const PRE_STEP_2_GALLERY_RAW = {
  centerX: figma12X(437 + 231 / 2),
  centerY: figma12Y(441 + 231 / 2),
  size: figma12X(231),
};

export const PRE_STEP_RIGHT_2_CALENDAR = {
  ...PRE_STEP_2_CALENDAR_RAW,
  ...nudgePreStep2ArcOutward(
    PRE_STEP_2_CALENDAR_RAW.centerX,
    PRE_STEP_2_CALENDAR_RAW.centerY,
    108,
  ),
};

export const PRE_STEP_RIGHT_2_GALLERY = {
  ...PRE_STEP_2_GALLERY_RAW,
  ...nudgePreStep2ArcOutward(
    PRE_STEP_2_GALLERY_RAW.centerX,
    PRE_STEP_2_GALLERY_RAW.centerY,
    96,
  ),
};
