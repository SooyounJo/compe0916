import { AgentDotsContinuity } from "@/components/AgentDots";
import { AgentBlobShell } from "@/components/AgentBlobCluster";

const CENTER_CLUSTER_EASE =
  "ease-[cubic-bezier(0.33,0,0.15,1)] transition-[transform,opacity,filter]";
const CENTER_CLUSTER_IDLE = `scale-100 opacity-100 blur-0 duration-[900ms] ${CENTER_CLUSTER_EASE}`;
const CENTER_CLUSTER_GATHER = `scale-[0.94] opacity-[0.88] blur-[2px] duration-[1000ms] ${CENTER_CLUSTER_EASE}`;
const CENTER_CLUSTER_GONE = `scale-[0] opacity-0 blur-[10px] duration-[1200ms] ${CENTER_CLUSTER_EASE}`;

/** 우측 CircleUI 중앙 닷·블롭과 동기 (2~4) */
export default function LeftCompanionAgentLayer({
  step = 1,
  dotsGathering = false,
}) {
  const dotsPhase = step <= 1 ? 1 : step <= 3 ? step : 3;
  const centerClusterGather = dotsGathering && step === 3;
  const centerClusterExit = step >= 4;
  const showCenterBlobShell =
    (step >= 2 && step <= 4) || dotsGathering;
  const shellLit = (step >= 3 && step <= 4) || dotsGathering;

  const BLOB_SHELL_REVEAL =
    "origin-center transition-[transform,opacity,filter] duration-[1000ms] ease-[cubic-bezier(0.33,0,0.15,1)]";
  const blobShellRevealClass = shellLit
    ? "scale-100 opacity-100 blur-0"
    : "scale-[0.38] opacity-0 blur-[8px] pointer-events-none";

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
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${BLOB_SHELL_REVEAL} ${blobShellRevealClass}`}
          >
            <AgentBlobShell
              active={
                shellLit &&
                step === 3 &&
                !dotsGathering &&
                !centerClusterExit
              }
            />
          </div>
        ) : null}
        <div className="relative z-10">
          <AgentDotsContinuity
            step={dotsPhase}
            gathering={dotsGathering}
          />
        </div>
      </div>
    </div>
  );
}
