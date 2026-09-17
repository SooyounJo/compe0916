import Image from "next/image";
import BlurFade from "@/components/BlurFade";
import {
  CENTER_COL,
  CIRCLE_F,
  FEED,
  pctInCircle,
  pctX,
  pctY,
  SIDE,
} from "@/ux2/lib/ux2Step2RightFeed";
import { STEP2_TITLE_GRADIENT } from "@/ux2/lib/ux2Step1Layout";

const TITLE_STYLE = {
  backgroundImage: STEP2_TITLE_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

function SideFeedCard({ imageSrc, style }) {
  return (
    <div
      className="absolute overflow-hidden rounded-[3.35cqw] opacity-45"
      style={style}
    >
      <div className="relative h-full w-full min-h-0">
        <Image src={imageSrc} alt="" fill className="object-cover" sizes="22vw" />
        <div className="absolute inset-x-0 top-[6%] flex items-center gap-[1cqw] px-[3cqw]">
          <Image
            src="/figma/ux2/step2/a5eeb.png"
            alt=""
            width={46}
            height={46}
            className="h-[2.4cqw] w-[2.4cqw] rounded-full object-cover"
          />
          <span className="font-haas text-[1.41cqw] font-bold text-white">
            Seven Sisters 1020
          </span>
          <Image
            src="/figma/ux2/step2/cf610.svg"
            alt=""
            width={31}
            height={8}
            className="ml-auto h-[0.41cqw] w-[1.65cqw]"
          />
        </div>
        <div className="absolute bottom-[3.5%] right-[3.5%] flex items-center gap-[1.2cqw]">
          <Image
            src="/figma/ux2/step2/59df8.svg"
            alt=""
            width={64}
            height={64}
            className="h-[3.4cqw] w-[3.4cqw]"
          />
          <Image
            src="/figma/ux2/step2/52235.svg"
            alt=""
            width={49}
            height={49}
            className="h-[2.62cqw] w-[2.62cqw]"
          />
        </div>
      </div>
    </div>
  );
}

function HeroFeedCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[5.32cqw]">
      <Image
        src="/figma/ux2/step2/60ba9.png"
        alt=""
        fill
        className="object-cover"
        sizes="32vw"
      />
      <div className="absolute inset-x-0 top-0 flex items-center gap-[1.2cqw] bg-gradient-to-b from-white/55 to-transparent px-[2.4cqw] py-[1.8cqw]">
        <Image
          src="/figma/ux2/step2/379a8.png"
          alt=""
          width={56}
          height={56}
          className="h-[2.98cqw] w-[2.98cqw] rounded-full object-cover"
        />
        <span className="font-haas text-[2.23cqw] font-bold text-white drop-shadow-sm">
          Seven Sisters 1020
        </span>
        <Image
          src="/figma/ux2/step2/699a8.svg"
          alt=""
          width={38}
          height={10}
          className="ml-auto h-[0.5cqw] w-[2.02cqw] opacity-90"
        />
      </div>
      <div className="absolute bottom-[2.4cqw] right-[2.4cqw] flex items-center gap-[1.6cqw]">
        <Image
          src="/figma/ux2/step2/523b7.svg"
          alt=""
          width={78}
          height={78}
          className="h-[4.15cqw] w-[4.15cqw]"
        />
        <Image
          src="/figma/ux2/step2/eab56.svg"
          alt=""
          width={61}
          height={61}
          className="h-[3.24cqw] w-[3.24cqw]"
        />
      </div>
    </div>
  );
}

/** Figma [1:897](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=1-897) */
export default function RightCompanionStep2({ show = true }) {
  const sideW = pctX(SIDE.width);
  const sideH = pctY(SIDE.height);
  const sideTop = pctY(SIDE.top);

  return (
    <BlurFade show={show} className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
      <div
        className="absolute isolate"
        style={{
          left: `${pctInCircle(FEED.left)}%`,
          top: `${pctInCircle(FEED.top)}%`,
          width: `${pctInCircle(FEED.width)}%`,
          height: `${pctInCircle(FEED.height)}%`,
        }}
      >
        <SideFeedCard
          imageSrc="/figma/ux2/step2/934e4.png"
          style={{
            left: `${pctX(SIDE.leftX)}%`,
            top: `${sideTop}%`,
            width: `${sideW}%`,
            height: `${sideH}%`,
          }}
        />

        <div
          className="absolute flex flex-col"
          style={{
            left: `${pctX(CENTER_COL.left)}%`,
            top: `${pctY(CENTER_COL.top)}%`,
            width: `${pctX(CENTER_COL.width)}%`,
            height: `${pctY(CENTER_COL.height)}%`,
          }}
        >
          <div
            className="relative w-full shrink-0"
            style={{ height: `${pctY(CENTER_COL.cardHeight, CENTER_COL.height)}%` }}
          >
            <HeroFeedCard />
          </div>
          <div
            className="flex flex-1 items-end justify-center pb-[0.4cqw]"
            style={{
              minHeight: `${pctY(CENTER_COL.titleHeight, CENTER_COL.height)}%`,
            }}
          >
            <p
              className="font-doto text-center text-[4.26cqw] font-black leading-none tracking-[-0.04em]"
              style={TITLE_STYLE}
            >
              Our 2022
            </p>
          </div>
        </div>

        <SideFeedCard
          imageSrc="/figma/ux2/step2/4ad6a.png"
          style={{
            left: `${pctX(SIDE.rightX)}%`,
            top: `${sideTop}%`,
            width: `${sideW}%`,
            height: `${sideH}%`,
          }}
        />

      </div>
    </BlurFade>
  );
}
