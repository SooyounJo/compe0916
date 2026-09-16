import Image from "next/image";
import BlurFade from "@/components/BlurFade";

/** Figma 20:3022 — 텍스트·아이콘만 (점은 CircleUI에서 연속 레이어로) */
const F = 1872;
const BLOCK_W = 470;

export default function WeatherFace({ show = true }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div
        className="absolute left-1/2 flex w-[25.106%] -translate-x-1/2 flex-col items-end gap-[10.417cqw]"
        style={{ top: `${(481 / F) * 100}%` }}
      >
        <div className="relative h-[5.876cqw] w-full shrink-0">
          <Image
            src="/figma/cloud-sun.svg"
            alt=""
            width={110}
            height={110}
            className="absolute left-0 top-0 h-[5.876cqw] w-[5.876cqw] max-w-none"
          />
          <p
            className="font-haas absolute -translate-x-1/2 whitespace-nowrap text-[4.122cqw] font-light tracking-[-0.02em] text-[#575757]"
            style={{
              left: `${(303.5 / BLOCK_W) * 100}%`,
              top: `${(11.5 / 110) * 100}%`,
              textShadow: "0 3.215px 7.394px rgba(40, 37, 57, 0.15)",
            }}
          >
            Sunny Day
          </p>
        </div>

        <div className="relative h-[29.098cqw] w-[22.172cqw] shrink-0">
          <p
            className="font-haas absolute inset-x-0 top-0 text-center text-[16.482cqw] font-thin leading-[0.85] tracking-[-0.04em] text-[#383645]"
            style={{
              textShadow: "0 3.215px 7.394px rgba(40, 37, 57, 0.15)",
            }}
          >
            32°
          </p>
        </div>
      </div>
    </BlurFade>
  );
}
