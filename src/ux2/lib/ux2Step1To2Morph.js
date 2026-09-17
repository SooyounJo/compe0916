import { F0_RIGHT, STEP0_RIGHT_ROW } from "@/ux2/lib/ux2Step0Layout";
import {
  CENTER_COL,
  FEED,
  SIDE,
} from "@/ux2/lib/ux2Step2RightFeed";

const F = F0_RIGHT;

const STEP1_CONT_LEFT = (F - 1728) / 2;
const STEP1_CONT_TOP = 516;
const STEP1_CONT_W = 1728;
const STEP1_CONT_H = 839;

function pct(px) {
  return (px / F) * 100;
}

function step1Rect(leftInCont, topInCont, wInCont, hInCont, opacity = 1) {
  return {
    left: pct(STEP1_CONT_LEFT + (leftInCont / STEP1_CONT_W) * STEP1_CONT_W),
    top: pct(STEP1_CONT_TOP + (topInCont / STEP1_CONT_H) * STEP1_CONT_H),
    width: pct((wInCont / STEP1_CONT_W) * STEP1_CONT_W),
    height: pct((hInCont / STEP1_CONT_H) * STEP1_CONT_H),
    radiusCqw: 4.5,
    opacity,
  };
}

function step2Rect(xInFeed, yInFeed, w, h, opacity = 1, radiusCqw = 3.35) {
  return {
    left: pct(FEED.left + xInFeed),
    top: pct(FEED.top + yInFeed),
    width: pct(w),
    height: pct(h),
    radiusCqw,
    opacity,
  };
}

export const BLOB_ORIGIN_PCT = {
  x: pct(STEP0_RIGHT_ROW.left + STEP0_RIGHT_ROW.blobSize / 2),
  y: pct(STEP0_RIGHT_ROW.top + STEP0_RIGHT_ROW.height / 2),
};

/** 1단계 — 좌→우 순차 등장 (작은 상태에서 슬롯으로) */
export const STEP1_CARD_INTRO_STAGGER_MS = 200;
export const STEP1_CARD_INTRO_SHIFT_CQW = 28;
export const STEP1_CARD_INTRO_SCALE = 0.34;

export const STEP1_CARD_INTRO_RANK = {
  left: 0,
  center: 1,
  right: 2,
};

/** 좌 · 중 · 우 — 원 기준 % (step1 글래스 → step2 피드) */
export const MORPH_CARDS = [
  {
    key: "left",
    kind: "side",
    image: "/figma/ux2/step2/934e4.png",
    step1: step1Rect(0, 144, 450, 551, 0.35),
    step2: step2Rect(SIDE.leftX, SIDE.top, SIDE.width, SIDE.height, 0.62),
  },
  {
    key: "center",
    kind: "hero",
    step1: step1Rect(535, 0, 680, 839, 1),
    step2: step2Rect(
      CENTER_COL.left,
      CENTER_COL.top,
      CENTER_COL.width,
      CENTER_COL.cardHeight,
      1,
      5.32,
    ),
  },
  {
    key: "right",
    kind: "side",
    image: "/figma/ux2/step2/4ad6a.png",
    step1: step1Rect(1300, 150.5, 428, 538, 0.3),
    step2: step2Rect(SIDE.rightX, SIDE.top, SIDE.width, SIDE.height, 0.45),
  },
];

/** Figma 18:427 — 카드 아래 타이틀 (원 하단) */
export const STEP1_TITLE_BAND = {
  left: 0,
  top: 1457,
  width: F,
  height: F - 1457,
};

/** Figma 1:897 — 중앙 카드 아래 타이틀 밴드 (원 기준) */
export const STEP2_TITLE_BAND = {
  left: FEED.left + CENTER_COL.left,
  top: FEED.top + CENTER_COL.top + CENTER_COL.cardHeight,
  width: CENTER_COL.width,
  height: CENTER_COL.height - CENTER_COL.cardHeight,
};

/** 피드 3슬롯 geometry (step2) */
export function step2SlotRect(slotKey) {
  const found = MORPH_CARDS.find((c) => c.key === slotKey);
  return found?.step2 ?? MORPH_CARDS[0].step2;
}

const CAROUSEL_CONTENTS = ["left", "center", "right"];

/** n번 플립: 우→중앙→… (콘텐츠가 차지하는 슬롯) */
export function feedSlotForContent(contentKey, rotationCount = 0) {
  const contentIndex = CAROUSEL_CONTENTS.indexOf(contentKey);
  if (contentIndex < 0) {
    return contentKey;
  }
  const n = ((rotationCount % 3) + 3) % 3;
  const slotIndex = (contentIndex - n + 30) % 3;
  return CAROUSEL_CONTENTS[slotIndex];
}
