import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S,
  ux2Ux1Step4IconExitEndS,
} from "@/ux2/lib/ux2Ux1Step45Timing";
import { UX2_STEP5_GAP_AFTER_LEFT_S } from "@/ux2/lib/ux2Step4To5CrossHandoff";

/** 4단계 우측 카메라 등장이 눈에 띈 뒤 보이스 제거 */
export function ux2Step4RightVoiceHideDelayS() {
  return UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S + UX2_UX1_STEP4_ENTER_ANIM_S * 0.42;
}

/** 좌 하단(video) arc 퇴장 끝 → 우 people(위) */
export function ux2Step5DualPeopleDelayS() {
  return ux2Ux1Step4IconExitEndS("video") + UX2_STEP5_GAP_AFTER_LEFT_S;
}

/** @deprecated — ux2Step5DualPeopleDelayS() 사용 */
export const UX2_STEP5_DUAL_PEOPLE_DELAY_S = ux2Step5DualPeopleDelayS();

/** people 등장 후 좌측 카메라 */
export const UX2_STEP5_DUAL_LEFT_CAMERA_AFTER_PEOPLE_S = 0.58;

export function ux2Step5DualLeftCameraDelayS() {
  return ux2Step5DualPeopleDelayS() + UX2_STEP5_DUAL_LEFT_CAMERA_AFTER_PEOPLE_S;
}

/** 좌 카메라 후 우 하단 카메라 handoff (4단계 정착 블롭 교체) */
export const UX2_STEP5_DUAL_RIGHT_VIDEO_AFTER_LEFT_CAMERA_S = 0.48;

export function ux2Step5DualRightVideoHandoffDelayS() {
  return (
    ux2Step5DualLeftCameraDelayS() + UX2_STEP5_DUAL_RIGHT_VIDEO_AFTER_LEFT_CAMERA_S
  );
}

/** 우 arc·하단 블롭 handoff 후 중앙 할ft톤 링 1회 */
export const UX2_STEP5_DUAL_CENTER_RING_AFTER_VIDEO_S = 0.12;

export function ux2Step5DualCenterRingDelayS() {
  return (
    ux2Step5DualRightVideoHandoffDelayS() +
    UX2_STEP5_DUAL_CENTER_RING_AFTER_VIDEO_S
  );
}
