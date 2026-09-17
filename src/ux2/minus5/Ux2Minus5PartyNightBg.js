"use client";

import { useEffect, useRef } from "react";
import { UX2_MINUS5_PARTY_NIGHT_VIDEO } from "@/ux2/minus5/ux2Minus5Step8Copy";

/** UX1 8단계 우측 — 7 blur 폭죽 배경 (UX2 -5 전용) */
export default function Ux2Minus5PartyNightBg() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    video.currentTime = 0;
    ensurePlay();
    video.addEventListener("loadeddata", ensurePlay);
    video.addEventListener("canplay", ensurePlay);

    return () => {
      video.removeEventListener("loadeddata", ensurePlay);
      video.removeEventListener("canplay", ensurePlay);
    };
  }, []);

  return (
    <div
      className="party-night-bg party-night-bg--active party-night-bg--step7-blur pointer-events-none absolute inset-0 z-[12] overflow-hidden rounded-full"
      aria-hidden
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="party-night-bg__img absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden
      >
        <source src={UX2_MINUS5_PARTY_NIGHT_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
