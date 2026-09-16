"use client";

import { useEffect, useRef } from "react";

/** 배경 MP4 — 0~5.11초 구간 루프 */
const BG_LOOP_END_S = 5.11;

/** 1~5 배경 MP4 — blur는 video가 아닌 wrapper에 (렌더 깨짐 방지) */
export default function WeatherBackground({
  step = 1,
  dualInnerGlow = false,
}) {
  const step4Bg = step === 4;
  const showDualGlow = dualInnerGlow && step >= 2 && step < 6;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const loopSegment = () => {
      if (video.currentTime >= BG_LOOP_END_S) {
        video.currentTime = 0;
      }
    };

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    ensurePlay();
    video.addEventListener("loadeddata", ensurePlay);
    video.addEventListener("canplay", ensurePlay);
    video.addEventListener("timeupdate", loopSegment);

    return () => {
      video.removeEventListener("loadeddata", ensurePlay);
      video.removeEventListener("canplay", ensurePlay);
      video.removeEventListener("timeupdate", loopSegment);
    };
  }, []);

  return (
    <div
      className={`weather-bg-ambient pointer-events-none absolute inset-0 z-0 overflow-hidden ${
        step4Bg ? "weather-bg-ambient--step4" : ""
      }`}
    >
      <div className="weather-bg-ambient__motion absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
          className="weather-bg-ambient__img absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        >
          <source src="/video/weather-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className={`weather-bg-ambient__dual-glow weather-bg-ambient__dual-glow--left ${
          showDualGlow ? "weather-bg-ambient__dual-glow--on" : ""
        }`}
        aria-hidden
      />
    </div>
  );
}
