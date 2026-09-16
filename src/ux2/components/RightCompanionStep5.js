"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { rightHandoffTransformVars } from "@/ux2/lib/dualOrbitHandoffPath";
import {
  pctRight5,
  sizeCqwRight5,
  STEP5_RIGHT_CENTER_RING,
  STEP5_RIGHT_PEOPLE,
  STEP5_RIGHT_PROMPT,
  STEP5_RIGHT_VIDEO,
} from "@/ux2/lib/ux2Step5RightLayout";
import {
  UX2_STEP5_RIGHT_HANDOFF_S,
  ux2Step5RightEnterDelayS,
} from "@/ux2/lib/ux2Step5RightEnter";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #4600b7 0%, #020004 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const HANDOFF_CLASS = "icon-orbit-enter-handoff";
const STEP5_TO6_EXIT_MS = 1680;

/** 4→5 — 4부터 마운트(prevStep), gap에서 슬롯으로 transform 곡선 */
export default function RightCompanionStep5({ show = false, step = 5 }) {
  const [playEnter, setPlayEnter] = useState(false);
  const [leavingTo6, setLeavingTo6] = useState(false);
  const prevStepRef = useRef(null);

  const ringSize = sizeCqwRight5(STEP5_RIGHT_CENTER_RING.size);
  const peopleSize = sizeCqwRight5(STEP5_RIGHT_PEOPLE.size);
  const videoSize = sizeCqwRight5(STEP5_RIGHT_VIDEO.size);

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    const from4 = prev === 4 && step === 5;
    const to6 = prev === 5 && step === 6;

    if (to6) {
      setLeavingTo6(true);
      setPlayEnter(false);
      const t = setTimeout(() => setLeavingTo6(false), STEP5_TO6_EXIT_MS);
      return () => clearTimeout(t);
    }

    if (from4) {
      setLeavingTo6(false);
      setPlayEnter(true);
      const timer = setTimeout(
        () => setPlayEnter(false),
        UX2_STEP5_RIGHT_HANDOFF_S * 1000 + 120,
      );
      return () => clearTimeout(timer);
    }

    if (step < 5) {
      setPlayEnter(false);
      setLeavingTo6(false);
    }

    return undefined;
  }, [step]);

  if (step === 4) {
    return null;
  }

  if (step === 6 && !leavingTo6) {
    return null;
  }

  if (step !== 5 && !leavingTo6) {
    return null;
  }

  const peopleEndLeft = `${pctRight5(STEP5_RIGHT_PEOPLE.centerX)}%`;
  const peopleEndTop = `${pctRight5(STEP5_RIGHT_PEOPLE.centerY)}%`;
  const videoEndLeft = `${pctRight5(STEP5_RIGHT_VIDEO.centerX)}%`;
  const videoEndTop = `${pctRight5(STEP5_RIGHT_VIDEO.centerY)}%`;

  const peopleEnd = {
    "--orbit-end-left": peopleEndLeft,
    "--orbit-end-top": peopleEndTop,
  };
  const videoEnd = {
    "--orbit-end-left": videoEndLeft,
    "--orbit-end-top": videoEndTop,
  };

  const peopleHandoffVars = rightHandoffTransformVars(peopleEndLeft, peopleEndTop);
  const videoHandoffVars = rightHandoffTransformVars(videoEndLeft, videoEndTop);

  const blurFadeShow = (show && step === 5) || leavingTo6;

  return (
    <BlurFade
      show={blurFadeShow}
      className={`pointer-events-none absolute inset-0 z-[14] overflow-hidden ${
        leavingTo6 ? "right-step5-to6-out" : ""
      }`}
    >
      <div
        className={`right-step5-foreground absolute inset-0 ${
          leavingTo6 ? "right-step5-foreground--out" : ""
        }`}
      >
        <div
          className={`absolute overflow-hidden rounded-full border-[0.35cqw] border-white/55 bg-transparent shadow-[inset_0_0_40px_rgba(255,255,255,0.12)] ${
            playEnter ? "icon-orbit-wine-step5-in" : "icon-orbit-settled"
          }`}
          style={{
            "--orbit-end-left": `${pctRight5(STEP5_RIGHT_CENTER_RING.centerX)}%`,
            "--orbit-end-top": `${pctRight5(STEP5_RIGHT_CENTER_RING.centerY)}%`,
            width: `${ringSize}%`,
            height: `${ringSize}%`,
            ...(playEnter
              ? {
                  "--step5-wine-settle-delay": `${ux2Step5RightEnterDelayS("ring")}s`,
                }
              : {}),
          }}
          aria-hidden
        />

        <div
          className={`absolute ${playEnter ? HANDOFF_CLASS : "icon-orbit-settled"}`}
          style={{
            width: `${peopleSize}%`,
            height: `${peopleSize}%`,
            animationDelay: playEnter
              ? `${ux2Step5RightEnterDelayS("people")}s`
              : undefined,
            animationDuration: playEnter
              ? `${UX2_STEP5_RIGHT_HANDOFF_S}s`
              : undefined,
            ...peopleEnd,
            ...(playEnter ? peopleHandoffVars : {}),
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/figma/left-orbit/people-blob.svg"
              alt=""
              fill
              className="object-contain"
              sizes="22vw"
            />
            <Image
              src="/figma/icon-orbit-people.svg"
              alt=""
              width={120}
              height={120}
              className="absolute left-1/2 top-1/2 h-[43%] w-[43%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90"
            />
          </div>
        </div>

        <div
          className={`absolute ${playEnter ? HANDOFF_CLASS : "icon-orbit-settled"}`}
          style={{
            width: `${videoSize}%`,
            height: `${videoSize}%`,
            animationDelay: playEnter
              ? `${ux2Step5RightEnterDelayS("video")}s`
              : undefined,
            animationDuration: playEnter
              ? `${UX2_STEP5_RIGHT_HANDOFF_S}s`
              : undefined,
            ...videoEnd,
            ...(playEnter ? videoHandoffVars : {}),
          }}
        >
          <Image
            src="/figma/left-orbit/cocktail-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            sizes="18vw"
          />
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 text-center font-doto text-[4.8cqw] font-extrabold leading-none tracking-[-0.02em]"
          style={{
            top: `${pctRight5(STEP5_RIGHT_PROMPT.top)}%`,
            ...PROMPT_STYLE,
          }}
        >
          <p className="mb-0 whitespace-nowrap">{`Keep Today's`}</p>
          <p className="whitespace-nowrap">Memories</p>
        </div>
      </div>
    </BlurFade>
  );
}
