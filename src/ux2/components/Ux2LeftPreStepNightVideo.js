"use client";

import { useEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import { UX2_PRE_STEP_FIRST, ux2IsPreStep } from "@/ux2/lib/ux2FlowSteps";

export const UX2_PRE_STEP_NIGHT_VIDEO = "/video/ux2-pre-step-night.mp4";

/** -4 ~ -1 좌측 night.mp4 — -1→0 BlurFade 퇴장 */
export default function Ux2LeftPreStepNightVideo({ step = 0 }) {
  const videoRef = useRef(null);
  const [latched, setLatched] = useState(false);
  const show = ux2IsPreStep(step);

  useEffect(() => {
    if (show || step === UX2_PRE_STEP_FIRST) {
      setLatched(true);
    }
  }, [show, step]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !latched) return undefined;

    if (show) {
      video.currentTime = 0;
      void video.play().catch(() => {});
      return undefined;
    }

    video.pause();
    return undefined;
  }, [show, latched]);

  if (!latched) {
    return null;
  }

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden={!show}
    >
      <video
        ref={videoRef}
        src={UX2_PRE_STEP_NIGHT_VIDEO}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full w-full min-h-[145%] min-w-[145%] -translate-x-1/2 -translate-y-1/2 object-cover object-center"
      />
    </BlurFade>
  );
}
