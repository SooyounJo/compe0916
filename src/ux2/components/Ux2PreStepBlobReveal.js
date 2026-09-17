"use client";

import {
  UX2_PRE_STEP2_BLOB_ENTER_DURATION_S,
  ux2PreStep2BlobEnterDelayS,
} from "@/ux2/lib/ux2PreStep2BlobEnter";
import revealStyles from "@/ux2/styles/ux2PreStepBlobReveal.module.css";

/** 프리 스텝 블롭 — 좌→우 순차 blur·opacity */
export default function Ux2PreStepBlobReveal({
  blobId,
  enter = false,
  enterDelayS,
  className = "",
  style,
  endOpacity = 1,
  children,
}) {
  const delayS =
    enterDelayS != null
      ? enterDelayS
      : ux2PreStep2BlobEnterDelayS(blobId);

  return (
    <div
      className={`${enter ? revealStyles.enter : revealStyles.settled} ${className}`}
      style={{
        ...style,
        "--blob-end-opacity": endOpacity,
        ...(enter
          ? {
              animationDelay: `${delayS}s`,
              animationDuration: `${UX2_PRE_STEP2_BLOB_ENTER_DURATION_S}s`,
            }
          : null),
      }}
    >
      {children}
    </div>
  );
}
