"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BlurFade from "./BlurFade";
import {
  step5WineFooterDelayS,
  UX1_STEP4_RIGHT_REVEAL_DELAY_S,
} from "../lib/leftOrbitStep4";

export default function PartyFooter({ step }) {
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
        step5WineFooterDelayS() * 1000,
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

  const showParty = step === 4 || (step === 5 && !wineVisible);
  const showWine = step === 5 && wineVisible;

  const baseClass =
    "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

  return (
    <>
      <BlurFade
        show={showParty}
        className={`${baseClass} party-footer-party-in party-footer-text party-footer-text-shimmer`}
        style={{
          transitionDelay: showParty && step === 4
            ? `${UX1_STEP4_RIGHT_REVEAL_DELAY_S}s, ${UX1_STEP4_RIGHT_REVEAL_DELAY_S}s`
            : undefined,
        }}
      >
        Let&apos;s Party!
      </BlurFade>
      <BlurFade
        show={showWine}
        className={`${baseClass} party-footer-text party-footer-wine-in`}
      >
        wine, friends...
      </BlurFade>
    </>
  );
}
