"use client";

import { useEffect, useState } from "react";
import Ux2RightStep4CameraIcon from "@/ux2/components/Ux2RightStep4CameraIcon";
import {
  pctCircleRight,
  STEP0_RIGHT_ICON_BLOB,
} from "@/ux2/lib/ux2Step0Layout";
import { UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S } from "@/ux2/lib/ux2Ux1Step45Timing";
import styles from "@/ux2/styles/ux2RightStep4Camera.module.css";

const BLOB_CQW = pctCircleRight(STEP0_RIGHT_ICON_BLOB.size);

/** 4단계 카메라 — 0단계 우측 icon blob 슬롯 · 5 초반 정착 유지 */
export default function Ux2RightStep4CameraLayer({ step = 1 }) {
  const [persistIntoStep5, setPersistIntoStep5] = useState(false);

  useEffect(() => {
    if (step === 4) {
      setPersistIntoStep5(true);
      return undefined;
    }
    if (step === 5) {
      setPersistIntoStep5(true);
      return undefined;
    }
    setPersistIntoStep5(false);
    return undefined;
  }, [step]);

  const show = step === 4 || (step === 5 && persistIntoStep5);
  if (!show) {
    return null;
  }

  const settled = step === 5;

  return (
    <div
      className="absolute z-[26] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctCircleRight(STEP0_RIGHT_ICON_BLOB.centerX)}%`,
        top: `${pctCircleRight(STEP0_RIGHT_ICON_BLOB.centerY)}%`,
        width: `${BLOB_CQW}cqw`,
        height: `${BLOB_CQW}cqw`,
      }}
    >
      <div
        className={`relative h-full w-full ${
          settled ? styles.settled : styles.enter
        }`}
        style={
          settled
            ? undefined
            : { animationDelay: `${UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S}s` }
        }
      >
        <Ux2RightStep4CameraIcon />
      </div>
    </div>
  );
}
