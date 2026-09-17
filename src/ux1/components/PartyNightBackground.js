"use client";

import { useEffect, useRef } from "react";

const PARTY_NIGHT_BG_VIDEO = `/video/${encodeURIComponent("폭죽_1.mp4")}`;

/** 6번: 폭죽 배경이 블러·상승하며 날씨 배경과 교체 */
export default function PartyNightBackground({ step }) {
  const active = step >= 6;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (!active) {
      video.pause();
      return undefined;
    }

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
  }, [active]);

  return (
    <div
      className={`party-night-bg pointer-events-none absolute inset-0 z-[12] overflow-hidden rounded-full ${
        active ? "party-night-bg--active" : ""
      }`}
      aria-hidden={!active}
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
        <source src={PARTY_NIGHT_BG_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
