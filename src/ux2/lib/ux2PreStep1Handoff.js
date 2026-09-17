"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  UX2_PRE_STEP_NIGHT_FADE_MS,
  UX2_PRE_STEP_NIGHT_HOLD_MS,
} from "@/ux2/lib/ux2PreStepRightEnter";

const Ux2PreStep1HandoffContext = createContext(null);

function useUx2PreStep1HandoffState(step) {
  const [revealUnderlay, setRevealUnderlay] = useState(step >= 0);
  const [nightFadingOut, setNightFadingOut] = useState(false);

  useEffect(() => {
    if (step === -1) {
      setRevealUnderlay(false);
      setNightFadingOut(false);

      const startCrossfade = setTimeout(() => {
        setRevealUnderlay(true);
        setNightFadingOut(true);
      }, UX2_PRE_STEP_NIGHT_HOLD_MS);

      const endCrossfade = setTimeout(() => {
        setNightFadingOut(false);
      }, UX2_PRE_STEP_NIGHT_HOLD_MS + UX2_PRE_STEP_NIGHT_FADE_MS);

      return () => {
        clearTimeout(startCrossfade);
        clearTimeout(endCrossfade);
      };
    }

    if (step >= 0) {
      setRevealUnderlay(true);
      setNightFadingOut(false);
      return undefined;
    }

    setRevealUnderlay(false);
    setNightFadingOut(false);
    return undefined;
  }, [step]);

  const revealed = revealUnderlay || step >= 0;

  return {
    revealStep0Bg: revealed,
    revealUnderlay: revealed,
    nightFadingOut: step === -1 && nightFadingOut,
    minus1NightHold: step === -1 && !revealUnderlay,
  };
}

export function Ux2PreStep1HandoffProvider({ step, children }) {
  const value = useUx2PreStep1HandoffState(step);
  return (
    <Ux2PreStep1HandoffContext.Provider value={value}>
      {children}
    </Ux2PreStep1HandoffContext.Provider>
  );
}

/** -1 — night 위 레이어 opacity out · 아래 0단계 BG 즉시 깔기 (듀얼 좌·우 공유) */
export function useUx2PreStep1Handoff(step) {
  const shared = useContext(Ux2PreStep1HandoffContext);
  if (shared) {
    return shared;
  }
  return useUx2PreStep1HandoffState(step);
}
