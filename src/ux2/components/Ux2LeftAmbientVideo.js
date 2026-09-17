"use client";

import { useEffect, useRef, useState } from "react";

export const UX2_LEFT_AMBIENT_VIDEO = "/video/ux2-left-bg.mp4";

import { UX2_LAST_STEP } from "@/ux2/lib/ux2FlowSteps";

/**
 * UX2 좌측 1~11 — 1 진입 후 video DOM 유지 (11도 10과 동일 좌측)
 */
export default function Ux2LeftAmbientVideo({ step = 0 }) {
  const videoRef = useRef(null);
  const [latched, setLatched] = useState(false);
  const visible = step >= 1 && step <= UX2_LAST_STEP;

  useEffect(() => {
    if (visible) setLatched(true);
  }, [visible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !latched) return undefined;
    if (visible) {
      void video.play().catch(() => {});
    }
    return undefined;
  }, [visible, latched]);

  if (!latched) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-[900ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <video
        ref={videoRef}
        src={UX2_LEFT_AMBIENT_VIDEO}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full w-full min-h-[145%] min-w-[145%] -translate-x-1/2 -translate-y-1/2 object-cover object-center"
      />
    </div>
  );
}
