"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  markLeftOrbitEnterPlayed,
  shouldPlayLeftOrbitEnter,
} from "../lib/leftOrbitEnterLatch";
import {
  LEFT_ORBIT_ARC_ENTRY,
  LEFT_ORBIT_STEP4_ENTRY_BASE_S,
  LEFT_ORBIT_STEP4_ICONS,
  LEFT_ORBIT_STEP5_STAY_IDS,
  LEFT_ORBIT_STEP5_EXIT_IDS,
} from "../lib/leftOrbitStep4";
import {
  LEFT_STEP5_ICONS,
  LEFT_STEP5_INNER_PCT,
} from "../lib/leftOrbitStep5";
import {
  handoffExitDelay,
  handoffRelocateDelay,
} from "../lib/dualOrbitHandoff";

function iconMotionClass(step, arcSettled, playEnter) {
  if (step === 5) return "left-icon-orbit-settled";
  if (step === 4 && arcSettled) return "left-icon-orbit-settled";
  if (step === 4 && playEnter) return "ux1-left-icon-orbit-enter-arc";
  if (step === 4) return "left-icon-orbit-settled";
  return "";
}

function Step5Icon({ icon, noAnim }) {
  const innerPct = icon.innerPct ?? LEFT_STEP5_INNER_PCT;
  const innerStyle = {
    width: `${innerPct}%`,
    height: `${innerPct}%`,
  };

  const className = noAnim
    ? "left-icon-orbit-settled absolute -translate-x-1/2 -translate-y-1/2"
    : "ux1-left-icon-orbit-step5-in absolute -translate-x-1/2 -translate-y-1/2";

  return (
    <div
      className={className}
      style={{
        left: icon.left,
        top: icon.top,
        width: `${icon.sizeCqw}cqw`,
        height: `${icon.sizeCqw}cqw`,
        animationDelay: noAnim ? undefined : `${icon.delayS ?? 0}s`,
        "--orbit-step5-opacity": icon.opacity ?? 1,
        opacity: noAnim ? (icon.opacity ?? 1) : undefined,
      }}
    >
      {icon.variant === "music" ? (
        <div className="relative h-full w-full">
          <Image
            src="/figma/left-orbit/step6-music-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            sizes="20vw"
          />
          <Image
            src="/figma/left-orbit/step6-music-note.svg"
            alt=""
            width={84}
            height={84}
            style={innerStyle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      ) : icon.iconSrc ? (
        <div className="relative h-full w-full">
          <Image
            src={icon.src}
            alt=""
            fill
            className="object-contain"
            sizes="20vw"
          />
          <Image
            src={icon.iconSrc}
            alt=""
            width={84}
            height={84}
            style={innerStyle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Image
            src={icon.src}
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            sizes="20vw"
          />
        </div>
      )}
    </div>
  );
}

/** 좌측 4 arc · 5 Figma 17:1686 정착 */
export default function LeftCompanionIconArc({ step = 1 }) {
  const [arcSettled, setArcSettled] = useState(false);
  const [entering, setEntering] = useState(false);
  const [transitioningTo5, setTransitioningTo5] = useState(false);
  const [step5TransitionDone, setStep5TransitionDone] = useState(false);
  const [noAnimStep5, setNoAnimStep5] = useState(false);
  const enterDoneCountRef = useRef(0);
  const prevStepRef = useRef(step);

  useEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    enterDoneCountRef.current = 0;
    if (step === 4 && shouldPlayLeftOrbitEnter(4)) {
      setEntering(true);
      setArcSettled(false);
      setTransitioningTo5(false);
      setStep5TransitionDone(false);
    } else if (step === 4) {
      setEntering(false);
      setArcSettled(true);
      setTransitioningTo5(false);
      setStep5TransitionDone(false);
    }
    if (step < 4) {
      setEntering(false);
      setArcSettled(false);
      setTransitioningTo5(false);
      setStep5TransitionDone(false);
    }
    if (step === 5) {
      setEntering(false);
      if (prevStep === 4) {
        setTransitioningTo5(true);
        setStep5TransitionDone(false);
        setNoAnimStep5(true);

        const timer = setTimeout(() => {
          setTransitioningTo5(false);
          setStep5TransitionDone(true);
        }, 2600);
        return () => clearTimeout(timer);
      } else {
        setTransitioningTo5(false);
        setStep5TransitionDone(true);
        setNoAnimStep5(false);
      }
    }
  }, [step]);

  const playEnter = step === 4 && entering && !arcSettled;

  const onEnterStart = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "ux1-left-icon-arc-enter") return;
      markLeftOrbitEnterPlayed();
    },
    [step],
  );

  const onEnterEnd = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "ux1-left-icon-arc-enter") return;
      enterDoneCountRef.current += 1;
      if (enterDoneCountRef.current >= LEFT_ORBIT_STEP4_ICONS.length) {
        setArcSettled(true);
      }
    },
    [step],
  );

  if (step !== 4 && step !== 5) return null;

  if (step === 5 && step5TransitionDone) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        aria-hidden
      >
        {LEFT_STEP5_ICONS.map((icon) => (
          <Step5Icon key={icon.id} icon={icon} noAnim={noAnimStep5} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4]"
      aria-hidden
    >
      {LEFT_ORBIT_STEP4_ICONS.map((icon) => {
        let motion = "";
        let delayS = 0;
        if (step === 5 && transitioningTo5) {
          if (LEFT_ORBIT_STEP5_STAY_IDS.includes(icon.id)) {
            motion = "left-icon-orbit-rim-relocate";
            delayS = handoffRelocateDelay(icon.id);
          } else if (LEFT_ORBIT_STEP5_EXIT_IDS.includes(icon.id)) {
            motion = "left-icon-orbit-exit-rim";
            delayS = handoffExitDelay(icon.id);
          }
        } else {
          motion = iconMotionClass(step, arcSettled, playEnter);
          delayS = playEnter ? LEFT_ORBIT_STEP4_ENTRY_BASE_S + icon.delayS : 0;
        }

        return (
          <div
            key={icon.id}
            /** 센터링은 모션 CSS의 transform: translate(-50%,-50%)가 담당 */
            className={`absolute will-change-[left,top,transform,opacity,filter] ${motion}`}
            style={{
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: `${delayS}s`,
              "--orbit-start-left":
                icon.entryStartLeft ?? LEFT_ORBIT_ARC_ENTRY.left,
              "--orbit-start-top":
                icon.entryStartTop ?? LEFT_ORBIT_ARC_ENTRY.top,
              "--orbit-entry-rim-a-left": icon.entryRimALeft,
              "--orbit-entry-rim-a-top": icon.entryRimATop,
              "--orbit-entry-rim-b-left": icon.entryRimBLeft,
              "--orbit-entry-rim-b-top": icon.entryRimBTop,
              "--orbit-entry-rim-c-left": icon.entryRimCLeft,
              "--orbit-entry-rim-c-top": icon.entryRimCTop,
              "--orbit-entry-rim-d-left": icon.entryRimDLeft,
              "--orbit-entry-rim-d-top": icon.entryRimDTop,
              "--orbit-end-left": icon.left,
              "--orbit-end-top": icon.top,
              "--orbit-end-opacity": icon.opacity ?? 1,
              "--orbit-rim-a-left": icon.rimALeft,
              "--orbit-rim-a-top": icon.rimATop,
              "--orbit-rim-b-left": icon.rimBLeft,
              "--orbit-rim-b-top": icon.rimBTop,
              "--orbit-dip-left": icon.dipLeft,
              "--orbit-dip-top": icon.dipTop,
              "--orbit-s-out-left": icon.sOutLeft,
              "--orbit-s-out-top": icon.sOutTop,
              "--orbit-s-mid-left": icon.sMidLeft,
              "--orbit-s-mid-top": icon.sMidTop,
              "--orbit-s-bridge-left": icon.sBridgeLeft,
              "--orbit-s-bridge-top": icon.sBridgeTop,
              "--orbit-relocate-left": icon.relocateLeft,
              "--orbit-relocate-top": icon.relocateTop,
            }}
            onAnimationStart={playEnter ? onEnterStart : undefined}
            onAnimationEnd={playEnter ? onEnterEnd : undefined}
          >
            {icon.iconSrc ? (
              <div className="relative h-full w-full">
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="20vw"
                />
                <Image
                  src={icon.iconSrc}
                  alt=""
                  width={84}
                  height={84}
                  className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
                  sizes="20vw"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
