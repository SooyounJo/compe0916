import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S,
} from "@/ux2/lib/ux2Ux1Step45Timing";

/** 4단계 우측 카메라 등장이 눈에 띈 뒤 보이스 제거 */
export function ux2Step4RightVoiceHideDelayS() {
  return UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S + UX2_UX1_STEP4_ENTER_ANIM_S * 0.42;
}

/** 5 진입 — 우 people(카메라 위) 먼저 */
export const UX2_STEP5_DUAL_PEOPLE_DELAY_S = 0.32;

/** people 등장 후 좌측 카메라 */
export const UX2_STEP5_DUAL_LEFT_CAMERA_AFTER_PEOPLE_S = 0.58;

export function ux2Step5DualLeftCameraDelayS() {
  return UX2_STEP5_DUAL_PEOPLE_DELAY_S + UX2_STEP5_DUAL_LEFT_CAMERA_AFTER_PEOPLE_S;
}

/** 좌 카메라 후 우 하단 카메라 handoff (4단계 정착 블롭 교체) */
export const UX2_STEP5_DUAL_RIGHT_VIDEO_AFTER_LEFT_CAMERA_S = 0.48;

export function ux2Step5DualRightVideoHandoffDelayS() {
  return (
    ux2Step5DualLeftCameraDelayS() + UX2_STEP5_DUAL_RIGHT_VIDEO_AFTER_LEFT_CAMERA_S
  );
}
