const STAGGER_S = 0.55;
const WAVE_DURATION_S = 3.4;

const DOT_SIZE_CLASS = "h-[11px] w-[11px] sm:h-[12px] sm:w-[12px]";
/** 1단계 — 좌측 Figma step1-dots(#A099B9)와 동일 톤·소형 */
const STEP1_DOT_SIZE_CLASS = "h-[9px] w-[9px]";
/** Figma step1-dots.svg — 좌·우 상단, 중앙 하단 아크 */
const STEP1_ROW_BOX_W = "calc(9px * 3 + 0.65rem * 2)";
const STEP1_ROW_BOX_H = "18px";

const CLUSTER_BOX_W = 34;
const CLUSTER_BOX_H = 34;
const ROW_BOX_W = "calc(11px * 3 + 0.85rem * 2)";
const ROW_BOX_H = "11px";

/** 50%·50% 앵커 — left/right 혼용 없이 transform만 보간 */
const ROW_OFFSETS = [
  { x: "calc(-11px - 0.85rem)", y: "0px" },
  { x: "0px", y: "0px" },
  { x: "calc(11px + 0.85rem)", y: "0px" },
];

const STEP1_ROW_OFFSETS = [
  { x: "calc(-9px - 0.65rem)", y: "-3.2px" },
  { x: "0px", y: "3.2px" },
  { x: "calc(9px + 0.65rem)", y: "-3.2px" },
];

/** 2~3 중앙 회전 닷 — 완전한 정삼각형으로 균일 회전 */
const CLUSTER_OFFSETS = [
  { x: "0px", y: "-10.5px", opacity: 1 },
  { x: "9.1px", y: "5.25px", opacity: 0.8 },
  { x: "-9.1px", y: "5.25px", opacity: 0.5 },
];

const GATHER_CENTER = { x: "0px", y: "0px", opacity: 0 };

const DOT_MOVE =
  "transition-[transform,opacity,filter] duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.2,1)]";

function dotTransform(x, y) {
  return `translate(calc(-50% + ${x}), calc(-50% + ${y}))`;
}

function DotShell({ index, step, gathering, step1White = false }) {
  const clustered = step >= 2;
  const step1Row = step <= 1 && !clustered;
  const orbitStyle = step >= 3 && clustered && !gathering;
  const delay = index * STAGGER_S;

  let x = (step1Row ? STEP1_ROW_OFFSETS : ROW_OFFSETS)[index].x;
  let y = (step1Row ? STEP1_ROW_OFFSETS : ROW_OFFSETS)[index].y;
  let dotOpacity = 1;

  if (gathering) {
    x = GATHER_CENTER.x;
    y = GATHER_CENTER.y;
    dotOpacity = GATHER_CENTER.opacity;
  } else if (clustered) {
    x = CLUSTER_OFFSETS[index].x;
    y = CLUSTER_OFFSETS[index].y;
    dotOpacity = CLUSTER_OFFSETS[index].opacity;
  }

  const trailA = orbitStyle
    ? "agent-dot-trail-orbit"
    : "agent-dot-trail-wave";
  const trailB = orbitStyle
    ? "agent-dot-trail-orbit agent-dot-trail-orbit-b"
    : "agent-dot-trail-wave agent-dot-trail-wave-b";
  const trailC = orbitStyle
    ? "agent-dot-trail-orbit agent-dot-trail-orbit-c"
    : "agent-dot-trail-wave agent-dot-trail-wave-c";
  const dotClass = orbitStyle
    ? "agent-dot-orbit"
    : step1Row
      ? "agent-dot-wave agent-dot-wave-step1"
      : "agent-dot-wave";

  const sizeClass = step1Row ? STEP1_DOT_SIZE_CLASS : DOT_SIZE_CLASS;
  const step1Lavender = step1Row && !step1White;
  const trailAClass = step1Lavender
    ? "bg-[#A099B9]/55"
    : "bg-white/70";
  const trailBClass = step1Lavender
    ? "bg-[#A099B9]/35"
    : "bg-white/45";
  const trailCClass = step1Lavender
    ? "bg-[#A099B9]/25"
    : "bg-white/30";
  const coreClass = step1Lavender
    ? "bg-[#A099B9] shadow-[inset_0_2px_3px_rgba(255,255,255,0.35)]"
    : "bg-white/95 shadow-[inset_0_2px_3px_rgba(200,200,200,0.35)]";

  return (
    <span
      className={`absolute left-1/2 top-1/2 ${sizeClass} ${DOT_MOVE} ${
        gathering ? "scale-[0.35]" : "scale-100"
      }`}
      style={{
        transform: dotTransform(x, y),
        opacity: gathering ? dotOpacity : undefined,
        transitionDelay:
          clustered && !gathering ? `${index * 70}ms` : "0ms",
      }}
    >
      <span
        className={`${trailA} absolute inset-0 rounded-full ${trailAClass} ${DOT_MOVE}`}
        style={
          orbitStyle
            ? undefined
            : gathering
              ? { opacity: 0 }
              : {
                  animationDuration: `${WAVE_DURATION_S}s`,
                  animationDelay: `${delay + 0.08}s`,
                }
        }
      />
      <span
        className={`${trailB} absolute inset-0 rounded-full ${trailBClass} ${DOT_MOVE}`}
        style={
          orbitStyle
            ? undefined
            : gathering
              ? { opacity: 0 }
              : {
                  animationDuration: `${WAVE_DURATION_S}s`,
                  animationDelay: `${delay + 0.2}s`,
                }
        }
      />
      <span
        className={`${trailC} absolute inset-0 rounded-full ${trailCClass} ${DOT_MOVE}`}
        style={
          orbitStyle
            ? undefined
            : gathering
              ? { opacity: 0 }
              : {
                  animationDuration: `${WAVE_DURATION_S}s`,
                  animationDelay: `${delay + 0.34}s`,
                }
        }
      />
      <span
        className={`${dotClass} absolute inset-0 rounded-full ${coreClass} ${DOT_MOVE}`}
        style={{
          ...(orbitStyle || clustered
            ? { opacity: dotOpacity }
            : {
                animationDuration: `${WAVE_DURATION_S}s`,
                animationDelay: `${delay}s`,
              }),
        }}
      />
    </span>
  );
}

/** 날씨(1) → 에이전트(2~3) — 동일 닷 DOM, 위치·크기만 연속 보간 */
export function AgentDotsContinuity({
  step,
  gathering = false,
  step1White = false,
  enableSpin = true,
}) {
  const clustered = step >= 2;
  const spinCluster = enableSpin && step >= 2 && !gathering;

  return (
    <div
      className={`relative ${DOT_MOVE} ${
        clustered ? "delay-[450ms]" : "delay-0"
      } ${
        gathering ? "scale-[0.55] opacity-0" : "scale-100 opacity-100"
      }`}
      style={{
        width: clustered
          ? `${CLUSTER_BOX_W}px`
          : step <= 1
            ? STEP1_ROW_BOX_W
            : ROW_BOX_W,
        height: clustered
          ? `${CLUSTER_BOX_H}px`
          : step <= 1
            ? STEP1_ROW_BOX_H
            : ROW_BOX_H,
        transformOrigin: "center center",
      }}
      aria-hidden
    >
      <div
        className={`relative h-full w-full ${
          spinCluster ? "agent-rotate-slow-continuity" : ""
        } ${gathering ? "agent-dots-gathering" : ""}`}
      >
        {[0, 1, 2].map((index) => (
          <DotShell
            key={index}
            index={index}
            step={step}
            gathering={gathering}
            step1White={step1White}
          />
        ))}
      </div>
    </div>
  );
}

export default function AgentDots({ mode = "bounce", spin = false }) {
  if (mode === "rotate") {
    return (
      <div
        className={`relative h-[4.87cqw] w-[5.41cqw] ${spin ? "agent-rotate-slow" : ""}`}
        aria-hidden
      >
        <span className="absolute left-[2%] top-[2%] h-[19%] w-[19%] rounded-full bg-white shadow-[inset_0_1px_3px_rgba(200,200,200,0.35)]" />
        <span className="absolute right-[2%] top-[24%] h-[19%] w-[19%] rounded-full bg-white/80 shadow-[inset_0_1px_3px_rgba(200,200,200,0.35)]" />
        <span className="absolute bottom-[2%] left-[22%] h-[19%] w-[19%] rounded-full bg-white/50 shadow-[inset_0_1px_3px_rgba(200,200,200,0.35)]" />
      </div>
    );
  }

  return (
    <div
      className="flex items-end justify-center gap-[0.85rem]"
      aria-hidden
    >
      {[0, 1, 2].map((index) => {
        const delay = index * STAGGER_S;
        return (
          <span
            key={index}
            className="agent-dot-wrap relative h-[11px] w-[11px] sm:h-[12px] sm:w-[12px]"
          >
            <span
              className="agent-dot-trail-wave absolute inset-0 rounded-full bg-white/70"
              style={{
                animationDuration: `${WAVE_DURATION_S}s`,
                animationDelay: `${delay + 0.08}s`,
              }}
            />
            <span
              className="agent-dot-trail-wave agent-dot-trail-wave-b absolute inset-0 rounded-full bg-white/45"
              style={{
                animationDuration: `${WAVE_DURATION_S}s`,
                animationDelay: `${delay + 0.2}s`,
              }}
            />
            <span
              className="agent-dot-wave absolute inset-0 rounded-full bg-white/95 shadow-[inset_0_2px_4px_rgba(200,200,200,0.3)]"
              style={{
                animationDuration: `${WAVE_DURATION_S}s`,
                animationDelay: `${delay}s`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
