import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_ENTRY_BASE_S,
  ux2Ux1Step4StaggerDelayS,
} from "@/ux2/lib/ux2Ux1Step45Timing";

/** -3 좌 arc — 4단계 arc와 동일 enter 속도 */
export const UX2_PRE_STEP3_ICON_ORDER = [
  "edit",
  "gallery",
  "video",
  "people",
];

export const UX2_PRE_STEP3_ICON_DURATION_S = UX2_UX1_STEP4_ENTER_ANIM_S;

export function ux2PreStep3IconEnterDelayS(iconId) {
  if (UX2_PRE_STEP3_ICON_ORDER.indexOf(iconId) < 0) {
    return 0;
  }
  return UX2_UX1_STEP4_ENTRY_BASE_S + ux2Ux1Step4StaggerDelayS(iconId);
}

/** Figma 12:303 — 보이스 슬롯(3시) 인터넷 검색, arc people과 동시 */
export function ux2PreStep3SearchAtVoiceDelayS() {
  return ux2PreStep3IconEnterDelayS("people");
}

/** -3 우측 카피 — 검색 블롭 reveal 끝난 뒤 */
export function ux2PreStep3RightTextEnterDelayS() {
  return (
    ux2PreStep3SearchAtVoiceDelayS() + UX2_PRE_STEP3_ICON_DURATION_S * 0.78
  );
}

export const UX2_PRE_STEP3_RIGHT_TEXT_DURATION_S = 0.88;

/** -3→-2 좌 arc 퇴장 */
export const UX2_PRE_STEP3_EXIT_DURATION_S = 1.08;
export const UX2_PRE_STEP3_EXIT_BASE_S = 0.1;
export const UX2_PRE_STEP3_EXIT_STAGGER_S = 0.14;

const UX2_PRE_STEP3_EXIT_ORDER = ["video", "gallery", "edit", "people"];

export function ux2PreStep3IconExitDelayS(iconId) {
  const index = UX2_PRE_STEP3_EXIT_ORDER.indexOf(iconId);
  if (index < 0) {
    return UX2_PRE_STEP3_EXIT_BASE_S;
  }
  return UX2_PRE_STEP3_EXIT_BASE_S + index * UX2_PRE_STEP3_EXIT_STAGGER_S;
}

export function ux2PreStep3ArcExitTotalMs() {
  const lastIndex = UX2_PRE_STEP3_EXIT_ORDER.length - 1;
  return (
    (UX2_PRE_STEP3_EXIT_BASE_S +
      lastIndex * UX2_PRE_STEP3_EXIT_STAGGER_S +
      UX2_PRE_STEP3_EXIT_DURATION_S) *
      1000 +
    100
  );
}
