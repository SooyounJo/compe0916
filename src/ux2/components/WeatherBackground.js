"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUx2PreStep1Handoff } from "@/ux2/lib/ux2PreStep1Handoff";
import {
  UX2_PRE_STEP1_BG_BLUR_OUT_MS,
  UX2_PRE_STEP1_BG_CROSSFADE_MS,
  UX2_PRE_STEP1_BG_OPACITY_IN_MS,
} from "@/ux2/lib/ux2PreStepRightEnter";
import { ux2IsPreStep } from "@/ux2/lib/ux2FlowSteps";

/** 배경 MP4 — 0~5.11초 구간 루프 */
const BG_LOOP_END_S = 5.11;

const UX2_STEP1_RIGHT_BG = "/figma/ux2/step1-right-bg.png";

/** UX2 우측 — 0·1·2단계 step1-right-bg(33:225) · 3~5 MP4 */
export default function WeatherBackground({
  step = 1,
  dualInnerGlow = false,
}) {
  const step4Bg = step === 4;
  const { revealUnderlay } = useUx2PreStep1Handoff(step);
  const [minus1BgSharpenActive, setMinus1BgSharpenActive] = useState(false);
  /** -1 crossfade: step1 BG opacity 빠르게 · blur는 서서히 out */
  const showStep1RightPhoto =
    (step >= 0 && step <= 2 && !ux2IsPreStep(step)) ||
    (step === -1 && revealUnderlay);
  const step1Minus1Reveal = step === -1 && revealUnderlay;

  useLayoutEffect(() => {
    if (!step1Minus1Reveal) {
      setMinus1BgSharpenActive(false);
      return undefined;
    }

    setMinus1BgSharpenActive(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setMinus1BgSharpenActive(true));
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [step1Minus1Reveal]);
  const hideAmbientMotion = dualInnerGlow && ux2IsPreStep(step);
  const showDualGlow =
    dualInnerGlow &&
    step >= 3 &&
    step <= 6 &&
    step !== 4 &&
    !showStep1RightPhoto;
  const videoRef = useRef(null);

  useEffect(() => {
    if (step <= 2) return undefined;

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
        className="object-cover object-center ease-[cubic-bezier(0.33,0,0.15,1)]"
        style={{
          transitionProperty: "opacity, filter",
          transitionDuration: step1Minus1Reveal
            ? `${UX2_PRE_STEP1_BG_OPACITY_IN_MS}ms, ${UX2_PRE_STEP1_BG_BLUR_OUT_MS}ms`
            : step === -1
              ? `${UX2_PRE_STEP1_BG_CROSSFADE_MS}ms, ${UX2_PRE_STEP1_BG_CROSSFADE_MS}ms`
              : "1200ms, 1200ms",
          opacity:
            showStep1RightPhoto && (!step1Minus1Reveal || minus1BgSharpenActive)
              ? 1
              : 0,
          filter:
            step1Minus1Reveal && !minus1BgSharpenActive
              ? "blur(14px)"
              : "blur(0px)",
        }}
        sizes="(max-width: 900px) 41vmin, 560px"
      />
      <div
        className={`weather-bg-ambient__motion absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)] ${
          showStep1RightPhoto || hideAmbientMotion ? "opacity-0" : "opacity-100"
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
