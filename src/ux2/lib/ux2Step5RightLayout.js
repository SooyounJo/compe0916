import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";

/** Figma [8:164](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-164) */
const F = F0_RIGHT;
const CX = F / 2;

export function pctRight5(px) {
  return (px / F) * 100;
}

export function sizeCqwRight5(px) {
  return (px / F) * 100;
}

export const STEP5_RIGHT_PROMPT = {
  top: 1476,
};

export const STEP5_RIGHT_CENTER_RING = {
  centerX: 571.14 + 731 / 2,
  centerY: CX + 0.36,
  size: 731,
};

/** 5단계 링 clip 크기 유지, PNG만 링 안에서 축소 */
export const STEP5_CENTER_HALFTONE_PHOTO_SCALE = 0.76;

/** Figma 8:164 — people ↔ video 슬롯 좌표 교환 */
export const STEP5_RIGHT_PEOPLE = {
  centerX: 297.14 + 251.945 / 2,
  centerY: 353 + 251.945 / 2,
  size: 251.945,
};

/** video(카메라) — F0_RIGHT px, 블롭 중심 (RightCompanionStep5 정착점) */
export const STEP5_RIGHT_VIDEO = {
  centerX: 222.31,
  /** 809 행 — 좌측 6·7 music/video 블롭과 동일 Y */
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

/** 위 숫자 미세 조정용 (centerX/Y에 더함) */
export const STEP5_RIGHT_VIDEO_NUDGE = {
  x: 0,
  y: 0,
};

/** 5·6 우측 카메라(video) 블롭 — 동일 정착점 (F0_RIGHT px) */
export function ux2RightVideoBlobCenterPx() {
  return {
    centerX: STEP5_RIGHT_VIDEO.centerX + STEP5_RIGHT_VIDEO_NUDGE.x,
    centerY: STEP5_RIGHT_VIDEO.centerY + STEP5_RIGHT_VIDEO_NUDGE.y,
    size: STEP5_RIGHT_VIDEO.size,
  };
}
