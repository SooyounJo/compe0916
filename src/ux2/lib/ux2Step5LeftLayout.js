import { F0, STEP0_TEXT } from "@/ux2/lib/ux2Step0Layout";
import {
  LEFT_STEP5_ICONS,
  LEFT_STEP5_INNER_PCT,
} from "@/ux2/lib/leftOrbitStep5";
import { withUx2IconEntryPath } from "@/ux2/lib/ux2IconEntryPath";

/** Figma [8:190](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-190) — 아이콘은 leftOrbitStep5(17:1686) 좌표 */
export const F_LEFT5 = F0;

export function pctLeft5(px) {
  return (px / F_LEFT5) * 100;
}

/** 0단계 텍스트 박스와 동일 앵커(상단 기준) */
export const STEP5_LEFT_PROMPT = {
  left: STEP0_TEXT.left,
  top: STEP0_TEXT.top,
};

export const STEP5_LEFT_ICONS = LEFT_STEP5_ICONS.map(withUx2IconEntryPath);
export const STEP5_LEFT_INNER_PCT = LEFT_STEP5_INNER_PCT;
