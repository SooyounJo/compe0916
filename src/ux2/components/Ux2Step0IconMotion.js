"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import {
  STEP0_ICON_HANDOFF_MS,
  STEP0_TEXT_HANDOFF_MS,
} from "@/ux2/lib/ux2Step0Layout";
import motionStyles from "@/ux2/styles/step0-icon-motion.module.css";

/**
 * 0단계 — 탐색 → 인스타 글래스 블롭
 * @param {"rise"|"opacity"} handoffMode — 좌: rise(하단에서 슬롯), 우: opacity(슬롯에서 교차)
 */
export default function Ux2Step0IconMotion({
  show = false,
  slotCenterX,
  slotCenterY,
  originCenterX,
  originCenterY,
  blobSizeCqw,
  toPct,
  onSettled,
  handoffMode = "rise",
  instagramIconClassName = "",
  iconFillColor,
  emphasized = false,
  searchHoldMs = STEP0_TEXT_HANDOFF_MS,
  handoffMs = STEP0_ICON_HANDOFF_MS,
  includeInstagram = true,
  /** false — 우측: 하단 출발 인스타 없이 슬롯에서만 검색→인스타 교차 */
  instagramAtOrigin = true,
}) {
  const [phase, setPhase] = useState("idle");
  const [travelToSlot, setTravelToSlot] = useState(false);
  const opacityHandoff = handoffMode === "opacity";

  useEffect(() => {
    if (!show) {
      setPhase("idle");
      setTravelToSlot(false);
      return undefined;
    }

    setPhase("search");
    setTravelToSlot(false);

    const handoffTimer = setTimeout(() => setPhase("handoff"), searchHoldMs);
    const settledTimer = setTimeout(
      () => setPhase("settled"),
      searchHoldMs + handoffMs,
    );

    return () => {
      clearTimeout(handoffTimer);
      clearTimeout(settledTimer);
    };
  }, [show, searchHoldMs, handoffMs]);

  useEffect(() => {
    if (opacityHandoff || phase !== "handoff") {
      setTravelToSlot(false);
      return undefined;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTravelToSlot(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase, opacityHandoff]);

  useEffect(() => {
    if (phase === "settled") {
      onSettled?.();
    }
  }, [phase, onSettled]);

  if (!show && phase === "idle") {
    return null;
  }

  const slotLeft = `${toPct(slotCenterX)}%`;
  const slotTop = `${toPct(slotCenterY)}%`;
  const originLeft = `${toPct(originCenterX)}%`;
  const originTop = `${toPct(originCenterY)}%`;

  const showSearch = phase === "search";
  const handoff = phase === "handoff";
  const showInstagramAtSlot =
    opacityHandoff && (handoff || phase === "settled");
  /** 이미지2 — 0초부터 하단(출발) 인스타 노출, handoff는 travel 레이어가 이어받음 */
  const showInstagramAtOrigin =
    includeInstagram && instagramAtOrigin && phase === "search";

  const blobStyle = {
    width: `${blobSizeCqw}cqw`,
    height: `${blobSizeCqw}cqw`,
  };

  const slotWrapStyle = {
    left: slotLeft,
    top: slotTop,
    ...blobStyle,
  };

  if (!includeInstagram) {
    if (!show) return null;
    return (
      <BlurFade
        show
        className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
        style={slotWrapStyle}
      >
        <Ux2IconBlob
          iconSrc="/figma/ux2/step0/web-search-icon.svg"
          iconSizePct={54}
          iconFillColor={iconFillColor}
          emphasized={emphasized}
          style={{ width: "100%", height: "100%" }}
        />
      </BlurFade>
    );
  }

  const instagramBlob = (
    <Ux2IconBlob
      iconSrc="/figma/ux2/instagram-icon.svg"
      iconSizePct={42}
      iconClassName={instagramIconClassName}
      iconFillColor={iconFillColor}
      emphasized={emphasized}
      style={{ width: "100%", height: "100%" }}
    />
  );

  return (
    <>
      {(showSearch || (handoff && !opacityHandoff)) && (
        <BlurFade
          show={showSearch}
          className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
          style={slotWrapStyle}
        >
          <Ux2IconBlob
            iconSrc="/figma/ux2/step0/web-search-icon.svg"
            iconSizePct={54}
            iconFillColor={iconFillColor}
            emphasized={emphasized}
            style={{ width: "100%", height: "100%" }}
          />
        </BlurFade>
      )}

      {showInstagramAtOrigin && (
        <div
          className="absolute z-[4] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: originLeft,
            top: originTop,
            ...blobStyle,
          }}
        >
          {instagramBlob}
        </div>
      )}

      {showInstagramAtSlot && (
        <BlurFade
          show={handoff || phase === "settled"}
          className="absolute z-[4] -translate-x-1/2 -translate-y-1/2"
          style={slotWrapStyle}
        >
          {instagramBlob}
        </BlurFade>
      )}

      {handoff && !opacityHandoff && (
        <div
          className={`absolute z-[5] ${motionStyles.travel} ${
            travelToSlot ? motionStyles.atSlot : motionStyles.atOrigin
          }`}
          style={{
            left: travelToSlot ? slotLeft : originLeft,
            top: travelToSlot ? slotTop : originTop,
            ...blobStyle,
          }}
        >
          {instagramBlob}
        </div>
      )}
    </>
  );
}
