/** Figma [8:164](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-164) 프레임 */
const F = 1872.27734375;

export function pctRight5(px) {
  return (px / F) * 100;
}

export function sizeCqwRight5(px) {
  return (px / F) * 100;
}

export const STEP5_RIGHT_PROMPT = {
  top: 1476,
};

/** Figma 48:147 — Ellipse 8220 */
export const STEP5_RIGHT_CENTER_RING = {
  centerX: 571.140625 + 731 / 2,
  centerY: 571 + 731 / 2,
  size: 731,
};

/** Figma 98:525 내부 할ft톤 — 링 안 crop */
export const STEP5_CENTER_HALFTONE_PHOTO_SCALE = 0.82;

/** Figma 8:186 — people (group) */
export const STEP5_RIGHT_PEOPLE = {
  centerX: 297.140625 + 251.945328 / 2,
  centerY: 353 + 251.945328 / 2,
  size: 251.945328,
};

/** Figma 8:183 — icon blob (alwaysask / video) */
export const STEP5_RIGHT_VIDEO = {
  centerX: 84.140625 + 275.75 / 2,
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
