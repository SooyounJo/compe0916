"use client";

import { useLayoutEffect, useState } from "react";

/** -4 퇴장 레이어 — 마운트 직후 rAF로 blur·opacity out (즉시 opacity 0 방지) */
export function useUx2PreStep4ExitFade(exiting) {
  const [fadeOut, setFadeOut] = useState(false);

  useLayoutEffect(() => {
    if (!exiting) {
      setFadeOut(false);
      return undefined;
    }

    setFadeOut(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setFadeOut(true));
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [exiting]);

  return fadeOut;
}
