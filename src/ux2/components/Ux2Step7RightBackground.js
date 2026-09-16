"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { UX2_STEP7_RIGHT_BG } from "@/ux2/lib/ux2Step7RightLayout";

/** 7단계 우측 — 사용자 제공 할프톤 전면 배경 */
export default function Ux2Step7RightBackground({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
    >
      <Image
        src={UX2_STEP7_RIGHT_BG}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 560px) 88vmin, 560px"
        priority
      />
    </BlurFade>
  );
}
