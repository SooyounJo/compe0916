/** 5·6번 궤도 아이콘 — Figma 17:1656 + inset (Party 6 좌측과 동일 기준) */
export const ORBIT_INSET = 0.84;
export const ORBIT_CENTER = { x: 50, y: 50 };

export function insetOrbitPosition(leftPct, topPct) {
  const { x, y } = ORBIT_CENTER;
  return {
    left: `${x + (leftPct - x) * ORBIT_INSET}%`,
    top: `${y + (topPct - y) * ORBIT_INSET}%`,
  };
}

export const ORBIT_WINE = {
  sizeCqw: 13.47,
  /** Figma 12.23% / 50% → 좌측 하단 arc (top 아래로) */
  ...insetOrbitPosition(12.23, 58),
};
