"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { useUx2PreStep4TextReveal } from "@/ux2/lib/useUx2PreStep4TextReveal";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import {
  UX2_PRE_STEP4_EXIT_MS,
  ux2PreStep4ExitBridging,
  ux2PreStep4ExitHoldMs,
} from "@/ux2/lib/ux2PreStep4To3Exit";
import { useUx2PreStep4ExitFade } from "@/ux2/lib/useUx2PreStep4ExitFade";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  PRE_STEP_RIGHT_4_COCKTAIL,
  PRE_STEP_RIGHT_4_PROMPT,
} from "@/ux2/lib/ux2PreStepRightLayout";
import preStep4ExitStyles from "@/ux2/styles/ux2PreStep4To3Exit.module.css";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #efe5a9 0%, #ffffff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const COCKTAIL_CQW = pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.size);

const promptCopy = (
  <div
    className="font-doto absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center text-[4.79cqw] font-extrabold leading-none tracking-[-0.02em]"
    style={{
      top: `${pctCircleRight(PRE_STEP_RIGHT_4_PROMPT.top)}%`,
      ...PROMPT_STYLE,
    }}
  >
    <p className="mb-0 whitespace-nowrap">About Wine,</p>
    <p className="whitespace-nowrap">Our Memories</p>
  </div>
);

/** Figma [6:248](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=6-248) — 전경 */
export default function RightCompanionPreStep4({
  step = 0,
  preStep4TextReady = false,
  preStep4HandoffInstant = false,
}) {
  const prevStepRef = useRef(step);
  const [holdExit, setHoldExit] = useState(false);

  const bridgingExit =
    holdExit || ux2PreStep4ExitBridging(step, prevStepRef.current);
  const show = step === -4 || bridgingExit;
  const exiting = bridgingExit && step !== -4;
  const exitFadeOut = useUx2PreStep4ExitFade(exiting);

  const preStep4PromptIn = useUx2PreStep4TextReveal(
    step,
    preStep4TextReady || holdExit,
    preStep4HandoffInstant,
    exiting,
  );

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;
    if (prev === UX2_PRE_STEP_FIRST && step === -3) {
      setHoldExit(true);
      const t = setTimeout(() => setHoldExit(false), ux2PreStep4ExitHoldMs());
      return () => clearTimeout(t);
    }
    if (step === UX2_PRE_STEP_FIRST) {
      setHoldExit(false);
    }
    return undefined;
  }, [step]);

  const layerClass =
    "left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden";

  const layerBody = (
    <>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerX)}%`,
          top: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerY)}%`,
          width: `${COCKTAIL_CQW}cqw`,
          height: `${COCKTAIL_CQW}cqw`,
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

      {exiting ? (
        <div className="ux2-pre-step-4-prompt pointer-events-none absolute inset-0 overflow-visible">
          {promptCopy}
        </div>
      ) : (
        <BlurFade
          show={preStep4PromptIn}
          className="ux2-pre-step-4-prompt pointer-events-none absolute inset-0 overflow-visible"
        >
          {promptCopy}
        </BlurFade>
      )}
    </>
  );

  if (!show) {
    return null;
  }

  if (exiting) {
    return (
      <div
        className={`ui-blur-fade ui-blur-fade--visible z-[15] ${layerClass} ${preStep4ExitStyles.sceneExitLayer} ${
          exitFadeOut ? preStep4ExitStyles.sceneExitLayerOut : ""
        }`}
        style={{ "--ux2-pre4-exit-ms": `${UX2_PRE_STEP4_EXIT_MS}ms` }}
        aria-hidden={false}
      >
        {layerBody}
      </div>
    );
  }

  if (preStep4HandoffInstant) {
    return (
      <div
        className={`ui-blur-fade ui-blur-fade--visible ${layerClass}`}
        aria-hidden={false}
      >
        {layerBody}
      </div>
    );
  }

  return (
    <BlurFade show={show} className={layerClass}>
      {layerBody}
    </BlurFade>
  );
}
