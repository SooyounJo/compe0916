"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  bumpLeftOrbitEnterCycle,
  markLeftOrbitEnterPlayed,
  shouldPlayLeftOrbitEnter,
} from "@/ux2/lib/leftOrbitEnterLatch";
import { UX2_LEFT_ORBIT_STEP4_ICONS } from "@/ux2/lib/ux2LeftOrbitStep4";
import {
  UX2_PRE_STEP3_EXIT_DURATION_S,
  UX2_PRE_STEP3_ICON_DURATION_S,
  ux2PreStep3IconEnterDelayS,
  ux2PreStep3IconExitDelayS,
} from "@/ux2/lib/ux2PreStep3IconEnter";
import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_ENTRY_BASE_S,
  UX2_UX1_STEP4_EXIT_ANIM_S,
  ux2Ux1Step4StaggerDelayS,
} from "@/ux2/lib/ux2Ux1Step45Timing";
import preStep3Styles from "@/ux2/styles/ux2PreStep3IconArc.module.css";

const UX1_ENTER_CLASS = "ux1-left-icon-orbit-enter-arc";
const UX1_EXIT_CLASS = "ux1-left-icon-orbit-exit-arc";

function iconMotionClass(step, arcSettled, playEnter, playExit, playPreStep3Exit) {
  if (playPreStep3Exit) {
    return UX1_EXIT_CLASS;
  }
  if (step === -3) {
    return preStep3Styles.enter;
  }
  if (playExit) {
    return UX1_EXIT_CLASS;
  }
  if (step === 5) {
    return "left-icon-orbit-settled";
  }
  if (step === 4 && arcSettled) {
    return "left-icon-orbit-settled";
  }
  if (step === 4 && playEnter) {
    return UX1_ENTER_CLASS;
  }
  if (step === 4) {
    return "left-icon-orbit-settled";
  }
  return "left-icon-orbit-settled";
}

function orbitStyleVars(icon) {
  return {
    "--orbit-end-left": icon.left,
    "--orbit-end-top": icon.top,
    "--orbit-end-opacity": icon.opacity ?? 1,
  };
}

function Step4Glyph({ icon }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={icon.src}
        alt=""
        fill
        className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
        sizes="22vw"
      />
    </div>
  );
}

export default function LeftCompanionIconArc({ step = 1 }) {
  const [arcSettled, setArcSettled] = useState(false);
  const [entering, setEntering] = useState(false);
  const [enterGen, setEnterGen] = useState(0);
  const [exitingTo5, setExitingTo5] = useState(false);
  const [exitingToPreStep2, setExitingToPreStep2] = useState(false);
  const enterDoneCountRef = useRef(0);
  const exitDoneCountRef = useRef(0);
  const preStep3ExitDoneCountRef = useRef(0);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (step === -3) {
      setExitingToPreStep2(false);
      return undefined;
    }

    if (step === -2 && prev === -3) {
      preStep3ExitDoneCountRef.current = 0;
      setExitingToPreStep2(true);
      return undefined;
    }

    if (step !== -2) {
      setExitingToPreStep2(false);
    }

    if (step === 4 && prev !== 4) {
      enterDoneCountRef.current = 0;
      exitDoneCountRef.current = 0;
      bumpLeftOrbitEnterCycle();
      const play = shouldPlayLeftOrbitEnter(4);
      setEnterGen((g) => g + 1);
      setEntering(play);
      setArcSettled(!play);
      setExitingTo5(false);
      return undefined;
    }

    if (step < 4) {
      setEntering(false);
      setArcSettled(false);
      setExitingTo5(false);
      return undefined;
    }

    if (step === 5 && prev === 4) {
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

  const preStep3Arc = step === -3;
  const playPreStep3Exit = exitingToPreStep2;
  const playEnter = step === 4 && entering && !arcSettled && !exitingTo5;
  const playExit = step === 5 && exitingTo5;

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
      if (enterDoneCountRef.current >= UX2_LEFT_ORBIT_STEP4_ICONS.length) {
        setArcSettled(true);
      }
    },
    [step],
  );

  const onExitEnd = useCallback(
    (e) => {
      if (e.animationName !== "ux1-left-icon-arc-exit") return;
      if (playPreStep3Exit) {
        preStep3ExitDoneCountRef.current += 1;
        if (
          preStep3ExitDoneCountRef.current >= UX2_LEFT_ORBIT_STEP4_ICONS.length
        ) {
          setExitingToPreStep2(false);
        }
        return;
      }
      if (!exitingTo5) return;
      exitDoneCountRef.current += 1;
      if (exitDoneCountRef.current >= UX2_LEFT_ORBIT_STEP4_ICONS.length) {
        setExitingTo5(false);
      }
    },
    [exitingTo5, playPreStep3Exit],
  );

  const showPreStep3Layer = preStep3Arc || playPreStep3Exit;

  if (!showPreStep3Layer && step !== 4 && step !== 5) {
    return null;
  }
  if (step === 5 && !playExit) {
    return null;
  }

  const iconsOnScreen =
    showPreStep3Layer || step === 4 || playExit
      ? UX2_LEFT_ORBIT_STEP4_ICONS
      : [];

  return (
    <div className="pointer-events-none absolute inset-0 z-[6]" aria-hidden>
      {iconsOnScreen.map((icon) => {
        const motion = iconMotionClass(
          step,
          arcSettled,
          playEnter,
          playExit,
          playPreStep3Exit,
        );
        const delayS = playPreStep3Exit
          ? ux2PreStep3IconExitDelayS(icon.id)
          : preStep3Arc
            ? ux2PreStep3IconEnterDelayS(icon.id)
            : playEnter || playExit
              ? UX2_UX1_STEP4_ENTRY_BASE_S + ux2Ux1Step4StaggerDelayS(icon.id)
              : 0;

        const styleVars = orbitStyleVars(icon);

        return (
          <div
            key={playEnter ? `${icon.id}-${enterGen}` : icon.id}
            className={`absolute ${motion}`}
            style={{
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: `${delayS}s`,
              animationDuration: playPreStep3Exit
                ? `${UX2_PRE_STEP3_EXIT_DURATION_S}s`
                : preStep3Arc
                  ? `${UX2_PRE_STEP3_ICON_DURATION_S}s`
                  : playEnter
                    ? `${UX2_UX1_STEP4_ENTER_ANIM_S}s`
                    : playExit
                      ? `${UX2_UX1_STEP4_EXIT_ANIM_S}s`
                      : undefined,
              ...styleVars,
            }}
            onAnimationStart={playEnter ? onEnterStart : undefined}
            onAnimationEnd={
              playEnter
                ? onEnterEnd
                : playExit || playPreStep3Exit
                  ? onExitEnd
                  : undefined
            }
          >
            <Step4Glyph icon={icon} />
          </div>
        );
      })}
    </div>
  );
}
