import Image from "next/image";
import MusicBlob from "@/components/MusicBlob";
import { insetOrbitPosition } from "@/lib/orbitIconLayout";

const ORBIT_ICONS = [
  {
    id: "burger",
    src: "/figma/icon-orbit-burger.svg",
    figma: { left: 24.53, top: 25.14 },
    sizeCqw: 12.22,
  },
  {
    id: "music",
    variant: "music",
    figma: { left: 50, top: 10.39 },
    sizeCqw: 11.16,
  },
].map((icon) => {
  const pos = insetOrbitPosition(icon.figma.left, icon.figma.top);
  return {
    ...icon,
    left: pos.left,
    top: pos.top,
  };
});

/** 5단계 — Figma 슬롯 정착 (handoff 없음) */
export default function IconOrbitCarousel({ step }) {
  if (step !== 5) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[28]" aria-hidden>
      {ORBIT_ICONS.map((icon) => (
        <div
          key={icon.id}
          className="icon-orbit-settled absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: icon.left,
            top: icon.top,
            width: `${icon.sizeCqw}cqw`,
            height: `${icon.sizeCqw}cqw`,
          }}
        >
          <div className="relative h-full w-full">
            {icon.variant === "music" ? (
              <MusicBlob active={false} orbitShell />
            ) : (
              <>
                <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
                <Image
                  src={icon.src}
                  alt=""
                  width={260}
                  height={260}
                  className="relative z-[1] h-full w-full max-w-none drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
