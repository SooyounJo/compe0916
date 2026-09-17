import { F0, STEP0_TEXT } from "@/ux2/lib/ux2Step0Layout";

/** Figma [50:473](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-473) */
const F = F0;

export function pctLeft8(px) {
  return (px / F) * 100;
}

export function sizeCqwLeft8(px) {
  return (px / F) * 100;
}

export const STEP8_LEFT_VOICE = {
  centerX: 1601 + 138 / 2,
  centerY: 871 + 138 / 2,
  size: 138,
};

export const STEP8_LEFT_COMPOSE_BLOB = {
  centerX: 1501 + 275.75 / 2,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const STEP8_LEFT_QR_BLOB = {
  centerX: 1412 + 258.48162841796875 / 2,
  centerY: 1155 + 258.48162841796875 / 2,
  size: 258.48162841796875,
};

export const STEP8_LEFT_PROMPT = {
  left: STEP0_TEXT.left,
  top: 878,
};
