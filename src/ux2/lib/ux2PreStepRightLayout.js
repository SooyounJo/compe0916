import { F0, F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";
import {
  PRE_STEP_1_INSTAGRAM,
  PRE_STEP_2_SEARCH,
} from "@/ux2/lib/ux2PreStepLayout";

/** 좌측 프리 스텝 중심 → 우측 원 좌측(수평 대칭) */
export function mirrorPreStepCenterX(leftCenterX) {
  const dx = leftCenterX - F0 / 2;
  return F0_RIGHT / 2 - dx;
}

export function scalePreStepCenterY(leftCenterY) {
  return (leftCenterY / F0) * F0_RIGHT;
}

/** -2·-1 우측 — 좌측 검색·인스타 블롭과 대칭 */
export const PRE_STEP_RIGHT_SEARCH = {
  centerX: mirrorPreStepCenterX(PRE_STEP_2_SEARCH.centerX),
  centerY: scalePreStepCenterY(PRE_STEP_2_SEARCH.centerY),
};

export const PRE_STEP_RIGHT_INSTAGRAM = {
  centerX: mirrorPreStepCenterX(PRE_STEP_1_INSTAGRAM.centerX),
  centerY: scalePreStepCenterY(PRE_STEP_1_INSTAGRAM.centerY),
};
