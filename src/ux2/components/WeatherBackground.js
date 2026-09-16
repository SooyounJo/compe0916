"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** 배경 MP4 — 0~5.11초 구간 루프 */
const BG_LOOP_END_S = 5.11;

const UX2_STEP1_RIGHT_BG = "/figma/ux2/step1-right-bg.png";

/** UX2 — 1단계 정적 BG · 2~5 MP4 */
export default function WeatherBackground({
  step = 1,
  dualInnerGlow = false,
}) {
  const step4Bg = step === 4;
  const showDualGlow = dualInnerGlow && step >= 2 && step < 6;
  const showStep1Photo = step === 1;
  const videoRef = useRef(null);

  useEffect(() => {
    if (step === 1) return undefined;

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
  }, [step]);

  return (
    <div
      className={`weather-bg-ambient pointer-events-none absolute inset-0 z-0 overflow-hidden ${
        step4Bg ? "weather-bg-ambient--step4" : ""
      }`}
    >
      <Image
        src={UX2_STEP1_RIGHT_BG}
        alt=""
        fill
        priority
        className={`object-cover object-center transition-opacity duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)] ${
          showStep1Photo ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 560px"
      />
      <div
        className={`weather-bg-ambient__motion absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)] ${
          showStep1Photo ? "opacity-0" : "opacity-100"
        }`}
      >
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
