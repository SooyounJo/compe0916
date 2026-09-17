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

/** Figma 1:572 — -4 */
export const PRE_STEP_4_COCKTAIL = {
  centerX: CX + 672.13,
  centerY: 847 + 275.75 / 2,
  size: 275.75,
};

export const PRE_STEP_4_PROMPT = {
  top: 1407,
};

export const PRE_STEP_2_PROMPT = {
  top: 1404,
};

const STEP0_SEARCH_CENTER = centerOf(STEP0_SEARCH_BLOB);
const STEP0_IG_CENTER = centerOf(STEP0_INSTAGRAM_BLOB);

/** Figma 12:691 — -1 · 0 handoff 슬롯 (우측 검색·하단 인스타) */
export const PRE_STEP_1_SEARCH = {
  centerX: STEP0_SEARCH_CENTER.x,
  centerY: STEP0_SEARCH_CENTER.y,
  size: STEP0_SEARCH_BLOB.size,
};

export const PRE_STEP_1_INSTAGRAM = {
  centerX: STEP0_IG_CENTER.x,
  centerY: STEP0_IG_CENTER.y,
  size: STEP0_INSTAGRAM_BLOB.size,
};

export const PRE_STEP_0_MATCH_BLOB_SIZE = STEP0_SEARCH_BLOB.size;

export const PRE_STEP_1_PROMPT = {
  left: CX - 685.75,
  top: CX - 107.75,
};

export { STEP4_LEFT_DOTS as PRE_STEP_DOTS, STEP4_LEFT_VOICE as PRE_STEP_VOICE };

export const PRE_STEP_GRADIENT =
  "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)";
