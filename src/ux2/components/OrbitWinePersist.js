import Image from "next/image";
import { ORBIT_WINE } from "@/lib/orbitIconLayout";

/** 5·6 — 좌하단 와인 정착 */
export default function OrbitWinePersist({ step }) {
  if (step < 5) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[32]">
      <div
        className="icon-orbit-settled absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ORBIT_WINE.left,
          top: ORBIT_WINE.top,
          width: `${ORBIT_WINE.sizeCqw}cqw`,
          height: `${ORBIT_WINE.sizeCqw}cqw`,
        }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
          <Image
            src="/figma/icon-orbit-wine.svg"
            alt=""
            width={260}
            height={260}
            className="relative z-[1] h-full w-full max-w-none drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
