"use client";

import { useEffect, useRef, useState } from "react";
import Ux2PreStep3SearchBlob from "@/ux2/components/Ux2PreStep3SearchBlob";
import { ux2PreStep3SearchAtVoiceDelayS } from "@/ux2/lib/ux2PreStep3IconEnter";
import { UX2_PRE_STEP3_RIGHT_SEARCH } from "@/ux2/lib/ux2PreStep3SearchBlobLayout";
import { UX2_RIGHT_ICON_FILL } from "@/ux2/lib/ux2RightIconFill";

/** -3 검색 등장 → -2에서 동일 DOM 유지(settled) → arc 블롭은 그 위 레이어 */
export default function Ux2RightPreStepSearchPersist({ step = 0 }) {
  const [searchEnterKey, setSearchEnterKey] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const prevStepRef = useRef(null);

  const showLayer = step === -3 || step === -2 || step === -1;
  const settled = step === -2 || step === -1;

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

    if (step === -2 && (prev === -3 || prev === -2)) {
      setSearchVisible(true);
      return undefined;
    }

    if (step === -2 && prev !== -2) {
      setSearchEnterKey((k) => k + 1);
      setSearchVisible(true);
      return undefined;
    }

    if (step === -1 && (prev === -2 || prev === -1)) {
      setSearchVisible(true);
      return undefined;
    }

    if (step === -1 && prev !== -1) {
      setSearchVisible(true);
      return undefined;
    }

    if (step >= 0 || step < -3) {
      setSearchVisible(false);
    }

    return undefined;
  }, [step]);

  if (!showLayer || !searchVisible) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        settled ? "z-[13]" : "z-[15]"
      }`}
    >
      <Ux2PreStep3SearchBlob
        show
        enterKey={searchEnterKey}
        settled={settled}
        centerX={UX2_PRE_STEP3_RIGHT_SEARCH.centerX}
        centerY={UX2_PRE_STEP3_RIGHT_SEARCH.centerY}
        blobSizeCqw={UX2_PRE_STEP3_RIGHT_SEARCH.blobSizeCqw}
        toPct={UX2_PRE_STEP3_RIGHT_SEARCH.toPct}
        immediateEnter={step === -3 && !settled}
        iconFillColor={UX2_RIGHT_ICON_FILL}
      />
    </div>
  );
}
