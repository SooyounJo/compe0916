import { AgentDotsContinuity } from "./AgentDots";
import { AgentBlobShell } from "./AgentBlobCluster";

const CENTER_CLUSTER_EASE =
  "ease-[cubic-bezier(0.33,0,0.15,1)] transition-[transform,opacity,filter]";
const CENTER_CLUSTER_IDLE = `scale-100 opacity-100 blur-0 duration-[900ms] ${CENTER_CLUSTER_EASE}`;
const CENTER_CLUSTER_GATHER = `scale-100 opacity-0 duration-[1600ms] transition-opacity ease-[cubic-bezier(0.33,0,0.15,1)]`;
const CENTER_CLUSTER_GONE = `scale-100 opacity-0 duration-[1500ms] transition-opacity ease-[cubic-bezier(0.33,0,0.15,1)]`;

/** 우측 CircleUI 중앙 닷·블롭과 동기 (2~4) */
export default function LeftCompanionAgentLayer({
  step = 1,
  dotsGathering = false,
}) {
  const dotsPhase = step <= 1 ? 1 : step <= 3 ? step : 3;
  const centerClusterGather = dotsGathering && step <= 4;
  const centerClusterExit = step >= 4 && !dotsGathering;
  /** 1~4: 닷 연속 (1→2 우측 thinking dot과 동일) */
  const showLayer =
    step <= 4 || (dotsGathering && step === 3);
  const showCenterBlobShell =
    (step >= 2 && step <= 4) || dotsGathering;
  const shellLit = (step >= 3 && step <= 4) || dotsGathering;

  const BLOB_SHELL_REVEAL =
    "origin-center transition-[transform,opacity,filter] duration-[1500ms] ease-[cubic-bezier(0.33,0,0.15,1)]";
  const blobShellRevealClass = centerClusterExit
    ? "scale-[0.94] opacity-0 blur-[6px]"
    : shellLit
      ? "scale-100 opacity-100 blur-0"
      : "scale-[0.38] opacity-0 blur-[8px] pointer-events-none";

  if (!showLayer) return null;

  const clusterMotionClass = centerClusterExit
    ? CENTER_CLUSTER_GONE
    : centerClusterGather
      ? CENTER_CLUSTER_GATHER
      : CENTER_CLUSTER_IDLE;

  return (
    <div className="pointer-events-none relative">
      <div
        className={`origin-center will-change-[transform,opacity,filter] ${clusterMotionClass}`}
        style={{ transformOrigin: "center center" }}
      >
        {showCenterBlobShell ? (
          <>
            {/* 좌측 3번: 하얀 글로우 아래에 아주 옅은 그림자 레이어 */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 h-[clamp(80px,19vw,104px)] w-[clamp(80px,19vw,104px)] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04),rgba(0,0,0,0.08)_42%,transparent_76%)] blur-[10px]" />
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${BLOB_SHELL_REVEAL} ${blobShellRevealClass}`}
            >
              <AgentBlobShell
                active={
                  step === 3 &&
                  shellLit &&
                  !dotsGathering &&
                  !centerClusterExit
                }
                visible={shellLit && !centerClusterExit}
                fading={centerClusterExit}
              />
            </div>
          </>
        ) : null}
        <div className="relative z-10">
          <AgentDotsContinuity
            step={dotsPhase}
            gathering={dotsGathering}
            exiting={centerClusterExit}
          />
        </div>
      </div>
    </div>
  );
}
