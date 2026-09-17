"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ORBIT_BURGER,
  ORBIT_PEOPLE,
  RIGHT_STEP5_STAGGER_INDEX,
} from "../lib/orbitIconLayout";
import { rightStep5EnterDelayS } from "../lib/leftOrbitStep4";

const ORBIT_ICONS = [
  {
    id: "people",
    src: "/figma/icon-orbit-people.svg",
    ...ORBIT_PEOPLE,
    staggerIndex: RIGHT_STEP5_STAGGER_INDEX.people,
  },
  {
    id: "burger",
    src: "/figma/icon-orbit-burger.svg",
    ...ORBIT_BURGER,
    staggerIndex: RIGHT_STEP5_STAGGER_INDEX.burger,
  },
];

/** 5단계 — 좌 arc 퇴장 stagger에 맞춰 좌→우 순차 등장 */
export default function IconOrbitCarousel({ step }) {
  const [entering, setEntering] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 5 && prevStep === 4) {
      setEntering(true);
      return undefined;
    }

    setEntering(false);
    return undefined;
  }, [step]);

  if (step !== 5) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[28]" aria-hidden>
      {ORBIT_ICONS.map((icon) => {
        const motion = entering
          ? "ux1-right-icon-step5-enter"
          : "icon-orbit-settled";

        return (
          <div
            key={icon.id}
            className={`absolute ${motion}`}
            style={{
              left: icon.left,
              top: icon.top,
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: entering
                ? `${rightStep5EnterDelayS(icon.staggerIndex)}s`
                : undefined,
            }}
          >
            <div className="relative h-full w-full">
              <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
              <Image
                src={icon.src}
                alt=""
                width={260}
                height={260}
                className="relative z-[1] h-full w-full max-w-none drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
