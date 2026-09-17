"use client";

import { useEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2RightIconBlob from "@/ux2/components/Ux2RightIconBlob";
import Ux2PreStepBlobReveal from "@/ux2/components/Ux2PreStepBlobReveal";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  PRE_STEP_RIGHT_2_CALENDAR,
  PRE_STEP_RIGHT_2_GALLERY,
} from "@/ux2/lib/ux2PreStepRightLayout";

function RightPreStep2IconBlob({
  blobId,
  enter,
  centerX,
  centerY,
  sizePx,
  iconSrc,
  iconSizePct,
}) {
  const blobCqw = pctCircleRight(sizePx);
  return (
    <Ux2PreStepBlobReveal
      blobId={blobId}
      enter={enter}
      endOpacity={1}
      style={{
        left: `${pctCircleRight(centerX)}%`,
        top: `${pctCircleRight(centerY)}%`,
        width: `${blobCqw}cqw`,
        height: `${blobCqw}cqw`,
      }}
    >
      <Ux2RightIconBlob
        iconSrc={iconSrc}
        iconSizePct={iconSizePct}
        style={{ width: "100%", height: "100%" }}
      />
    </Ux2PreStepBlobReveal>
  );
}

/**
 * Figma [12:638](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-638)
 */
export default function RightCompanionPreStep2({ step = 0 }) {
  const prevStepRef = useRef(step);
  const [preStep2EnterKey, setPreStep2EnterKey] = useState(0);
  const enter = step === -2;

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;
    if (step === -2 && prev !== -2) {
      setPreStep2EnterKey((k) => k + 1);
    }
  }, [step]);

  return (
    <BlurFade
      show={step === -2}
      className="pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      {step === -2 ? (
        <div key={`pre-step-2-right-blobs-${preStep2EnterKey}`}>
          <RightPreStep2IconBlob
            blobId="rightCalendar"
            enter={enter}
            centerX={PRE_STEP_RIGHT_2_CALENDAR.centerX}
            centerY={PRE_STEP_RIGHT_2_CALENDAR.centerY}
            sizePx={PRE_STEP_RIGHT_2_CALENDAR.size}
            iconSrc="/figma/left-orbit/calendar-icon.svg"
            iconSizePct={42}
          />

          <RightPreStep2IconBlob
            blobId="rightGallery"
            enter={enter}
            centerX={PRE_STEP_RIGHT_2_GALLERY.centerX}
            centerY={PRE_STEP_RIGHT_2_GALLERY.centerY}
            sizePx={PRE_STEP_RIGHT_2_GALLERY.size}
            iconSrc="/figma/ux2/step4/gallery-icon.svg"
            iconSizePct={48}
          />
        </div>
      ) : null}
    </BlurFade>
  );
}
