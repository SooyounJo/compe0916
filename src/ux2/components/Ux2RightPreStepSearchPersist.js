"use client";

import { useEffect, useRef, useState } from "react";
import Ux2PreStep3SearchBlob from "@/ux2/components/Ux2PreStep3SearchBlob";
import { ux2PreStep3SearchAtVoiceDelayS } from "@/ux2/lib/ux2PreStep3IconEnter";
import { UX2_PRE_STEP3_RIGHT_SEARCH } from "@/ux2/lib/ux2PreStep3SearchBlobLayout";
import { UX2_RIGHT_ICON_FILL } from "@/ux2/lib/ux2RightIconFill";

/** -3 → -2 — 검색 블롭 연속 유지 (-3 등장 후 -2에서 settled) */
export default function Ux2RightPreStepSearchPersist({ step = 0 }) {
  const [searchEnterKey, setSearchEnterKey] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const prevStepRef = useRef(null);

  const showLayer = step === -3 || step === -2;
  const settled = step === -2;

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (step === -3 && prev !== -3) {
      setSearchVisible(false);
      const delayMs = ux2PreStep3SearchAtVoiceDelayS() * 1000;
      const timer = setTimeout(() => {
        setSearchEnterKey((k) => k + 1);
        setSearchVisible(true);
      }, delayMs);
      return () => clearTimeout(timer);
    }

    if (step === -2) {
      if (prev === -3) {
        setSearchVisible(true);
      } else if (prev !== -2) {
        setSearchEnterKey((k) => k + 1);
        setSearchVisible(true);
      }
      return undefined;
    }

    if (step !== -3) {
      setSearchVisible(false);
    }

    return undefined;
  }, [step]);

  if (!showLayer || !searchVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden">
      <Ux2PreStep3SearchBlob
        show
        enterKey={searchEnterKey}
        settled={settled}
        centerX={UX2_PRE_STEP3_RIGHT_SEARCH.centerX}
        centerY={UX2_PRE_STEP3_RIGHT_SEARCH.centerY}
        blobSizeCqw={UX2_PRE_STEP3_RIGHT_SEARCH.blobSizeCqw}
        toPct={UX2_PRE_STEP3_RIGHT_SEARCH.toPct}
        immediateEnter={step === -3}
        iconFillColor={UX2_RIGHT_ICON_FILL}
      />
    </div>
  );
}
