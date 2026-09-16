import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";

/** Figma [50:522](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-522) */
const F = F0_RIGHT;

export function pctRight9(px) {
  return (px / F) * 100;
}

export function sizeCqwRight9(px) {
  return (px / F) * 100;
}

export const STEP9_RIGHT_MEMORY_CARD = {
  left: 514,
  top: 382,
  width: 857,
  height: 1148,
  /** Figma 100 → 모서리 검은 여백 제거용으로 cqw 반경 확대 (9·10 공통) */
  radiusPx: 100,
  radiusCqw: 9.8,
};

export const STEP9_RIGHT_CARD_TITLE = {
  left: 673,
  top: 455,
};

export const STEP9_RIGHT_HEART = {
  centerX: 1143 + 78 / 2,
  centerY: 1388 + 78 / 2,
  size: 78,
};

export const STEP9_RIGHT_BOOKMARK = {
  centerX: 1231 + 60.54917907714844 / 2,
  centerY: 1397 + 60.54917907714844 / 2,
  size: 60.54917907714844,
};

/** 50:547 — 좌측 QR 블롭 */
export const STEP9_RIGHT_QR_BLOB = {
  centerX: 84 + 275.75 / 2,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

/** 우측 원 전체 BG (제공 이미지 1) */
export const UX2_STEP9_RIGHT_BG = "/figma/ux2/step9/right-bg.png";
/** 메모리 카드 (제공 이미지 2) */
export const UX2_STEP9_MEMORY_CARD_PHOTO = "/figma/ux2/step9/memory-card.png";
