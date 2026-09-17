"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { UX2_STEP9_RIGHT_BG } from "@/ux2/lib/ux2Step9RightLayout";
import { UX2_STEP10_RIGHT_BG } from "@/ux2/lib/ux2Step10RightLayout";
import crossfadeStyles from "@/ux2/styles/ux2Step910PhotoCrossfade.module.css";

/** UX2 우측 원 BG — 9↔10 크로스페이드 */
export default function Ux2Step9RightBackground({
  show = false,
  step = 9,
}) {
  const atTenPlus = step >= 10;

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
    >
      <Image
        src={UX2_STEP9_RIGHT_BG}
        alt=""
        fill
        className={`object-cover object-center ${crossfadeStyles.bgLayer} ${
          atTenPlus
            ? crossfadeStyles.bgLayerHidden
            : crossfadeStyles.bgLayerVisible
        }`}
        sizes="(max-width: 560px) 88vmin, 560px"
        priority
      />
      <Image
        src={UX2_STEP10_RIGHT_BG}
        alt=""
        fill
        className={`object-cover object-center ${crossfadeStyles.bgLayer} ${
          atTenPlus
            ? `${crossfadeStyles.bgLayerVisible} ${crossfadeStyles.bgLayerTen}`
            : crossfadeStyles.bgLayerHidden
        }`}
        sizes="(max-width: 560px) 88vmin, 560px"
        priority
      />
    </BlurFade>
  );
}
