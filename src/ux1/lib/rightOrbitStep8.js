import {
  LEFT_ORBIT_STEP4_ENTRY_STAGGER_S,
  UX1_STEP4_EXIT_ANIM_S,
} from "./leftOrbitStep4";

/** 좌 7 arc LTR 퇴장 — moon(0) … music(5) */
export const LEFT_ORBIT_STEP7_EXIT_ORDER = [
  "moon",
  "calendar",
  "cocktail",
  "burger",
  "people",
  "music",
];

export const UX1_STEP7_TO8_LEFT_EXIT_BASE_S = 0.15;

/** 좌 arc 거의 퇴장 시 — 우 와인·좌 텍스트 등장 */
export const UX1_STEP8_RIGHT_WINE_IN_DELAY_S =
  UX1_STEP7_TO8_LEFT_EXIT_BASE_S +
  4 * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S +
  UX1_STEP4_EXIT_ANIM_S * 0.58;

export const UX1_STEP8_RIGHT_WINE_IN_ANIM_S = 1.1;

export const UX1_STEP8_LEFT_TEXT_IN_DELAY_S = UX1_STEP8_RIGHT_WINE_IN_DELAY_S;
export const UX1_STEP8_LEFT_TEXT_IN_ANIM_S = 1.15;

export const UX1_STEP7_TO8_DOTS_MORPH_DELAY_S = 0.2;
export const UX1_STEP7_TO8_SOUND_OUT_ANIM_S = 0.85;

/** 8단계 우 삼각형 로딩 닷 — 정중앙 */
export const UX1_STEP8_RIGHT_DOTS_LEFT_PCT = 50;

/** step5 orbit 와인과 동일 지름 */
export const UX1_STEP8_RIGHT_WINE_SIZE_CQW = 14;

/** 스피커 슬롯(8.55%)보다 살짝 우측 */
export const UX1_STEP8_RIGHT_WINE_LEFT_PCT = 10.2;

export function step7To8LeftExitTotalS() {
  return (
    UX1_STEP7_TO8_LEFT_EXIT_BASE_S +
    5 * LEFT_ORBIT_STEP4_ENTRY_STAGGER_S +
    UX1_STEP4_EXIT_ANIM_S +
    0.2
  );
}

export function step7To8SequenceTotalS() {
  return (
    UX1_STEP8_RIGHT_WINE_IN_DELAY_S +
    UX1_STEP8_RIGHT_WINE_IN_ANIM_S +
    0.3
  );
}
