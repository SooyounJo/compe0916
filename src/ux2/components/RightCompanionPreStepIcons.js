"use client";

import BlurFade from "@/ux2/components/BlurFade";
import Ux2RightIconBlob from "@/ux2/components/Ux2RightIconBlob";
import { pctCircleRight, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import { PRE_STEP_RIGHT_SEARCH } from "@/ux2/lib/ux2PreStepRightLayout";

const RIGHT_BLOB_CQW = pctCircleRight(STEP0_SEARCH_BLOB.size);

function RightPreStepIconBlob({ centerX, centerY, iconSrc, iconSizePct }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctCircleRight(centerX)}%`,
        top: `${pctCircleRight(centerY)}%`,
        width: `${RIGHT_BLOB_CQW}cqw`,
        height: `${RIGHT_BLOB_CQW}cqw`,
      }}
    >
      <Ux2RightIconBlob
        iconSrc={iconSrc}
        iconSizePct={iconSizePct}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

/** -1 우측 — 검색 블롭만 */
export default function RightCompanionPreStepIcons({ step = 0 }) {
  return (
    <BlurFade
      show={step === -1}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <RightPreStepIconBlob
        centerX={PRE_STEP_RIGHT_SEARCH.centerX}
        centerY={PRE_STEP_RIGHT_SEARCH.centerY}
        iconSrc="/figma/ux2/step0/web-search-icon.svg"
        iconSizePct={54}
      />
    </BlurFade>
  );
}
