function parsePct(value) {
  return parseFloat(value);
}

function cqwDelta(fromLeft, fromTop, toLeft, toTop) {
  return {
    dx: `${parsePct(fromLeft) - parsePct(toLeft)}cqw`,
    dy: `${parsePct(fromTop) - parsePct(toTop)}cqw`,
  };
}

/** 좌 4→5 — 정착점 기준 transform 직선 (우상향) */
export function ux2LeftHandoffStyleVars(icon) {
  if (icon.handoff === "relocate" && icon.handoffEndLeft) {
    const { dx, dy } = cqwDelta(
      icon.left,
      icon.top,
      icon.handoffEndLeft,
      icon.handoffEndTop,
    );
    return {
      "--orbit-end-left": icon.handoffEndLeft,
      "--orbit-end-top": icon.handoffEndTop,
      "--orbit-end-opacity": icon.opacity ?? 1,
      "--handoff-dx": dx,
      "--handoff-dy": dy,
    };
  }

  if (icon.handoff === "exit") {
    const exitDx = icon.id === "people" ? "28cqw" : "24cqw";
    const exitDy = icon.id === "people" ? "-26cqw" : "-22cqw";
    return {
      "--orbit-end-left": icon.left,
      "--orbit-end-top": icon.top,
      "--orbit-end-opacity": icon.opacity ?? 1,
      "--handoff-exit-dx": exitDx,
      "--handoff-exit-dy": exitDy,
    };
  }

  return {};
}

/** 우 4→5 — 좌측 원 쪽(9시)에서 슬롯으로 우상향 직선 */
export function ux2RightHandoffTransformVars(endLeftPct, endTopPct) {
  const endL = parsePct(endLeftPct);
  const endT = parsePct(endTopPct);
  const startL = endL - 16;
  const startT = endT + 16;

  return {
    "--handoff-from-start-dx": `${startL - endL}cqw`,
    "--handoff-from-start-dy": `${startT - endT}cqw`,
  };
}
