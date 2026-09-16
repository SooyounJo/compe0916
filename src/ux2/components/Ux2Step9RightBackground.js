"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { UX2_STEP9_RIGHT_BG } from "@/ux2/lib/ux2Step9RightLayout";

/** UX2 우측 원 BG (9·10 등 단계별 src) */
export default function Ux2Step9RightBackground({
  show = false,
  src = UX2_STEP9_RIGHT_BG,
  /** 10단계: 9 BG보다 살짝 더 블러 */
  blurStronger = false,
}) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
    >
      <Image
        src={src}
        alt=""
        fill
        className={`object-cover object-center ${
          blurStronger ? "scale-110 blur-[5px]" : ""
        }`}
        sizes="(max-width: 560px) 88vmin, 560px"
        priority
      />
    </BlurFade>
  );
}
