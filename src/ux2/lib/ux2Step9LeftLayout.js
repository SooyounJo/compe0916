import { F0 } from "@/ux2/lib/ux2Step0Layout";

/** Figma [50:506](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-506) */
const F = F0;

export function pctLeft9(px) {
  return (px / F) * 100;
}

export function sizeCqwLeft9(px) {
  return (px / F) * 100;
}

export const STEP9_LEFT_DOTS = {
  centerX: 870.70703125 + 138.090576171875 / 2,
  centerY: 912 + 55.767356872558594 / 2,
  width: 138.090576171875,
  height: 55.767356872558594,
};

export const STEP9_LEFT_VOICE = {
  centerX: 1601 + 138 / 2,
  centerY: 871 + 138 / 2,
  size: 138,
};

export const STEP9_LEFT_QR_BLOB = {
  centerX: 1501 + 275.75 / 2,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const STEP9_LEFT_PROMPT = {
  top: 1402,
};
