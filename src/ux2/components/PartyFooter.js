"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BlurFade from "@/components/BlurFade";
import {
  UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S,
  ux2Ux1Step5WineFooterDelayS,
} from "@/ux2/lib/ux2Ux1Step45Timing";

/** UX1 main — 4 Let's Party / 5 wine·friends (듀얼 우측 5는 Figma 카피만) */
export default function PartyFooter({ step, dualRight = false }) {
  const [wineVisible, setWineVisible] = useState(step === 5);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 4) {
      setWineVisible(false);
      return undefined;
    }

    if (step === 5 && prevStep === 4) {
      setWineVisible(false);
      const timer = setTimeout(
        () => setWineVisible(true),
        ux2Ux1Step5WineFooterDelayS() * 1000,
      );
      return () => clearTimeout(timer);
    }

    if (step === 5) {
      setWineVisible(true);
    } else {
      setWineVisible(false);
    }

    return undefined;
  }, [step]);

  if (step !== 4 && step !== 5) {
    return null;
  }

  if (dualRight && (step === 4 || step === 5)) {
    return null;
  }

  const showParty = step === 4 || (step === 5 && !wineVisible);
  const showWine = step === 5 && wineVisible;

  const baseClass =
    "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

  const textStyle = {
    backgroundImage:
      "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 4px 73px rgba(255,255,255,0.45)",
  };

  return (
    <>
      <BlurFade
        show={showParty}
        className={`${baseClass} party-footer-party-in`}
        style={{
          ...textStyle,
          transitionDelay:
            showParty && step === 4
              ? `${UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S}s, ${UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S}s`
              : undefined,
        }}
      >
        Let&apos;s Party!
      </BlurFade>
      <BlurFade show={showWine} className={baseClass} style={textStyle}>
        wine, friends
      </BlurFade>
    </>
  );
}
