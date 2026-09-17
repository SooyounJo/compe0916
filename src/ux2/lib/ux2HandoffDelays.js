/** UX2 4→5 — 짧은 스태거 (좌→우 흐름) */
const UX2_HANDOFF_DELAY_S = {
  people: 0,
  gallery: 0.05,
  edit: 0.04,
  bookmark: 0.09,
  video: 0.13,
};

export function ux2HandoffDelayS(icon) {
  if (icon.handoff === "exit" || icon.handoff === "relocate") {
    return UX2_HANDOFF_DELAY_S[icon.id] ?? 0;
  }
  return 0;
}
