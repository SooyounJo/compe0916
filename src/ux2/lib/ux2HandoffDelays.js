/** UX2 4→5 — 좌: 위쪽(people)부터 순차 상승 퇴장 */
export const UX2_HANDOFF_DELAY_S = {
  people: 0,
  edit: 0.08,
  video: 0.16,
  gallery: 0.22,
};

export function ux2HandoffDelayS(icon) {
  if (
    icon.handoff === "exit" ||
    icon.handoff === "relocate" ||
    icon.handoff === "crossRight"
  ) {
    return UX2_HANDOFF_DELAY_S[icon.id] ?? 0;
  }
  return 0;
}
