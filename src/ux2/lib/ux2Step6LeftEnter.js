import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_ENTRY_BASE_S,
  UX2_UX1_STEP4_ENTRY_STAGGER_S,
} from "@/ux2/lib/ux2Ux1Step45Timing";

/** 6단계 좌 arc — dots → video(music) */
export const UX2_STEP6_LEFT_ENTER_ORDER = ["dots", "music"];

export function ux2Step6LeftEnterDelayS(id) {
  const index = UX2_STEP6_LEFT_ENTER_ORDER.indexOf(id);
  if (index < 0) {
    return 0;
  }
  return index * UX2_UX1_STEP4_ENTRY_STAGGER_S;
}

/** LeftCompanionStep6 party-night-foreground transition-delay (globals.css) */
export const UX2_STEP6_LEFT_FOREGROUND_IN_DELAY_S = 0.85;

/** 우측 하단 QR — 전경·video arc 후 blur·opacity (처음엔 DOM 없음) */
export function ux2Step6LeftQrBlurEnterDelayS() {
  return (
    UX2_STEP6_LEFT_FOREGROUND_IN_DELAY_S +
    UX2_UX1_STEP4_ENTRY_BASE_S +
    ux2Step6LeftEnterDelayS("music") +
    UX2_UX1_STEP4_ENTER_ANIM_S * 0.58
  );
}
