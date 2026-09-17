"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ORBIT_WINE,
  RIGHT_STEP5_STAGGER_INDEX,
} from "../lib/orbitIconLayout";
import { rightStep5EnterDelayS } from "../lib/leftOrbitStep4";

/** 5·6 — 좌측 arc 와인 (5에서 가장 먼저 등장) */
export default function OrbitWinePersist({ step }) {
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

  if (step < 5) return null;

  const motion = entering ? "ux1-right-icon-step5-enter" : "icon-orbit-settled";

  return (
    <div className="pointer-events-none absolute inset-0 z-[32]">
      <div
        className={`absolute ${motion}`}
        style={{
          left: ORBIT_WINE.left,
          top: ORBIT_WINE.top,
          width: `${ORBIT_WINE.sizeCqw}cqw`,
          height: `${ORBIT_WINE.sizeCqw}cqw`,
          animationDelay: entering
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
