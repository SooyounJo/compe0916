import { F0 } from "@/ux2/lib/ux2Step0Layout";

/** Figma [8:361](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-361) */
const F = F0;

export function pctLeft7(px) {
  return (px / F) * 100;
}

export function sizeCqwLeft7(px) {
  return (px / F) * 100;
}

/** 8:372 — 상단 에이전트 닷 */
export const STEP7_LEFT_DOTS = {
  top: 912,
  width: 138.091,
  height: 55.767,
};

/** 8:365 — 우측 보이스 */
export const STEP7_LEFT_VOICE = {
  centerX: F / 2 + 730.25,
  centerY: F / 2 + 0.25,
  size: 138,
};

/** 8:367 — always ask 블롭 */
export const STEP7_LEFT_ALWAYS_ASK = {
  centerX: F / 2 + 699.13,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const STEP7_LEFT_PROMPT = {
  top: 1459,
};

/** Figma 50:465 우측 video 블롭과 듀얼 대칭 — 7·8 좌측 뮤직만 */
export const STEP7_LEFT_MUSIC_BLOB = {
  centerX: F - (84 + 275.75 / 2),
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};
