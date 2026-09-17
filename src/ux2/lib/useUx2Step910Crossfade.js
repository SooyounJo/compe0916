"use client";

import { useEffect, useRef, useState } from "react";

/** 9↔10 — CSS transition 전 한 프레임 이전 상태 유지 */
export function useUx2Step910Crossfade(step) {
  const [showTen, setShowTen] = useState(step >= 10);
  const prevStepRef = useRef(step);

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 10 && prev === 9) {
      setShowTen(false);
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setShowTen(true));
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        if (innerRaf) cancelAnimationFrame(innerRaf);
      };
    }

    if (step === 9 && prev === 10) {
      setShowTen(true);
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setShowTen(false));
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        if (innerRaf) cancelAnimationFrame(innerRaf);
      };
    }

    setShowTen(step >= 10);
    return undefined;
  }, [step]);

  return showTen;
}
