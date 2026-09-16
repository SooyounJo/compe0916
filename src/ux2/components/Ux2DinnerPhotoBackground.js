"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";

/** 식사 사진 + Figma 50:491 톤 (어두운 오버레이·살짝 블러) */
export default function Ux2DinnerPhotoBackground({
  show = false,
  src,
  imageScale = 1.1,
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
        className="object-cover object-center blur-[2px]"
        style={{ transform: `scale(${imageScale})` }}
        sizes="(max-width: 560px) 88vmin, 560px"
        priority
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
    </BlurFade>
  );
}
