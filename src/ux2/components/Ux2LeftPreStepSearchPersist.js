"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Ux2PreStep3SearchBlob from "@/ux2/components/Ux2PreStep3SearchBlob";
import { ux2PreStep3SearchRevealDelayMs } from "@/ux2/lib/ux2PreStep3IconEnter";
import { UX2_PRE_STEP3_LEFT_SEARCH } from "@/ux2/lib/ux2PreStep3SearchBlobLayout";

const LEFT_SEARCH_ICON_FILL = "#9A93AA";

/** -3 검색 등장 → -2·-1에서 동일 DOM 유지(settled) */
export default function Ux2LeftPreStepSearchPersist({ step = 0 }) {
  const [searchEnterKey, setSearchEnterKey] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const prevStepRef = useRef(step);
  const revealTimerRef = useRef(null);

  const showLayer = step === -3 || step === -2 || step === -1;
  const settled = step === -2 || step === -1;

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    if (step === -2 || step === -1) {
      setSearchVisible(true);
      if (step === -2 && prev !== -2 && prev !== -3) {
        setSearchEnterKey((k) => k + 1);
      }
      return undefined;
    }

    if (step !== -3) {
      setSearchVisible(false);
      return undefined;
    }

    if (prev === -3 && searchVisible) {
      return undefined;
    }

    setSearchVisible(false);
    const delayMs = ux2PreStep3SearchRevealDelayMs(prev);
    revealTimerRef.current = setTimeout(() => {
      revealTimerRef.current = null;
      setSearchEnterKey((k) => k + 1);
      setSearchVisible(true);
    }, delayMs);

    return () => {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, [step, searchVisible]);

  if (!showLayer || !searchVisible) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        settled ? "z-[13]" : "z-[7]"
      }`}
    >
      <Ux2PreStep3SearchBlob
        show
        enterKey={searchEnterKey}
        settled={settled}
        centerX={UX2_PRE_STEP3_LEFT_SEARCH.centerX}
        centerY={UX2_PRE_STEP3_LEFT_SEARCH.centerY}
        blobSizeCqw={UX2_PRE_STEP3_LEFT_SEARCH.blobSizeCqw}
        toPct={UX2_PRE_STEP3_LEFT_SEARCH.toPct}
        iconFillColor={LEFT_SEARCH_ICON_FILL}
        immediateEnter={step === -3 && !settled}
      />
    </div>
  );
}
