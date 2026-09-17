"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  LEFT_ORBIT_ARC_ENTRY,
  LEFT_ORBIT_STEP4_ENTRY_BASE_S,
  LEFT_ORBIT_STEP4_ICONS,
} from "../lib/leftOrbitStep4";

function iconMotionClass(step, arcSettled, playEnter, playExit) {
  if (playExit) return "ux1-left-icon-orbit-exit-arc";
  if (step === 5) return "left-icon-orbit-settled";
  if (step === 4 && arcSettled) return "left-icon-orbit-settled";
  if (step === 4 && playEnter) return "ux1-left-icon-orbit-enter-arc";
  if (step === 4) return "left-icon-orbit-settled";
  return "";
}

/** 좌측 4 arc — 5에서는 퇴장 후 아이콘 없음 */
export default function LeftCompanionIconArc({ step = 1 }) {
  const [arcSettled, setArcSettled] = useState(false);
  const [entering, setEntering] = useState(false);
  const [enterGen, setEnterGen] = useState(0);
  const [exitingTo5, setExitingTo5] = useState(false);
  const enterDoneCountRef = useRef(0);
  const exitDoneCountRef = useRef(0);
  /** null — 3→4 remount 시 step=4로 초기화되면 진입 모션이 스킵되는 것 방지 */
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 4 && prevStep !== 4) {
      enterDoneCountRef.current = 0;
      exitDoneCountRef.current = 0;
      setEnterGen((gen) => gen + 1);
      setEntering(true);
      setArcSettled(false);
      setExitingTo5(false);
      return undefined;
    }

    if (step < 4) {
      setEntering(false);
      setArcSettled(false);
      setExitingTo5(false);
      return undefined;
    }

    if (step === 5 && prevStep === 4) {
      exitDoneCountRef.current = 0;
      setEntering(false);
      setExitingTo5(true);
      return undefined;
    }

    if (step === 5) {
      setEntering(false);
      setExitingTo5(false);
    }

    return undefined;
  }, [step]);

  const playEnter = step === 4 && entering && !arcSettled && !exitingTo5;
  const playExit = step === 5 && exitingTo5;

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

  const onExitEnd = useCallback(
    (e) => {
      if (!exitingTo5 || e.animationName !== "ux1-left-icon-arc-exit") return;
      exitDoneCountRef.current += 1;
      if (exitDoneCountRef.current >= LEFT_ORBIT_STEP4_ICONS.length) {
        setExitingTo5(false);
      }
    },
    [exitingTo5],
  );

  if (step !== 4 && !playExit) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4]"
      aria-hidden
    >
      {LEFT_ORBIT_STEP4_ICONS.map((icon) => {
        const motion = iconMotionClass(step, arcSettled, playEnter, playExit);
        const delayS = playEnter || playExit
          ? LEFT_ORBIT_STEP4_ENTRY_BASE_S + icon.delayS
          : 0;

        return (
          <div
            key={playEnter ? `${icon.id}-${enterGen}` : icon.id}
            className={`absolute ${motion}`}
            style={{
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: `${delayS}s`,
              "--orbit-end-left": icon.left,
              "--orbit-end-top": icon.top,
              "--orbit-end-opacity": icon.opacity ?? 1,
            }}
            onAnimationEnd={
              playEnter ? onEnterEnd : playExit ? onExitEnd : undefined
            }
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
