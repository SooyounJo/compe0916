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
import { ux2Step5RightRiseStaggerDelayS } from "@/ux2/lib/ux2Step4To5CrossHandoff";
import {
  UX2_STEP5_DUAL_PEOPLE_DELAY_S,
  ux2Step5DualRightVideoHandoffDelayS,
} from "@/ux2/lib/ux2Step45DualTiming";
import {
  UX2_RIGHT_TINTED_BLOB_IMG_CLASS,
  UX2_RIGHT_VIDEO_BLOB_SRC,
  UX2_RIGHT_WHITE_BLOB_IMG_CLASS,
} from "@/ux2/lib/ux2RightIconFill";

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
  const [playVideoEnter, setPlayVideoEnter] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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
      setPlayPeopleEnter(false);
      setPlayVideoEnter(false);
      const t = setTimeout(() => setLeavingTo6(false), STEP5_TO6_EXIT_MS);
      return () => clearTimeout(t);
    }

    if (from4) {
      setLeavingTo6(false);
      setShowPeople(false);
      setShowVideo(false);
      setPlayPeopleEnter(false);
      setPlayVideoEnter(false);

      const peopleMs = UX2_STEP5_DUAL_PEOPLE_DELAY_S * 1000;
      const videoMs = ux2Step5DualRightVideoHandoffDelayS() * 1000;
      const handoffMs = UX2_STEP5_RIGHT_HANDOFF_S * 1000 + 120;

      const peopleStart = setTimeout(() => {
        setShowPeople(true);
        setPlayPeopleEnter(true);
      }, peopleMs);
      const peopleEnd = setTimeout(
        () => setPlayPeopleEnter(false),
        peopleMs + handoffMs,
      );

      const videoStart = setTimeout(() => {
        setShowVideo(true);
        setPlayVideoEnter(true);
      }, videoMs);
      const videoEnd = setTimeout(
        () => setPlayVideoEnter(false),
        videoMs + handoffMs,
      );

      return () => {
        clearTimeout(peopleStart);
        clearTimeout(peopleEnd);
        clearTimeout(videoStart);
        clearTimeout(videoEnd);
      };
    }

    if (step === 5 && prev !== 4) {
      setShowPeople(true);
      setShowVideo(true);
      setPlayPeopleEnter(false);
      setPlayVideoEnter(false);
    }

    if (step < 5) {
      setPlayPeopleEnter(false);
      setPlayVideoEnter(false);
      setShowPeople(false);
      setShowVideo(false);
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
              className={UX2_RIGHT_TINTED_BLOB_IMG_CLASS}
              sizes="22vw"
            />
          </div>
        </div>
        )}

        {(showVideo || leavingTo6) && (
        <div
          className={
            playVideoEnter
              ? rightHandoffStyles.handoff
              : "icon-orbit-settled absolute"
          }
          style={{
            width: `${videoSize}%`,
            height: `${videoSize}%`,
            animationDelay: playVideoEnter
              ? `${ux2Step5RightRiseStaggerDelayS("video")}s`
              : undefined,
            animationDuration: playVideoEnter
              ? `${UX2_STEP5_RIGHT_HANDOFF_S}s`
              : undefined,
            ...videoEnd,
            ...(playVideoEnter ? videoHandoffVars : {}),
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={UX2_RIGHT_VIDEO_BLOB_SRC}
              alt=""
              fill
              className={UX2_RIGHT_WHITE_BLOB_IMG_CLASS}
              sizes="18vw"
            />
          </div>
        </div>
        )}

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
