"use client";

import {
  UX2_PRE_STEP2_BLOB_ENTER_DURATION_S,
  UX2_PRE_STEP2_BLOB_EXIT_DURATION_S,
  ux2PreStep2BlobEnterDelayS,
  ux2PreStep2BlobExitDelayS,
} from "@/ux2/lib/ux2PreStep2BlobEnter";
import revealStyles from "@/ux2/styles/ux2PreStepBlobReveal.module.css";

/** 프리 스텝 블롭 — 좌→우 순차 blur·opacity */
export default function Ux2PreStepBlobReveal({
  blobId,
  enter = false,
  exit = false,
  enterDelayS,
  exitDelayS,
  className = "",
  style,
  endOpacity = 1,
  children,
}) {
  const delayS = exit
    ? exitDelayS != null
      ? exitDelayS
      : ux2PreStep2BlobExitDelayS(blobId)
    : enterDelayS != null
      ? enterDelayS
      : ux2PreStep2BlobEnterDelayS(blobId);

  const motionClass = exit
    ? revealStyles.exit
    : enter
      ? revealStyles.enter
      : revealStyles.settled;

  return (
    <div
      className={`${motionClass} ${className}`}
      style={{
        ...style,
        "--blob-end-opacity": endOpacity,
        ...(enter || exit
          ? {
              animationDelay: `${delayS}s`,
              animationDuration: exit
                ? `${UX2_PRE_STEP2_BLOB_EXIT_DURATION_S}s`
                : `${UX2_PRE_STEP2_BLOB_ENTER_DURATION_S}s`,
            }
          : null),
      }}
    >
      {children}
    </div>
  );
}
