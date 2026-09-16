import Image from "next/image";
import { UX2_LEFT_ORBIT_STEP4_ICONS } from "@/ux2/lib/ux2LeftOrbitStep4";

/** 3단계에서 4 arc SVG 미리 로드 — 4 진입 시 디코딩 스톨 완화 */
export default function Ux2Step4IconPrefetch() {
  return (
    <div
      className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      aria-hidden
    >
      {UX2_LEFT_ORBIT_STEP4_ICONS.map((icon) => (
        <Image
          key={icon.id}
          src={icon.src}
          alt=""
          width={48}
          height={48}
          priority
        />
      ))}
    </div>
  );
}
