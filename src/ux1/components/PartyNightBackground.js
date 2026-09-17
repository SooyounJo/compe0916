"use client";

import { useEffect, useRef } from "react";

const PARTY_NIGHT_BG_VIDEO = `/video/${encodeURIComponent("폭죽_1.mp4")}`;

/** 6·7번: 폭죽 배경 — 6→7에서 블러 전환 */
export default function PartyNightBackground({ step }) {
  const active = step >= 6;
  const blurForStep7 = step >= 7;
  const videoRef = useRef(null);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (!active) {
      wasActiveRef.current = false;
      video.pause();
      return undefined;
    }

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    if (!wasActiveRef.current) {
      video.currentTime = 0;
      wasActiveRef.current = true;
    }

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
      } ${blurForStep7 ? "party-night-bg--step7-blur" : ""}`}
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
