"use client";

import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import {
  UX2_PRE_STEP3_ICON_DURATION_S,
  ux2PreStep3SearchAtVoiceDelayS,
} from "@/ux2/lib/ux2PreStep3IconEnter";
import preStep3Styles from "@/ux2/styles/ux2PreStep3IconArc.module.css";

/** -3 보이스 슬롯 → 검색 블롭 (좌·우 동일 타이밍·모션) */
export default function Ux2PreStep3SearchBlob({
  show = false,
  enterKey = 0,
  centerX,
  centerY,
  blobSizeCqw,
  toPct,
  iconFillColor = "#FFFFFF",
  /** 우측: 보이스 퇴장 직후 마운트 — CSS delay 생략 */
  immediateEnter = false,
  /** -2 좌: -3에서 등장한 블롭 유지 */
  settled = false,
}) {
  if (!show) {
    return null;
  }

  const motion = settled ? "left-icon-orbit-settled" : preStep3Styles.enter;

  return (
    <div
      key={`ux2-pre3-search-blob-${enterKey}`}
      className={`pointer-events-none absolute z-[7] ${motion}`}
      style={{
        width: `${blobSizeCqw}cqw`,
        height: `${blobSizeCqw}cqw`,
        "--orbit-end-left": `${toPct(centerX)}%`,
        "--orbit-end-top": `${toPct(centerY)}%`,
        ...(settled
          ? null
          : {
              animationDelay: immediateEnter
                ? "0s"
                : `${ux2PreStep3SearchAtVoiceDelayS()}s`,
              animationDuration: `${UX2_PRE_STEP3_ICON_DURATION_S}s`,
            }),
      }}
    >
      <Ux2IconBlob
        iconSrc="/figma/ux2/step0/web-search-icon.svg"
        iconSizePct={54}
        iconFillColor={iconFillColor}
        emphasized
        blueTint={settled}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
