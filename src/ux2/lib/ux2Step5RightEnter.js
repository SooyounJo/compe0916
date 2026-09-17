/** 우측 5 rise handoff 길이 */
export const UX2_STEP5_RIGHT_HANDOFF_S = 1.05;

import {
  ux2Step5CenterRingEnterDelayS,
  ux2Step5RightRiseEnterDelayS,
} from "@/ux2/lib/ux2Step4To5CrossHandoff";

/** 우 — 좌 퇴장 완료 후 people → video */
export const UX2_STEP5_RIGHT_ENTER = [
  { id: "people", delayS: ux2Step5RightRiseEnterDelayS("people") },
  { id: "video", delayS: ux2Step5RightRiseEnterDelayS("video") },
  { id: "ring", delayS: ux2Step5CenterRingEnterDelayS() },
];

export function ux2Step5RightEnterDelayS(id) {
  const row = UX2_STEP5_RIGHT_ENTER.find((e) => e.id === id);
  return row?.delayS ?? 0.6;
}

/** 중앙 할ft톤 링 */
export const UX2_STEP5_CENTER_RING_GROW_S = 1.15;

export function ux2Step5CenterRingEnterDelayMs() {
  return ux2Step5RightEnterDelayS("ring") * 1000;
}
