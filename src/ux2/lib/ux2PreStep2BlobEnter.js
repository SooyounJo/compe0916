/** -2 — 우측 arc 블롭 → 좌측 검색 순차 opacity·blur */
export const UX2_PRE_STEP2_BLOB_ORDER = ["rightGallery", "rightCalendar"];

export const UX2_PRE_STEP2_BLOB_BASE_S = 0.1;
export const UX2_PRE_STEP2_BLOB_STAGGER_S = 0.18;
export const UX2_PRE_STEP2_BLOB_ENTER_DURATION_S = 0.74;

export function ux2PreStep2BlobEnterDelayS(blobId) {
  const index = UX2_PRE_STEP2_BLOB_ORDER.indexOf(blobId);
  if (index < 0) {
    return 0;
  }
  return UX2_PRE_STEP2_BLOB_BASE_S + index * UX2_PRE_STEP2_BLOB_STAGGER_S;
}

/** 우측 블롭 enter 종료 후 좌측 검색 */
export function ux2PreStep2LeftSearchDelayS() {
  return (
    ux2PreStep2BlobEnterDelayS("rightCalendar") +
    UX2_PRE_STEP2_BLOB_ENTER_DURATION_S +
    0.12
  );
}
