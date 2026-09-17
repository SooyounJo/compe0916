/** Figma 18:295 원 + 58:188 피드 행 (1:897) */
export const CIRCLE_F = 1872.855;

export const FEED = {
  left: -265,
  top: 269,
  width: 2419,
  height: 1374,
};

export const SIDE = {
  width: 698,
  height: 935.01,
  top: 303,
  leftX: 0,
  rightX: 1721,
};

export const CENTER_COL = {
  left: 781,
  top: 0,
  width: 857,
  height: 1374,
  cardHeight: 1148,
  titleTop: 1278,
  titleHeight: 96,
};

export const BLOB = {
  left: 349,
  top: 540,
  size: 275.75,
};

export function pctX(px, basis = FEED.width) {
  return (px / basis) * 100;
}

export function pctY(px, basis = FEED.height) {
  return (px / basis) * 100;
}

export function pctInCircle(px, basis = CIRCLE_F) {
  return (px / basis) * 100;
}
