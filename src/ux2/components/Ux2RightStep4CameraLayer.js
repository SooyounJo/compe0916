"use client";

import { useEffect, useState } from "react";
import Ux2RightStep4CameraIcon from "@/ux2/components/Ux2RightStep4CameraIcon";
import {
  pctCircleRight,
  STEP0_RIGHT_ICON_BLOB,
  STEP0_RIGHT_ROW,
} from "@/ux2/lib/ux2Step0Layout";
import { UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S } from "@/ux2/lib/ux2Ux1Step45Timing";
import { ux2Step5DualRightVideoHandoffDelayS } from "@/ux2/lib/ux2Step45DualTiming";
import styles from "@/ux2/styles/ux2RightStep4Camera.module.css";

const SLOT_X = STEP0_RIGHT_ROW.left + STEP0_RIGHT_ROW.blobSize / 2;
const SLOT_Y = STEP0_RIGHT_ROW.top + STEP0_RIGHT_ROW.height / 2;
const BLOB_CQW = pctCircleRight(STEP0_RIGHT_ICON_BLOB.size);

/** 4단계 카메라 — 0단계 우측 icon blob 슬롯(Instagram persist와 동일 좌표) */
export default function Ux2RightStep4CameraLayer({ step = 1 }) {
  const [persistIntoStep5, setPersistIntoStep5] = useState(false);

  useEffect(() => {
    if (step === 4) {
      setPersistIntoStep5(true);
      return undefined;
    }
    if (step === 5) {
      setPersistIntoStep5(true);
      const t = setTimeout(
        () => setPersistIntoStep5(false),
        ux2Step5DualRightVideoHandoffDelayS() * 1000,
      );
      return () => clearTimeout(t);
    }
    setPersistIntoStep5(false);
    return undefined;
  }, [step]);

  const show = step === 4 || (step === 5 && persistIntoStep5);
  if (!show) {
    return null;
  }

  const playReveal = step === 4;

  return (
    <div
      className="pointer-events-none absolute z-[26] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctCircleRight(SLOT_X)}%`,
        top: `${pctCircleRight(SLOT_Y)}%`,
        width: `${BLOB_CQW}cqw`,
        height: `${BLOB_CQW}cqw`,
      }}
    >
      <div
        className={playReveal ? styles.reveal : "h-full w-full"}
        style={
          playReveal
            ? { animationDelay: `${UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S}s` }
            : undefined
        }
      >
        <Ux2RightStep4CameraIcon />
      </div>
    </div>
  );
}
