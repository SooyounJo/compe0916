"use client";

import BlurFade from "@/ux2/components/BlurFade";
import Ux2PreStepGenerateDots from "@/ux2/components/Ux2PreStepGenerateDots";
import { UX2_PRE_STEP_NIGHT_VIDEO } from "@/ux2/components/Ux2PreStepRightBackground";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import { PRE_STEP_RIGHT_4_PROMPT } from "@/ux2/lib/ux2PreStepRightLayout";
import styles from "@/ux2/styles/ux2PreStepRightGenerate.module.css";

const BLURRED_PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #efe5a9 0%, #ffffff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** -4~-2 우측 — night 영상 + 닷 그리드 generate (스텝 간 유지) */
export default function Ux2PreStepRightGenerate({ step = 0 }) {
  const show = step >= -4 && step <= -2;
  /** -2→-1 퇴장 BlurFade 동안만 DOM 유지 */
  if (step < -4 || step > -1) {
    return null;
  }

  const sceneClass =
    step === -4
      ? styles.sceneStep4
      : step === -3
        ? styles.sceneStep3
        : styles.sceneStep2;

  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
    >
      <div className={`${styles.root} absolute inset-0`}>
        <div className={`${styles.scene} ${sceneClass} absolute inset-0`}>
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

        <Ux2PreStepGenerateDots step={step} className="z-[3]" />

        <BlurFade
          show={step === -2}
          className="left-step4-ui-blur-in pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className={`${styles.blurredPrompt} font-doto absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center text-[4.79cqw] font-extrabold leading-none tracking-[-0.02em]`}
            style={{
              top: `${pctCircleRight(PRE_STEP_RIGHT_4_PROMPT.top)}%`,
              ...BLURRED_PROMPT_STYLE,
            }}
          >
            <p className="mb-0 whitespace-nowrap">About Wine,</p>
            <p className="whitespace-nowrap">Our Memories</p>
          </div>
        </BlurFade>
      </div>
    </BlurFade>
  );
}
