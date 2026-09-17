/** Figma 78:190 — 하단 rim 밖 좌측에서 슬롯으로 (transform 1구간 진입) */
export const UX2_LEFT_ORBIT_ARC_ENTRY = {
  left: `${(168 / 1879.5) * 100}%`,
  top: `${(1668 / 1879.5) * 100}%`,
};

function parsePct(value) {
  return parseFloat(value);
}

export function withUx2IconEntryPath(icon) {
  const endL = parsePct(icon.left);
  const endT = parsePct(icon.top);
  const startL = parsePct(UX2_LEFT_ORBIT_ARC_ENTRY.left);
  const startT = parsePct(UX2_LEFT_ORBIT_ARC_ENTRY.top);

  return {
    ...icon,
    entryStartLeft: UX2_LEFT_ORBIT_ARC_ENTRY.left,
    entryStartTop: UX2_LEFT_ORBIT_ARC_ENTRY.top,
    entryFromDxCqw: `${startL - endL}cqw`,
    entryFromDyCqw: `${startT - endT}cqw`,
  };
}
