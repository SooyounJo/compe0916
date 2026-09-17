import {
  centerOf,
  F0,
  STEP0_INSTAGRAM_BLOB,
  STEP0_SEARCH_BLOB,
} from "@/ux2/lib/ux2Step0Layout";
import {
  STEP4_LEFT_DOTS,
  STEP4_LEFT_VOICE,
} from "@/ux2/lib/ux2Step4Layout";

const F = F0;
const CX = F / 2;

export function pctPre(px) {
  return (px / F) * 100;
}

export function sizeCqwPre(px) {
  return (px / F) * 100;
}

/** 0단계 handoff 슬롯 중심 */
const STEP0_SEARCH_CENTER = centerOf(STEP0_SEARCH_BLOB);
const STEP0_IG_CENTER = centerOf(STEP0_INSTAGRAM_BLOB);

export const PRE_STEP_4_COCKTAIL = {
  centerX: STEP0_SEARCH_CENTER.x,
  centerY: STEP0_SEARCH_CENTER.y,
  size: STEP0_SEARCH_BLOB.size,
};

/** -2 우 캘린더 arc — 좌 Figma rim (0 슬롯과 별도) */
export const PRE_STEP_2_CALENDAR_ARC = {
  centerX: CX + 672.13,
  centerY: 847 + 275.75 / 2,
  size: 275.75,
};

export const PRE_STEP_4_PROMPT = {
  top: 1407,
};

/** Figma [12:638](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-638) arc → F0 — -2 좌측 */
const FIGMA_12_W = 2060;
const FIGMA_12_H = 2028;
const FIGMA_12_CX = FIGMA_12_W / 2;

function figmaArcX(px) {
  return (px / FIGMA_12_W) * F0;
}

function figmaArcY(px) {
  return (px / FIGMA_12_H) * F0;
}

export const PRE_STEP_2_SEARCH = {
  centerX: figmaArcX(FIGMA_12_CX - 667.13),
  centerY: figmaArcY(FIGMA_12_H / 2 - 0.13),
  size: 275.75,
};

/** -2 인스타 — 12:638 갤러리 arc 슬롯 */
export const PRE_STEP_2_INSTAGRAM = {
  centerX: figmaArcX(437 + 231 / 2),
  centerY: figmaArcY(441 + 231 / 2),
  size: 231,
};

export const PRE_STEP_2_PROMPT = {
  top: 1404,
};

/** Figma 12:691 — -1 · 0 handoff 슬롯 (우측 검색·하단 인스타) */
export const PRE_STEP_1_SEARCH = {
  centerX: STEP0_SEARCH_CENTER.x,
  centerY: STEP0_SEARCH_CENTER.y,
  size: STEP0_SEARCH_BLOB.size,
};

/** 하단 인스타 — 0단계 `Ux2Step0IconMotion` origin 블롭(275.75)과 동일 */
export const PRE_STEP_1_INSTAGRAM = {
  centerX: STEP0_IG_CENTER.x,
  centerY: STEP0_IG_CENTER.y,
  size: STEP0_SEARCH_BLOB.size,
};

export const PRE_STEP_0_MATCH_BLOB_SIZE = STEP0_SEARCH_BLOB.size;

export const PRE_STEP_1_PROMPT = {
  left: CX - 685.75,
  top: CX - 107.75,
};

export { STEP4_LEFT_DOTS as PRE_STEP_DOTS, STEP4_LEFT_VOICE as PRE_STEP_VOICE };

export const PRE_STEP_GRADIENT =
  "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)";
