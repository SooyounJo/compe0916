const TEXT_SHADOW = "0 3.215px 7.394px rgba(40, 37, 57, 0.15)";

/** Figma 50:148 — WeatherFace(20:3022) 상단 앵커와 동일 */
const F = 1872;
const STEP1_TOP = (481 / F) * 100;

export default function LeftCompanionStep1({ show = true }) {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      <div
        className="absolute left-1/2 flex w-[22%] -translate-x-1/2 flex-col items-center gap-[9.1cqw] text-center"
        style={{ top: `${STEP1_TOP}%` }}
      >
        <p
          className="font-haas w-full shrink-0 text-[3.62cqw] font-light tracking-[-0.02em] text-[#575757]"
          style={{ textShadow: TEXT_SHADOW }}
        >
          WED 09/03
        </p>
        <div
          className="shrink-0 font-haas font-thin leading-[0.85] tracking-[-0.04em] text-[#383645]"
          style={{ textShadow: TEXT_SHADOW }}
        >
          <p className="text-[15.6cqw] leading-[0.85]">08</p>
          <p className="text-[15.6cqw] leading-[0.85]">30</p>
        </div>
        {/* 닷 레이어(70%)와 겹치지 않도록 하단 여백 확보 */}
        <div
          className="h-[9.5cqw] w-[calc(9px*3+0.65rem*2)] shrink-0"
          aria-hidden
        />
      </div>
    </div>
  );
}
