"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ORBIT_WINE,
  RIGHT_STEP5_STAGGER_INDEX,
  RIGHT_STEP6_EXIT_INDEX,
} from "../lib/orbitIconLayout";
import {
  rightStep5EnterDelayS,
  rightStep6ExitDelayS,
  UX1_STEP6_RIGHT_EXIT_ANIM_S,
} from "../lib/leftOrbitStep4";

/** 5·6 — arc 와인 (5→6에서 fade-out) */
export default function OrbitWinePersist({ step }) {
  const [entering, setEntering] = useState(false);
  const [exitingTo6, setExitingTo6] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 5 && prevStep === 4) {
      setEntering(true);
      setExitingTo6(false);
      return undefined;
    }

    if (step === 6 && prevStep === 5) {
      setEntering(false);
      setExitingTo6(true);
      const exitMs =
        (rightStep6ExitDelayS(RIGHT_STEP6_EXIT_INDEX.wine) +
          UX1_STEP6_RIGHT_EXIT_ANIM_S) *
          1000 +
        80;
      const timer = setTimeout(() => setExitingTo6(false), exitMs);
      return () => clearTimeout(timer);
    }

    setEntering(false);
    setExitingTo6(false);
    return undefined;
  }, [step]);

  if (step < 5) return null;
  if (step >= 6 && !exitingTo6) return null;

  const playEnter = step === 5 && entering;
  const playExit = step === 6 && exitingTo6;

  const motion = playExit
    ? "ux1-right-icon-step6-exit"
    : playEnter
      ? "ux1-right-icon-step5-enter"
      : "icon-orbit-settled";

  return (
    <div className="pointer-events-none absolute inset-0 z-[32]">
      <div
        className={`absolute ${motion}`}
        style={{
          left: ORBIT_WINE.left,
          top: ORBIT_WINE.top,
          width: `${ORBIT_WINE.sizeCqw}cqw`,
          height: `${ORBIT_WINE.sizeCqw}cqw`,
          animationDelay: playExit
            ? `${rightStep6ExitDelayS(RIGHT_STEP6_EXIT_INDEX.wine)}s`
            : playEnter
              ? `${rightStep5EnterDelayS(RIGHT_STEP5_STAGGER_INDEX.wine)}s`
              : undefined,
        }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
          <Image
            src="/figma/icon-orbit-wine.svg"
            alt=""
            width={260}
            height={260}
            className="relative z-[1] h-full w-full max-w-none drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
