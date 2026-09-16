/** rim handoff — 좌 이탈은 원호, 우 진입은 Figma 슬롯 기준 고정 S */

const ARC_CX = 50;
const ARC_CY = 50;
const ARC_R = 44;

/** 0°=12시, 시계방향 */
export function circleRim(degFromNorth) {
  const rad = (degFromNorth * Math.PI) / 180;
  return {
    left: `${ARC_CX + ARC_R * Math.sin(rad)}%`,
    top: `${ARC_CY - ARC_R * Math.cos(rad)}%`,
  };
}

function lerpNum(from, to, t) {
  return from + (to - from) * t;
}

export const LEFT_SEAM_DEG = 90;
export const RIGHT_SEAM_DEG = 270;

export const LEFT_SEAM = circleRim(LEFT_SEAM_DEG);
const RIGHT_SEAM = circleRim(RIGHT_SEAM_DEG);

export function leftExitRimAlongArc(fromDeg) {
  const seam = LEFT_SEAM_DEG;
  const pt = (t) => circleRim(lerpNum(fromDeg, seam, t));
  return {
    rimA: pt(0.14),
    rimB: pt(0.32),
    rimC: pt(0.52),
    rimD: pt(0.72),
    seam: circleRim(seam),
    bridge: circleRim(lerpNum(seam, 84, 0.22)),
  };
}

/** 우 5 — 세로 중앙(9시)에서 슬롯으로 (Figma inset end는 CSS 100%) */
const RIGHT_HANDOFF_S = {
  start: RIGHT_SEAM,
  kneeA: { left: "8.5%", top: "44%" },
  kneeB: { left: "13%", top: "35%" },
  kneeC: { left: "18%", top: "28%" },
  kneeD: { left: "22%", top: "24%" },
};

export function rightHandoffSStyleVars() {
  const s = RIGHT_HANDOFF_S;
  return {
    "--handoff-s-start-left": s.start.left,
    "--handoff-s-start-top": s.start.top,
    "--handoff-s-a-left": s.kneeA.left,
    "--handoff-s-a-top": s.kneeA.top,
    "--handoff-s-b-left": s.kneeB.left,
    "--handoff-s-b-top": s.kneeB.top,
    "--handoff-s-c-left": s.kneeC.left,
    "--handoff-s-c-top": s.kneeC.top,
    "--handoff-s-d-left": s.kneeD.left,
    "--handoff-s-d-top": s.kneeD.top,
  };
}

/** @deprecated */
export const LEFT_HANDOFF_S = {
  dip: LEFT_SEAM,
  out: LEFT_SEAM,
  mid: LEFT_SEAM,
  bridge: circleRim(84),
};

export function leftHandoffSStyleVars() {
  return {};
}
