"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  bumpLeftOrbitEnterCycle,
  markLeftOrbitEnterPlayed,
  shouldPlayLeftOrbitEnter,
} from "@/ux2/lib/leftOrbitEnterLatch";
import { HANDOFF_ANIM_S } from "@/ux2/lib/dualOrbitHandoff";
import { ux2Step5LeftExitCompleteS } from "@/ux2/lib/ux2Step4To5CrossHandoff";
import { ux2HandoffDelayS } from "@/ux2/lib/ux2HandoffDelays";
import { ux2LeftHandoffStyleVars } from "@/ux2/lib/ux2LeftOrbitStep45Handoff";
import { UX2_LEFT_ORBIT_STEP4_ICONS } from "@/ux2/lib/ux2LeftOrbitStep4";
import handoffStyles from "@/ux2/styles/left-orbit-step45-handoff.module.css";
import {
  UX2_STEP4_ENTRY_BASE_S,
  UX2_STEP4_ENTER_DURATION_S,
  ux2Step4EnterDelayS,
} from "@/ux2/lib/ux2LeftOrbitStep4Enter";

const ARC_ENTER_CLASS = "left-icon-orbit-enter-arc";

function iconMotionClass(step, arcSettled, playEnter, handoffPlaying, icon) {
  if (step === -3) {
    return "left-icon-orbit-settled";
  }
  if (step === 5 && handoffPlaying) {
    if (icon.handoff === "crossRight") {
      return `${handoffStyles.exit} ${handoffStyles.crossExit}`;
    }
    if (icon.handoff === "exit") {
      return handoffStyles.exit;
    }
    if (icon.handoff === "relocate") return handoffStyles.relocate;
    return "left-icon-orbit-settled";
  }
  if (step === 4 && arcSettled) return "left-icon-orbit-settled";
  if (step === 4 && playEnter) return ARC_ENTER_CLASS;
  if (step === 4) return "left-icon-orbit-settled";
  return "left-icon-orbit-settled";
}

function orbitStyleVars(icon) {
  return {
    "--orbit-start-left": icon.entryStartLeft,
    "--orbit-start-top": icon.entryStartTop,
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
    "--orbit-entry-from-dx": icon.entryFromDxCqw ?? "0cqw",
    "--orbit-entry-from-dy": icon.entryFromDyCqw ?? "0cqw",
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

/** 4 arc 진입 + [6:28](https://www.figma.com/design/KB7I2ICmW14rFdscAVfKWf/Untitled?node-id=6-28) 4→5 handoff */
function initialStep4EnterState(step) {
  if (step !== 4) {
    return { entering: false, arcSettled: false };
  }
  bumpLeftOrbitEnterCycle();
  const play = shouldPlayLeftOrbitEnter(4);
  return { entering: play, arcSettled: !play };
}

export default function LeftCompanionIconArc({ step = 1 }) {
  const [enterState, setEnterState] = useState(() => initialStep4EnterState(step));
  const entering = enterState.entering;
  const arcSettled = enterState.arcSettled;
  const setArcSettled = (v) =>
    setEnterState((s) => ({ ...s, arcSettled: v }));

  const [handoffPlaying, setHandoffPlaying] = useState(false);
  const enterDoneCountRef = useRef(0);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    enterDoneCountRef.current = 0;
    if (step === 4 && prev !== null && prev !== 4) {
      bumpLeftOrbitEnterCycle();
      const play = shouldPlayLeftOrbitEnter(4);
      setEnterState({ entering: play, arcSettled: !play });
    }
    if (step < 4) {
      setEnterState({ entering: false, arcSettled: false });
      setHandoffPlaying(false);
    }

    if (step === 5 && prev === 4) {
      setHandoffPlaying(true);
      const timer = setTimeout(() => {
        setHandoffPlaying(false);
      }, ux2Step5LeftExitCompleteS() * 1000 + 80);
      return () => clearTimeout(timer);
    }

    if (step === 5 && prev !== 4) {
      setHandoffPlaying(false);
    }

    return undefined;
  }, [step]);

  const preStep3Arc = step === -3;

  const playEnter = step === 4 && entering && !arcSettled && !preStep3Arc;

  const onEnterStart = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "left-icon-arc-enter") return;
      markLeftOrbitEnterPlayed();
    },
    [step],
  );

  const onEnterEnd = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "left-icon-arc-enter") return;
      enterDoneCountRef.current += 1;
      if (enterDoneCountRef.current >= UX2_LEFT_ORBIT_STEP4_ICONS.length) {
        setArcSettled(true);
      }
    },
    [step],
  );

  /** 5 정착: Figma 8:164는 우측 원 — 좌측은 카피만, arc 아이콘 없음 */
  if (step === 5 && !handoffPlaying) {
    return null;
  }
  if (step !== 4 && step !== 5 && step !== -3) return null;

  const iconsOnScreen =
    step === 4 ||
    preStep3Arc ||
    (step === 5 && handoffPlaying)
      ? UX2_LEFT_ORBIT_STEP4_ICONS
      : [];

  return (
    <div className="pointer-events-none absolute inset-0 z-[6]" aria-hidden>
      {iconsOnScreen.map((icon) => {
        const motion = iconMotionClass(
          step,
          arcSettled,
          playEnter,
          handoffPlaying,
          icon,
        );
        const delayS = handoffPlaying
          ? ux2HandoffDelayS(icon)
          : playEnter
            ? UX2_STEP4_ENTRY_BASE_S + ux2Step4EnterDelayS(icon.id)
            : 0;

        const styleVars =
          step === 5 && handoffPlaying
            ? ux2LeftHandoffStyleVars(icon)
            : orbitStyleVars(icon);

        return (
          <div
            key={icon.id}
            className={`absolute ${motion}`}
            style={{
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: `${delayS}s`,
              animationDuration: handoffPlaying
                ? `${HANDOFF_ANIM_S}s`
                : playEnter
                  ? `${UX2_STEP4_ENTER_DURATION_S}s`
                  : undefined,
              ...styleVars,
            }}
            onAnimationStart={playEnter ? onEnterStart : undefined}
            onAnimationEnd={playEnter ? onEnterEnd : undefined}
          >
            <Step4Glyph icon={icon} />
          </div>
        );
      })}
    </div>
  );
}
