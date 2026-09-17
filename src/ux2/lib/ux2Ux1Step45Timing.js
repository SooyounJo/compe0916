/** origin/main UX1 leftOrbitStep4 — 4·5단계 모션 타이밍 */

const SLOT_SPACING_DEG = 26;
const ENTRY_DEG_PER_S = 92;

export const UX2_UX1_STEP4_ENTRY_BASE_S = 0.2;
export const UX2_UX1_STEP4_ENTRY_STAGGER_S =
  SLOT_SPACING_DEG / ENTRY_DEG_PER_S;

export const UX2_UX1_STEP4_ENTER_ANIM_S = 1.45;
export const UX2_UX1_STEP4_EXIT_ANIM_S = 1.2;

/** 좌 arc 좌→우 진입 순서 (edit … people) */
export const UX2_UX1_STEP4_ENTRY_ORDER = [
  "edit",
  "gallery",
  "video",
  "people",
];

export function ux2Ux1Step4StaggerDelayS(iconId) {
  const index = UX2_UX1_STEP4_ENTRY_ORDER.indexOf(iconId);
  if (index < 0) {
    return 0;
  }
  return index * UX2_UX1_STEP4_ENTRY_STAGGER_S;
}

export const UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S =
  UX2_UX1_STEP4_ENTRY_BASE_S +
  3 * UX2_UX1_STEP4_ENTRY_STAGGER_S +
  UX2_UX1_STEP4_ENTER_ANIM_S;

const UX2_UX1_STEP4_MUSIC_ENTER_ANIM_S = 1.45;
const UX2_UX1_STEP4_POST_REVEAL_BUFFER_MS = 3200;

export function ux2Ux1Step5WineFooterDelayS() {
  return (
    UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S +
    UX2_UX1_STEP4_MUSIC_ENTER_ANIM_S * 0.72 +
    0.45
  );
}

/** 4 arc 5개 퇴장 완료 (UX2는 4개 아이콘) */
export function ux2Ux1Step4To5ExitTotalS() {
  return (
    UX2_UX1_STEP4_ENTRY_BASE_S +
    3 * UX2_UX1_STEP4_ENTRY_STAGGER_S +
    UX2_UX1_STEP4_EXIT_ANIM_S
  );
}
