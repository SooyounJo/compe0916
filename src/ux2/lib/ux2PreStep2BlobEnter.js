/** -2 — -3 검색 유지 → 우 arc 2개 → 좌 검색 (rightSearch는 enter 없음) */
export const UX2_PRE_STEP2_BLOB_ORDER = [
  "rightSearch",
  "rightGallery",
  "rightCalendar",
  "leftSearch",
];

export const UX2_PRE_STEP2_BLOB_BASE_S = 0.1;
export const UX2_PRE_STEP2_BLOB_STAGGER_S = 0.18;
export const UX2_PRE_STEP2_BLOB_ENTER_DURATION_S = 0.74;
export const UX2_PRE_STEP2_BLOB_EXIT_DURATION_S = 0.78;

/** -2→-1 우 arc — 위(calendar) → 아래(gallery) 순 퇴장 */
const UX2_PRE_STEP2_ARC_EXIT_ORDER = ["rightCalendar", "rightGallery"];

export function ux2PreStep2BlobExitDelayS(blobId) {
  const index = UX2_PRE_STEP2_ARC_EXIT_ORDER.indexOf(blobId);
  if (index < 0) {
    return 0;
  }
  return index * 0.12;
}

export function ux2PreStep2ArcExitTotalMs() {
  const last = UX2_PRE_STEP2_ARC_EXIT_ORDER.length - 1;
  return (
    (last * 0.12 + UX2_PRE_STEP2_BLOB_EXIT_DURATION_S) * 1000 + 80
  );
}

export function ux2PreStep2BlobEnterDelayS(blobId) {
  const index = UX2_PRE_STEP2_BLOB_ORDER.indexOf(blobId);
  if (index < 0) {
    return 0;
  }
  if (blobId === "leftSearch") {
    const galleryIndex = UX2_PRE_STEP2_BLOB_ORDER.indexOf("rightGallery");
    const galleryStart =
      UX2_PRE_STEP2_BLOB_BASE_S + galleryIndex * UX2_PRE_STEP2_BLOB_STAGGER_S;
    return galleryStart + UX2_PRE_STEP2_BLOB_ENTER_DURATION_S + 0.14;
  }
  return UX2_PRE_STEP2_BLOB_BASE_S + index * UX2_PRE_STEP2_BLOB_STAGGER_S;
}

/** -2 전체 블롭(좌 검색 마지막) enter 종료 */
export function ux2PreStep2AllBlobsEnterEndS() {
  return (
    ux2PreStep2BlobEnterDelayS("leftSearch") +
    UX2_PRE_STEP2_BLOB_ENTER_DURATION_S +
    0.1
  );
}

/** -1 좌 인스타 — arc 퇴장 후 blur·opacity in */
export const UX2_PRE_STEP1_LEFT_INSTA_ENTER_DELAY_S = 2;

export function ux2PreStep1LeftInstaEnterEndMs() {
  return Math.round(
    (UX2_PRE_STEP1_LEFT_INSTA_ENTER_DELAY_S +
      UX2_PRE_STEP2_BLOB_ENTER_DURATION_S +
      0.08) *
      1000,
  );
}
