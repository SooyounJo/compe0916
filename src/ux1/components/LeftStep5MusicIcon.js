"use client";

import { useLayoutEffect, useRef, useState } from "react";
import RightStep4MusicIcon from "./RightStep4MusicIcon";
import { leftStep5MusicEnterDelayS } from "../lib/leftOrbitStep4";

/** 5·6단계 — 보이스 슬롯, 우측 음악 아이콘과 동일 크기·정렬 */
export default function LeftStep5MusicIcon({ step = 1 }) {
  const [entering, setEntering] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 5 && prevStep === 4) {
      setEntering(true);
      return undefined;
    }

    setEntering(false);
    return undefined;
  }, [step]);

  if (step !== 5 && step !== 6) return null;

  const motion =
    step === 5 && entering
      ? "ux1-left-step5-music-enter"
      : "left-step5-music-icon--settled";

  return (
    <div
      className={`left-ambient__voice left-step5-music-icon pointer-events-none ${motion}`}
      style={{
        animationDelay:
          step === 5 && entering
            ? `${leftStep5MusicEnterDelayS()}s`
            : undefined,
      }}
      aria-hidden
    >
      <RightStep4MusicIcon />
    </div>
  );
}
