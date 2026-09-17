"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import VoiceRecorder from "@/ux2/components/VoiceRecorder";
import Ux2Ux1Step7CenterLoadingDots from "@/ux2/components/Ux2Ux1Step7CenterLoadingDots";
import {
  pctPre,
  PRE_STEP_DOTS,
  PRE_STEP_GRADIENT,
  sizeCqwPre,
} from "@/ux2/lib/ux2PreStepLayout";
import {
  UX2_MINUS5_EXIT_DOTS_MS,
  UX2_MINUS5_EXIT_EASE,
  UX2_MINUS5_EXIT_COCKTAIL_MS,
  UX2_MINUS5_EXIT_LEFT_BG_MS,
  UX2_MINUS5_EXIT_TEXT_MS,
  UX2_MINUS5_EXIT_VOICE_MS,
} from "@/ux2/lib/ux2Minus5ToMinus4Exit";
import { PRE_STEP_4_COCKTAIL } from "@/ux2/lib/ux2PreStepLayout";
import { pctCircle } from "@/ux2/lib/ux2Step0Layout";
import {
  UX2_MINUS5_GRADIENT_OVERLAY,
  UX2_MINUS5_LEFT_AMBIENT_VIDEO,
  UX2_MINUS5_LEFT_TEXT_LINES,
  UX2_MINUS5_LEFT_TEXT_STYLE,
} from "@/ux2/minus5/ux2Minus5Step8Copy";
import exitStyles from "@/ux2/styles/ux2Minus5ToMinus4Exit.module.css";

const UX2_MINUS4_LEFT_BG = "/figma/ux2/step1-left-bg.png";

/** UX1 8단계 좌측 정착 화면 — UX2 -5 전용 */
export default function Ux2Minus5LeftCircle({
  className = "",
  morphPrimed = false,
  morphActive = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    ensurePlay();
    video.addEventListener("loadeddata", ensurePlay);
    video.addEventListener("canplay", ensurePlay);

    return () => {
      video.removeEventListener("loadeddata", ensurePlay);
      video.removeEventListener("canplay", ensurePlay);
    };
  }, []);

  const motionVars = {
    "--ux2-m5-ease": UX2_MINUS5_EXIT_EASE,
    "--ux2-m5-text-ms": `${UX2_MINUS5_EXIT_TEXT_MS}ms`,
    "--ux2-m5-dots-ms": `${UX2_MINUS5_EXIT_DOTS_MS}ms`,
    "--ux2-m5-voice-ms": `${UX2_MINUS5_EXIT_VOICE_MS}ms`,
    "--ux2-m5-left-bg-ms": `${UX2_MINUS5_EXIT_LEFT_BG_MS}ms`,
    "--ux2-m5-cocktail-ms": `${UX2_MINUS5_EXIT_COCKTAIL_MS}ms`,
  };

  const leftCocktailCqw = pctCircle(PRE_STEP_4_COCKTAIL.size);

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full bg-[#0a0a0a] shadow-[0_8px_48px_rgba(0,0,0,0.45)] [container-type:size] ${
        morphActive ? exitStyles.leftExiting : ""
      } ${className}`}
      style={motionVars}
      role="img"
      aria-label="UX1 8단계 좌측 (UX2 -5)"
    >
      {morphPrimed ? (
        <div
          className={`${exitStyles.leftMinus4Bg} absolute inset-0 z-[0] overflow-hidden`}
          aria-hidden
        >
          <Image
            src={UX2_MINUS4_LEFT_BG}
            alt=""
            fill
            className="left-ambient__photo object-cover object-center"
            sizes="(max-width: 900px) 41vmin, 520px"
            priority
          />
          <div
            className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
            style={{ background: PRE_STEP_GRADIENT }}
          />
        </div>
      ) : null}

      {morphPrimed ? (
        <div
          className={`${exitStyles.leftCocktail} pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2`}
          style={{
            left: `${pctPre(PRE_STEP_4_COCKTAIL.centerX)}%`,
            top: `${pctPre(PRE_STEP_4_COCKTAIL.centerY)}%`,
            width: `${leftCocktailCqw}cqw`,
            height: `${leftCocktailCqw}cqw`,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/figma/left-orbit/cocktail-blob.svg"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
              sizes="22vw"
            />
          </div>
        </div>
      ) : null}

      <div
        className={`absolute inset-0 ${
          morphPrimed ? exitStyles.leftMinus5BgStack : ""
        } ${morphPrimed ? "z-[1]" : "z-0"}`}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            transform: "scale(1.428)",
            filter: "blur(3px)",
          }}
          aria-hidden
        >
          <source src={UX2_MINUS5_LEFT_AMBIENT_VIDEO} type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.42] mix-blend-soft-light"
          style={{ background: UX2_MINUS5_GRADIENT_OVERLAY }}
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[6]">
        <div
          className={`${exitStyles.leftText} absolute top-1/2 z-[5] -translate-y-1/2`}
          style={{ left: "11%", maxWidth: "62%" }}
        >
          <div
            className="font-doto text-left text-[4.25cqw] font-black leading-[1.14] tracking-[-0.02em]"
            style={UX2_MINUS5_LEFT_TEXT_STYLE}
          >
            {UX2_MINUS5_LEFT_TEXT_LINES.map((line) => (
              <p key={line} className="mb-0 whitespace-nowrap leading-[1.14]">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`${exitStyles.leftVoice} left-step7-sound-slot left-ambient__voice--glow pointer-events-none left-ambient__voice--settled`}
          aria-hidden
        >
          <VoiceRecorder active compact />
        </div>

        {morphPrimed ? (
          <div
            className={`${exitStyles.leftDots} absolute left-1/2 z-[7] -translate-x-1/2`}
            style={{
              top: `${pctPre(PRE_STEP_DOTS.top)}%`,
              width: `${sizeCqwPre(PRE_STEP_DOTS.width)}%`,
              height: `${sizeCqwPre(PRE_STEP_DOTS.height)}%`,
            }}
          >
            <Ux2Ux1Step7CenterLoadingDots />
          </div>
        ) : null}
      </div>
    </div>
  );
}
