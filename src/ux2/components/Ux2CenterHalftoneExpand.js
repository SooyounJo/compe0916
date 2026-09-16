"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  pctRight5,
  sizeCqwRight5,
  STEP5_CENTER_HALFTONE_PHOTO_SCALE,
  STEP5_RIGHT_CENTER_RING,
} from "@/ux2/lib/ux2Step5RightLayout";
import {
  UX2_STEP5_CENTER_HALFTONE,
  UX2_STEP6_RIGHT_BG,
} from "@/ux2/lib/ux2Step6RightLayout";

/** clip-path 원 확대 (scale 대신 — PNG 사각·마스크 이탈 방지) */
const BURST_MS = 1400;
const STEP6_BG_FADE_DELAY_MS = 200;
const STEP6_BG_FADE_MS = 1800;

/**
 * 5단계 링 원 clip → 6단계 동일 clip 확대 → 목표 BG 크로스페이드
 */
export default function Ux2CenterHalftoneExpand({ step = 0 }) {
  const prevStepRef = useRef(step);
  const [burst, setBurst] = useState(false);
  const [step6BgVisible, setStep6BgVisible] = useState(false);

  const ringLeft = pctRight5(STEP5_RIGHT_CENTER_RING.centerX);
  const ringTop = pctRight5(STEP5_RIGHT_CENTER_RING.centerY);
  const ringSize = sizeCqwRight5(STEP5_RIGHT_CENTER_RING.size);
  const ringRadius = ringSize / 2;

  useEffect(() => {
    const from5 = prevStepRef.current === 5 && step === 6;
    prevStepRef.current = step;
    if (from5) {
      setBurst(true);
      setStep6BgVisible(false);
      const tBurst = setTimeout(() => setBurst(false), BURST_MS + 60);
      return () => clearTimeout(tBurst);
    }
    if (step < 5) {
      setBurst(false);
      setStep6BgVisible(false);
    }
  }, [step]);

  useEffect(() => {
    if (step !== 6) {
      setStep6BgVisible(false);
      return undefined;
    }
    const delay = burst ? BURST_MS + STEP6_BG_FADE_DELAY_MS : 0;
    const t = setTimeout(() => setStep6BgVisible(true), delay);
    return () => clearTimeout(t);
  }, [step, burst]);

  if (step < 5 || step >= 7) return null;

  const clipRing = `circle(${ringRadius}% at ${ringLeft}% ${ringTop}%)`;
  const clipFull = "circle(50% at 50% 50%)";

  let clipClass = "";
  let clipStyle = {};

  if (step === 5 && !burst) {
    clipStyle = { clipPath: clipRing };
  } else if (burst) {
    clipClass = "ux2-halftone-expand__clip--burst";
  } else if (step >= 6) {
    clipStyle = { clipPath: clipFull };
  }

  const basePhotoClass =
    "object-cover object-center ux2-halftone-expand__photo--base";

  const photoScale =
    step === 5 && !burst ? STEP5_CENTER_HALFTONE_PHOTO_SCALE : 1;

  return (
    <div
      className="ux2-halftone-expand pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
      aria-hidden
      style={{
        "--ux2-ring-origin-x": `${ringLeft}%`,
        "--ux2-ring-origin-y": `${ringTop}%`,
        "--ux2-ring-clip-r": `${ringRadius}%`,
        "--ux2-halftone-photo-scale": photoScale,
      }}
    >
      <div
        className={`ux2-halftone-expand__clip absolute inset-0 ${clipClass}`}
        style={clipStyle}
      >
        <div className="ux2-halftone-expand__photo-inner absolute inset-0">
          <Image
            src={UX2_STEP5_CENTER_HALFTONE}
            alt=""
            fill
            className={basePhotoClass}
            sizes="(max-width: 560px) 88vmin, 560px"
            priority={step >= 5}
          />
        </div>
      </div>

      {step >= 6 ? (
        <div
          className="ux2-halftone-expand__step6-bg absolute inset-0 transition-opacity ease-out"
          style={{
            opacity: step6BgVisible ? 1 : 0,
            transitionDuration: `${STEP6_BG_FADE_MS}ms`,
          }}
        >
          <Image
            src={UX2_STEP6_RIGHT_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 560px) 88vmin, 560px"
            priority
          />
        </div>
      ) : null}
    </div>
  );
}
