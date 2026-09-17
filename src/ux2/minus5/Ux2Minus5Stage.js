"use client";

import { useEffect, useState } from "react";
import Ux2Minus5LeftCircle from "@/ux2/minus5/Ux2Minus5LeftCircle";
import Ux2Minus5RightCircle from "@/ux2/minus5/Ux2Minus5RightCircle";
import { UX2_MINUS5_EXIT_MORPH_MS } from "@/ux2/lib/ux2Minus5ToMinus4Exit";

/** UX2 -5 — UX1 8단계 듀얼 · -4 전환 morph는 이 스테이지에서만 */
export default function Ux2Minus5Stage({
  exiting = false,
  holdEndState = false,
  onExitComplete,
}) {
  const [exitingAnim, setExitingAnim] = useState(false);

  useEffect(() => {
    if (!exiting && !holdEndState) {
      setExitingAnim(false);
      return undefined;
    }
    if (holdEndState && !exiting) {
      return undefined;
    }

    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setExitingAnim(true));
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [exiting, holdEndState]);

  useEffect(() => {
    if (!exitingAnim) return undefined;

    const doneTimer = setTimeout(
      () => onExitComplete?.(),
      UX2_MINUS5_EXIT_MORPH_MS,
    );

    return () => clearTimeout(doneTimer);
  }, [exitingAnim, onExitComplete]);

  return (
    <div className="dual-blob-stage flex-nowrap">
      <Ux2Minus5LeftCircle
        morphPrimed={exiting || holdEndState}
        morphActive={exitingAnim || holdEndState}
        className="dual-blob__size"
      />
      <div className="dual-blob__right dual-blob__size">
        <Ux2Minus5RightCircle
          morphPrimed={exiting || holdEndState}
          morphActive={exitingAnim || holdEndState}
          className="!h-full !w-full !max-w-none"
        />
      </div>
    </div>
  );
}
