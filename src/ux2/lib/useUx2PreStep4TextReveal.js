"use client";

import { useEffect, useState } from "react";

/** -4 카피 — BlurFade 등장 전 hidden 한 프레임 유지 */
export function useUx2PreStep4TextReveal(step, ready, instant = false) {
  const [visible, setVisible] = useState(
    instant && step === -4 && ready,
  );

  useEffect(() => {
    if (step !== -4 || !ready) {
      setVisible(false);
      return undefined;
    }

    if (instant) {
      setVisible(true);
      return undefined;
    }

    setVisible(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setVisible(true));
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [step, ready, instant]);

  return visible;
}
