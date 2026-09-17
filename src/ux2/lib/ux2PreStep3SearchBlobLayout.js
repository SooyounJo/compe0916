import { pctCircleRight, STEP0_RIGHT_ICON_BLOB, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import {
  pctPre,
  PRE_STEP_1_INSTAGRAM,
  PRE_STEP_1_SEARCH,
  sizeCqwPre,
} from "@/ux2/lib/ux2PreStepLayout";

/** -3~-1·0 — 좌 메인 검색 (0단계 `Ux2Step0IconMotion` 슬롯) */
export const UX2_PRE_STEP0_LEFT_SEARCH = {
  centerX: PRE_STEP_1_SEARCH.centerX,
  centerY: PRE_STEP_1_SEARCH.centerY,
  blobSizeCqw: sizeCqwPre(PRE_STEP_1_SEARCH.size),
  toPct: pctPre,
};

/** @deprecated — UX2_PRE_STEP0_LEFT_SEARCH 와 동일 */
export const UX2_PRE_STEP3_LEFT_SEARCH = UX2_PRE_STEP0_LEFT_SEARCH;

/** -1 — 0단계 하단 인스타 출발 슬롯 */
export const UX2_PRE_STEP0_LEFT_INSTAGRAM = {
  centerX: PRE_STEP_1_INSTAGRAM.centerX,
  centerY: PRE_STEP_1_INSTAGRAM.centerY,
  blobSizeCqw: sizeCqwPre(PRE_STEP_1_INSTAGRAM.size),
  toPct: pctPre,
};

export const UX2_PRE_STEP3_RIGHT_SEARCH = {
  centerX: STEP0_RIGHT_ICON_BLOB.centerX,
  centerY: STEP0_RIGHT_ICON_BLOB.centerY,
  blobSizeCqw: pctCircleRight(STEP0_RIGHT_ICON_BLOB.size),
  toPct: pctCircleRight,
};
