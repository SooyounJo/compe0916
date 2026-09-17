import Image from "next/image";
import BlurFade from "./BlurFade";
import { AgentDotsContinuity } from "./AgentDots";

const F = 1879;

const TEXT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.45)",
};

/** Figma [17:1723](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=17-1723) */
export default function LeftCompanionStep6({ show = false }) {
  if (!show) return null;

  const dotsTop = `${((912 + 55.767 / 2) / F) * 100}%`;
  const musicLeft = `${((939.5 + 699.13) / F) * 100}%`;
  const musicTop = `${((809 + 275.75 / 2) / F) * 100}%`;
  const musicSizeCqw = (275.75 / F) * 100;
  const textTop = `${(1408 / F) * 100}%`;

  return (
    <BlurFade
      show={show}
      className="party-night-foreground pointer-events-none absolute inset-0 z-[5]"
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: dotsTop }}
      >
        <AgentDotsContinuity step={1} gathering={false} />
      </div>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: musicLeft,
          top: musicTop,
          width: `${musicSizeCqw}cqw`,
          height: `${musicSizeCqw}cqw`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/figma/left-orbit/step6-music-blob.svg"
            alt=""
            fill
            className="object-contain"
            sizes="18vw"
          />
          <Image
            src="/figma/left-orbit/step6-music-note.svg"
            alt=""
            width={88}
            height={88}
            className="absolute left-1/2 top-1/2 h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>

      <div
        className="font-doto absolute left-1/2 w-full -translate-x-1/2 px-4 text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
        style={{ top: textTop, ...TEXT_STYLE }}
      >
        <p className="mb-0 leading-none">Home party</p>
        <p className="leading-none">music for you</p>
      </div>
    </BlurFade>
  );
}
