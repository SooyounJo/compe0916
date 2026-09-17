"use client";

import Image from "next/image";
import DotGridAmbient from "@/ux2/components/DotGridAmbient";
import Ux2Ux1Step8CircleLoadingDots from "@/ux2/components/Ux2Ux1Step8CircleLoadingDots";
import { UX2_PRE_STEP_NIGHT_VIDEO } from "@/ux2/components/Ux2PreStepRightBackground";
import Ux2Minus5PartyNightBg from "@/ux2/minus5/Ux2Minus5PartyNightBg";
import {
  UX2_MINUS5_EXIT_EASE,
  UX2_MINUS5_EXIT_COCKTAIL_MS,
  UX2_MINUS5_EXIT_FOREGROUND_MS,
  UX2_MINUS5_EXIT_RIGHT_BG_MS,
  UX2_MINUS5_EXIT_RIGHT_BLUR_MS,
} from "@/ux2/lib/ux2Minus5ToMinus4Exit";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import { PRE_STEP_RIGHT_4_COCKTAIL } from "@/ux2/lib/ux2PreStepRightLayout";
import {
  UX2_MINUS5_RIGHT_WINE_LEFT_PCT,
  UX2_MINUS5_RIGHT_WINE_SIZE_CQW,
} from "@/ux2/minus5/ux2Minus5Step8Copy";
import generateStyles from "@/ux2/styles/ux2PreStepRightGenerate.module.css";
import exitStyles from "@/ux2/styles/ux2Minus5ToMinus4Exit.module.css";

/** UX1 8단계 우측 정착 화면 — UX2 -5 전용 */
export default function Ux2Minus5RightCircle({
  className = "",
  morphPrimed = false,
  morphActive = false,
}) {
  const motionVars = {
    "--ux2-m5-ease": UX2_MINUS5_EXIT_EASE,
    "--ux2-m5-right-bg-ms": `${UX2_MINUS5_EXIT_RIGHT_BG_MS}ms`,
    "--ux2-m5-right-blur-ms": `${UX2_MINUS5_EXIT_RIGHT_BLUR_MS}ms`,
    "--ux2-m5-right-fg-ms": `${UX2_MINUS5_EXIT_FOREGROUND_MS}ms`,
    "--ux2-m5-cocktail-ms": `${UX2_MINUS5_EXIT_COCKTAIL_MS}ms`,
  };

  const rightCocktailCqw = pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.size);

  return (
    <div
      className={`@container/circle relative aspect-square overflow-hidden rounded-full bg-[#0a0a0a] shadow-[0_8px_48px_rgba(0,0,0,0.45)] [container-type:size] ${
        morphActive ? exitStyles.rightExiting : ""
      } ${className}`}
      style={motionVars}
      role="img"
      aria-label="UX1 8단계 우측 (UX2 -5)"
    >
      {morphPrimed ? (
        <div className={`${exitStyles.rightMinus4Bg} absolute inset-0 z-[2] overflow-hidden`}>
          <div
            className={`${generateStyles.scene} ${generateStyles.sceneStep4} absolute inset-0`}
          >
            <video
              src={UX2_PRE_STEP_NIGHT_VIDEO}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden
            />
          </div>
          <DotGridAmbient step={-4} variant="preStep" className="z-[3]" />
        </div>
      ) : null}

      {morphPrimed ? (
        <div
          className={`${exitStyles.rightCocktail} pointer-events-none absolute z-[3] -translate-x-1/2 -translate-y-1/2`}
          style={{
            left: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerX)}%`,
            top: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerY)}%`,
            width: `${rightCocktailCqw}cqw`,
            height: `${rightCocktailCqw}cqw`,
          }}
        >
          <Image
            src="/figma/left-orbit/cocktail-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            sizes="22vw"
          />
        </div>
      ) : null}

      <div
        className={`absolute inset-0 ${
          morphPrimed ? exitStyles.rightMinus5Stack : ""
        } ${morphPrimed ? "z-[4]" : ""}`}
      >
        <Ux2Minus5PartyNightBg />
        <DotGridAmbient step={8} />
        <div
          className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${UX2_MINUS5_RIGHT_WINE_LEFT_PCT}%`,
            width: `${UX2_MINUS5_RIGHT_WINE_SIZE_CQW}cqw`,
            height: `${UX2_MINUS5_RIGHT_WINE_SIZE_CQW}cqw`,
          }}
        >
          <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
          <Image
            src="/figma/icon-orbit-wine.svg"
            alt=""
            fill
            className="relative z-[1] object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
            sizes="8vw"
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[38] -translate-x-1/2 -translate-y-1/2">
          <Ux2Ux1Step8CircleLoadingDots white />
        </div>
      </div>
    </div>
  );
}
