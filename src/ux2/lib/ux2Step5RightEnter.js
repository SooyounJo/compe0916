/** 우측 5 handoff — globals icon-orbit-enter-handoff 1.75s */
export const UX2_STEP5_RIGHT_HANDOFF_S = 1.75;

/** UX2: 긴 대기(1s+) 제거 — 좌 이탈과 겹치되 바로 곡선 진입 */
export const UX2_STEP5_RIGHT_ENTER = [
  { id: "people", delayS: 0.1 },
  { id: "video", delayS: 0.22 },
  { id: "ring", delayS: 0.38 },
];

export function ux2Step5RightEnterDelayS(id) {
  const row = UX2_STEP5_RIGHT_ENTER.find((e) => e.id === id);
  return row?.delayS ?? 0.6;
}
