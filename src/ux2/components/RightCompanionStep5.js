"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { ux2Step5RightRiseEnterVars } from "@/ux2/lib/ux2Step4To5CrossHandoff";
import rightHandoffStyles from "@/ux2/styles/ux2Step5RightHandoff.module.css";
import {
  pctRight5,
  sizeCqwRight5,
  STEP5_RIGHT_PEOPLE,
  STEP5_RIGHT_PROMPT,
  STEP5_RIGHT_VIDEO,
  ux2RightVideoBlobCenterPx,
} from "@/ux2/lib/ux2Step5RightLayout";
import { UX2_STEP5_RIGHT_HANDOFF_S } from "@/ux2/lib/ux2Step5RightEnter";
import {
  ux2Step5RightEnterBaseS,
  ux2Step5RightRiseStaggerDelayS,
} from "@/ux2/lib/ux2Step4To5CrossHandoff";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #4600b7 0%, #020004 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const STEP5_TO6_EXIT_MS = 1680;

/** 4→5 — 4부터 마운트(prevStep), gap에서 슬롯으로 transform 곡선 */
export default function RightCompanionStep5({ show = false, step = 5 }) {
  const [playEnter, setPlayEnter] = useState(false);
  const [showRightIcons, setShowRightIcons] = useState(false);
  const [leavingTo6, setLeavingTo6] = useState(false);
  const prevStepRef = useRef(null);

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
      setShowRightIcons(false);
      setPlayEnter(false);
      const waitMs = ux2Step5RightEnterBaseS() * 1000;
      const startTimer = setTimeout(() => {
        setShowRightIcons(true);
        setPlayEnter(true);
      }, waitMs);
      const endTimer = setTimeout(
        () => setPlayEnter(false),
        waitMs + UX2_STEP5_RIGHT_HANDOFF_S * 1000 + 120,
      );
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }

    if (step === 5 && prev !== 4) {
      setShowRightIcons(true);
      setPlayEnter(false);
    }

    if (step < 5) {
      setPlayEnter(false);
      setShowRightIcons(false);
      setLeavingTo6(false);
    }

    return undefined;
  }, [step]);

  if (step < 5 && !leavingTo6) {
    return null;
  }

  if (step > 6 && !leavingTo6) {
    return null;
  }

  if (step === 6 && !leavingTo6) {
    return null;
  }

  const peopleEndLeft = `${pctRight5(STEP5_RIGHT_PEOPLE.centerX)}%`;
  const peopleEndTop = `${pctRight5(STEP5_RIGHT_PEOPLE.centerY)}%`;
  const videoCenter = ux2RightVideoBlobCenterPx();
  const videoEndLeft = `${pctRight5(videoCenter.centerX)}%`;
  const videoEndTop = `${pctRight5(videoCenter.centerY)}%`;

  const peopleEnd = {
    "--orbit-end-left": peopleEndLeft,
    "--orbit-end-top": peopleEndTop,
  };
  const videoEnd = {
    "--orbit-end-left": videoEndLeft,
    "--orbit-end-top": videoEndTop,
  };

  const peopleHandoffVars = ux2Step5RightRiseEnterVars("people");
  const videoHandoffVars = ux2Step5RightRiseEnterVars("video");

  const blurFadeShow = (show && step === 5) || leavingTo6;

  return (
    <BlurFade
      show={blurFadeShow}
      className={`pointer-events-none absolute inset-0 z-[32] overflow-hidden ${
        leavingTo6 ? "right-step5-to6-out" : ""
      }`}
    >
      <div
        className={`right-step5-foreground absolute inset-0 ${
          leavingTo6 ? "right-step5-foreground--out" : ""
        }`}
      >
        {showRightIcons || leavingTo6 ? (
          <>
        <div
          className={
            playEnter ? rightHandoffStyles.handoff : "icon-orbit-settled absolute"
          }
          style={{
            width: `${peopleSize}%`,
            height: `${peopleSize}%`,
            animationDelay: playEnter
              ? `${ux2Step5RightRiseStaggerDelayS("people")}s`
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
              src="/figma/ux2/step4/people-blob.svg"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
              sizes="22vw"
            />
          </div>
        </div>

        <div
          className={
            playEnter ? rightHandoffStyles.handoff : "icon-orbit-settled absolute"
          }
          style={{
            width: `${videoSize}%`,
            height: `${videoSize}%`,
            animationDelay: playEnter
              ? `${ux2Step5RightRiseStaggerDelayS("video")}s`
              : undefined,
            animationDuration: playEnter
              ? `${UX2_STEP5_RIGHT_HANDOFF_S}s`
              : undefined,
            ...videoEnd,
            ...(playEnter ? videoHandoffVars : {}),
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/figma/ux2/step4/video-blob.svg"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
              sizes="18vw"
            />
          </div>
        </div>
          </>
        ) : null}

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
