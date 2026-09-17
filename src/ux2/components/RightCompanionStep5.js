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
} from "@/ux2/lib/ux2Step5RightLayout";
import {
  UX2_STEP5_RIGHT_HANDOFF_S,
  ux2Step5RightPromptDelayMs,
} from "@/ux2/lib/ux2Step5RightEnter";
import { ux2Step5RightRiseStaggerDelayS } from "@/ux2/lib/ux2Step4To5CrossHandoff";
import { ux2Step5DualPeopleDelayS } from "@/ux2/lib/ux2Step45DualTiming";
import textStyles from "@/ux2/styles/ux2Step1LeftTextIn.module.css";

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
  const [playPeopleEnter, setPlayPeopleEnter] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [leavingTo6, setLeavingTo6] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const prevStepRef = useRef(null);

  const peopleSize = sizeCqwRight5(STEP5_RIGHT_PEOPLE.size);

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    const from4 = prev === 4 && step === 5;
    const to6 = prev === 5 && step === 6;

    if (to6) {
      setLeavingTo6(true);
      setPlayPeopleEnter(false);
      const t = setTimeout(() => setLeavingTo6(false), STEP5_TO6_EXIT_MS);
      return () => clearTimeout(t);
    }

    if (from4) {
      setLeavingTo6(false);
      setShowPeople(false);
      setPlayPeopleEnter(false);
      setShowPrompt(false);

      const peopleMs = ux2Step5DualPeopleDelayS() * 1000;
      const handoffMs = UX2_STEP5_RIGHT_HANDOFF_S * 1000 + 120;
      const promptMs = ux2Step5RightPromptDelayMs();

      const peopleStart = setTimeout(() => {
        setShowPeople(true);
        setPlayPeopleEnter(true);
      }, peopleMs);
      const peopleEnd = setTimeout(
        () => setPlayPeopleEnter(false),
        peopleMs + handoffMs,
      );
      const promptStart = setTimeout(() => setShowPrompt(true), promptMs);

      return () => {
        clearTimeout(peopleStart);
        clearTimeout(peopleEnd);
        clearTimeout(promptStart);
      };
    }

    if (step === 5 && prev !== 4) {
      setShowPeople(true);
      setPlayPeopleEnter(false);
      setShowPrompt(false);
      const promptStart = setTimeout(
        () => setShowPrompt(true),
        ux2Step5RightPromptDelayMs(),
      );
      return () => clearTimeout(promptStart);
    }

    if (step < 5) {
      setPlayPeopleEnter(false);
      setShowPeople(false);
      setLeavingTo6(false);
      setShowPrompt(false);
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
  const peopleEnd = {
    "--orbit-end-left": peopleEndLeft,
    "--orbit-end-top": peopleEndTop,
  };

  const peopleHandoffVars = ux2Step5RightRiseEnterVars("people");

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
        {(showPeople || leavingTo6) && (
        <div
          className={
            playPeopleEnter
              ? rightHandoffStyles.handoff
              : "icon-orbit-settled absolute"
          }
          style={{
            width: `${peopleSize}%`,
            height: `${peopleSize}%`,
            animationDelay: playPeopleEnter
              ? `${ux2Step5RightRiseStaggerDelayS("people")}s`
              : undefined,
            animationDuration: playPeopleEnter
              ? `${UX2_STEP5_RIGHT_HANDOFF_S}s`
              : undefined,
            ...peopleEnd,
            ...(playPeopleEnter ? peopleHandoffVars : {}),
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
        )}

        {showPrompt || leavingTo6 ? (
          <div
            className={`${textStyles.inPlaceReveal} absolute left-1/2 -translate-x-1/2 text-center font-doto text-[4.8cqw] font-extrabold leading-none tracking-[-0.02em]`}
            style={{
              top: `${pctRight5(STEP5_RIGHT_PROMPT.top)}%`,
              ...PROMPT_STYLE,
            }}
          >
            <p className="mb-0 whitespace-nowrap">{`Keep Today's`}</p>
            <p className="whitespace-nowrap">Memories</p>
          </div>
        ) : null}
      </div>
    </BlurFade>
  );
}
