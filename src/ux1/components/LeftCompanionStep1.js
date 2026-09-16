const TEXT_SHADOW = "0 3.215px 7.394px rgba(40, 37, 57, 0.15)";

/** Figma 50:148 — WeatherFace 대비 ~12% 축소 (듀얼 1단계 균형) */
export default function LeftCompanionStep1({ show = true }) {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
      <div className="flex w-[22%] flex-col items-center gap-[9.1cqw] text-center">
        <p
          className="font-haas w-full text-[3.62cqw] font-light tracking-[-0.02em] text-[#575757]"
          style={{ textShadow: TEXT_SHADOW }}
        >
          WED 09/03
        </p>
        <div
          className="relative w-[19.5cqw] shrink-0 font-haas font-thin leading-[0.85] tracking-[-0.04em] text-[#383645]"
          style={{ textShadow: TEXT_SHADOW }}
        >
          <p className="text-[14.5cqw] leading-[0.85]">08</p>
          <p className="text-[14.5cqw] leading-[0.85]">30</p>
        </div>
        {/* 닷은 LeftCompanionAgentLayer — 1→2 우측과 동일 DOM 연속 */}
        <div className="h-[9px] w-[calc(9px*3+0.65rem*2)] shrink-0" aria-hidden />
      </div>
    </div>
  );
}
