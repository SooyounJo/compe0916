import { F0, STEP0_TEXT } from "@/ux2/lib/ux2Step0Layout";
import {
  LEFT_STEP5_ICONS,
  LEFT_STEP5_INNER_PCT,
} from "@/ux2/lib/leftOrbitStep5";
import { withUx2IconEntryPath } from "@/ux2/lib/ux2IconEntryPath";

/** Figma [8:190](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-190) — 아이콘은 leftOrbitStep5(17:1686) 좌표 */
export const F_LEFT5 = F0;
const CX5 = F_LEFT5 / 2;
const CY5 = F_LEFT5 / 2;

/** rim에 붙어 보이는 보정 — 중심 쪽으로 (0~1) */
const UX2_STEP5_ICON_RIM_INSET = 0.17;
/** inset 이후 우·하단으로 미세 이동 (F0 px) */
const UX2_STEP5_ICON_NUDGE_X_PX = 38;
const UX2_STEP5_ICON_NUDGE_Y_PX = 30;

function insetStep5IconTowardCenter(leftPct, topPct) {
  const x = (parseFloat(leftPct) / 100) * F_LEFT5;
  const y = (parseFloat(topPct) / 100) * F_LEFT5;
  const t = 1 - UX2_STEP5_ICON_RIM_INSET;
  return {
    left: `${((CX5 + (x - CX5) * t) / F_LEFT5) * 100}%`,
    top: `${((CY5 + (y - CY5) * t) / F_LEFT5) * 100}%`,
  };
}

function nudgeStep5IconTowardBottomRight(leftPct, topPct) {
  const x = (parseFloat(leftPct) / 100) * F_LEFT5 + UX2_STEP5_ICON_NUDGE_X_PX;
  const y = (parseFloat(topPct) / 100) * F_LEFT5 + UX2_STEP5_ICON_NUDGE_Y_PX;
  return {
    left: `${(x / F_LEFT5) * 100}%`,
    top: `${(y / F_LEFT5) * 100}%`,
  };
}

export function pctLeft5(px) {
  return (px / F_LEFT5) * 100;
}

/** 0단계 텍스트 박스와 동일 앵커(상단 기준) */
export const STEP5_LEFT_PROMPT = {
  left: STEP0_TEXT.left,
  top: STEP0_TEXT.top,
};

export const STEP5_LEFT_ICONS = LEFT_STEP5_ICONS.map((icon) => {
  const withPath = withUx2IconEntryPath(icon);
  const inset = insetStep5IconTowardCenter(withPath.left, withPath.top);
  const { left, top } = nudgeStep5IconTowardBottomRight(inset.left, inset.top);
  return { ...withPath, left, top };
});
export const STEP5_LEFT_INNER_PCT = LEFT_STEP5_INNER_PCT;

/** 4→5 video → music 슬롯 — 우측 카메라 블롭 높이 맞춤용 */
export function step5LeftMusicCenterTopPct() {
  const music = STEP5_LEFT_ICONS.find((icon) => icon.id === "music");
  return music ? parseFloat(music.top) : 0;
}
